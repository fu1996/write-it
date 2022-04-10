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

    "./src/a.js": ((module) => {

      eval("module.exports = 'aaa'\n\n//# sourceURL=webpack://01-base/./src/a.js?");

    }),

    "./src/index.js": ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

        eval("const str = __webpack_require__(/*! ./a */ \"./src/a.js\")\nconsole.log('hello' + str);\n\n//# sourceURL=webpack://01-base/./src/index.js?");

      })

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