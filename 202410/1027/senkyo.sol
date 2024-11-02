// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ElectionAnalysis {
    uint256 public constant TOTAL_SEATS = 465;
    uint256 public constant CONSTITUTIONAL_AMENDMENT = (TOTAL_SEATS * 2) / 3;
    uint256 public constant ABSOLUTE_MAJORITY = (TOTAL_SEATS / 2) + 1;
    uint256 public constant STABLE_MAJORITY = (TOTAL_SEATS * 55) / 100;

    struct Party {
        string name;
        uint256 seats;
    }

    struct Coalition {
        string[] parties;
        uint256 totalSeats;
        uint256 seatShare; // パーセンテージ * 100 (小数点2位まで)
        string[] capabilities;
    }

    Party[] public parties;
    address public owner;
    
    event ElectionResultsUpdated(uint256 timestamp);
    event CoalitionAnalyzed(string[] parties, uint256 totalSeats, uint256 seatShare);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // 選挙結果を設定
    function setElectionResults(
        string[] memory names,
        uint256[] memory seats
    ) external onlyOwner {
        require(names.length == seats.length, "Arrays length mismatch");
        
        // 総議席数の検証
        uint256 totalSeats = 0;
        for (uint256 i = 0; i < seats.length; i++) {
            totalSeats += seats[i];
        }
        require(totalSeats == TOTAL_SEATS, "Total seats must be 465");

        delete parties;
        for (uint256 i = 0; i < names.length; i++) {
            parties.push(Party(names[i], seats[i]));
        }

        emit ElectionResultsUpdated(block.timestamp);
    }

    // 連立の分析
    function analyzeCoalition(uint256[] memory partyIndexes) external view returns (
        string[] memory coalitionParties,
        uint256 totalSeats,
        uint256 seatShare,
        string[] memory capabilities
    ) {
        require(partyIndexes.length >= 2 && partyIndexes.length <= 3, "Coalition must be 2-3 parties");

        // 連立政党の名前と議席数を集計
        coalitionParties = new string[](partyIndexes.length);
        totalSeats = 0;

        for (uint256 i = 0; i < partyIndexes.length; i++) {
            require(partyIndexes[i] < parties.length, "Party index out of bounds");
            coalitionParties[i] = parties[partyIndexes[i]].name;
            totalSeats += parties[partyIndexes[i]].seats;
        }

        // 議席率を計算（小数点2位まで）
        seatShare = (totalSeats * 10000) / TOTAL_SEATS;

        // 実現可能な政策を分析
        capabilities = analyzeCapabilities(totalSeats);

        return (coalitionParties, totalSeats, seatShare, capabilities);
    }

    // 政策実現可能性の分析
    function analyzeCapabilities(uint256 seats) internal pure returns (string[] memory) {
        string[] memory allCapabilities = new string[](3);
        uint256 count = 0;

        if (seats >= CONSTITUTIONAL_AMENDMENT) {
            allCapabilities[count++] = "constitutional_amendment";
        }
        if (seats >= STABLE_MAJORITY) {
            allCapabilities[count++] = "stable_majority";
        }
        if (seats >= ABSOLUTE_MAJORITY) {
            allCapabilities[count++] = "absolute_majority";
        }

        // 実際に設定された機能だけを含む配列を作成
        string[] memory activeCapabilities = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            activeCapabilities[i] = allCapabilities[i];
        }

        return activeCapabilities;
    }

    // 全政党の情報を取得
    function getAllParties() external view returns (Party[] memory) {
        return parties;
    }

    // 必要議席数の定数を取得
    function getRequiredSeats() external pure returns (
        uint256 constitutionalAmendment,
        uint256 absoluteMajority,
        uint256 stableMajority
    ) {
        return (CONSTITUTIONAL_AMENDMENT, ABSOLUTE_MAJORITY, STABLE_MAJORITY);
    }
}