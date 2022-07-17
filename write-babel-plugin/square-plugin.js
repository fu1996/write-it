// square-plugin.js
// 新建 变量，记录 新函数的函数名
const newName = 'newSquare';

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        console.log("走进 Identifier");
        if (path.parentPath && path.listKey === 'arguments') {
          console.log("增加参数");
          path.container.push(t.NumericLiteral(222));
          return;
        }

        // 获取当前 函数的 父级。查找最接近的父函数或程序：
        const parentFunc = path.getFunctionParent();
        if (parentFunc) {
          // 当前父节点 是 square函数 并且当前的节点的listKey是 params（此处是为了排除 square 的函数命名节点）。
          // 此处是在重命名后才会走的 逻辑 所以 该节点 父级的 名称判断用的是 newName 而不是 square
          if (
            parentFunc.type === "FunctionDeclaration" &&
            parentFunc.node.id.name === newName &&
            path.listKey === "params"
          ) {
            console.log("新增函数参数 left");
            path.container.push(t.identifier("left"));
          }
          // 当前父节点 是 square函数 并且当前的节点的key是 id（此处是为了确认 square 的函数命名节点）。
          // 然后对此函数进行重命名 从 square 改为 newName
          if (
            parentFunc.node.id.name === "square" &&
            path.key === "id"
          ) {
            console.log("对 square 进行重命名：", newName);
            path.node.name = newName;
          }
        }
        // 方法二： 判断是不是 square 的函数调用
        // if (path.key === 'callee' && path.isIdentifier({name: 'square'})) {
        //   console.log("对square函数调用进行重命名", newName);
        //   path.node.name = newName;
        // }
      },
      BinaryExpression(path, state) {
        if (path.node.operator !== "*") return;
        console.log("BinaryExpression");
        // 替换一个节点
        path.replaceWith(
          // t.binaryExpression("**", path.node.left, t.NumericLiteral(2))
          t.binaryExpression("**", t.identifier("left"), t.identifier("n"))
        );
      },
      CallExpression(path, state) {
        console.log("CallExpression");
        // 方法1： 当前被调用函数的 名称 是 square
        if (path.node.callee.name === 'square') {
          console.log("在 CallExpression 中，更改 被调用 函数 square 的名字 为", newName);
          path.node.callee.name  = newName;
        }
      },
      FunctionDeclaration(path, state) {
        console.log("FunctionDeclaration");
        // const params = path.get('params');
        // const params = path.get('params');
        // params.push(t.identifier('left'));
        // console.log('FunctionDeclaration end', path);
        // path.params = params;
        // path.params.push(t.identifier('right'));
      },
    },
  };
};
