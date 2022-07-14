import * as babylon from "babylon";
import traverse from "babel-traverse";
import generate from "babel-generator";
import {default as template} from "babel-template";
// 注意 node_modules 模块里 导出的是 default
import {default as t} from "babel-types";

// 构建模板
const buildRequire = template(`
  const IMPORT_NAME = require(SOURCE);
`);
// 创建ast 
const astImport = buildRequire({
  IMPORT_NAME: t.identifier("a"),
  SOURCE: t.stringLiteral("a")
});

// 原始代码
const code = `
function square(n) {
  return n * n;
}`;
// ast 是对象 属于引用型
const ast = babylon.parse(code);

// 对 抽象语法树 一层层的 遍历
traverse.default(ast, {
  // 树 的节点 会 作为 参数 传入 enter 函数
  enter(path) {
    // 如果当前节点 是 Identifier 并且 name 是 n。就替换为 x
    // 因为 ast 是对象，所以 此处做的变更会 直接影响到 ast 
    // if (
    //   path.node.type === "Identifier" &&
    //   path.node.name === "n"
    // ) {
    //   path.node.name = "x";
    // }
    if (t.isIdentifier(path.node, {name: "n"})) {
      path.node.name = "x"
    }
    // 在程序的开头 塞进去 我的 ast 
    if (t.isProgram(path.node)) {
      console.log('塞入我写的 ast')
      path.node.body.unshift(astImport)
    }
  },
});
// 对节点操作过以后的代码
const targetCode = generate.default(ast).code

console.log('targetCode', targetCode)
// 塞入我写的 ast
// targetCode const a = require("a");

// function square(x) {
//   return x * x;
// }