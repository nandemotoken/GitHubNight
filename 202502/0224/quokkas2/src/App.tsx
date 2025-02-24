// @ts-nocheck
import * as React from "react";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [doubled, setDoubled] = useState(0);

  useEffect(() => {
    setDoubled(count * 2);
  }, [count]);

  return (
    <div>
      <h1>カウンター: {count}</h1>
      <p>2倍の値: {doubled}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
    </div>
  );
};

export default App;
