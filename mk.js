const fs = require('fs').promises;
const path = require('path');

async function createDailyFolder(dateStr) {
    let now;
    
    if (dateStr) {
        // 引数が指定された場合（例：0305）
        const currentYear = new Date().getFullYear();
        const month = dateStr.slice(0, 2);
        const day = dateStr.slice(2, 4);
        now = new Date(currentYear, parseInt(month) - 1, parseInt(day));
    } else {
        // 引数がない場合は本日の日付
        now = new Date();
    }
    
    // YYYYMM/MMDD 形式のパスを生成
    const yearMonth = now.getFullYear().toString() + 
                     String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getMonth() + 1).padStart(2, '0') + 
                String(now.getDate()).padStart(2, '0');
    
    const folderPath = path.join(yearMonth, day);

    try {
        // フォルダを作成
        await fs.mkdir(folderPath, { recursive: true });
        
        // README.mdのパス
        const readmePath = path.join(folderPath, 'README.md');
        
        // ファイルが存在するかチェック
        try {
            await fs.access(readmePath);
            console.log('README.md は既に存在します');
        } catch {
            // README.mdテンプレート
            const content = `## 本日の開発

- 

## 本日の日記

- 

## 本日の BGM

- 

`;
            await fs.writeFile(readmePath, content, 'utf8');
            console.log(`作成完了: ${folderPath}`);
        }
    } catch (err) {
        console.error('エラーが発生しました:', err);
    }
}

// コマンドライン引数を取得
const dateArg = process.argv[2];
createDailyFolder(dateArg); 