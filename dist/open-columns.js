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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCAttribute)\n/* harmony export */ });\nclass OCAttribute {}\nOCAttribute.TAGS = {};\nOCAttribute.CLASS = {\n  // Wrapper\n  Wrapper_Container: \"OC-Wrapper-Container\",\n  // Body\n  Body: \"OC-Body\",\n  // Header\n  Headers_Contaier: \"OC-Headers-Container\",\n  Header_Cell: \"OC-Header-Cell\",\n  // Scrollbody\n  ScrollBody_Container: \"OC-ScrollBody-Container\",\n  ScrollBody_Block: \"OC-ScrollBody-Block\",\n  ScrollBody_Block_Head: \"OC-ScrollBody-Block-Head\",\n  ScrollBody_Block_Body: \"OC-ScrollBody-Block-Body\",\n  ScrollBody_Row: \"OC-ScrollBody-Row\",\n  ScrollBody_Cell: \"OC-ScrollBody-Cell\",\n  // Scrollbars\n  ScrollBar: \"OC-ScrollBar\",\n  ScrollBar_Container: \"OC-ScrollBar-Container\",\n  ScrollBar_Vertical_Container: \"OC-ScrollBar-Vertical-Container\",\n  ScrollBar_Horizontal_Container: \"OC-ScrollBar-Horizontal-Container\",\n  ScrollBar_Bar: \"OC-ScrollBar-Bar\",\n  ScrollBar_ButtonStart: \"OC-ScrollBar-ButtonStart\",\n  ScrollBar_ButtonEnd: \"OC-ScrollBar-ButtonEnd\"\n};\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCAttribute.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCBlock.ts":
/*!***********************************!*\
  !*** ./src/OpenColumn/OCBlock.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCBlock)\n/* harmony export */ });\n/* harmony import */ var _util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/HelperFunctions */ \"./src/util/HelperFunctions.ts\");\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n/* harmony import */ var _OCRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OCRow */ \"./src/OpenColumn/OCRow.ts\");\n\n\n\nclass OCBlock {\n  constructor(api, header, dom, dataSource, drawIndex, rowCount) {\n    this._api = api;\n    this._header = header;\n    this._dom = dom;\n    this._drawIndex = drawIndex;\n    this._dataSource = dataSource;\n    this._rows = Array(rowCount).fill(null).map((m, i) => new _OCRow__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      index: i,\n      blockIndex: drawIndex,\n      api: this._api,\n      dom: this._dom,\n      header: this._header\n    }));\n    this.Draw = this.Draw.bind(this);\n    this.Append = this.Append.bind(this);\n    this.Prepend = this.Prepend.bind(this);\n    this.GetWidth = this.GetWidth.bind(this);\n    this.GetHeight = this.GetHeight.bind(this);\n    this.UpdateRect = this.UpdateRect.bind(this);\n    this.Translate = this.Translate.bind(this);\n    this.GetElement = this.GetElement.bind(this);\n    this.UpdateData = this.UpdateData.bind(this);\n    this.SetPosition = this.SetPosition.bind(this);\n    this.SetNextBlock = this.SetNextBlock.bind(this);\n    this.SetPrevBlock = this.SetPrevBlock.bind(this);\n    this.GetSimulatedRect = this.GetSimulatedRect.bind(this);\n    this.GetTranslatedCoords = this.GetTranslatedCoords.bind(this);\n    this.Draw();\n  }\n\n  Draw() {\n    if (!this._element) {\n      this._element = document.createElement('div');\n\n      this._element.append(...this._rows.map(m => m.GetElement()));\n\n      this._element.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBody_Block);\n\n      this.SetPosition(0, 0);\n    }\n  }\n\n  UpdateData(data) {\n    // Catch this in the response classes validation - not here\n    if (data.length > this._rows.length) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(`Too many rows of data puhed into the block, there are ${this._rows.length} rows. ${data.length} is too many.`);\n\n    this._rows.splice(data.length - 1, this._rows.length - data.length).forEach(row => row.Detatch());\n\n    this._rows.forEach((f, i) => f.Update(data[i], i)); // Update dom vals\n\n\n    this.UpdateRect();\n  }\n\n  Translate(dX, dY) {\n    const currentPos = this.GetTranslatedCoords();\n    const newX = currentPos.x + dX;\n    const newY = currentPos.y + dY;\n    this.SetPosition(newX, newY);\n  }\n\n  SetPosition(x, y) {\n    this._element.style.transform = `translate(${x}px, ${y}px)`;\n  }\n\n  GetTranslatedCoords() {\n    // Using replace to see if it is faster than new WebKitCSSMatrix(style.transform);\n    const brokenTranslate = this._element.style.transform.replace(\"translate(\", \"\").replaceAll(\"px\", \"\").replace(\")\", \"\").split(',');\n\n    return {\n      x: parseFloat(brokenTranslate[0]),\n      y: parseFloat(brokenTranslate[1])\n    };\n  }\n\n  GetHeight() {\n    return this._height;\n  }\n\n  GetWidth() {\n    return this._width;\n  }\n\n  SetNextBlock(block) {\n    this._nextBlock = block;\n  }\n\n  SetPrevBlock(block) {\n    this._prevBlock = block;\n  }\n\n  GetElement() {\n    return this._element;\n  }\n\n  Attatch(scrollBody, postLoadCallback) {\n    if (scrollBody.childElementCount) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(\"Can only use Attatch() to add a block to an empty scroll body.\");\n    scrollBody.append(this._element);\n\n    this._dataSource.GetData(this._drawIndex).then(res => {\n      this.UpdateData(res.data);\n      postLoadCallback(res.totalRowCount);\n    });\n  }\n\n  Append(prevBlock) {\n    // Create link refs\n    prevBlock.SetNextBlock(this);\n    this._prevBlock = prevBlock; // Set pos\n\n    const prevBlockHeight = prevBlock.GetElement().getBoundingClientRect().height;\n    const prevBlockPos = prevBlock.GetTranslatedCoords();\n\n    const currentX = this._header.GetX();\n\n    this.SetPosition(currentX, prevBlockHeight + prevBlockPos.y); // Add to dom\n\n    this._dom.ScrollBody.append(this._element);\n\n    this.UpdateRect(); // Fetch data - i think we can get away without shuffling\n\n    this._dataSource.GetData(this._drawIndex).then(res => this.UpdateData(res.data));\n  }\n\n  Prepend(nextBlock) {\n    // Create link\n    nextBlock.SetPrevBlock(this);\n    this._nextBlock = nextBlock; // Set position in scrollbody\n\n    const nextBlockPos = this._nextBlock.GetTranslatedCoords();\n\n    const currentX = this._header.GetX();\n\n    const simRect = this.GetSimulatedRect();\n    this.SetPosition(currentX, nextBlockPos.y - simRect.height); // Add to dom\n\n    this._dom.ScrollBody.prepend(this._element);\n\n    this.UpdateRect(); // Fetch data - shuffle upwards \n\n    this._dataSource.GetData(this._drawIndex).then(res => {\n      this.UpdateData(res.data);\n      this.ShuffleUp();\n    });\n  }\n\n  Detatch() {\n    this._rows.forEach(f => f.Detatch());\n\n    delete this._rows;\n\n    this._element.remove();\n  }\n\n  GetRow(index) {\n    return this._rows[index];\n  }\n\n  GetSimulatedRect() {\n    const simBlock = this._element.cloneNode(true);\n\n    simBlock.style.opacity = \"0 !important\"; // hopefully no crazy person overrides the class on the block\n\n    this._dom.ScrollBody.append(simBlock);\n\n    const rect = simBlock.getBoundingClientRect();\n\n    this._dom.ScrollBody.removeChild(simBlock);\n\n    return rect;\n  }\n\n  GetDrawIndex() {\n    return this._drawIndex;\n  } // This gets the blocks position in the table and makes sure it is not overlapping\n  // Call a shuffle when you know block size has been modified\n\n\n  ShuffleUp() {\n    if (!this._nextBlock) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(\"Cannot shuffle up as there is no block below the current block.\");\n\n    const nextBlockPos = this._nextBlock.GetTranslatedCoords();\n\n    const blockHeight = this._element.getBoundingClientRect().height;\n\n    this.SetPosition(nextBlockPos.x, nextBlockPos.y - blockHeight);\n    if (this._prevBlock) this._prevBlock.ShuffleUp();\n  }\n\n  UpdateRect() {\n    const currentRect = this._element.getBoundingClientRect();\n\n    this._width = currentRect.width;\n    this._height = currentRect.height;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCBlock.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCCell.ts":
