"use strict";

const { cwd } = require("process");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Service2 = _interopRequireDefault(require("./Service"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _csvParser = _interopRequireDefault(require("csv-parser"));
var _fs = _interopRequireDefault(require("fs"));
var _excluded = ["images", "isSize"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
//const fs = require('fs').promises;
var MenuService = /*#__PURE__*/function (_Service) {
  _inherits(MenuService, _Service);
  var _super = _createSuper(MenuService);
  function MenuService(model) {
    var _this;
    _classCallCheck(this, MenuService);
    _this = _super.call(this, model);
    _this.createMenu = _this.createMenu.bind(_assertThisInitialized(_this));
    _this.getAllMenu = _this.getAllMenu.bind(_assertThisInitialized(_this));
    _this.getSingleMenu = _this.getSingleMenu.bind(_assertThisInitialized(_this));
    _this.addReview = _this.addReview.bind(_assertThisInitialized(_this));
    _this.getRestaurantMenu = _this.getRestaurantMenu.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(MenuService, [{
    key: "dataUpdate",
    value: function () {
      var _dataUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this2 = this;
        var items, _iterator, _step, _loop;
        return _regeneratorRuntime().wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return this.model.find().select(['-password']);
            case 3:
              items = _context3.sent;
              //.sort({ createdAt: -1 });
              //let index = 0;
              _iterator = _createForOfIteratorHelper(items);
              _context3.prev = 5;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var x, images, data;
                return _regeneratorRuntime().wrap(function _loop$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      x = _step.value;
                      // var x = items;
                      //if (index == 0) {
                      images = x.images.map( /*#__PURE__*/function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(image) {
                          var imageString, base64Data, str, base64RegExp, isBase64, imageName, newImage;
                          return _regeneratorRuntime().wrap(function _callee$(_context) {
                            while (1) switch (_context.prev = _context.next) {
                              case 0:
                                imageString = image;
                                base64Data = imageString.replace(/^data:image\/png;base64,/, "");
                                str = base64Data;
                                base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/; // const base64RegExp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
                                isBase64 = base64RegExp.test(str);
                                console.log('isBase64', isBase64);
                                if (!isBase64) {
                                  _context.next = 15;
                                  break;
                                }
                                imageName = "images/menu_".concat(x._id, "_image.png");
                                console.log(imageName);
                                _context.next = 11;
                                return _fs["default"].writeFile(imageName, base64Data, 'base64');
                              case 11:
                                newImage = _context.sent;
                                return _context.abrupt("return", imageName);
                              case 15:
                                return _context.abrupt("return", image.replace("https://api.pootatos.com/", ""));
                              case 16:
                              case "end":
                                return _context.stop();
                            }
                          }, _callee);
                        }));
                        return function (_x) {
                          return _ref.apply(this, arguments);
                        };
                      }());
                      _context2.next = 4;
                      return Promise.all(images);
                    case 4:
                      data = _context2.sent;
                      _context2.next = 7;
                      return _this2.model.findByIdAndUpdate(x._id, {
                        images: data
                      });
                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }, _loop);
              });
              _iterator.s();
            case 8:
              if ((_step = _iterator.n()).done) {
                _context3.next = 12;
                break;
              }
              return _context3.delegateYield(_loop(), "t0", 10);
            case 10:
              _context3.next = 8;
              break;
            case 12:
              _context3.next = 17;
              break;
            case 14:
              _context3.prev = 14;
              _context3.t1 = _context3["catch"](5);
              _iterator.e(_context3.t1);
            case 17:
              _context3.prev = 17;
              _iterator.f();
              return _context3.finish(17);
            case 20:
              return _context3.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                // total,
                data: items
              });
            case 23:
              _context3.prev = 23;
              _context3.t2 = _context3["catch"](0);
              return _context3.abrupt("return", {
                error: true,
                message: _context3.t2.message,
                statusCode: 400,
                data: null
              });
            case 26:
            case "end":
              return _context3.stop();
          }
        }, _callee2, this, [[0, 23], [5, 14, 17, 20]]);
      }));
      function dataUpdate() {
        return _dataUpdate.apply(this, arguments);
      }
      return dataUpdate;
    }()
  }, {
    key: "createMenu",
    value: function () {
      var _createMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req) {
        var _req$body, images, isSize, rest, imagesData, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body = req.body, images = _req$body.images, isSize = _req$body.isSize, rest = _objectWithoutProperties(_req$body, _excluded);
              if (isSize === false) {
                rest.sizes = null;
              }
              imagesData = images.map(function (item) {
                var imageString = item;
                var base64Data = imageString.replace(/^data:image\/png;base64,/, "");
                // Store Image into Server
                var d = new Date();
                var text = d.toString();
                var javaScriptRelease = Date.parse(d);
                var imageName = "images/xxxxmenu_".concat(javaScriptRelease, "_image.png");
                _fs["default"].chmod(imageName, 511, function () {
                  _fs["default"].writeFile(imageName, base64Data, 'base64', function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('coverted');
                    }
                  });
                });
                return imageName;
              });
              _context4.next = 6;
              return Promise.all(imagesData);
            case 6:
              rest.images = _context4.sent;
              rest.availability = true;
              rest.delivery = true;
              _context4.next = 11;
              return this.model.create(rest);
            case 11:
              data = _context4.sent;
              return _context4.abrupt("return", {
                error: false,
                message: "sucess",
                statusCode: 200,
                data: data
              });
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", {
                error: true,
                message: _context4.t0.message,
                statusCode: 400,
                data: null
              });
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee3, this, [[0, 15]]);
      }));
      function createMenu(_x2) {
        return _createMenu.apply(this, arguments);
      }
      return createMenu;
    }()
  }, {
    key: "insertCsvData",
    value: function () {
      var _insertCsvData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req) {
        var _this3 = this;
        var results, data;
        return _regeneratorRuntime().wrap(function _callee5$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return parseCsvData(req.file.path);
            case 3:
              results = _context6.sent;
              _context6.next = 6;
              return Promise.all(results.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(element) {
                  return _regeneratorRuntime().wrap(function _callee4$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        element.isSize = false;
                        _context5.next = 3;
                        return _this3.model.create(element);
                      case 3:
                        return _context5.abrupt("return", _context5.sent);
                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee4);
                }));
                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 6:
              data = _context6.sent;
              return _context6.abrupt("return", {
                error: false,
                message: 'Successfully inserted data',
                statusCode: 201,
                data: data
              });
            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", {
                error: true,
                message: _context6.t0.message,
                statusCode: 400,
                data: null
              });
            case 13:
            case "end":
              return _context6.stop();
          }
        }, _callee5, null, [[0, 10]]);
      }));
      function insertCsvData(_x3) {
        return _insertCsvData.apply(this, arguments);
      }
      return insertCsvData;
    }()
  }, {
    key: "addReview",
    value: function () {
      var _addReview = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req) {
        var id, item, customerId, existingReview, data, averageRating;
        return _regeneratorRuntime().wrap(function _callee6$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              id = req.params.id;
              item = req.body;
              customerId = item.customer;
              _context7.prev = 3;
              _context7.next = 6;
              return this.model.findOne({
                _id: id,
                'reviews.customer': customerId
              });
            case 6:
              existingReview = _context7.sent;
              if (!existingReview) {
                _context7.next = 9;
                break;
              }
              return _context7.abrupt("return", {
                error: true,
                message: 'You have already submitted a review for this item.',
                statusCode: 400,
                data: null
              });
            case 9:
              _context7.next = 11;
              return this.model.findByIdAndUpdate(id, {
                $push: {
                  reviews: item
                }
              }, {
                "new": true
              });
            case 11:
              data = _context7.sent;
              // Calculate the average rating
              averageRating = calculateAverageRating(data.reviews);
              data.averageRating = averageRating.toFixed(1);
              _context7.next = 16;
              return this.model.findByIdAndUpdate(id, {
                averageRating: data.averageRating
              }, {
                "new": true
              });
            case 16:
              return _context7.abrupt("return", {
                error: false,
                message: 'successfully updated',
                statusCode: 200,
                data: data
              });
            case 19:
              _context7.prev = 19;
              _context7.t0 = _context7["catch"](3);
              return _context7.abrupt("return", {
                error: true,
                message: _context7.t0.message,
                statusCode: 400,
                data: null
              });
            case 22:
            case "end":
              return _context7.stop();
          }
        }, _callee6, this, [[3, 19]]);
      }));
      function addReview(_x5) {
        return _addReview.apply(this, arguments);
      }
      return addReview;
    }()
  }, {
    key: "getAllMenu",
    value: function () {
      
      var _getAllMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(query) {
        var skip, limit, items, total;
        return _regeneratorRuntime().wrap(function _callee7$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              skip = query.skip, limit = query.limit;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              query.deleted = {
                $ne: true
              };
              _context8.prev = 7;
              _context8.next = 10;
              return this.model.find(query).populate('category_id', '-image').populate('restaurant_id').select(['-reviews']).skip(skip).limit(limit).sort({
                createdAt: -1
              });
            case 10:
              items = _context8.sent;
              _context8.next = 13;
              return this.model.countDocuments(query);
            case 13:
              total = _context8.sent;
              return _context8.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8["catch"](7);
              return _context8.abrupt("return", {
                error: true,
                message: _context8.t0.message,
                statusCode: 400,
                data: null
              });
            case 20:
            case "end":
              return _context8.stop();
          }
        }, _callee7, this, [[7, 17]]);
      }));
      function getAllMenu(_x6) {
        return _getAllMenu.apply(this, arguments);
      }
      return getAllMenu;
    }()
  }, {
    key: "getAllAdminMenu2",
    value: function () {
      var _getAllAdminMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(query) {
        var skip, limit, start, length, _query$search, search, where, items, total;
        return _regeneratorRuntime().wrap(function _callee8$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              skip = query.skip, limit = query.limit, start = query.start, length = query.length, _query$search = query.search, search = _query$search === void 0 ? '' : _query$search;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              where = {
                deleted: {
                  $ne: true
                }
              };
              if (search) {
                where['$or'] = [{
                  title: {
                    $regex: new RegExp(search, 'i')
                  }
                }, {
                  description: {
                    $regex: new RegExp(search, 'i')
                  }
                }];
              }
              _context9.prev = 8;
              _context9.next = 11;
              return this.model.find(where).select('-images').populate('category_id', '-image').populate('restaurant_id').select(['-reviews']).skip(start).limit(length);
            case 11:
              items = _context9.sent;
              _context9.next = 14;
              return this.model.countDocuments(where);
            case 14:
              total = _context9.sent;
              return _context9.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                recordsTotal: total,
                // total number of records
                recordsFiltered: total,
                data: items
              });
            case 18:
              _context9.prev = 18;
              _context9.t0 = _context9["catch"](8);
              return _context9.abrupt("return", {
                error: true,
                message: _context9.t0.message,
                statusCode: 400,
                data: null
              });
            case 21:
            case "end":
              return _context9.stop();
          }
        }, _callee8, this, [[8, 18]]);
      }));
      function getAllAdminMenu2(_x7) {
        return _getAllAdminMenu.apply(this, arguments);
      }
      return getAllAdminMenu2;
    }()
  }, {
    key: "getAllAdminMenu",
    value: function () {
      var _getAllAdminMenu2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(query) {
        var skip, limit, _query$search2, search, items, total;
        return _regeneratorRuntime().wrap(function _callee9$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              skip = query.skip, limit = query.limit, _query$search2 = query.search, search = _query$search2 === void 0 ? '' : _query$search2;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              query.deleted = {
                $ne: true
              };
              if (search) {
                query['$or'] = [{
                  title: {
                    $regex: new RegExp(search, 'i')
                  }
                }, {
                  description: {
                    $regex: new RegExp(search, 'i')
                  }
                }];
              }
              console.log(query);
              _context10.prev = 9;
              _context10.next = 12;
              return this.model.find(query).select('-images').populate('category_id', '-image').populate('restaurant_id').select(['-reviews']).skip(skip).limit(limit);
            case 12:
              items = _context10.sent;
              _context10.next = 15;
              return this.model.countDocuments(query);
            case 15:
              total = _context10.sent;
              return _context10.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 19:
              _context10.prev = 19;
              _context10.t0 = _context10["catch"](9);
              return _context10.abrupt("return", {
                error: true,
                message: _context10.t0.message,
                statusCode: 400,
                data: null
              });
            case 22:
            case "end":
              return _context10.stop();
          }
        }, _callee9, this, [[9, 19]]);
      }));
      function getAllAdminMenu(_x8) {
        return _getAllAdminMenu2.apply(this, arguments);
      }
      return getAllAdminMenu;
    }()
  }, {
    key: "getSingleMenu",
    value: function () {
      var _getSingleMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id) {
        var items;
        return _regeneratorRuntime().wrap(function _callee10$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return this.model.findById(id).populate('category_id', '-image').populate('restaurant_id').select(['-reviews']);
            case 3:
              items = _context11.sent;
              return _context11.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: items
              });
            case 7:
              _context11.prev = 7;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", {
                error: true,
                message: _context11.t0.message,
                statusCode: 400,
                data: null
              });
            case 10:
            case "end":
              return _context11.stop();
          }
        }, _callee10, this, [[0, 7]]);
      }));
      function getSingleMenu(_x9) {
        return _getSingleMenu.apply(this, arguments);
      }
      return getSingleMenu;
    }()
  }, {
    key: "getAllRestaurantMenu",
    value: function () {
      var _getAllRestaurantMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(id) {
        var items, total;
        return _regeneratorRuntime().wrap(function _callee11$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.next = 3;
              return this.model.find(id).populate('category_id', '-image').populate('restaurant_id', '-image');
            case 3:
              items = _context12.sent;
              _context12.next = 6;
              return this.model.countDocuments();
            case 6:
              total = _context12.sent;
              return _context12.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 10:
              _context12.prev = 10;
              _context12.t0 = _context12["catch"](0);
              return _context12.abrupt("return", {
                error: true,
                message: _context12.t0.message,
                statusCode: 400,
                data: null
              });
            case 13:
            case "end":
              return _context12.stop();
          }
        }, _callee11, this, [[0, 10]]);
      }));
      function getAllRestaurantMenu(_x10) {
        return _getAllRestaurantMenu.apply(this, arguments);
      }
      return getAllRestaurantMenu;
    }() //get restro menu based on auth id
  }, {
    key: "getRestaurantMenu",
    value: function () {
      var _getRestaurantMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(query) {
        var user,
          skip,
          limit,
          id,
          items,
          total,
          _args13 = arguments;
        return _regeneratorRuntime().wrap(function _callee12$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              user = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : null;
              skip = query.skip, limit = query.limit;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 200;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              id = query._id;
              if (id) {
                try {
                  // eslint-disable-next-line no-underscore-dangle
                  id = new _mongoose["default"].mongo.ObjectId(id);
                } catch (error) {
                  // console.log('not able to generate mongoose id with content', id);
                }
              }
              if (user != null) {
                query.restaurant_id = user.id;
              }
              query.deleted = {
                $ne: true
              };
              _context13.prev = 11;
              _context13.next = 14;
              return this.model.find(query)
              // .populate('category_id', '-image')
              // .populate('restaurant_id', '-images')
              .skip(skip).limit(limit).sort({
                createdAt: -1
              });
            case 14:
              items = _context13.sent;
              _context13.next = 17;
              return this.model.countDocuments(query);
            case 17:
              total = _context13.sent;
              return _context13.abrupt("return", {
                error: false,
                message: 'request successfullly!',
                statusCode: 200,
                total: total,
                data: items
              });
            case 21:
              _context13.prev = 21;
              _context13.t0 = _context13["catch"](11);
              return _context13.abrupt("return", {
                error: true,
                message: _context13.t0.message,
                statusCode: 400,
                data: null
              });
            case 24:
            case "end":
              return _context13.stop();
          }
        }, _callee12, this, [[11, 21]]);
      }));
      function getRestaurantMenu(_x11) {
        return _getRestaurantMenu.apply(this, arguments);
      }
      return getRestaurantMenu;
    }()
  }, {
    key: "getAdminRestaurantMenu",
    value: function () {
      var _getAdminRestaurantMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(query, restaurantId) {
        var skip, limit, start, length, _query$search3, search, id, items, total;
        return _regeneratorRuntime().wrap(function _callee13$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              skip = query.skip, limit = query.limit, start = query.start, length = query.length, _query$search3 = query.search, search = _query$search3 === void 0 ? '' : _query$search3;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              id = query._id;

             
              if (id) {
                try {
                  // eslint-disable-next-line no-underscore-dangle
                  id = new _mongoose["default"].mongo.ObjectId(id);
                } catch (error) {
                  // console.log('not able to generate mongoose id with content', id);
                }
              }
              query.restaurant_id = restaurantId;
              query.deleted = {
                $ne: true
              };
              if (search) {
                query['$or'] = [{
                  title: {
                    $regex: new RegExp(search, 'i')
                  }
                }, {
                  description: {
                    $regex: new RegExp(search, 'i')
                  }
                }];
              }
              _context14.prev = 11;
              _context14.next = 14;
              return this.model.find(query).populate('category_id', '-image').populate('restaurant_id', '-images').skip(start).limit(length).sort({
                createdAt: -1
              });
            case 14:
              items = _context14.sent;
              _context14.next = 17;
              return this.model.countDocuments(query);
            case 17:
              total = _context14.sent;
              return _context14.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                recordsTotal: total,
                // total number of records
                recordsFiltered: total,
                data: items
              });
            case 21:
              _context14.prev = 21;
              _context14.t0 = _context14["catch"](11);
              return _context14.abrupt("return", {
                error: true,
                message: _context14.t0.message,
                statusCode: 400,
                data: null
              });
            case 24:
            case "end":
              return _context14.stop();
          }
        }, _callee13, this, [[11, 21]]);
      }));
      function getAdminRestaurantMenu(_x12, _x13) {
        return _getAdminRestaurantMenu.apply(this, arguments);
      }
      return getAdminRestaurantMenu;
    }()
  }, {
    key: "UpdateAllmenu",
    value: function () {
      var _UpdateAllmenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req) {
        var item, data;
        return _regeneratorRuntime().wrap(function _callee14$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              item = {
                availability: false,
                delivery: true
              };
              _context15.prev = 1;
              _context15.next = 4;
              return this.model.update({}, item, {
                multi: true
              });
            case 4:
              data = _context15.sent;
              return _context15.abrupt("return", {
                error: false,
                message: 'successfully updated',
                statusCode: 200,
                data: data
              });
            case 8:
              _context15.prev = 8;
              _context15.t0 = _context15["catch"](1);
              return _context15.abrupt("return", {
                error: true,
                message: _context15.t0.message,
                statusCode: 400,
                data: null
              });
            case 11:
            case "end":
              return _context15.stop();
          }
        }, _callee14, this, [[1, 8]]);
      }));
      function UpdateAllmenu(_x14) {
        return _UpdateAllmenu.apply(this, arguments);
      }
      return UpdateAllmenu;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(id, item) {
        var imagesData, data;
        return _regeneratorRuntime().wrap(function _callee15$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              imagesData = item.images.map(function (item) {
                var imageString = item;
                var base64Data = imageString.replace(/^data:image\/png;base64,/, "");
                var base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                var isBase64 = base64RegExp.test(base64Data);
                if (isBase64) {
                  // Store Image into Server
                  var d = new Date();
                  var text = d.toString();
                  var javaScriptRelease = Date.parse(d);
                  var imageName = "images/menu_".concat(javaScriptRelease, "_image.png");
                  _fs["default"].chmod(imageName, 511, function () {
                    _fs["default"].writeFile(imageName, base64Data, 'base64', function (err) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log('coverted');
                      }
                    });
                  });
                  return imageName;
                } else {
                  return item.replace("".concat(process.env.BASE_URL, "/"), "");
                }
              });
              _context16.next = 4;
              return Promise.all(imagesData);
            case 4:
              item.images = _context16.sent;
              _context16.next = 7;
              return this.model.findByIdAndUpdate(id, item, {
                "new": true
              });
            case 7:
              data = _context16.sent;
              return _context16.abrupt("return", {
                error: false,
                message: 'successfully updated',
                statusCode: 200,
                data: data
              });
            case 11:
              _context16.prev = 11;
              _context16.t0 = _context16["catch"](0);
              return _context16.abrupt("return", {
                error: true,
                message: _context16.t0.message,
                statusCode: 400,
                data: null
              });
            case 14:
            case "end":
              return _context16.stop();
          }
        }, _callee15, this, [[0, 11]]);
      }));
      function update(_x15, _x16) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }]);
  return MenuService;
}(_Service2["default"]);
function parseCsvData(filePath) {
  return new Promise(function (resolve, reject) {
    var results = [];
    _fs["default"].createReadStream(filePath).pipe((0, _csvParser["default"])()).on('data', function (data) {
      results.push(data);
    }).on('end', function () {
      resolve(results);
    }).on('error', function (error) {
      reject(error);
    });
  });
}
function calculateAverageRating(reviews) {
  var totalStars = 0;
  var totalReviews = reviews.length;
  for (var i = 0; i < totalReviews; i++) {
    totalStars += reviews[i].stars;
  }
  return totalReviews > 0 ? totalStars / totalReviews : 0;
}
var _default = MenuService;
exports["default"] = _default;