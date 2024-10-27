package main

import (
	"fmt"
	"log"
	"sort"
)

const TOTAL_SEATS = 465 // 衆議院の総議席数

// 政党の情報を表す構造体
type Party struct {
    Name    string
    Seats   int
    Allies  []string // 連立を組みやすい政党のリスト
}

// 特定の議決に必要な議席数の定数
const (
    CONSTITUTIONAL_AMENDMENT = TOTAL_SEATS * 2 / 3  // 憲法改正の発議に必要な議席数（3分の2以上）
    ABSOLUTE_MAJORITY       = TOTAL_SEATS / 2 + 1   // 絶対安定多数（過半数）
    STABLE_MAJORITY        = TOTAL_SEATS * 55 / 100 // 安定多数（55%）
)

// 議決の種類と必要議席数を表す構造体
type VotingRequirement struct {
    Name        string
    NeededSeats int
    Description string
}

// 連立の組み合わせを表す構造体
type Coalition struct {
    Parties     []string
    TotalSeats  int
    SeatShare   float64
    Capabilities []string
}

// 議席率を計算
func calculateSeatShare(seats int) float64 {
    return float64(seats) / float64(TOTAL_SEATS) * 100
}

// 政党の組み合わせが実現可能かチェック
func isViableCoalition(parties []Party, combination []string) bool {
    // 政党間の相性をチェック（単純化のため、ここでは全ての組み合わせを許容）
    return true
}

// 可能な連立の組み合わせを生成
func generateCoalitions(parties []Party) []Coalition {
    var coalitions []Coalition
    
    // 2党以上の組み合わせを生成
    for i := 0; i < len(parties); i++ {
        for j := i + 1; j < len(parties); j++ {
            if isViableCoalition(parties, []string{parties[i].Name, parties[j].Name}) {
                totalSeats := parties[i].Seats + parties[j].Seats
                coalition := Coalition{
                    Parties:    []string{parties[i].Name, parties[j].Name},
                    TotalSeats: totalSeats,
                    SeatShare:  calculateSeatShare(totalSeats),
                }
                coalition.Capabilities = analyzeCapabilities(totalSeats)
                coalitions = append(coalitions, coalition)
            }
        }
    }

    // 3党の組み合わせも生成
    for i := 0; i < len(parties); i++ {
        for j := i + 1; j < len(parties); j++ {
            for k := j + 1; k < len(parties); k++ {
                if isViableCoalition(parties, []string{parties[i].Name, parties[j].Name, parties[k].Name}) {
                    totalSeats := parties[i].Seats + parties[j].Seats + parties[k].Seats
                    coalition := Coalition{
                        Parties:    []string{parties[i].Name, parties[j].Name, parties[k].Name},
                        TotalSeats: totalSeats,
                        SeatShare:  calculateSeatShare(totalSeats),
                    }
                    coalition.Capabilities = analyzeCapabilities(totalSeats)
                    coalitions = append(coalitions, coalition)
                }
            }
        }
    }

    return coalitions
}

// 議席数に基づいて可能な行動を分析
func analyzeCapabilities(seats int) []string {
    var capabilities []string
    
    requirements := []VotingRequirement{
        {
            Name:        "憲法改正の発議",
            NeededSeats: CONSTITUTIONAL_AMENDMENT,
            Description: "憲法改正の発議が可能（総議席の3分の2以上）",
        },
        {
            Name:        "安定多数",
            NeededSeats: STABLE_MAJORITY,
            Description: "予算案の単独成立が可能（55%以上）",
        },
        {
            Name:        "絶対安定多数",
            NeededSeats: ABSOLUTE_MAJORITY,
            Description: "内閣総理大臣の指名や法案成立が可能（過半数）",
        },
    }

    for _, req := range requirements {
        if seats >= req.NeededSeats {
            capabilities = append(capabilities, req.Description)
        }
    }

    return capabilities
}

func validateTotalSeats(parties []Party) error {
	total := 0
	for _, party := range parties {
			total += party.Seats
	}
	
	if total != TOTAL_SEATS {
			return fmt.Errorf("総議席数が不正です。現在の総数: %d, 期待される総数: %d", total, TOTAL_SEATS)
	}
	return nil
}

func main() {
    // 2024年10月27日選挙の速報データ
		parties := []Party{
			{Name: "自民", Seats: 162},
			{Name: "公明", Seats: 20},
			{Name: "立民", Seats: 134},
			{Name: "維新", Seats: 32},
			{Name: "共産", Seats: 6},
			{Name: "国民", Seats: 22},
			{Name: "れいわ", Seats: 7},
			{Name: "諸派", Seats: 82},
	}

    // 総議席数の検証
    if err := validateTotalSeats(parties); err != nil {
			log.Fatalf("エラー: %v", err)
	}


    // 各政党の議席率を表示
    fmt.Println("\n各政党の議席状況:")
    for _, party := range parties {
        seatShare := calculateSeatShare(party.Seats)
        fmt.Printf("%s: %d議席 (%.1f%%)\n", party.Name, party.Seats, seatShare)
    }

    // 可能な連立の分析
    coalitions := generateCoalitions(parties)

    // 議席数で降順にソート
    sort.Slice(coalitions, func(i, j int) bool {
        return coalitions[i].TotalSeats > coalitions[j].TotalSeats
    })

    // 連立分析の結果を表示
    fmt.Println("\n可能な連立パターンの分析:")
    for _, coalition := range coalitions {
        fmt.Printf("\n連立: %v\n", coalition.Parties)
        fmt.Printf("総議席数: %d (%.1f%%)\n", coalition.TotalSeats, coalition.SeatShare)
        fmt.Println("実現可能な政策決定:")
        for _, capability := range coalition.Capabilities {
            fmt.Printf("- %s\n", capability)
        }
    }

    fmt.Println("\n必要議席数の基準:")
    fmt.Printf("憲法改正の発議: %d議席以上\n", CONSTITUTIONAL_AMENDMENT)
    fmt.Printf("安定多数: %d議席以上\n", STABLE_MAJORITY)
    fmt.Printf("絶対安定多数: %d議席以上\n", ABSOLUTE_MAJORITY)
}