/*!**********************************!*\
  !*** ./src/OpenColumn/OCCell.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCCell)\n/* harmony export */ });\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n\nclass OCCell {\n  constructor(api, header, row) {\n    this._headerCell = header;\n    this._row = row;\n    this._api = api;\n    this.Draw = this.Draw.bind(this);\n    this.GetData = this.GetData.bind(this);\n    this.GetElement = this.GetElement.bind(this);\n    this.Draw();\n  }\n\n  Draw() {\n    if (!this._element) {\n      this._element = document.createElement('div');\n\n      this._element.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CLASS.ScrollBody_Cell);\n    }\n\n    const rowData = this._row.GetData();\n\n    const headerOptions = this._headerCell.GetHeaderOptions();\n\n    this._rawCellData = rowData && headerOptions.propertyName ? rowData[headerOptions.propertyName] : \"\";\n    this._cellData = this._rawCellData;\n    if (headerOptions.preCellRender) this._cellData = headerOptions.preCellRender(this._rawCellData, this._row, this._api);\n    this._element.style.width = `${this._headerCell.GetDefaultWidth()}px`;\n    this._element.innerHTML = \"\";\n    this._element.textContent = `${this._cellData}`;\n  }\n\n  GetData() {\n    return this._cellData;\n  }\n\n  GetElement() {\n    return this._element;\n  }\n\n  GetHeader() {\n    return this._headerCell;\n  }\n\n  SetWidth(px) {\n    this._element.style.width = `${px}px`;\n  }\n\n  Detatch() {\n    this._element.remove();\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCCell.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCDataHeader.ts":
/*!****************************************!*\
  !*** ./src/OpenColumn/OCDataHeader.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCDataHeader)\n/* harmony export */ });\n/* harmony import */ var _OCDataHeaderCell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCDataHeaderCell */ \"./src/OpenColumn/OCDataHeaderCell.ts\");\n\nclass OCDataHeader {\n  constructor(api, dom, options) {\n    this._dom = dom;\n    this._api = api;\n    this._headerOptions = this.CreateHeaders(options);\n    this.Draw = this.Draw.bind(this);\n    this.GetHeaders = this.GetHeaders.bind(this);\n    this.Draw();\n  }\n\n  CreateHeaders(headerOptions) {\n    if (typeof headerOptions[0] === \"object\") return headerOptions;\n    return headerOptions.map(m => ({\n      propertyName: m,\n      displayName: m\n    }));\n  }\n\n  GetHeaders() {\n    return this._headerCells;\n  }\n\n  GetHeaderOptions() {\n    return this._headerOptions;\n  }\n\n  Draw() {\n    // Create/Append table header\n    this._headerCells = this._headerOptions.map(m => new _OCDataHeaderCell__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._api, m));\n\n    this._headerCells.map(m => m.Append(this._dom.Headers)); // Style\n\n\n    this._dom.Headers.style.transform = `translate(${0}px)`;\n  }\n\n  GetX() {\n    // using replace to see if it is faster than new WebKitCSSMatrix(style.transform).m41;\n    const brokenTranslate = this._dom.Headers.style.transform.replace(\"translate(\", \"\").replace(\"px\", \"\").replace(\")\", \"\");\n\n    return parseFloat(brokenTranslate);\n  }\n\n  Translate(dX) {\n    const newX = this.GetX() + dX;\n    this._dom.Headers.style.transform = `translate(${newX}px)`;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCDataHeader.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCDataHeaderCell.ts":
