// 新しいファイルを作成し、Ctrl(Cmd) + K, Q でQuokkaを起動
const message = "Hello Quokka!";
console.log(message); // 右側にリアルタイムで結果が表示されます

const user = {
  name: "Alice",
  age: 25,
};
user.name; //?
user; //?

user;

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
doubled; //?  // [2, 4, 6, 8, 10]

// 配列の処理をステップバイステップで確認
numbers.reduce((sum, n) => {
  console.log(`Current sum: ${sum}, Current number: ${n}`);
  return sum + n;
}, 0);
