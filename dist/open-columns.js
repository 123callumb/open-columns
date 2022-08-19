/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("open-columns", [], factory);
	else if(typeof exports === 'object')
		exports["open-columns"] = factory();
	else
		root["open-columns"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/OpenColumn/OCAttribute.ts":
/*!***************************************!*\
  !*** ./src/OpenColumn/OCAttribute.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCAttribute)\n/* harmony export */ });\nclass OCAttribute {}\nOCAttribute.TAGS = {};\nOCAttribute.CLASS = {\n  // Wrapper\n  Wrapper_Container: \"OC-Wrapper-Contaier\",\n  // Header\n  Headers_Contaier: \"OC-Headers-Container\",\n  Header_Cell: \"OC-Header-Cell\",\n  // Scrollbody\n  ScrollBody_Container: \"OC-ScrollBody-Container\",\n  ScrollBody_Row: \"OC-ScrollBody-Row\",\n  ScrollBody_Cell: \"OC-ScrollBody-Cell\"\n};\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCAttribute.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCCell.ts":
/*!**********************************!*\
  !*** ./src/OpenColumn/OCCell.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCCell)\n/* harmony export */ });\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n\nclass OCCell {\n  constructor(api, header, rowData) {\n    this._header = header;\n    this._rowData = rowData;\n    this._api = api;\n    this.Draw = this.Draw.bind(this);\n    this.Update = this.Update.bind(this);\n    this.GetData = this.GetData.bind(this);\n    this.GetElement = this.GetElement.bind(this);\n    this.Draw();\n  }\n\n  Draw() {\n    if (!this._element) {\n      this._element = document.createElement('div');\n\n      this._element.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CLASS.ScrollBody_Cell);\n    }\n\n    this._element.innerHTML = \"\";\n    this._element.textContent = `${this.GetData()}`;\n  }\n\n  Update(newRowData) {\n    if (newRowData) this._rowData = newRowData;\n    this.Draw();\n  }\n\n  GetData() {\n    // TODO: fix this dumb linitng error that wont let me null coalesce\n    let cellDataToRender = this._rowData != null ? this._rowData[this._header.propertyName] : null;\n    if (this._header.preCellRender) cellDataToRender = this._header.preCellRender(cellDataToRender, this._rowData, this._api);\n    return cellDataToRender;\n  }\n\n  GetElement() {\n    return this._element;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCCell.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCDataHeader.ts":
/*!****************************************!*\
  !*** ./src/OpenColumn/OCDataHeader.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCDataHeader)\n/* harmony export */ });\n/* harmony import */ var _OCDataHeaderCell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCDataHeaderCell */ \"./src/OpenColumn/OCDataHeaderCell.ts\");\n\nclass OCDataHeader {\n  constructor(api, dom, options) {\n    this._dom = dom;\n    this._api = api;\n    this._headerOptions = this.CreateHeaders(options);\n    this.Draw = this.Draw.bind(this);\n    this.GetHeaders = this.GetHeaders.bind(this);\n    this.Draw();\n  }\n\n  CreateHeaders(headerOptions) {\n    if (typeof headerOptions[0] === \"object\") return headerOptions;\n    return headerOptions.map(m => ({\n      propertyName: m,\n      displayName: m\n    }));\n  }\n\n  GetHeaders() {\n    return this._headerCells;\n  }\n\n  GetHeaderOptions() {\n    return this._headerOptions;\n  }\n\n  Draw() {\n    // Create cells\n    this._headerCells = this._headerOptions.map(m => new _OCDataHeaderCell__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._api, m)); // Append\n\n    this._dom.Headers.append(...this._headerCells.map(m => m.GetElement())); // Style\n\n\n    this._dom.Headers.style.transform = `translate(${0}px)`;\n  }\n\n  GetTranslatedX() {\n    // using replace to see if it is faster than new WebKitCSSMatrix(style.transform).m41;\n    const brokenTranslate = this._dom.Headers.style.transform.replace(\"translate(\", \"\").replace(\"px\", \"\").replace(\")\", \"\");\n\n    return parseFloat(brokenTranslate);\n  }\n\n  Translate(dX) {\n    const newX = this.GetTranslatedX() + dX;\n    this._dom.Headers.style.transform = `translate(${newX}px)`;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCDataHeader.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCDataHeaderCell.ts":