/*!********************************************!*\
  !*** ./src/OpenColumn/OCDataHeaderCell.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCDataHeaderCell)\n/* harmony export */ });\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n\nclass OCDataHeaderCell {\n  constructor(api, options) {\n    this._api = api;\n    this._options = options;\n    this.Draw = this.Draw.bind(this);\n    this.GetElement = this.GetElement.bind(this);\n    this.Draw();\n  }\n\n  GetElement() {\n    return this._element;\n  }\n\n  GetHeaderOptions() {\n    return this._options;\n  }\n\n  CanRender() {\n    return this._options.propertyName !== null || this._options.preCellRender;\n  }\n\n  Draw() {\n    if (!this._element) {\n      this._element = document.createElement('div');\n\n      this._element.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CLASS.Header_Cell);\n    }\n\n    this._element.innerHTML = \"\";\n\n    if (this._options.render) {\n      const customRender = this._options.render(this._api);\n\n      if (typeof customRender === \"string\") this._element.innerHTML = customRender;else this._element.append(customRender);\n      return;\n    }\n\n    this._element.textContent = this._options.displayName;\n  }\n\n  SetWidth(px) {\n    this._element.style.width = `${px}px`;\n  }\n\n  Append(row) {\n    row.append(this._element);\n    this.PostAttatch();\n  }\n\n  PostAttatch() {\n    this._defaultWidth = this._element.getBoundingClientRect().width;\n    this._element.style.width = `${this._defaultWidth}px`;\n  }\n\n  GetDefaultWidth() {\n    return this._defaultWidth;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCDataHeaderCell.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCDataSource.ts":
/*!****************************************!*\
  !*** ./src/OpenColumn/OCDataSource.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCDataSource)\n/* harmony export */ });\n/* harmony import */ var _util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/HelperFunctions */ \"./src/util/HelperFunctions.ts\");\n\nclass OCDataSource {\n  constructor(api, options, blockSize, scrollBody) {\n    this._api = api;\n    this._options = options;\n    this._blockSize = blockSize;\n    this._scrollBody = scrollBody;\n    this.ValidateDataSource = this.ValidateDataSource.bind(this);\n    this.ValidateDataSource();\n  }\n\n  ValidateDataSource() {\n    if (this._options.serverSide && !this._options.serverOptions) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(\"Could not find server side configuration.\");\n    if (!this._options.serverSide && !this._options.clientData) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(\"Could not find client data for client side configuration.\");\n    if (this._options.clientData && this._options.serverOptions) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Warn)(`Both client side and server side data configurations were found - using ${this._options.serverSide ? \"server\" : \"client\"} side data.`);\n  }\n\n  async GetData(drawIndex) {\n    if (this._options.serverSide) return await this.LoadServerSideData(drawIndex);else return this.GetClientSideData(drawIndex);\n  }\n\n  async LoadServerSideData(drawIndex) {\n    const requestOpts = this._options.serverOptions;\n    let request = {\n      refreshFilters: false,\n      skip: drawIndex,\n      take: this._blockSize\n    };\n    if (requestOpts.preRequest) request = requestOpts.preRequest(request, this._api);\n    let data;\n    if (requestOpts.overrideRequest) data = await requestOpts.overrideRequest();else {\n      const requestBody = this.GetServerSideBody(drawIndex);\n      const request = new Request(requestOpts?.url, {\n        method: requestOpts?.method,\n        headers: requestOpts?.headers,\n        body: requestBody\n      });\n      const result = await fetch(request);\n      data = await result.json();\n    } // TODO: Maybe add a warning here if they mess with the skip/take pos\n\n    if (requestOpts.postRequest) data = requestOpts.postRequest(data, this._api);\n    return data;\n  }\n\n  GetClientSideData(drawIndex) {\n    const skip = drawIndex * this._blockSize;\n    const data = this._options.clientData?.slice(skip, skip + this._blockSize) ?? [];\n    return {\n      data,\n      totalRowCount: this._options.clientData?.length ?? 0,\n      skip\n    };\n  }\n\n  GetServerSideBody(drawIndex) {\n    const body = new FormData();\n    body.append((0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.NameOf)(\"skip\"), drawIndex.toString());\n    body.append((0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.NameOf)(\"take\"), this._blockSize.toString()); // TODO: Fitler stuff - ages away yet\n    // body.append(NameOf<OCDataRequest>(\"refreshFilters\"), )\n\n    return body;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCDataSource.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCDom.ts":
