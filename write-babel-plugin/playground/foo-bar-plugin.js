
// plugin.js
module.exports = function({types: t}) {
    console.log('t')
    return {
      visitor: {
        BinaryExpression(path, state) {
            // console.log('path1', path.get('left'));
            if (path.node.operator !== '===') {
                return;
            }
            console.log('111', path.get('left').isIdentifier({ name: "n" }))
            // 判断 left 节点 的 name 是 foo => true
            console.log('222', path.get('left').isIdentifier({ name: "foo" }))
            if (path.node.operator === '===') {
                path.node.operator = '!=='
            }

            if (t.isIdentifier(path.node.left)) {
                path.node.left.name = 'replaceFoo'
            }
        },
      }
    };
  };
