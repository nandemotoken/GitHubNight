import React from "react";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import "./App.css";

function App() {
  const handleDetailClick = () => {
    alert("詳細を表示します"); // 実際のアプリケーションではここでモーダルを開くなどの処理を行います
  };

  return (
    <div className="app">
      <h1>Hello World</h1>

      <section className="section">
        <h2>ボタンコンポーネント</h2>
        <div className="buttons">
          <Button variant="primary">プライマリ</Button>
          <Button variant="secondary">セカンダリ</Button>
          <Button variant="outline">アウトライン</Button>
          <Button size="small">小</Button>
          <Button size="large">大</Button>
          <Button disabled>無効</Button>
          <Button loading>ローディング</Button>
        </div>
      </section>

      <section className="section">
        <h2>カードコンポーネント</h2>
        <div className="cards">
          <Card title="基本カード">
            <p>これは基本的なカードコンポーネントです。</p>
          </Card>

          <Card
            title="フッター付きカード"
            footer={
              <Button size="small" onClick={handleDetailClick}>
                詳細を見る
              </Button>
            }
          >
            <p>これはフッター付きのカードです。</p>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default App;