/*!*********************************!*\
  !*** ./src/OpenColumn/OCDom.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCDom)\n/* harmony export */ });\n/* harmony import */ var _util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/HelperFunctions */ \"./src/util/HelperFunctions.ts\");\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n\n\nclass OCDom {\n  constructor(selector) {\n    this.Wrapper = typeof selector === \"object\" ? selector : document.querySelector(selector);\n    if (!this.Wrapper) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(\"Could not initialise dom as the selector was not found.\");\n    this.Body = document.createElement('div');\n    this.Headers = document.createElement('div');\n    this.ScrollBody = document.createElement('div');\n    this.VerticalScrollBar = document.createElement('div');\n    this.HorizontalScrollBar = document.createElement('div');\n    this.Wrapper.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.Wrapper_Container);\n    this.Body.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.Body);\n    this.Headers.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.Headers_Contaier);\n    this.ScrollBody.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBody_Container);\n    this.VerticalScrollBar.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBar_Vertical_Container);\n    this.HorizontalScrollBar.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBar_Horizontal_Container);\n    this.Body.append(this.ScrollBody, this.VerticalScrollBar);\n    this.Wrapper.append(this.Headers, this.Body, this.HorizontalScrollBar);\n    this._scrollBodyOffset = this.ScrollBody.getBoundingClientRect().y;\n  }\n\n  IsInitialised() {\n    return this.Wrapper && this.Headers && this.ScrollBody;\n  }\n\n  GetScrollDOMTop() {\n    return this._scrollBodyOffset;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCDom.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCHorizontalScrollBar.ts":
/*!*************************************************!*\
  !*** ./src/OpenColumn/OCHorizontalScrollBar.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCHorizontalScrollBar)\n/* harmony export */ });\n/* harmony import */ var _OCScrollBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCScrollBar */ \"./src/OpenColumn/OCScrollBar.ts\");\n\nclass OCHorizontalScrollBar extends _OCScrollBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(api, dom, header) {\n    super(api, dom, dom.HorizontalScrollBar);\n    this._header = header;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCHorizontalScrollBar.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCRow.ts":
