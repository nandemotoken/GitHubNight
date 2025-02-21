const _ = require("lodash");
const nu = [1, 2, 3, 4, 5];
_.sum(nu); //?

let a: number = 3;
a = 4;
++a; //?
--a; //?
a++; //?
console.log(a);

const c = { a: 1 };
c.a++; //?
console.log(c);

const items = [1, 2, 3];
items[0]++; //?
console.log(items);

// Promiseの結果を表示
Promise.resolve("成功!").then((result) => {
  console.log(result);
});

// async/await
async function getData() {
  const result = await Promise.resolve({ id: 1, name: "データ" });
  return result; //?
}
getData(); //.then(console.log);

// オブジェクトの階層構造を表示
console.dir(
  { complex: { nested: { object: { here: 123 } } } },
  { depth: null }
);

// console.logのバリエーション
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// テーブル形式で表示
console.table(users);

console.dir(users, { depth: null });