/*!********************************************!*\
  !*** ./src/OpenColumn/OCDataHeaderCell.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCDataHeaderCell)\n/* harmony export */ });\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n\nclass OCDataHeaderCell {\n  constructor(api, options) {\n    this._api = api;\n    this._options = options;\n    this.Draw = this.Draw.bind(this);\n    this.GetElement = this.GetElement.bind(this);\n    this.Draw();\n  }\n\n  GetElement() {\n    return this._element;\n  }\n\n  Draw() {\n    if (!this._element) {\n      this._element = document.createElement('div');\n\n      this._element.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CLASS.Header_Cell);\n    }\n\n    this._element.innerHTML = \"\";\n\n    if (this._options.render) {\n      const customRender = this._options.render(this._api);\n\n      if (typeof customRender === \"string\") this._element.innerHTML = customRender;else this._element.append(customRender);\n      return;\n    }\n\n    this._element.textContent = this._options.displayName;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCDataHeaderCell.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCDom.ts":
/*!*********************************!*\
  !*** ./src/OpenColumn/OCDom.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCDom)\n/* harmony export */ });\n/* harmony import */ var _util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/HelperFunctions */ \"./src/util/HelperFunctions.ts\");\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n\n\nclass OCDom {\n  constructor(selector) {\n    this.Wrapper = typeof selector === \"object\" ? selector : document.querySelector(selector);\n    if (!this.Wrapper) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(\"Could not initialise dom as the selector was not found.\");\n    this.Headers = document.createElement('div');\n    this.ScrollBody = document.createElement('div');\n    this.Wrapper.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.Wrapper_Container);\n    this.Headers.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.Headers_Contaier);\n    this.ScrollBody.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBody_Container);\n    this.Wrapper.append(this.Headers, this.ScrollBody);\n    this._scrollBodyOffset = this.ScrollBody.getBoundingClientRect().y;\n  }\n\n  IsInitialised() {\n    return this.Wrapper && this.Headers && this.ScrollBody;\n  }\n\n  GetScrollDOMTop() {\n    return this._scrollBodyOffset;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCDom.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCRow.ts":
/*!*********************************!*\
  !*** ./src/OpenColumn/OCRow.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCRow)\n/* harmony export */ });\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n/* harmony import */ var _OCCell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCCell */ \"./src/OpenColumn/OCCell.ts\");\n\n\nclass OCRow {\n  constructor(options) {\n    this._api = options.api;\n    this._data = options.data;\n    this._headers = options.headers;\n    this._cells = [];\n    this.RowIndex = options.rowIndex;\n    this._nextRow = options.nextRow;\n    this._prevRow = options.prevRow;\n    this.Draw = this.Draw.bind(this);\n    this.Update = this.Update.bind(this);\n    this.GetData = this.GetData.bind(this);\n    this.GetElement = this.GetElement.bind(this);\n    this.SetNextRow = this.SetNextRow.bind(this);\n    this.SetPrevRow = this.SetPrevRow.bind(this);\n    this.Draw(true);\n  }\n\n  GetElement() {\n    return this._element;\n  }\n\n  Draw(refresh = false) {\n    if (!this._element) {\n      this._element = document.createElement('div');\n\n      this._element.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CLASS.ScrollBody_Row);\n\n      const testOffset = this.RowIndex === 0 ? 100 : 0;\n      const rowOffset = this._prevRow ? this._prevRow.GetElement().getBoundingClientRect().bottom : 0; //const scrollBodyOffset = this._element.parentElement.getBoundingClientRect().top;\n\n      this._element.style.transform = `translate(0px, ${testOffset + rowOffset - 58.5}px)`; // Try not to  add any other transform properties or will have to use WebkitCssMatrix class\n\n      this._element.style.transition = 'all linear 0.1';\n    }\n\n    if (refresh) {\n      this._cells = [];\n      this._element.innerHTML = \"\";\n\n      this._headers.filter(f => f.propertyName !== null || f.preCellRender).forEach(header => {\n        const cell = new _OCCell__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this._api, header, this._data);\n        const cellElement = cell.GetElement();\n\n        this._element.append(cellElement);\n\n        if (header.postCellRender) header.postCellRender(cellElement, cell.GetData(), this._data, this._api);\n\n        this._cells.push(cell);\n      });\n    } else {\n      if (this._cells.length === 0) return;\n\n      this._cells.forEach(f => {\n        f.Update(this._data);\n      });\n    }\n  }\n\n  Update(data) {\n    this._data = data;\n    this.Draw();\n  }\n\n  GetData() {\n    return this._data;\n  }\n\n  GetTranslatedCoords() {\n    // using replace to see if it is faster than new WebKitCSSMatrix(style.transform);\n    const brokenTranslate = this._element.style.transform.replace(\"translate(\", \"\").replace(\"px\", \"\").replace(\")\", \"\").split(',');\n\n    return {\n      x: parseFloat(brokenTranslate[0]),\n      y: parseFloat(brokenTranslate[1])\n    };\n  }\n\n  Translate(dX, dY) {\n    const currentPos = this.GetTranslatedCoords();\n    const newX = currentPos.x + dX;\n    const newY = currentPos.y + dY;\n    this._element.style.transform = `translate(${newX}px, ${newY}px)`;\n  }\n\n  OutOfView(withinOffset = false) {\n    if (!this._element) return true;\n\n    const boundingRect = this._element.getBoundingClientRect();\n\n    const parentRect = this._element.parentElement.getBoundingClientRect();\n\n    const offset = withinOffset ? 10 : 0;\n    if (boundingRect.bottom + offset < 100\n    /* parentRect.top */\n    ) return true;\n    if (boundingRect.top + offset > 300\n    /* parentRect.bottom */\n    ) return true;\n    return false;\n  }\n\n  SetNextRow(row) {\n    this._nextRow = row;\n  }\n\n  SetPrevRow(row) {\n    this._prevRow = row;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCRow.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCScrollBody.ts":