/*!*********************************!*\
  !*** ./src/OpenColumn/OCRow.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCRow)\n/* harmony export */ });\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n/* harmony import */ var _OCCell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCCell */ \"./src/OpenColumn/OCCell.ts\");\n\n\nclass OCRow {\n  constructor(options) {\n    this._cells = [];\n    this._api = options.api;\n    this._data = options.data;\n    this._index = options.index;\n    this._header = options.header;\n    this._blockIndex = options.blockIndex;\n    this._nextRow = options.nextRow;\n    this._prevRow = options.prevRow;\n    this.Draw = this.Draw.bind(this);\n    this.Update = this.Update.bind(this);\n    this.GetData = this.GetData.bind(this);\n    this.GetElement = this.GetElement.bind(this);\n    this.SetNextRow = this.SetNextRow.bind(this);\n    this.SetPrevRow = this.SetPrevRow.bind(this);\n    this.Draw(true);\n  }\n\n  GetElement() {\n    return this._element;\n  }\n\n  Draw(refresh = false) {\n    if (!this._element) {\n      this._element = document.createElement('div');\n\n      this._element.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CLASS.ScrollBody_Row);\n    }\n\n    if (refresh) {\n      this._cells = [];\n      this._element.innerHTML = \"\"; // Maybe do this filtering as an option on for the GetHeaderOptions method\n\n      this._header.GetHeaders().filter(f => f.CanRender()).forEach(header => {\n        const cell = new _OCCell__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this._api, header, this);\n        const cellElement = cell.GetElement();\n        const headerOptions = header.GetHeaderOptions();\n\n        this._element.append(cellElement);\n\n        if (headerOptions.postCellRender) // hmmm maybe this should be moved to the end idk what people would use this for \n          headerOptions.postCellRender(cellElement, cell.GetData(), this._data, this._api);\n\n        this._cells.push(cell);\n      });\n    } else {\n      if (this._cells.length === 0) return;\n\n      this._cells.forEach(f => f.Draw());\n    }\n  }\n\n  Update(data, rowIndex) {\n    this._data = data;\n    this._index = rowIndex;\n    this.Draw();\n  }\n\n  GetData() {\n    return this._data;\n  }\n\n  SetNextRow(row) {\n    this._nextRow = row;\n  }\n\n  SetPrevRow(row) {\n    this._prevRow = row;\n  }\n\n  GetRowIndex() {\n    return this._index;\n  }\n\n  GetBlockIndex() {\n    return this._blockIndex;\n  }\n\n  GetCells() {\n    return this._cells;\n  }\n\n  Detatch() {\n    this._cells.forEach(f => f.Detatch());\n\n    delete this._cells;\n\n    this._element.remove();\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCRow.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCScrollBar.ts":
/*!***************************************!*\
  !*** ./src/OpenColumn/OCScrollBar.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCScrollBar)\n/* harmony export */ });\n/* harmony import */ var _util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/HelperFunctions */ \"./src/util/HelperFunctions.ts\");\n/* harmony import */ var _OCAttribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCAttribute */ \"./src/OpenColumn/OCAttribute.ts\");\n\n\nclass OCScrollBar {\n  constructor(api, dom, domContainer) {\n    this._api = api;\n    this._dom = dom;\n    this._container = domContainer;\n    this.Init = this.Init.bind(this);\n    this.TranslateBar = this.TranslateBar.bind(this);\n    this.GetTranslatedBarCoords = this.GetTranslatedBarCoords.bind(this);\n    this.Init();\n  }\n\n  Init() {\n    if (!this._container) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_0__.Throw)(\"Cannot create scrollbar as the container is not initialised.\");\n    this._barContainer = document.createElement('div');\n    this._barElement = document.createElement('div');\n    this._buttonStart = document.createElement('div');\n    this._buttonEnd = document.createElement('div');\n    this._barElement.style.transform = `translate(${0}px, ${0}px)`;\n\n    this._container.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBar);\n\n    this._barContainer.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBar_Container);\n\n    this._barElement.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBar_Bar);\n\n    this._buttonStart.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBar_ButtonStart);\n\n    this._buttonEnd.classList.add(_OCAttribute__WEBPACK_IMPORTED_MODULE_1__[\"default\"].CLASS.ScrollBar_ButtonEnd);\n\n    this._barContainer.append(this._barElement);\n\n    this._container.append(this._buttonStart, this._barContainer, this._buttonEnd);\n\n    const barStyle = window.getComputedStyle(this._container);\n    this._isVertical = barStyle.flexDirection.includes(\"column\") || barStyle.direction.includes(\"column\");\n  }\n\n  TranslateBar(delta) {\n    const pos = this.GetTranslatedBarCoords();\n    let newPos = this._isVertical ? pos.x + delta : pos.y + delta;\n\n    const contRect = this._barContainer.getBoundingClientRect();\n\n    const maxBound = this._isVertical ? contRect.height : contRect.width;\n    if (newPos <= 0) newPos = 0;\n    if (newPos >= maxBound) newPos = maxBound; //this._barElement.style.transform = `translate(${this._}px, ${pos.y + dY}px)`;\n  }\n\n  GetTranslatedBarCoords() {\n    // TODO: maybe move to a shared method...used elsewhere :)\n    // Using replace to see if it is faster than new WebKitCSSMatrix(style.transform);\n    const brokenTranslate = this._barElement.style.transform.replace(\"translate(\", \"\").replaceAll(\"px\", \"\").replace(\")\", \"\").split(',');\n\n    return {\n      x: parseFloat(brokenTranslate[0]),\n      y: parseFloat(brokenTranslate[1])\n    };\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCScrollBar.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCScrollBody.ts":
