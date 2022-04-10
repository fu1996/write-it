/*
*注意：已经使用了“eval”devtool（默认情况下可能是在“开发”模式下）。
*此devtool既不用于生产，也不用于可读的输出文件。
*它使用“eval（）”调用在浏览器devtools中创建单独的源文件。
*如果试图读取输出文件，请选择其他devtool(https://webpack.js.org/configuration/devtool/)
*或者使用“devtool:false”禁用默认devtool。
*如果要查找生产就绪输出文件，请参阅模式：“生产”(https://webpack.js.org/configuration/mode/).
*/
(() => { // webpackBootstrap
  var __webpack_modules__ = ({
    
    "./src/index.js": ((module) => {
      // 模板处使用了 模板字符串 因为代码中【modules[key]】存在 引号 
      eval(`__webpack_require__("./src/index.less");

const a = __webpack_require__("./src/a.js");

console.log('a', a);`);
    }),
    
    "./src/index.less": ((module) => {
      // 模板处使用了 模板字符串 因为代码中【modules[key]】存在 引号 
      eval(`let style = document.createElement('style');
style.innerHTML = "body {\\n  background: red;\\n}\\n";
document.head.appendChild(style);`);
    }),
    
    "./src/a.js": ((module) => {
      // 模板处使用了 模板字符串 因为代码中【modules[key]】存在 引号 
      eval(`const b = __webpack_require__("./src/base/b.js");

module.exports = 'a' + b;`);
    }),
    
    "./src/base/b.js": ((module) => {
      // 模板处使用了 模板字符串 因为代码中【modules[key]】存在 引号 
      eval(`module.exports = 'b';`);
    }),
    
  });
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var __webpack_exports__ = __webpack_require__("./src/index.js");
})();