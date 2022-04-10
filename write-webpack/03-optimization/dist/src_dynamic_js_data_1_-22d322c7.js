"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_03_optimization"] = self["webpackChunk_03_optimization"] || []).push([["src_dynamic_js_data_1_"],{

/***/ "./src/dynamic.js?data=\"1\"":
/*!*********************************!*\
  !*** ./src/dynamic.js?data="1" ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ \"./node_modules/formik/dist/formik.esm.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n// console.log('动态导入')\n// const newBtn = document.createElement('button')\n// newBtn.innerHTML = 'show'\n// document.body.appendChild(newBtn)\n\n\n\n\nconsole.log('sta', _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n\nvar Test = function Test(props) {\n  console.log('test', props);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, \"123\");\n};\n\nvar NewText = formik__WEBPACK_IMPORTED_MODULE_2__.connect(Test);\nconsole.log('NewText', NewText);\n\nvar Hi = function Hi(props) {\n  console.log('formik', formik__WEBPACK_IMPORTED_MODULE_2__);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, \"\\u4F60\\u597D\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NewText, null));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hi);\nreact_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Hi, null), document.getElementById('dynamic'));\n\n//# sourceURL=webpack://03-optimization/./src/dynamic.js?");

/***/ })

}]);