/*!****************************************!*\
  !*** ./src/OpenColumn/OCScrollBody.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCScrollBody)\n/* harmony export */ });\n/* harmony import */ var _OCBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCBlock */ \"./src/OpenColumn/OCBlock.ts\");\n/* harmony import */ var _OCHorizontalScrollBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCHorizontalScrollBar */ \"./src/OpenColumn/OCHorizontalScrollBar.ts\");\n/* harmony import */ var _OCVerticalScrollBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OCVerticalScrollBar */ \"./src/OpenColumn/OCVerticalScrollBar.ts\");\n\n\n\nclass OCScrollBody {\n  constructor(api, options, dom, header, dataSource) {\n    this._blocks = [];\n    this._blockSize = 100;\n    this._scrollLocked = true;\n    this._api = api;\n    this._options = options;\n    this._dom = dom;\n    this._header = header;\n    this._dataSource = dataSource;\n    this.Init = this.Init.bind(this);\n    this.Scroll = this.Scroll.bind(this);\n    this.GetRow = this.GetRow.bind(this);\n    this.OnScroll = this.OnScroll.bind(this);\n    this.LockScroll = this.LockScroll.bind(this);\n    this.UnlockScroll = this.UnlockScroll.bind(this);\n    this.RegisterEvents = this.RegisterEvents.bind(this);\n    this.Init();\n    this.RegisterEvents();\n  }\n\n  RegisterEvents() {\n    this._dom.ScrollBody.addEventListener('wheel', this.OnScroll, {\n      passive: false\n    });\n  }\n\n  OnScroll(e) {\n    e.preventDefault();\n    this.Scroll(e.deltaX, e.deltaY * -1); // invert scroll here if user wants that\n  }\n\n  LockScroll() {\n    this._scrollLocked = true;\n  }\n\n  UnlockScroll() {\n    this._scrollLocked = false;\n  }\n\n  IsLocked() {\n    return this._scrollLocked;\n  }\n\n  Scroll(dX, dY) {\n    if (this._scrollLocked) return;\n    const absDX = Math.abs(dX);\n    const absDY = Math.abs(dY);\n    if (absDX <= (this._options?.sensX ?? 0)) dX = 0;\n    if (absDY <= (this._options?.sensY ?? 0)) dY = 0; // Sorta scroll lock to make it feel more blocky\n    // should allow disabling of this \n\n    if (absDX > absDY) dY = 0;else dX = 0; // Hard limits here for scrollbody - TODO: should change to a nice smooth bounce animation\n    // if you try to scrol out of bounds to make it feel more responsive, obviously can disable\n    // in options.\n\n    const currentX = this._header.GetX();\n\n    const diff = currentX + dX;\n    if (diff < 0) dX -= diff; // might be faster to store this top one as a reference even if it is removed from the array \n\n    const topBlock = this._blocks.find(f => f.GetDrawIndex() === 0);\n\n    if (topBlock) {\n      const coords = topBlock.GetTranslatedCoords();\n      const diff = coords.y + dY;\n      if (diff > 0) dY -= diff;\n    }\n\n    const bottomBlock = this._blocks.find(f => f.GetDrawIndex() === this._blockLimit);\n\n    if (bottomBlock) {\n      const blockHeight = bottomBlock.GetHeight();\n      const bottomY = bottomBlock.GetTranslatedCoords().y + blockHeight;\n\n      const scrollBodyHeight = this._dom.ScrollBody.getBoundingClientRect().height;\n\n      const diff = scrollBodyHeight - (bottomY + dY);\n\n      if (diff > 0) {\n        dY += diff;\n      }\n    } // may as well return early if both have been adjusted to a 0 delta\n\n\n    if (dX === 0 && dY === 0) return;\n\n    this._header.Translate(dX);\n\n    this._blocks.forEach(block => {\n      // Move row based on scroll\n      block.Translate(dX, dY);\n    });\n\n    if (dY === 0) return;\n    if (Math.abs(dY) > this._dyLimit) dY = dY < 0 ? -this._dyLimit : this._dyLimit;\n    this.UpdateBody(dY);\n  }\n\n  Init() {\n    // Set bounds\n    // TODO: Set these bounds based on the average row/block height\n    // so that users can base it around blocks\n    this._horizontalScrollbar = new _OCHorizontalScrollBar__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this._api, this._dom, this._header);\n\n    const scrollBodyRect = this._dom.ScrollBody.getBoundingClientRect();\n\n    const scrollHeight = scrollBodyRect.height; // Draw initial block\n\n    const block = new _OCBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._api, this._header, this._dom, this._dataSource, 0, this._blockSize);\n    block.Attatch(this._dom.ScrollBody, totalRowCount => {\n      this.UnlockScroll();\n      this._blockLimit = (totalRowCount - totalRowCount % this._blockSize) / this._blockSize;\n      this._verticalScrollbar = new _OCVerticalScrollBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this._api, this._dom, totalRowCount, 40);\n    });\n\n    this._blocks.push(block); // at setting bounds to 2 x scrollbody height above and below\n    // TODO: in future take which ever number is greater, scrollbody height or \n    // block height\n\n\n    this._bound = block.GetElement().clientHeight + scrollHeight;\n    this._dyLimit = Math.ceil(scrollBodyRect.height);\n  }\n\n  GetRow(blockIndex, index) {\n    return this._blocks[blockIndex].GetRow(index);\n  } // Append/prepend and remove blocks based on scroll direction\n  // Get current block position that is in the middle of the exisitng blocks\n  // Just thinking, can possibly speed this up if you take into account the scroll amount and the size of each block \n  // and check to calculate if we should do an out of pos check \n  // not sure tho\n\n\n  UpdateBody(dY) {\n    const isScrollingDown = dY < 0;\n    const upperBlockIndex = 0;\n    const lowerBlockIndex = this._blocks.length - 1;\n    const upperBlock = this._blocks[upperBlockIndex];\n    const lowerBlock = this._blocks[lowerBlockIndex];\n    const upperBlockPos = upperBlock.GetTranslatedCoords();\n    const lowerBlockPos = lowerBlock.GetTranslatedCoords();\n    let modified = false; // TODO: Add render limits, no need to render before draw index 0 etc\n\n    if (isScrollingDown) // scroll down\n      {\n        if (upperBlockPos.y < -this._bound) {\n          this._blocks.splice(upperBlockIndex, 1);\n\n          upperBlock.Detatch();\n          modified = true;\n        }\n\n        const newBlockIndex = lowerBlock.GetDrawIndex() + 1;\n\n        if (newBlockIndex <= this._blockLimit && lowerBlockPos.y < this._bound) {\n          const newBlock = new _OCBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._api, this._header, this._dom, this._dataSource, newBlockIndex, this._blockSize);\n          lowerBlock.SetNextBlock(newBlock);\n          newBlock.Append(lowerBlock);\n\n          this._blocks.push(newBlock);\n\n          modified = true;\n        }\n      } else // scroll up\n      {\n        if (lowerBlockPos.y > this._bound) {\n          this._blocks.splice(lowerBlockIndex, 1);\n\n          lowerBlock.Detatch();\n          modified = true;\n        }\n\n        const newBlockIndex = upperBlock.GetDrawIndex() - 1;\n\n        if (newBlockIndex >= 0 && upperBlockPos.y > -this._bound) {\n          const newBlock = new _OCBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._api, this._header, this._dom, this._dataSource, newBlockIndex, this._blockSize);\n          newBlock.Prepend(upperBlock);\n          upperBlock.SetPrevBlock(newBlock);\n\n          this._blocks.unshift(newBlock);\n\n          modified = true;\n        }\n      } // If the body is modified then check again for further changes\n\n\n    if (modified) this.UpdateBody(dY);\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCScrollBody.ts?");