/*!****************************************!*\
  !*** ./src/OpenColumn/OCScrollBody.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCScrollBody)\n/* harmony export */ });\n/* harmony import */ var _OCRow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCRow */ \"./src/OpenColumn/OCRow.ts\");\n\nclass OCScrollBody {\n  constructor(api, options, dom, header) {\n    this._rows = [];\n    this._api = api;\n    this._options = options;\n    this._dom = dom;\n    this._header = header;\n    this.Scroll = this.Scroll.bind(this);\n    this.InitRows = this.InitRows.bind(this);\n    this.OnScroll = this.OnScroll.bind(this);\n    this.RowIsDrawn = this.RowIsDrawn.bind(this);\n    this.RegisterEvents = this.RegisterEvents.bind(this);\n    this.InitRows();\n    this.RegisterEvents();\n  }\n\n  RegisterEvents() {\n    this._dom.ScrollBody.addEventListener('wheel', this.OnScroll, {\n      passive: false\n    });\n  }\n\n  OnScroll(e) {\n    e.preventDefault();\n    this.Scroll(e.deltaX, e.deltaY);\n  }\n\n  Scroll(dX, dY) {\n    if (Math.abs(dX) <= (this._options?.sensX ?? 0)) dX = 0;\n    if (Math.abs(dY) <= (this._options?.sensY ?? 0)) dY = 0;\n\n    this._rows.forEach(f => {\n      f.Translate(dX, dY); // check out of bounds\n\n      if (f.OutOfView(true)) {\n        f.GetElement().remove(); // some browsers don't support index of apparently - screw  em for now :P\n\n        const index = this._rows.indexOf(f);\n\n        this._rows.splice(index, 1);\n      }\n    });\n\n    this._header.Translate(dX);\n  }\n\n  InitRows() {\n    const testHeight = 100;\n\n    const headerOptions = this._header.GetHeaderOptions();\n\n    const firstRow = new _OCRow__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n      api: this._api,\n      dom: this._dom,\n      rowIndex: 0,\n      headers: headerOptions\n    });\n    const firstRowElemet = firstRow.GetElement();\n\n    this._dom.ScrollBody.append(firstRowElemet);\n\n    this._rows.push(firstRow);\n\n    const rowToFill = Math.floor(testHeight / firstRowElemet.clientHeight);\n\n    for (let index = 1; index <= rowToFill; index++) {\n      const prevRow = this._rows[index - 1];\n      const newRow = new _OCRow__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        api: this._api,\n        dom: this._dom,\n        rowIndex: index,\n        headers: headerOptions,\n        prevRow: prevRow\n      });\n      const newRowEl = newRow.GetElement();\n\n      this._dom.ScrollBody.append(newRowEl);\n\n      prevRow.SetNextRow(newRow);\n\n      this._rows.push(newRow);\n    }\n  }\n\n  RowIsDrawn(row) {\n    const rowElement = typeof row === \"object\" ? row.GetElement() : this._rows.find(f => f.RowIndex === row).GetElement();\n    return this._dom.ScrollBody.contains(rowElement);\n  }\n\n  GetRow(index) {\n    return this._rows.find(f => f.RowIndex === index);\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCScrollBody.ts?");

