// plugin.js
module.exports = function({ types: t }) {
    return {
      visitor: {
        Identifier(path, state) {
          if (path.node.name === 'bad') {
            path.node.name = 'good';
          }
        }
      }
    };
  };