/***/ }),

/***/ "./src/OpenColumn/OCVerticalScrollBar.ts":
/*!***********************************************!*\
  !*** ./src/OpenColumn/OCVerticalScrollBar.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OCVerticalScrollBar)\n/* harmony export */ });\n/* harmony import */ var _OCScrollBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCScrollBar */ \"./src/OpenColumn/OCScrollBar.ts\");\n\nclass OCVerticalScrollBar extends _OCScrollBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(api, dom, totalRowCount, avgRowHeight) {\n    super(api, dom, dom.VerticalScrollBar);\n    this._totalRowCount = totalRowCount;\n    this._avgRowHeight = avgRowHeight;\n    this.OnMouseUp = this.OnMouseUp.bind(this);\n    this.OnMouseMove = this.OnMouseMove.bind(this);\n    this.OnMouseDown = this.OnMouseDown.bind(this);\n    this.RegisterEvents = this.RegisterEvents.bind(this);\n    this.RegisterEvents();\n  }\n\n  RegisterEvents() {\n    this._barElement.addEventListener('mousedown', this.OnMouseDown);\n\n    window.addEventListener('mouseup', this.OnMouseUp);\n    window.addEventListener('mousemove', this.OnMouseMove);\n  }\n\n  OnMouseDown(e) {\n    this._isDragging = true;\n  }\n\n  OnMouseUp(e) {\n    if (!this._isDragging) return;\n    this._isDragging = false;\n  }\n\n  OnMouseMove(e) {\n    if (!this._isDragging) return;\n    this.TranslateBar(0, e.movementY);\n  }\n\n  SetAverageRowHeight(average) {\n    this._avgRowHeight = average;\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OCVerticalScrollBar.ts?");

/***/ }),

