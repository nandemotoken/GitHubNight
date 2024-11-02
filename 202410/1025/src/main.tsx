import * as React from 'react';
import { createRoot } from 'react-dom/client';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// グローバルスタイル
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #1a1a1a;
    overflow: hidden;
  }
`;

// アニメーションの定義
const moveLeft = keyframes`
  from {
    transform: translateX(calc(100vw + 50px));
  }
  to {
    transform: translateX(-50px);
  }
`;

// 円のスタイル
const Circle = styled.div<{ $size: number; $top: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: #ffeb3b;
  border-radius: 50%;
  animation: ${moveLeft} linear infinite;
  top: ${props => props.$top}px;
  filter: blur(2px);
  opacity: 0.9;
  will-change: transform;
`;

const App: React.FC = () => {
  const [circles, setCircles] = React.useState<Array<{
    id: number;
    top: number;
    size: number;
    duration: number;
  }>>([]);

  // 初期円の生成
  React.useEffect(() => {
    const screenWidth = window.innerWidth;
    const numCircles = 15; // 円の数
    const baseSpeed = screenWidth / 250; // 画面幅に基づいて基本速度を計算

    const newCircles = Array.from({ length: numCircles }, (_, i) => ({
      id: i,
      top: Math.random() * window.innerHeight,
      size: 50, // 固定サイズに変更
      duration: baseSpeed * (1 + Math.random() * 0.5), // 速度のばらつきを抑える
    }));
    setCircles(newCircles);

    // ウィンドウリサイズ時の処理
    const handleResize = () => {
      setCircles(prev => prev.map(circle => ({
        ...circle,
        top: Math.random() * window.innerHeight,
      })));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let nextId = React.useRef(15);

  // 新しい円を追加する関数
  const addNewCircle = React.useCallback(() => {
    const screenWidth = window.innerWidth;
    const baseSpeed = screenWidth / 100;
    
    setCircles(prev => [...prev, {
      id: nextId.current++,
      top: Math.random() * window.innerHeight,
      size: 50, // 固定サイズ
      duration: baseSpeed * (1 + Math.random() * 0.5),
    }]);
  }, []);

  // 定期的に新しい円を追加
  React.useEffect(() => {
    const interval = setInterval(addNewCircle, 2000);
    return () => clearInterval(interval);
  }, [addNewCircle]);

  return (
    <>
      <GlobalStyle />
      {circles.map(circle => (
        <Circle
          key={circle.id}
          $top={circle.top}
          $size={circle.size}
          style={{
            animationDuration: `${circle.duration}s`,
          }}
        />
      ))}
    </>
  );
};

// DOMにマウント
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;