/***/ }),

/***/ "./src/OpenColumn/OpenColumn.ts":
/*!**************************************!*\
  !*** ./src/OpenColumn/OpenColumn.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OpenColumn)\n/* harmony export */ });\n/* harmony import */ var _OCDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCDom */ \"./src/OpenColumn/OCDom.ts\");\n/* harmony import */ var _OCScrollBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCScrollBody */ \"./src/OpenColumn/OCScrollBody.ts\");\n/* harmony import */ var _OCDataHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OCDataHeader */ \"./src/OpenColumn/OCDataHeader.ts\");\n/* harmony import */ var _util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/HelperFunctions */ \"./src/util/HelperFunctions.ts\");\n\n\n\n\nclass OpenColumn {\n  constructor(options) {\n    this._options = options;\n    this.Init = this.Init.bind(this);\n    (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__.OnDomReady)(this.Init);\n  }\n\n  Init() {\n    if (!this._options) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__.Throw)(\"Cannot initialise without a configured set of options.\");\n    this._dom = new _OCDom__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._options.selector);\n    this._header = new _OCDataHeader__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, this._dom, this._options.headers);\n    this._scrollBody = new _OCScrollBody__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, this._options.scroller, this._dom, this._header);\n  }\n\n  GetRow(index) {\n    if (!this._scrollBody) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__.Throw)(\"Scrollbody is not initialised. Cannot access rows.\");\n    return this._scrollBody.GetRow(index);\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OpenColumn.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/index.scss */ \"./src/style/index.scss\");\n/* harmony import */ var _OpenColumn_OpenColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OpenColumn/OpenColumn */ \"./src/OpenColumn/OpenColumn.ts\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_OpenColumn_OpenColumn__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack://open-columns/./src/index.ts?");

/***/ }),

/***/ "./src/util/HelperFunctions.ts":
/*!*************************************!*\
  !*** ./src/util/HelperFunctions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OnDomReady\": () => (/* binding */ OnDomReady),\n/* harmony export */   \"Throw\": () => (/* binding */ Throw)\n/* harmony export */ });\nfunction OnDomReady(callback) {\n  document.readyState !== 'loading' ? callback() : document.addEventListener('DOMContentLoaded', callback);\n}\nfunction Throw(mesage) {\n  throw \"========================\\nOPEN COLUMNS: \" + mesage + \"\\n============================\";\n}\n\n//# sourceURL=webpack://open-columns/./src/util/HelperFunctions.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/index.scss":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/index.scss ***!
  \***************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".OC-Wrapper-Contaier {\\n  display: flex;\\n  flex-direction: column;\\n  overflow: hidden;\\n}\\n.OC-Wrapper-Contaier .OC-Headers-Container {\\n  min-height: 4px;\\n  background-color: rgb(197, 242, 242);\\n  display: flex;\\n}\\n.OC-Wrapper-Contaier .OC-Headers-Container .OC-Header-Cell {\\n  border-right: 1px solid rgb(40, 40, 40);\\n}\\n.OC-Wrapper-Contaier .OC-ScrollBody-Container {\\n  flex: 1;\\n  background-color: aliceblue;\\n  overflow: hidden;\\n  position: relative;\\n}\\n.OC-Wrapper-Contaier .OC-ScrollBody-Container .OC-ScrollBody-Row {\\n  position: absolute;\\n  display: flex;\\n  border-top: 1px dashed rgba(40, 40, 40, 0.3);\\n}\\n.OC-Wrapper-Contaier .OC-ScrollBody-Container .OC-ScrollBody-Row .OC-ScrollBody-Cell {\\n  border-right: 1px solid rgb(40, 40, 40);\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://open-columns/./src/style/index.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet%5B1%5D.rules%5B1%5D.use%5B2%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://open-columns/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://open-columns/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./index.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/index.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://open-columns/./src/style/index.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://open-columns/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://open-columns/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://open-columns/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://open-columns/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://open-columns/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://open-columns/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});