/***/ "./src/OpenColumn/OpenColumn.ts":
/*!**************************************!*\
  !*** ./src/OpenColumn/OpenColumn.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OpenColumn)\n/* harmony export */ });\n/* harmony import */ var _OCDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OCDom */ \"./src/OpenColumn/OCDom.ts\");\n/* harmony import */ var _OCScrollBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OCScrollBody */ \"./src/OpenColumn/OCScrollBody.ts\");\n/* harmony import */ var _OCDataHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OCDataHeader */ \"./src/OpenColumn/OCDataHeader.ts\");\n/* harmony import */ var _util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/HelperFunctions */ \"./src/util/HelperFunctions.ts\");\n/* harmony import */ var _OCDataSource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OCDataSource */ \"./src/OpenColumn/OCDataSource.ts\");\n\n\n\n\n\nclass OpenColumn {\n  constructor(options) {\n    this._options = options;\n    this.Init = this.Init.bind(this);\n    (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__.OnDomReady)(this.Init);\n  }\n\n  Init() {\n    if (!this._options) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__.Throw)(\"Cannot initialise without a configured set of options.\");\n    this._dom = new _OCDom__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._options.selector);\n    this._header = new _OCDataHeader__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, this._dom, this._options.headers);\n    this._dataSource = new _OCDataSource__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this, this._options.dataSource, 100, this._scrollBody);\n    this._scrollBody = new _OCScrollBody__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, this._options.scroller, this._dom, this._header, this._dataSource);\n  }\n\n  GetRow(blockIndex, index) {\n    if (!this._scrollBody) (0,_util_HelperFunctions__WEBPACK_IMPORTED_MODULE_3__.Throw)(\"Scrollbody is not initialised. Cannot access rows.\");\n    return this._scrollBody.GetRow(blockIndex, index);\n  }\n\n}\n\n//# sourceURL=webpack://open-columns/./src/OpenColumn/OpenColumn.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NameOf\": () => (/* binding */ NameOf),\n/* harmony export */   \"OnDomReady\": () => (/* binding */ OnDomReady),\n/* harmony export */   \"Throw\": () => (/* binding */ Throw),\n/* harmony export */   \"Warn\": () => (/* binding */ Warn)\n/* harmony export */ });\nfunction OnDomReady(callback) {\n  document.readyState !== 'loading' ? callback() : document.addEventListener('DOMContentLoaded', callback);\n}\nfunction Throw(message) {\n  throw \"========================\\nOPEN COLUMNS ERROR: \" + message + \"\\n============================\";\n}\nfunction Warn(message) {\n  console.warn(\"========================\\nOPEN COLUMNS WARNING: \" + message + \"\\n============================\");\n}\nfunction NameOf(f) {\n  return f;\n}\n\n//# sourceURL=webpack://open-columns/./src/util/HelperFunctions.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/index.scss":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/index.scss ***!
  \***************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".OC-Wrapper-Container {\\n  display: flex;\\n  flex-direction: column;\\n  overflow: hidden;\\n}\\n.OC-Wrapper-Container .OC-Headers-Container {\\n  min-height: 4px;\\n  background-color: rgb(197, 242, 242);\\n  display: flex;\\n}\\n.OC-Wrapper-Container .OC-Headers-Container .OC-Header-Cell {\\n  border-right: 1px solid rgb(40, 40, 40);\\n}\\n.OC-Wrapper-Container .OC-Body {\\n  display: flex;\\n  flex-direction: row;\\n  flex: 1;\\n  user-select: none;\\n}\\n.OC-Wrapper-Container .OC-Body .OC-ScrollBody-Container {\\n  flex: 1;\\n  background-color: aliceblue;\\n  overflow: hidden;\\n  position: relative;\\n}\\n.OC-Wrapper-Container .OC-Body .OC-ScrollBody-Container .OC-ScrollBody-Block {\\n  position: absolute;\\n}\\n.OC-Wrapper-Container .OC-Body .OC-ScrollBody-Container .OC-ScrollBody-Block .OC-ScrollBody-Block-Head {\\n  height: 0px;\\n}\\n.OC-Wrapper-Container .OC-Body .OC-ScrollBody-Container .OC-ScrollBody-Block .OC-ScrollBody-Block-Head th {\\n  height: 0px;\\n}\\n.OC-Wrapper-Container .OC-Body .OC-ScrollBody-Container .OC-ScrollBody-Block .OC-ScrollBody-Row {\\n  display: flex;\\n  border-top: 1px dashed rgba(40, 40, 40, 0.3);\\n}\\n.OC-Wrapper-Container .OC-Body .OC-ScrollBody-Container .OC-ScrollBody-Block .OC-ScrollBody-Row .OC-ScrollBody-Cell {\\n  border-right: 1px solid rgb(40, 40, 40);\\n  overflow: hidden;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar {\\n  display: flex;\\n  background-color: beige;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar .OC-ScrollBar-Container {\\n  flex: 1;\\n  position: relative;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar .OC-ScrollBar-Container .OC-ScrollBar-Bar {\\n  position: absolute;\\n  background-color: black;\\n  border-radius: 2em;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Vertical-Container {\\n  flex-direction: column;\\n  width: 10px;\\n  height: 100%;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Vertical-Container .OC-ScrollBar-Bar {\\n  height: 50px;\\n  width: 100%;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Vertical-Container .OC-ScrollBar-ButtonStart,\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Vertical-Container .OC-ScrollBar-ButtonEnd {\\n  height: 20px;\\n  width: 100%;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Horizontal-Container {\\n  flex-direction: row;\\n  width: 100%;\\n  height: 10px;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Horizontal-Container .OC-ScrollBar-Bar {\\n  width: 50px;\\n  height: 100%;\\n}\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Horizontal-Container .OC-ScrollBar-ButtonStart,\\n.OC-Wrapper-Container .OC-ScrollBar.OC-ScrollBar-Horizontal-Container .OC-ScrollBar-ButtonEnd {\\n  width: 20px;\\n  height: 100%;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://open-columns/./src/style/index.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet%5B1%5D.rules%5B1%5D.use%5B2%5D");

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