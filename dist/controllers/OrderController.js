"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var _Controller2 = _interopRequireDefault(require("./Controller"));
var _OrderModel = _interopRequireDefault(require("../models/OrderModel"));
var _OrderService = _interopRequireDefault(require("../services/OrderService"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _UserService = _interopRequireDefault(require("../services/UserService"));
var _RestaurantModel = _interopRequireDefault(require("../models/RestaurantModel"));
var _RestaurantService = _interopRequireDefault(require("../services/RestaurantService"));
var _DeliveryBoyModel = _interopRequireDefault(require("../models/DeliveryBoyModel"));
var _DeliveryBoyService = _interopRequireDefault(require("../services/DeliveryBoyService"));
var _UserNotificationModel = _interopRequireDefault(require("../models/UserNotificationModel"));
var _UserNotificationService = _interopRequireDefault(require("../services/UserNotificationService"));
var _RestaurantNotificationModel = _interopRequireDefault(require("../models/RestaurantNotificationModel"));
var _RestaurantNotificationService = _interopRequireDefault(require("../services/RestaurantNotificationService"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _firrebase = require("./../helpers/firrebase");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var orderService = new _OrderService["default"](new _OrderModel["default"]().getModel());
var userService = new _UserService["default"](new _UserModel["default"]().getModel());
var restaurantService = new _RestaurantService["default"](new _RestaurantModel["default"]().getModel());
var deliveryBoyService = new _DeliveryBoyService["default"](new _DeliveryBoyModel["default"]().getInstance());
var userNotificationService = new _UserNotificationService["default"](new _UserNotificationModel["default"]().getModel());
var restaurantNotificationService = new _RestaurantNotificationService["default"](new _RestaurantNotificationModel["default"]().getModel());
_dotenv["default"].config();
// import { io } from '../bin/www.js';
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const from = process.env.PHONE_NUMBER;

// const twilio = require('twilio')(accountSid, authToken);

var sendNotificationToRestaurant = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(subTitle, body, title, token, orderId) {
    var msg, _error$errorInfo, deletedToken;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _firrebase.adminSendNotification.messaging().send({
            token: token,
            data: {
              orderId: orderId,
              subTitle: subTitle
            },
            android: {
              notification: {
                body: body,
                title: title,
                color: '#fff566',
                priority: 'high',
                sound: 'default',
                vibrateTimingsMillis: [200, 500, 800]
              }
            }
          });
        case 3:
          msg = _context.sent;
          console.log(msg);
          _context.next = 15;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          if (!((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_error$errorInfo = _context.t0.errorInfo) === null || _error$errorInfo === void 0 ? void 0 : _error$errorInfo.code) === 'messaging/registration-token-not-registered')) {
            _context.next = 14;
            break;
          }
          _context.next = 12;
          return restaurantService.update({
            _id: id
          }, {
            $pull: {
              deviceToken: token
            }
          });
        case 12:
          deletedToken = _context.sent;
          console.log(deletedToken);
        case 14:
          console.error('Error sending notification:', _context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function sendNotificationToRestaurant(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var sendNotificationToUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(subTitle, body, title, token, orderId) {
    var msg, _error$errorInfo2, deletedToken;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _firrebase.adminSendNotification.messaging().send({
            token: token,
            data: {
              orderId: orderId,
              subTitle: subTitle
            },
            android: {
              notification: {
                body: body,
                title: title,
                color: '#fff566',
                priority: 'high',
                sound: 'default',
                vibrateTimingsMillis: [200, 500, 800]
              }
            }
          });
        case 3:
          msg = _context2.sent;
          console.log(msg);
          _context2.next = 15;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          if (!((_context2.t0 === null || _context2.t0 === void 0 ? void 0 : (_error$errorInfo2 = _context2.t0.errorInfo) === null || _error$errorInfo2 === void 0 ? void 0 : _error$errorInfo2.code) === 'messaging/registration-token-not-registered')) {
            _context2.next = 14;
            break;
          }
          _context2.next = 12;
          return userService.update({
            _id: id
          }, {
            $pull: {
              deviceToken: token
            }
          });
        case 12:
          deletedToken = _context2.sent;
          console.log(deletedToken);
        case 14:
          console.error('Error sending notification:', _context2.t0);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function sendNotificationToUser(_x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();
var _sendAdminNotificationToAll = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(subTitle, body, title, token, id) {
    var notificationType,
      msg,
      _error$errorInfo3,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          notificationType = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : null;
          _context3.prev = 1;
          _context3.next = 4;
          return _firrebase.adminSendNotification.messaging().send({
            token: token,
            data: {
              subTitle: subTitle
            },
            android: {
              notification: {
                body: body,
                title: title,
                color: '#fff566',
                priority: 'high',
                sound: 'default',
                vibrateTimingsMillis: [200, 500, 800]
              }
            }
          });
        case 4:
          msg = _context3.sent;
          console.log(msg);
          _context3.next = 31;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          if (!((_context3.t0 === null || _context3.t0 === void 0 ? void 0 : (_error$errorInfo3 = _context3.t0.errorInfo) === null || _error$errorInfo3 === void 0 ? void 0 : _error$errorInfo3.code) === 'messaging/registration-token-not-registered')) {
            _context3.next = 30;
            break;
          }
          if (!(notificationType === 'users')) {
            _context3.next = 16;
            break;
          }
          _context3.next = 14;
          return userService.update({
            _id: id
          }, {
            $pull: {
              deviceToken: token
            }
          });
        case 14:
          _context3.next = 27;
          break;
        case 16:
          if (!(notificationType === 'restaurants')) {
            _context3.next = 21;
            break;
          }
          _context3.next = 19;
          return restaurantService.update({
            _id: id
          }, {
            $pull: {
              deviceToken: token
            }
          });
        case 19:
          _context3.next = 27;
          break;
        case 21:
          if (!(notificationType === 'deliveryboys')) {
            _context3.next = 26;
            break;
          }
          _context3.next = 24;
          return deliveryBoyService.update({
            _id: id
          }, {
            $pull: {
              deviceToken: token
            }
          });
        case 24:
          _context3.next = 27;
          break;
        case 26:
          console.log("not geting right notificatioin type");
        case 27:
          // Handle the case when the registration token is no longer valid.
          console.error('Registration token is not valid:', _context3.t0);
          // You can also remove the invalid token from the database, if necessary.
          _context3.next = 31;
          break;
        case 30:
          console.error('Error sending notification:', _context3.t0);
        case 31:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function sendAdminNotificationToAll(_x11, _x12, _x13, _x14, _x15) {
    return _ref3.apply(this, arguments);
  };
}();
var OrderController = /*#__PURE__*/function (_Controller) {
  _inherits(OrderController, _Controller);
  var _super = _createSuper(OrderController);
  function OrderController(service, userService, restaurantService, deliveryBoyService, userNotificationService, restaurantNotificationService) {
    var _this;
    _classCallCheck(this, OrderController);
    _this = _super.call(this, service);
    _this.userService = userService;
    _this.restaurantService = restaurantService;
    _this.deliveryBoyService = deliveryBoyService;
    _this.userNotificationService = userNotificationService;
    _this.restaurantNotificationService = restaurantNotificationService;
    _this.createOrder = _this.createOrder.bind(_assertThisInitialized(_this));
    _this.getAllOrder = _this.getAllOrder.bind(_assertThisInitialized(_this));
    _this.getAllOrderByRestaurantId = _this.getAllOrderByRestaurantId.bind(_assertThisInitialized(_this));
    _this.getAllTodayRestaurantOrder = _this.getAllTodayRestaurantOrder.bind(_assertThisInitialized(_this));
    _this.getAllOrderByCustomerId = _this.getAllOrderByCustomerId.bind(_assertThisInitialized(_this));
    _this.getOrder = _this.getOrder.bind(_assertThisInitialized(_this));
    _this.confirmOrder = _this.confirmOrder.bind(_assertThisInitialized(_this));
    _this.cancelOrder = _this.cancelOrder.bind(_assertThisInitialized(_this));
    _this.acceptOrder = _this.acceptOrder.bind(_assertThisInitialized(_this));
    _this.completeOrder = _this.completeOrder.bind(_assertThisInitialized(_this));
    _this.getDeliverBoyAndOrderData = _this.getDeliverBoyAndOrderData.bind(_assertThisInitialized(_this));
    _this.deliveryBoyAllOrder = _this.deliveryBoyAllOrder.bind(_assertThisInitialized(_this));
    _this.deliveryBoyOrderHistory = _this.deliveryBoyOrderHistory.bind(_assertThisInitialized(_this));
    _this.deliveryBoyDashboardData = _this.deliveryBoyDashboardData.bind(_assertThisInitialized(_this));
    _this.todayRestaurantReport = _this.todayRestaurantReport.bind(_assertThisInitialized(_this));
    _this.getRestaurantDashboardData = _this.getRestaurantDashboardData.bind(_assertThisInitialized(_this));
    _this.sendAdminNotificationToAll = _this.sendAdminNotificationToAll.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(OrderController, [{
    key: "sendAdminNotificationToAll",
    value: function () {
      var _sendAdminNotificationToAll2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var _req$body, subTitle, title, body, notificationType, notificationPayload, userResponse, data, restaurantResponse, _data, deliveryBoyResponse, _data2, response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _req$body = req.body, subTitle = _req$body.subTitle, title = _req$body.title, body = _req$body.body, notificationType = _req$body.notificationType;
              req.query = {
                limit: 5000
              };
              notificationPayload = {
                subTitle: subTitle,
                title: title,
                body: body
              };
              if (!(notificationType === 'users')) {
                _context4.next = 11;
                break;
              }
              _context4.next = 6;
              return this.userService.getAll(req.query);
            case 6:
              userResponse = _context4.sent;
              data = userResponse.data;
              data === null || data === void 0 ? void 0 : data.forEach(function (user) {
                if (user) {
                  var _user$deviceToken;
                  user === null || user === void 0 ? void 0 : (_user$deviceToken = user.deviceToken) === null || _user$deviceToken === void 0 ? void 0 : _user$deviceToken.forEach(function (token) {
                    _sendAdminNotificationToAll(notificationPayload.subTitle, notificationPayload.body, notificationPayload.title, token, user._id, notificationType);
                  });
                }
              });
              _context4.next = 28;
              break;
            case 11:
              if (!(notificationType === 'restaurants')) {
                _context4.next = 19;
                break;
              }
              _context4.next = 14;
              return this.restaurantService.getAll(req.query);
            case 14:
              restaurantResponse = _context4.sent;
              _data = restaurantResponse.data;
              _data === null || _data === void 0 ? void 0 : _data.forEach(function (user) {
                if (user) {
                  var _user$deviceToken2;
                  user === null || user === void 0 ? void 0 : (_user$deviceToken2 = user.deviceToken) === null || _user$deviceToken2 === void 0 ? void 0 : _user$deviceToken2.forEach(function (token) {
                    _sendAdminNotificationToAll(notificationPayload.subTitle, notificationPayload.body, notificationPayload.title, token, user._id, notificationType);
                  });
                }
              });
              _context4.next = 28;
              break;
            case 19:
              if (!(notificationType === 'deliveryboys')) {
                _context4.next = 27;
                break;
              }
              _context4.next = 22;
              return this.deliveryBoyService.getAll(req.query);
            case 22:
              deliveryBoyResponse = _context4.sent;
              _data2 = deliveryBoyResponse.data;
              _data2 === null || _data2 === void 0 ? void 0 : _data2.forEach(function (user) {
                if (user) {
                  var _user$deviceToken3;
                  user === null || user === void 0 ? void 0 : (_user$deviceToken3 = user.deviceToken) === null || _user$deviceToken3 === void 0 ? void 0 : _user$deviceToken3.forEach(function (token) {
                    _sendAdminNotificationToAll(notificationPayload.subTitle, notificationPayload.body, notificationPayload.title, token, user._id, notificationType);
                  });
                }
              });
              _context4.next = 28;
              break;
            case 27:
              console.log("not geting right notificatioin type");
            case 28:
              response = {
                error: false,
                message: 'send notificaton successfullly',
                statusCode: 200,
                data: "send notificatioin successfullly"
              };
              return _context4.abrupt("return", res.status(response.statusCode).send(response));
            case 30:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function sendAdminNotificationToAll(_x16, _x17) {
        return _sendAdminNotificationToAll2.apply(this, arguments);
      }
      return sendAdminNotificationToAll;
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var token, _verify, userId, cartItems, restaurantId, getRestaurantId, _yield$userService$ge, userData, restaurantData, response, _userData$deviceToken, _restaurantData$data, _restaurantData$data$, userPayload, restaurantPayload;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              getRestaurantId = function _getRestaurantId(cartItems) {
                for (var index = 0; index < cartItems.length; index++) {
                  var element = cartItems[index];
                  return element.restaurant_id._id;
                }
              };
              token = req.headers.authorization.replace('Bearer ', '');
              _verify = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET), userId = _verify.id;
              cartItems = req.body.item;
              restaurantId = getRestaurantId(cartItems);
              _context5.next = 7;
              return userService.get(userId);
            case 7:
              _yield$userService$ge = _context5.sent;
              userData = _yield$userService$ge.data;
              _context5.next = 11;
              return restaurantService.get(restaurantId);
            case 11:
              restaurantData = _context5.sent;
              _context5.next = 14;
              return this.service.createOrder(req, userData, restaurantData);
            case 14:
              response = _context5.sent;
              if (!(response.statusCode === 200)) {
                _context5.next = 24;
                break;
              }
              userPayload = {
                subTitle: restaurantData.data.name,
                title: "Your Order is Confirmed #".concat(response.data.orderId),
                body: "Thanks for your order! Our restaurant is working hard to prepare it for you",
                orderId: response.data.orderId,
                userId: userData._id
              };
              restaurantPayload = {
                subTitle: "User phone Number: ".concat(userData.phoneNumber),
                title: "Order Alert!",
                body: "A customer has placed an order - start cooking!",
                sound: 'default',
                orderId: response.data.orderId,
                restaurantId: restaurantData.data._id
              };
              userData === null || userData === void 0 ? void 0 : (_userData$deviceToken = userData.deviceToken) === null || _userData$deviceToken === void 0 ? void 0 : _userData$deviceToken.forEach(function (token) {
                sendNotificationToUser(userPayload.subTitle, userPayload.body, userPayload.title, token, userPayload.orderId, userPayload.userId);
              });
              restaurantData === null || restaurantData === void 0 ? void 0 : (_restaurantData$data = restaurantData.data) === null || _restaurantData$data === void 0 ? void 0 : (_restaurantData$data$ = _restaurantData$data.deviceToken) === null || _restaurantData$data$ === void 0 ? void 0 : _restaurantData$data$.forEach(function (token) {
                sendNotificationToRestaurant(restaurantPayload.subTitle, restaurantPayload.body, restaurantPayload.title, token, restaurantPayload.orderId, restaurantPayload.userId);
              });
              _context5.next = 22;
              return this.userNotificationService.insert(userPayload);
            case 22:
              _context5.next = 24;
              return this.restaurantNotificationService.insert(restaurantPayload);
            case 24:
              return _context5.abrupt("return", res.status(response.statusCode).send(response));
            case 25:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function createOrder(_x18, _x19) {
        return _createOrder.apply(this, arguments);
      }
      return createOrder;
    }()
  }, {
    key: "getAllOrder",
    value: function () {
      var _getAllOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.service.getAllOrder2(req.query);
            case 2:
              response = _context6.sent;
              return _context6.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getAllOrder(_x20, _x21) {
        return _getAllOrder.apply(this, arguments);
      }
      return getAllOrder;
    }()
  }, {
    key: "todayRestaurantReport",
    value: function () {
      var _todayRestaurantReport = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.service.todayRestaurantReport(req.query);
            case 2:
              response = _context7.sent;
              return _context7.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function todayRestaurantReport(_x22, _x23) {
        return _todayRestaurantReport.apply(this, arguments);
      }
      return todayRestaurantReport;
    }()
  }, {
    key: "getDeliverBoyAndOrderData",
    value: function () {
      var _getDeliverBoyAndOrderData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.service.getDeliverBoyAndOrderData(req);
            case 2:
              response = _context8.sent;
              return _context8.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getDeliverBoyAndOrderData(_x24, _x25) {
        return _getDeliverBoyAndOrderData.apply(this, arguments);
      }
      return getDeliverBoyAndOrderData;
    }()
  }, {
    key: "getAllOrderByRestaurantId",
    value: function () {
      var _getAllOrderByRestaurantId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var token, _verify2, restaurantId, response;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              token = req.headers.authorization.replace('Bearer ', '');
              _verify2 = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET), restaurantId = _verify2.id;
              _context9.next = 4;
              return this.service.getAllOrderByRestaurantId(req.query, restaurantId);
            case 4:
              response = _context9.sent;
              return _context9.abrupt("return", res.status(response.statusCode).send(response));
            case 6:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function getAllOrderByRestaurantId(_x26, _x27) {
        return _getAllOrderByRestaurantId.apply(this, arguments);
      }
      return getAllOrderByRestaurantId;
    }()
  }, {
    key: "getAllTodayRestaurantOrder",
    value: function () {
      var _getAllTodayRestaurantOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.service.getAllTodayRestaurantOrder(req);
            case 2:
              response = _context10.sent;
              return _context10.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function getAllTodayRestaurantOrder(_x28, _x29) {
        return _getAllTodayRestaurantOrder.apply(this, arguments);
      }
      return getAllTodayRestaurantOrder;
    }()
  }, {
    key: "getAllOrderByCustomerId",
    value: function () {
      var _getAllOrderByCustomerId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
        var token, _verify3, userId, response;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              token = req.headers.authorization.replace('Bearer ', '');
              _verify3 = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET), userId = _verify3.id;
              _context11.next = 4;
              return this.service.getAllOrderByCustomerId(req.query, userId);
            case 4:
              response = _context11.sent;
              return _context11.abrupt("return", res.status(response.statusCode).send(response));
            case 6:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function getAllOrderByCustomerId(_x30, _x31) {
        return _getAllOrderByCustomerId.apply(this, arguments);
      }
      return getAllOrderByCustomerId;
    }()
  }, {
    key: "getOrder",
    value: function () {
      var _getOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
        var id, response;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              id = req.params.id;
              _context12.next = 3;
              return this.service.getOrder(id);
            case 3:
              response = _context12.sent;
              return _context12.abrupt("return", res.status(response.statusCode).send(response));
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function getOrder(_x32, _x33) {
        return _getOrder.apply(this, arguments);
      }
      return getOrder;
    }()
  }, {
    key: "confirmOrder",
    value: function () {
      var _confirmOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
        var id, response, _userData$deviceToken2, _response$data, orderdBy, orderRestaurant, _yield$userService$ge2, userData, _yield$restaurantServ, restaurantData, userPayload, deliveryBoyResponse;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              id = req.params.orderId;
              _context13.next = 3;
              return this.service.confirmOrder(req);
            case 3:
              response = _context13.sent;
              if (!(response.statusCode === 200)) {
                _context13.next = 18;
                break;
              }
              _response$data = response === null || response === void 0 ? void 0 : response.data, orderdBy = _response$data.orderdBy, orderRestaurant = _response$data.orderRestaurant;
              _context13.next = 8;
              return userService.get(orderdBy);
            case 8:
              _yield$userService$ge2 = _context13.sent;
              userData = _yield$userService$ge2.data;
              _context13.next = 12;
              return restaurantService.get(orderRestaurant);
            case 12:
              _yield$restaurantServ = _context13.sent;
              restaurantData = _yield$restaurantServ.data;
              userPayload = {
                subTitle: restaurantData.name,
                title: "Your Order #".concat(response.data.orderId, " is confirmed"),
                body: "Thanks for your order! Our restaurant is working hard to prepare it for you.",
                orderId: response.data.orderId,
                userId: userData._id
              };
              userData === null || userData === void 0 ? void 0 : (_userData$deviceToken2 = userData.deviceToken) === null || _userData$deviceToken2 === void 0 ? void 0 : _userData$deviceToken2.forEach(function (token) {
                sendNotificationToUser(userPayload.subTitle, userPayload.body, userPayload.title, token, userPayload.orderId, userPayload.userId);
              });
              _context13.next = 18;
              return this.userNotificationService.insert(userPayload);
            case 18:
              req.query = {
                limit: 50
              };
              _context13.next = 21;
              return this.deliveryBoyService.getAll(req.query);
            case 21:
              deliveryBoyResponse = _context13.sent;
              return _context13.abrupt("return", res.status(response.statusCode).send(response));
            case 23:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function confirmOrder(_x34, _x35) {
        return _confirmOrder.apply(this, arguments);
      }
      return confirmOrder;
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return this.service.cancelOrder(req);
            case 2:
              response = _context14.sent;
              return _context14.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function cancelOrder(_x36, _x37) {
        return _cancelOrder.apply(this, arguments);
      }
      return cancelOrder;
    }()
  }, {
    key: "acceptOrder",
    value: function () {
      var _acceptOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
        var id, deliveryBoyResponse, response, _deliveryBoyResponse$, _deliveryBoyResponse$2, _userData$deviceToken3, _restaurantData$devic, _response$data2, orderdBy, orderRestaurant, _yield$userService$ge3, userData, _yield$restaurantServ2, restaurantData, userPayload, restaurantPayload;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              id = req.user.id;
              _context15.next = 3;
              return this.deliveryBoyService.get(id);
            case 3:
              deliveryBoyResponse = _context15.sent;
              _context15.next = 6;
              return this.service.acceptOrder(req, id);
            case 6:
              response = _context15.sent;
              if (!(response.statusCode === 200)) {
                _context15.next = 25;
                break;
              }
              _response$data2 = response === null || response === void 0 ? void 0 : response.data, orderdBy = _response$data2.orderdBy, orderRestaurant = _response$data2.orderRestaurant;
              _context15.next = 11;
              return userService.get(orderdBy);
            case 11:
              _yield$userService$ge3 = _context15.sent;
              userData = _yield$userService$ge3.data;
              _context15.next = 15;
              return restaurantService.get(orderRestaurant);
            case 15:
              _yield$restaurantServ2 = _context15.sent;
              restaurantData = _yield$restaurantServ2.data;
              userPayload = {
                subTitle: restaurantData.name,
                title: "Delivery Agent Assigned",
                body: "Your order is on its way!",
                orderId: response.data.orderId,
                userId: userData._id
              };
              restaurantPayload = {
                subTitle: "Delivery Boy phone Number: ".concat(deliveryBoyResponse === null || deliveryBoyResponse === void 0 ? void 0 : (_deliveryBoyResponse$ = deliveryBoyResponse.data) === null || _deliveryBoyResponse$ === void 0 ? void 0 : _deliveryBoyResponse$.phone),
                title: "Delivery Boy phone Number: ".concat(deliveryBoyResponse === null || deliveryBoyResponse === void 0 ? void 0 : (_deliveryBoyResponse$2 = deliveryBoyResponse.data) === null || _deliveryBoyResponse$2 === void 0 ? void 0 : _deliveryBoyResponse$2.phone),
                body: "Order Alert: A Delivery has Assigned For this order #".concat(response.data.orderId, " "),
                sound: 'default',
                orderId: response.data.orderId,
                restaurantId: restaurantData._id
              };
              userData === null || userData === void 0 ? void 0 : (_userData$deviceToken3 = userData.deviceToken) === null || _userData$deviceToken3 === void 0 ? void 0 : _userData$deviceToken3.forEach(function (token) {
                sendNotificationToUser(userPayload.subTitle, userPayload.body, userPayload.title, token, userPayload.orderId, userPayload.userId);
              });
              restaurantData === null || restaurantData === void 0 ? void 0 : (_restaurantData$devic = restaurantData.deviceToken) === null || _restaurantData$devic === void 0 ? void 0 : _restaurantData$devic.forEach(function (token) {
                sendNotificationToRestaurant(restaurantPayload.subTitle, restaurantPayload.body, restaurantPayload.title, token, restaurantPayload.orderId, restaurantPayload.userId);
              });
              _context15.next = 23;
              return this.userNotificationService.insert(userPayload);
            case 23:
              _context15.next = 25;
              return this.restaurantNotificationService.insert(restaurantPayload);
            case 25:
              return _context15.abrupt("return", res.status(response.statusCode).send(response));
            case 26:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function acceptOrder(_x38, _x39) {
        return _acceptOrder.apply(this, arguments);
      }
      return acceptOrder;
    }()
  }, {
    key: "completeOrder",
    value: function () {
      var _completeOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
        var _response$data4;
        var deliveryBoy, response, _userData$deviceToken4, _restaurantData$devic2, _response$data3, orderdBy, orderRestaurant, _yield$userService$ge4, userData, _yield$restaurantServ3, restaurantData, userPayload, restaurantPayload, deliveryBoyResponse;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              deliveryBoy = req.body.deliveryBoy;
              _context16.next = 3;
              return this.service.completeOrder(req, deliveryBoy);
            case 3:
              response = _context16.sent;
              if (!(response.statusCode === 200)) {
                _context16.next = 22;
                break;
              }
              _response$data3 = response === null || response === void 0 ? void 0 : response.data, orderdBy = _response$data3.orderdBy, orderRestaurant = _response$data3.orderRestaurant;
              _context16.next = 8;
              return userService.get(orderdBy);
            case 8:
              _yield$userService$ge4 = _context16.sent;
              userData = _yield$userService$ge4.data;
              _context16.next = 12;
              return restaurantService.get(orderRestaurant);
            case 12:
              _yield$restaurantServ3 = _context16.sent;
              restaurantData = _yield$restaurantServ3.data;
              userPayload = {
                subTitle: restaurantData.name,
                title: "Your delivery has been completed.",
                body: "Thank you for placing your order with us!",
                orderId: response.data.orderId,
                userId: userData._id
              };
              restaurantPayload = {
                subTitle: "Your order is being delivered by our agent.",
                title: "Delivery Alert: Your order is being delivered.",
                body: "Order Delivered: Your delivery has been completed.",
                sound: 'default',
                orderId: response.data.orderId,
                restaurantId: restaurantData._id
              };
              userData === null || userData === void 0 ? void 0 : (_userData$deviceToken4 = userData.deviceToken) === null || _userData$deviceToken4 === void 0 ? void 0 : _userData$deviceToken4.forEach(function (token) {
                sendNotificationToUser(userPayload.subTitle, userPayload.body, userPayload.title, token, userPayload.orderId, userPayload.userId);
              });
              restaurantData === null || restaurantData === void 0 ? void 0 : (_restaurantData$devic2 = restaurantData.deviceToken) === null || _restaurantData$devic2 === void 0 ? void 0 : _restaurantData$devic2.forEach(function (token) {
                sendNotificationToRestaurant(restaurantPayload.subTitle, restaurantPayload.body, restaurantPayload.title, token, restaurantPayload.orderId, restaurantPayload.userId);
              });
              _context16.next = 20;
              return this.userNotificationService.insert(userPayload);
            case 20:
              _context16.next = 22;
              return this.restaurantNotificationService.insert(restaurantPayload);
            case 22:
              _context16.next = 24;
              return this.deliveryBoyService.get(response === null || response === void 0 ? void 0 : (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.deliveryBoy);
            case 24:
              deliveryBoyResponse = _context16.sent;
              return _context16.abrupt("return", res.status(response.statusCode).send(response));
            case 26:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function completeOrder(_x40, _x41) {
        return _completeOrder.apply(this, arguments);
      }
      return completeOrder;
    }()
  }, {
    key: "getRestaurantDashboardData",
    value: function () {
      var _getRestaurantDashboardData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
        var token, _verify4, id, RestroStatus, response;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              token = req.headers.authorization.replace('Bearer ', '');
              _verify4 = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET), id = _verify4.id;
              _context17.next = 4;
              return this.restaurantService.getOne({
                _id: id
              });
            case 4:
              RestroStatus = _context17.sent;
              _context17.next = 7;
              return this.service.getRestaurantDashboardData(id, RestroStatus.data);
            case 7:
              response = _context17.sent;
              return _context17.abrupt("return", res.status(response.statusCode).send(response));
            case 9:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function getRestaurantDashboardData(_x42, _x43) {
        return _getRestaurantDashboardData.apply(this, arguments);
      }
      return getRestaurantDashboardData;
    }()
  }, {
    key: "deliveryBoyAllOrder",
    value: function () {
      var _deliveryBoyAllOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
        var id, response;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              id = req.user;
              _context18.next = 3;
              return this.service.deliveryBoyAllOrder(req.query, id);
            case 3:
              response = _context18.sent;
              return _context18.abrupt("return", res.status(response.statusCode).send(response));
            case 5:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function deliveryBoyAllOrder(_x44, _x45) {
        return _deliveryBoyAllOrder.apply(this, arguments);
      }
      return deliveryBoyAllOrder;
    }()
  }, {
    key: "deliveryBoyOrderHistory",
    value: function () {
      var _deliveryBoyOrderHistory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
        var id, response;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              id = req.user;
              _context19.next = 3;
              return this.service.deliveryBoyOrderHistory(req.query, id);
            case 3:
              response = _context19.sent;
              return _context19.abrupt("return", res.status(response.statusCode).send(response));
            case 5:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function deliveryBoyOrderHistory(_x46, _x47) {
        return _deliveryBoyOrderHistory.apply(this, arguments);
      }
      return deliveryBoyOrderHistory;
    }()
  }, {
    key: "deliveryBoyDashboardData",
    value: function () {
      var _deliveryBoyDashboardData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return this.service.deliveryBoyDashboardData(req);
            case 2:
              response = _context20.sent;
              return _context20.abrupt("return", res.status(response.statusCode).send(response));
            case 4:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function deliveryBoyDashboardData(_x48, _x49) {
        return _deliveryBoyDashboardData.apply(this, arguments);
      }
      return deliveryBoyDashboardData;
    }()
  }]);
  return OrderController;
}(_Controller2["default"]);
var _default = new OrderController(orderService, userService, restaurantService, deliveryBoyService, userNotificationService, restaurantNotificationService);
exports["default"] = _default;