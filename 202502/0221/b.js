const describe = require("describe");
const _ = require("lodash");

// オブジェクトを表形式で表示
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
// console.table(users);

// オブジェクトの階層構造を表示
console.dir(
  { complex: { nested: { object: { here: 123 } } } },
  { depth: null }
);

let a = 3; //?
a = 4; //?
a = "hoge"; //?
