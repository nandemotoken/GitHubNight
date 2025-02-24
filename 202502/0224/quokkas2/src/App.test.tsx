// @ts-nocheck
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import App from "./App";

// Quokka.jsのためのグローバル設定
global.React = React;

// テスト実行関数
const runTests = async () => {
  // TestRendererを使用してコンポーネントをレンダリング
  let testRenderer;
  await TestRenderer.act(async () => {
    testRenderer = TestRenderer.create(<App />);
  });

  const testInstance = testRenderer.root;

  // 初期状態の確認
  console.log("初期状態:");
  console.log("h1のテキスト:", testInstance.findByType("h1").children[0]);
  console.log("p要素のテキスト:", testInstance.findByType("p").children[0]);
  console.log(
    "ボタンのテキスト:",
    testInstance.findByType("button").children[0]
  );

  // ボタンクリックのシミュレーション
  await TestRenderer.act(async () => {
    const button = testInstance.findByType("button");
    button.props.onClick();
  });

  // クリック後の状態確認
  console.log("\nクリック後の状態:");
  console.log("h1の更新後テキスト:", testInstance.findByType("h1").children[0]);
  console.log("pの更新後テキスト:", testInstance.findByType("p").children[0]);

  return "テスト完了";
};

// テストの実行
runTests().then((result) => console.log(result)); /*? */
