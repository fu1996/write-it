/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('c-app');

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('c-h5');

/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _test_dir_c_h5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


// import c from './c'

console.log({app: _c_app__WEBPACK_IMPORTED_MODULE_0__["default"]})
console.log({h5: _test_dir_c_h5__WEBPACK_IMPORTED_MODULE_1__["default"]});
// console.log({c});

// console.log('动态导入')
// const newBtn = document.createElement('button')

// newBtn.innerHTML = 'show'

// document.body.appendChild(newBtn)

// import React, { createContext, useState } from 'react'
// import ReactDom from 'react-dom'
// import { Formik, Form, Field, ErrorMessage } from 'formik'

// import state from './store'

// console.log('state', state);

// const App = () => {
//     const [hasEle, setHasEle] = useState(false)
//     const handleClick = () => {
//         import('./dynamic?data="1"').then(res => {
//             console.log('res', res.default)
//             setHasEle(true)
//         })
//     }
//     const initialValues = {
//         username: '张三',
//         content: '我是内容',
//         subject: 'java',
//       }
//       const handleSubmit = values => {
//         console.log(values)
//       }
//     return (
//         <div>
//             <button onClick={handleClick}>动态加载和传参</button>
//             <Formik
//                 initialValues={initialValues}
//                 onSubmit={handleSubmit}
//             >
//                 <Form>
//                     <div id="form"></div>
//                     <Field name="username" />
//                     <ErrorMessage name="username" />
//                     <button type="submit">提交</button>
//                 </Form>
//             </Formik>
//         </div>
//     )
// }

// ReactDom.render(<App />, document.getElementById('root'))
})();

/******/ })()
;