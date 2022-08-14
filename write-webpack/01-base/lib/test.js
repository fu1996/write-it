const template = require('@babel/template'); // 搭配eslint 使用
// 解决方案1 https://eslint.org/docs/latest/user-guide/configuring/language-options#using-configuration-files-1
// 构建模板 以及 eslint 解决方案 2 /*global %%IMPORT_NAME%%*/


const buildRequire = template.default(`
import %%IMPORT_NAME%% from %%SOURCE%%;
`);

const genereateAST = ({
  IMPORT_NAME,
  SOURCE
}) => buildRequire({
  IMPORT_NAME,
  SOURCE
});

module.exports = function ({
  types: t
}, options = {}) {
  console.log('start');
  const {
    IMPORT_NAME,
    SOURCE
  } = options;
  return {
    visitor: {
      Program(path, state) {
        if (SOURCE && IMPORT_NAME) {
          const ast = genereateAST({
            IMPORT_NAME,
            SOURCE
          });
          console.log('ast');
          path.node.body.unshift(ast);
        }
      }

    }
  };
};