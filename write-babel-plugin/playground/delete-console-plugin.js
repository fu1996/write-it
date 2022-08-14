
// plugin.js
module.exports = function({ types: t }) {
    console.log('t',t);
    return {
      name: "delete-console-plugin",
      visitor: {
        Identifier(path, state) {
          if (path.node.name === 'bad') {
            path.node.name = 'good';
          }
        },
        // ASTNodeTypeHere(path, state) {
        //     console.log('ASTNodeTypeHere', path, state);
        // }
      }
    };
  };
