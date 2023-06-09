"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Controller2 = _interopRequireDefault(require("./Controller"));
var _RestaurantModel = _interopRequireDefault(require("../models/RestaurantModel"));
var _RestaurantService = _interopRequireDefault(require("../services/RestaurantService"));
var _MenuModel = _interopRequireDefault(require("../models/MenuModel"));
var _MenuService = _interopRequireDefault(require("../services/MenuService"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _UserService = _interopRequireDefault(require("../services/UserService"));
var _OrderModel = _interopRequireDefault(require("../models/OrderModel"));
var _OrderService = _interopRequireDefault(require("../services/OrderService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
var restaurantService = new _RestaurantService["default"](new _RestaurantModel["default"]().getInstance());
var menuService = new _MenuService["default"](new _MenuModel["default"]().getInstance());
var userService = new _UserService["default"](new _UserModel["default"]().getModel());
var orderService = new _OrderService["default"](new _OrderModel["default"]().getInstance());
var RestaurantController = /*#__PURE__*/function (_Controller) {
  _inherits(RestaurantController, _Controller);
  var _super = _createSuper(RestaurantController);
  function RestaurantController(service, menuService, userService, orderService) {
    var _this;
    _classCallCheck(this, RestaurantController);
    _this = _super.call(this, service);
    _this.menuService = menuService;
    _this.userService = userService;
    _this.orderService = orderService;
    _this.sendOtp = _this.sendOtp.bind(_assertThisInitialized(_this));
    _this.reSendOtp = _this.reSendOtp.bind(_assertThisInitialized(_this));
    _this.otpVerified = _this.otpVerified.bind(_assertThisInitialized(_this));
    _this.createRestaurant = _this.createRestaurant.bind(_assertThisInitialized(_this));
    _this.updateRestaurant = _this.updateRestaurant.bind(_assertThisInitialized(_this));
    _this.deleteRestaurant = _this.deleteRestaurant.bind(_assertThisInitialized(_this));
    _this.deleteUserAndRestaurant = _this.deleteUserAndRestaurant.bind(_assertThisInitialized(_this));
    _this.insertCsvData = _this.insertCsvData.bind(_assertThisInitialized(_this));
    _this.getAllRestaurant = _this.getAllRestaurant.bind(_assertThisInitialized(_this));
    _this.getAllAdminRestaurant = _this.getAllAdminRestaurant.bind(_assertThisInitialized(_this));
    _this.getAllCategoryRestaurant = _this.getAllCategoryRestaurant.bind(_assertThisInitialized(_this));
    _this.getRestaurantProfile = _this.getRestaurantProfile.bind(_assertThisInitialized(_this));
    _this.getSingleRestaurant = _this.getSingleRestaurant.bind(_assertThisInitialized(_this));
    _this.getPerOrderCommission = _this.getPerOrderCommission.bind(_assertThisInitialized(_this));
    _this.changeRestaurantStatus = _this.changeRestaurantStatus.bind(_assertThisInitialized(_this));
    _this.changeAllRestaurantStatus = _this.changeAllRestaurantStatus.bind(_assertThisInitialized(_this));
    _this.adminChangeRestaurantStatus = _this.adminChangeRestaurantStatus.bind(_assertThisInitialized(_this));
    _this.getSingleRestaurantAndThereMenu = _this.getSingleRestaurantAndThereMenu.bind(_assertThisInitialized(_this));
    _this.dataUpdate = _this.dataUpdate.bind(_assertThisInitialized(_this));
    _this.getAllRestaurant2 = _this.getAllRestaurant2.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(RestaurantController, [{
    key: "sendOtp",
    value: function () {
      var _sendOtp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.service.sendOtp(req);
            case 2:
              response = _context.sent;
              return _context.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function sendOtp(_x, _x2) {
        return _sendOtp.apply(this, arguments);
      }
      return sendOtp;
    }()
  }, {
    key: "reSendOtp",
    value: function () {
      var _reSendOtp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.service.reSendOtp(req);
            case 2:
              response = _context2.sent;
              return _context2.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function reSendOtp(_x3, _x4) {
        return _reSendOtp.apply(this, arguments);
      }
      return reSendOtp;
    }()
  }, {
    key: "otpVerified",
    value: function () {
      var _otpVerified = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.service.otpVerified(req);
            case 2:
              response = _context3.sent;
              return _context3.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function otpVerified(_x5, _x6) {
        return _otpVerified.apply(this, arguments);
      }
      return otpVerified;
    }()
  }, {
    key: "createRestaurant",
    value: function () {
      var _createRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.service.createRestaurant(req);
            case 2:
              response = _context4.sent;
              return _context4.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function createRestaurant(_x7, _x8) {
        return _createRestaurant.apply(this, arguments);
      }
      return createRestaurant;
    }()
  }, {
    key: "updateRestaurant",
    value: function () {
      var _updateRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.service.updateRestaurant(req);
            case 2:
              response = _context5.sent;
              return _context5.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function updateRestaurant(_x9, _x10) {
        return _updateRestaurant.apply(this, arguments);
      }
      return updateRestaurant;
    }()
  }, {
    key: "deleteRestaurant",
    value: function () {
      var _deleteRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var id, response, $menu;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              _context6.next = 3;
              return this.service.update(id, {
                deleted: true
              });
            case 3:
              response = _context6.sent;
              if (!(response.statusCode === 200)) {
                _context6.next = 8;
                break;
              }
              _context6.next = 7;
              return this.menuService.updateWhere({
                restaurant_id: id
              }, {
                deleted: true
              });
            case 7:
              $menu = _context6.sent;
            case 8:
              return _context6.abrupt("return", res.status(response.statusCode).send(response));
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function deleteRestaurant(_x11, _x12) {
        return _deleteRestaurant.apply(this, arguments);
      }
      return deleteRestaurant;
    }()
  }, {
    key: "deleteUserAndRestaurant",
    value: function () {
      var _deleteUserAndRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var id, response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              id = req.user.id;
              if (!(req.user.role === 'user')) {
                _context7.next = 7;
                break;
              }
              _context7.next = 4;
              return this.userService.updateWhere({
                _id: id
              }, {
                deleted: true
              });
            case 4:
              response = _context7.sent;
              _context7.next = 14;
              break;
            case 7:
              if (!(req.user.role === 'restaurant')) {
                _context7.next = 13;
                break;
              }
              _context7.next = 10;
              return this.service.updateWhere({
                _id: id
              }, {
                deleted: true
              });
            case 10:
              response = _context7.sent;
              _context7.next = 14;
              break;
            case 13:
              console.log("BAD REQUEST");
            case 14:
              return _context7.abrupt("return", res.status(response.statusCode).send(response));
            case 15:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function deleteUserAndRestaurant(_x13, _x14) {
        return _deleteUserAndRestaurant.apply(this, arguments);
      }
      return deleteUserAndRestaurant;
    }()
  }, {
    key: "insertCsvData",
    value: function () {
      var _insertCsvData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.service.insertCsvData(req);
            case 2:
              response = _context8.sent;
              return _context8.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function insertCsvData(_x15, _x16) {
        return _insertCsvData.apply(this, arguments);
      }
      return insertCsvData;
    }()
  }, {
    key: "getAllRestaurant",
    value: function () {
      var _getAllRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var id, user, response;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              id = req.user.id;
              _context9.next = 3;
              return this.userService.get(id);
            case 3:
              user = _context9.sent;
              _context9.next = 6;
              return this.service.getAllRestaurant(req.query, user.data);
            case 6:
              response = _context9.sent;
              return _context9.abrupt("return", res.status(response.statusCode).send(response));
            case 8:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function getAllRestaurant(_x17, _x18) {
        return _getAllRestaurant.apply(this, arguments);
      }
      return getAllRestaurant;
    }()
  }, {
    key: "getAllRestaurant2",
    value: function () {
      var _getAllRestaurant2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
        var id, user, response;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              id = req.user.id;
              _context10.next = 3;
              return this.userService.get(id);
            case 3:
              user = _context10.sent;
              _context10.next = 6;
              return this.service.getAllRestaurant2(req.query, user.data);
            case 6:
              response = _context10.sent;
              return _context10.abrupt("return", res.status(response.statusCode).send(response));
            case 8:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function getAllRestaurant2(_x19, _x20) {
        return _getAllRestaurant2.apply(this, arguments);
      }
      return getAllRestaurant2;
    }()
  }, {
    key: "getAllAdminRestaurant",
    value: function () {
      var _getAllAdminRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.service.getAllAdminRestaurant(req.query);
            case 2:
              response = _context11.sent;
              return _context11.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function getAllAdminRestaurant(_x21, _x22) {
        return _getAllAdminRestaurant.apply(this, arguments);
      }
      return getAllAdminRestaurant;
    }()
  }, {
    key: "getAllCategoryRestaurant",
    value: function () {
      var _getAllCategoryRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.service.getAllCategoryRestaurant(req);
            case 2:
              response = _context12.sent;
              return _context12.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function getAllCategoryRestaurant(_x23, _x24) {
        return _getAllCategoryRestaurant.apply(this, arguments);
      }
      return getAllCategoryRestaurant;
    }()
  }, {
    key: "getRestaurantProfile",
    value: function () {
      var _getRestaurantProfile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.service.getRestaurantProfile(req);
            case 2:
              response = _context13.sent;
              return _context13.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function getRestaurantProfile(_x25, _x26) {
        return _getRestaurantProfile.apply(this, arguments);
      }
      return getRestaurantProfile;
    }()
  }, {
    key: "getSingleRestaurant",
    value: function () {
      var _getSingleRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
        var id, response, singleRestaurantDeshboardData;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              id = req.params.id;
              _context14.next = 3;
              return this.service.get(id);
            case 3:
              response = _context14.sent;
              if (!(response.statusCode === 200)) {
                _context14.next = 9;
                break;
              }
              _context14.next = 7;
              return orderService.getSingleRestaurantDeshboardData(id);
            case 7:
              singleRestaurantDeshboardData = _context14.sent;
              response.singleRestaurantDeshboardData = _objectSpread({}, singleRestaurantDeshboardData);
            case 9:
              return _context14.abrupt("return", res.status(response.statusCode).send(response));
            case 10:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function getSingleRestaurant(_x27, _x28) {
        return _getSingleRestaurant.apply(this, arguments);
      }
      return getSingleRestaurant;
    }()
  }, {
    key: "changeRestaurantStatus",
    value: function () {
      var _changeRestaurantStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this.service.changeRestaurantStatus(req);
            case 2:
              response = _context15.sent;
              return _context15.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function changeRestaurantStatus(_x29, _x30) {
        return _changeRestaurantStatus.apply(this, arguments);
      }
      return changeRestaurantStatus;
    }()
  }, {
    key: "changeAllRestaurantStatus",
    value: function () {
      var _changeAllRestaurantStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return this.service.changeAllRestaurantStatus(req);
            case 2:
              response = _context16.sent;
              return _context16.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function changeAllRestaurantStatus(_x31, _x32) {
        return _changeAllRestaurantStatus.apply(this, arguments);
      }
      return changeAllRestaurantStatus;
    }()
  }, {
    key: "adminChangeRestaurantStatus",
    value: function () {
      var _adminChangeRestaurantStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
        var id, item, response;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              id = req.params.id;
              item = req.body;
              _context17.next = 4;
              return this.service.update(id, item);
            case 4:
              response = _context17.sent;
              return _context17.abrupt("return", res.status(response.statusCode).send(response));
            case 6:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function adminChangeRestaurantStatus(_x33, _x34) {
        return _adminChangeRestaurantStatus.apply(this, arguments);
      }
      return adminChangeRestaurantStatus;
    }()
  }, {
    key: "getPerOrderCommission",
    value: function () {
      var _getPerOrderCommission = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return this.service.getPerOrderCommission(req);
            case 2:
              response = _context18.sent;
              return _context18.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function getPerOrderCommission(_x35, _x36) {
        return _getPerOrderCommission.apply(this, arguments);
      }
      return getPerOrderCommission;
    }()
  }, {
    key: "getSingleRestaurantAndThereMenu",
    value: function () {
      var _getSingleRestaurantAndThereMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
        var id, $getSingleRestaurant, $menu, data, response;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              id = req.params.id;
              _context19.next = 3;
              return this.service.getSingleRestaurantAndThereMenu(id);
            case 3:
              $getSingleRestaurant = _context19.sent;
              _context19.next = 6;
              return this.menuService.getAllRestaurantMenu({
                restaurant_id: id,
                deleted: {
                  $ne: true
                }
              });
            case 6:
              $menu = _context19.sent;
              data = {
                restaurant: $getSingleRestaurant.data,
                menu: $menu.data
              };
              response = {
                error: $getSingleRestaurant.error,
                message: $getSingleRestaurant.message,
                statusCode: $getSingleRestaurant.statusCode,
                data: data
              };
              return _context19.abrupt("return", res.status(response.statusCode).send(response));
            case 10:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function getSingleRestaurantAndThereMenu(_x37, _x38) {
        return _getSingleRestaurantAndThereMenu.apply(this, arguments);
      }
      return getSingleRestaurantAndThereMenu;
    }()
  }, {
    key: "dataUpdate",
    value: function () {
      var _dataUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return this.service.dataUpdate();
            case 2:
              response = _context20.sent;
              return _context20.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function dataUpdate(_x39, _x40) {
        return _dataUpdate.apply(this, arguments);
      }
      return dataUpdate;
    }()
  }]);
  return RestaurantController;
}(_Controller2["default"]);
var _default = new RestaurantController(restaurantService, menuService, userService, orderService);
exports["default"] = _default;