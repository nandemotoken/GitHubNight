const fs = require('fs').promises;
const path = require('path');

async function createDailyFolder() {
    const now = new Date();
    
    // YYYYMM/MMDD 形式のパスを生成
    const yearMonth = now.toISOString().slice(0,4) + 
                     now.toISOString().slice(5,7);
    const day = now.toISOString().slice(5,7) + 
                now.toISOString().slice(8,10);
    
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
            const content = `# ${yearMonth}/${day} 作業記録

## 今日の目標

- [ ] 

## 実施したこと

- 

## メモ

- 

## 明日の課題

- 

`;
            await fs.writeFile(readmePath, content, 'utf8');
            console.log(`作成完了: ${folderPath}`);
        }
    } catch (err) {
        console.error('エラーが発生しました:', err);
    }
}

createDailyFolder(); 