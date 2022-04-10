/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/c.app.js":
/*!**********************!*\
  !*** ./src/c.app.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('c-app');\n\n//# sourceURL=webpack://03-optimization/./src/c.app.js?");

/***/ }),

/***/ "./src/c.h5.js":
/*!*********************!*\
  !*** ./src/c.h5.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('c-h5');\n\n//# sourceURL=webpack://03-optimization/./src/c.h5.js?");

/***/ }),

/***/ "./src/c.js":
/*!******************!*\
  !*** ./src/c.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('c');\n\n//# sourceURL=webpack://03-optimization/./src/c.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _c_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c.app */ \"./src/c.app.js\");\n/* harmony import */ var _c_h5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./c.h5 */ \"./src/c.h5.js\");\n/* harmony import */ var _c__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./c */ \"./src/c.js\");\n\n\n\n\nconsole.log({app: _c_app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]})\nconsole.log({h5: _c_h5__WEBPACK_IMPORTED_MODULE_1__[\"default\"]});\nconsole.log({c: _c__WEBPACK_IMPORTED_MODULE_2__[\"default\"]});\n\n// console.log('动态导入')\n// const newBtn = document.createElement('button')\n\n// newBtn.innerHTML = 'show'\n\n// document.body.appendChild(newBtn)\n\n// import React, { createContext, useState } from 'react'\n// import ReactDom from 'react-dom'\n// import { Formik, Form, Field, ErrorMessage } from 'formik'\n\n// import state from './store'\n\n// console.log('state', state);\n\n// const App = () => {\n//     const [hasEle, setHasEle] = useState(false)\n//     const handleClick = () => {\n//         import('./dynamic?data=\"1\"').then(res => {\n//             console.log('res', res.default)\n//             setHasEle(true)\n//         })\n//     }\n//     const initialValues = {\n//         username: '张三',\n//         content: '我是内容',\n//         subject: 'java',\n//       }\n//       const handleSubmit = values => {\n//         console.log(values)\n//       }\n//     return (\n//         <div>\n//             <button onClick={handleClick}>动态加载和传参</button>\n//             <Formik\n//                 initialValues={initialValues}\n//                 onSubmit={handleSubmit}\n//             >\n//                 <Form>\n//                     <div id=\"form\"></div>\n//                     <Field name=\"username\" />\n//                     <ErrorMessage name=\"username\" />\n//                     <button type=\"submit\">提交</button>\n//                 </Form>\n//             </Formik>\n//         </div>\n//     )\n// }\n\n// ReactDom.render(<App />, document.getElementById('root'))\n\n//# sourceURL=webpack://03-optimization/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;