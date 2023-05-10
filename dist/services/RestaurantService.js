"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Service2 = _interopRequireDefault(require("./Service"));
var _csvParser = _interopRequireDefault(require("csv-parser"));
var _fs = _interopRequireDefault(require("fs"));
var _moment = _interopRequireDefault(require("moment"));
var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));
var _axios = _interopRequireDefault(require("axios"));
var _url = require("url");
var _geocoder = _interopRequireDefault(require("../helpers/geocoder"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
// const fs = require('fs').promises;
_dotenv["default"].config();
var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var from = process.env.PHONE_NUMBER;
var twilio = require('twilio')(accountSid, authToken);
var RestaurantService = /*#__PURE__*/function (_Service) {
  _inherits(RestaurantService, _Service);
  var _super = _createSuper(RestaurantService);
  function RestaurantService(model) {
    _classCallCheck(this, RestaurantService);
    return _super.call(this, model);
  }
  _createClass(RestaurantService, [{
    key: "sendOtp",
    value: function () {
      var _sendOtp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req) {
        var _req$body, phoneNumber, _req$body$role, role, user, otp, expirationTime, payload, message, statusCode, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, phoneNumber = _req$body.phoneNumber, _req$body$role = _req$body.role, role = _req$body$role === void 0 ? 'restaurant' : _req$body$role;
              _context.next = 4;
              return this.model.findOne({
                phoneNumber: phoneNumber
              });
            case 4:
              user = _context.sent;
              if (user) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", {
                error: true,
                message: "Restaurant with phone number ".concat(phoneNumber, " does not exist."),
                statusCode: 401,
                data: null
              });
            case 7:
              if (!((user === null || user === void 0 ? void 0 : user.deleted) == true || (user === null || user === void 0 ? void 0 : user.status) == 'suspend')) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return", {
                error: true,
                message: "This Number: ".concat(phoneNumber, " is suspend from Plese reach to Admin"),
                statusCode: 400,
                data: null
              });
            case 9:
              otp = (user === null || user === void 0 ? void 0 : user.phoneNumber) == '+919999999999' ? 111111 : Math.floor(100000 + Math.random() * 900000);
              expirationTime = (0, _moment["default"])().add(5, 'minutes').format();
              payload = {
                isAccountVerifiedOtp: otp,
                otpExpirationTime: expirationTime,
                role: role
              };
              message = "Your security code for Pootatos is ".concat(otp, ". This OTP is valid for 5 minutes.");
              statusCode = 200;
              _context.next = 16;
              return twilio.messages.create({
                body: message,
                from: from,
                to: phoneNumber
              });
            case 16:
              _context.next = 18;
              return this.model.findByIdAndUpdate(user._id, payload, {
                "new": true
              });
            case 18:
              data = _context.sent;
              return _context.abrupt("return", {
                error: false,
                message: "OTP sent to mobile ".concat(phoneNumber, " number"),
                statusCode: statusCode,
                data: data
              });
            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", {
                error: true,
                message: "Error while sending OTP: ".concat(_context.t0.message),
                statusCode: 400,
                data: null
              });
            case 25:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 22]]);
      }));
      function sendOtp(_x) {
        return _sendOtp.apply(this, arguments);
      }
      return sendOtp;
    }()
  }, {
    key: "reSendOtp",
    value: function () {
      var _reSendOtp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req) {
        var phoneNumber, user, otp, expirationTime, message, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              phoneNumber = req.body.phoneNumber;
              if (phoneNumber) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: 'Phone number is required!',
                statusCode: 400,
                data: null
              });
            case 4:
              _context2.next = 6;
              return this.model.findOne({
                phoneNumber: phoneNumber
              });
            case 6:
              user = _context2.sent;
              if (!(user === null)) {
                _context2.next = 9;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: 'User with this mobile number does not exist',
                statusCode: 401,
                data: null
              });
            case 9:
              otp = Math.floor(100000 + Math.random() * 900000);
              expirationTime = (0, _moment["default"])().add(5, 'minutes').format();
              user.isAccountVerifiedOtp = otp;
              user.otpExpirationTime = expirationTime;
              _context2.next = 15;
              return user.save();
            case 15:
              message = "Your Security code for Pootatos ".concat(otp, ", OTP is valid for 5 minutes");
              _context2.next = 18;
              return twilio.messages.create({
                body: message,
                from: from,
                to: phoneNumber
              });
            case 18:
              result = _context2.sent;
              return _context2.abrupt("return", {
                error: false,
                message: 'OTP sent to mobile number',
                statusCode: 200,
                data: "OTP has been sent to ".concat(phoneNumber)
              });
            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: true,
                message: _context2.t0.message,
                statusCode: 400,
                data: null
              });
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 22]]);
      }));
      function reSendOtp(_x2) {
        return _reSendOtp.apply(this, arguments);
      }
      return reSendOtp;
    }()
  }, {
    key: "otpVerified",
    value: function () {
      var _otpVerified = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req) {
        var _req$body2, phoneNumber, verifiedOtp, _req$body2$deviceToke, deviceToken, requiredFields, missingFields, user, now, otpExpirationTime, updatedUserData, token;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _req$body2 = req.body, phoneNumber = _req$body2.phoneNumber, verifiedOtp = _req$body2.verifiedOtp, _req$body2$deviceToke = _req$body2.deviceToken, deviceToken = _req$body2$deviceToke === void 0 ? null : _req$body2$deviceToke; // check if all input is provided
              requiredFields = ['phoneNumber', 'verifiedOtp'];
              missingFields = requiredFields.filter(function (field) {
                return !req.body[field];
              });
              if (!(missingFields.length > 0)) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", {
                error: true,
                message: "Missing required fields: ".concat(missingFields.join(', ')),
                statusCode: 400,
                data: null
              });
            case 5:
              _context3.prev = 5;
              _context3.next = 8;
              return this.model.findOne({
                phoneNumber: phoneNumber
              });
            case 8:
              user = _context3.sent;
              if (user) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return", {
                error: true,
                message: 'User not found',
                statusCode: 404,
                data: null
              });
            case 11:
              if (!(user.isAccountVerifiedOtp !== Number(verifiedOtp))) {
                _context3.next = 13;
                break;
              }
              return _context3.abrupt("return", {
                error: true,
                message: 'Invalid OTP',
                statusCode: 401,
                data: null
              });
            case 13:
              now = (0, _moment["default"])();
              otpExpirationTime = (0, _moment["default"])(user.otpExpirationTime);
              if (!now.isAfter(otpExpirationTime)) {
                _context3.next = 17;
                break;
              }
              return _context3.abrupt("return", {
                error: true,
                message: 'OTP has expired',
                statusCode: 401,
                data: null
              });
            case 17:
              // Update user data if OTP is valid
              user.isAccountVerified = true;
              user.isAccountVerifiedOtp = null;
              user.otpExpirationTime = null;
              _context3.next = 22;
              return this.model.findByIdAndUpdate(user._id, user, {
                "new": true
              });
            case 22:
              updatedUserData = _context3.sent;
              token = _jsonwebtoken["default"].sign({
                id: user._id,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                isAccountVerified: user.isAccountVerified
              }, process.env.JWT_SECRET, {
                expiresIn: '7d'
              });
              if (!(deviceToken != null)) {
                _context3.next = 27;
                break;
              }
              _context3.next = 27;
              return this.model.findByIdAndUpdate({
                _id: user._id
              }, {
                $push: {
                  deviceToken: deviceToken
                }
              });
            case 27:
              return _context3.abrupt("return", {
                error: false,
                message: 'Your account has been successfully verified',
                statusCode: 200,
                token: token,
                data: updatedUserData
              });
            case 30:
              _context3.prev = 30;
              _context3.t0 = _context3["catch"](5);
              return _context3.abrupt("return", {
                error: true,
                message: "Error while account verifying ".concat(_context3.t0.message),
                statusCode: 400,
                data: null
              });
            case 33:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[5, 30]]);
      }));
      function otpVerified(_x3) {
        return _otpVerified.apply(this, arguments);
      }
      return otpVerified;
    }()
  }, {
    key: "createRestaurant",
    value: function () {
      var _createRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req) {
        var _payload, _req$body3, address, name, description, email, phoneNumber, images, category_id, newImages, imagesData, requiredFields, missingFields, existingRestaurant, message, perOrderCommission, deliveryCharges, payload, data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body3 = req.body, address = _req$body3.address, name = _req$body3.name, description = _req$body3.description, email = _req$body3.email, phoneNumber = _req$body3.phoneNumber, images = _req$body3.images, category_id = _req$body3.category_id;
              newImages = ['https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'];
              if (!images) {
                _context4.next = 8;
                break;
              }
              imagesData = images.map(function (item) {
                var imageString = item;
                var base64Data = imageString.replace(/^data:image\/png;base64,/, "");
                // Store Image into Server
                var d = new Date();
                var text = d.toString();
                var javaScriptRelease = Date.parse(d);
                var imageName = "images/restaurant_".concat(javaScriptRelease, "_image.png");
                var fs2 = _fs["default"].promises;
                fs2.chmod(imageName, 511, function () {
                  fs2.writeFile(imageName, base64Data, 'base64', function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('coverted');
                    }
                  });
                });
                return imageName;
              });
              _context4.next = 7;
              return Promise.all(imagesData);
            case 7:
              newImages = _context4.sent;
            case 8:
              // check if all input is provided
              requiredFields = ['address', 'name', 'phoneNumber', 'category_id'];
              missingFields = requiredFields.filter(function (field) {
                return !req.body[field];
              });
              if (!(missingFields.length > 0)) {
                _context4.next = 12;
                break;
              }
              return _context4.abrupt("return", {
                error: true,
                message: "Missing required fields: ".concat(missingFields.join(', ')),
                statusCode: 400,
                data: null
              });
            case 12:
              _context4.next = 14;
              return this.model.findOne({
                $or: [{
                  email: email
                }, {
                  phoneNumber: phoneNumber
                }]
              });
            case 14:
              existingRestaurant = _context4.sent;
              if (!existingRestaurant) {
                _context4.next = 18;
                break;
              }
              message = existingRestaurant.email === email ? 'Email Already Exist' : 'Phone Number Already Exist';
              return _context4.abrupt("return", {
                error: true,
                message: message,
                statusCode: 400,
                data: null
              });
            case 18:
              // const loc = await geocoder.geocode(address);
              // if (
              //   !loc ||
              //   !loc[0] ||
              //   !loc[0].longitude ||
              //   !loc[0].latitude ||
              //   !loc[0].formattedAddress
              // ) {
              //   return {
              //     error: true,
              //     message: 'Invalid address.',
              //     statusCode: 400,
              //     data: null,
              //   };
              // }
              // const location = {
              //   type: 'Point',
              //   coordinates: [loc[0].longitude, loc[0].latitude],
              //   formattedAddress: loc[0].formattedAddress,
              //   street: loc[0].streetName,
              //   city: loc[0].city,
              //   state: loc[0].administrativeLevels.level1long,
              //   zipcode: loc[0].zipcode,
              //   country: loc[0].country,
              //   countryCode: loc[0].countryCode,
              // };
              perOrderCommission = [{
                minOrderAmount: 50,
                maxOrderAmount: 299,
                charge: 15
              }, {
                minOrderAmount: 300,
                maxOrderAmount: 50000,
                charge: 20
              }, {
                minOrderAmount: 500000,
                maxOrderAmount: 1000000000,
                charge: 25
              }];
              deliveryCharges = [{
                minOrderAmount: 50,
                maxOrderAmount: 100,
                charge: 15
              }, {
                minOrderAmount: 101,
                maxOrderAmount: 500,
                charge: 15
              }, {
                minOrderAmount: 501,
                maxOrderAmount: 1000000000,
                charge: 15
              }];
              payload = (_payload = {
                address: address,
                name: name,
                description: description,
                email: email,
                phoneNumber: phoneNumber,
                images: newImages,
                deliveryCharges: deliveryCharges,
                perOrderCommission: perOrderCommission,
                category_id: category_id
              }, _defineProperty(_payload, "address", address), _defineProperty(_payload, "customerSupport", {
                email: email,
                phoneNumber: phoneNumber
              }), _payload);
              _context4.next = 23;
              return this.model.create(payload);
            case 23:
              data = _context4.sent;
              return _context4.abrupt("return", {
                error: false,
                message: "sucess",
                statusCode: 200,
                data: data
              });
            case 27:
              _context4.prev = 27;
              _context4.t0 = _context4["catch"](0);
              console.log('createRestorent', _context4.t0);
              return _context4.abrupt("return", {
                error: true,
                message: _context4.t0.message,
                statusCode: 400,
                data: null
              });
            case 31:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 27]]);
      }));
      function createRestaurant(_x4) {
        return _createRestaurant.apply(this, arguments);
      }
      return createRestaurant;
    }()
  }, {
    key: "updateRestaurant",
    value: function () {
      var _updateRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req) {
        var _payload2, _req$body4, address, name, ownerName, description, email, phoneNumber, images, category_id, deliveryCharges, perOrderCommission, _id, requiredFields, missingFields, existingRestaurant, message, imagesData, newImages, payload, data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body4 = req.body, address = _req$body4.address, name = _req$body4.name, ownerName = _req$body4.ownerName, description = _req$body4.description, email = _req$body4.email, phoneNumber = _req$body4.phoneNumber, images = _req$body4.images, category_id = _req$body4.category_id, deliveryCharges = _req$body4.deliveryCharges, perOrderCommission = _req$body4.perOrderCommission;
              _id = req.params.id; // check if all input is provided
              requiredFields = ['address', 'name', 'phoneNumber', 'category_id', 'perOrderCommission'];
              missingFields = requiredFields.filter(function (field) {
                return !req.body[field];
              });
              if (!(missingFields.length > 0)) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", {
                error: true,
                message: "Missing required fields: ".concat(missingFields.join(', ')),
                statusCode: 400,
                data: null
              });
            case 7:
              _context5.next = 9;
              return this.model.findOne({
                _id: {
                  $ne: _id
                },
                $or: [{
                  email: email
                }, {
                  phoneNumber: phoneNumber
                }]
              });
            case 9:
              existingRestaurant = _context5.sent;
              if (!existingRestaurant) {
                _context5.next = 13;
                break;
              }
              message = existingRestaurant.email === email ? 'Email Already Exist' : 'Phone Number Already Exist';
              return _context5.abrupt("return", {
                error: true,
                message: message,
                statusCode: 400,
                data: null
              });
            case 13:
              // const loc = await geocoder.geocode(address);
              // if (
              //   !loc ||
              //   !loc[0] ||
              //   !loc[0].longitude ||
              //   !loc[0].latitude ||
              //   !loc[0].formattedAddress
              // ) {
              //   return {
              //     error: true,
              //     message: 'Invalid address.',
              //     statusCode: 400,
              //     data: null,
              //   };
              // }
              // const location = {
              //   type: 'Point',
              //   coordinates: [loc[0].longitude, loc[0].latitude],
              //   formattedAddress: loc[0].formattedAddress,
              //   street: loc[0].streetName,
              //   city: loc[0].city,
              //   state: loc[0].administrativeLevels.level1long,
              //   zipcode: loc[0].zipcode,
              //   country: loc[0].country,
              //   countryCode: loc[0].countryCode,
              // };
              imagesData = images.map(function (item) {
                var imageString = item;
                var base64Data = imageString.replace(/^data:image\/png;base64,/, "");
                var base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                var isBase64 = base64RegExp.test(base64Data);
                if (isBase64) {
                  // Store Image into Server
                  var d = new Date();
                  var text = d.toString();
                  var javaScriptRelease = Date.parse(d);
                  var imageName = "images/restaurant_".concat(javaScriptRelease, "_image.png");
                  var fs2 = _fs["default"];
                  fs2.chmod(imageName, 511, function () {
                    fs2.writeFile(imageName, base64Data, 'base64', function (err) {
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
              _context5.next = 16;
              return Promise.all(imagesData);
            case 16:
              newImages = _context5.sent;
              payload = (_payload2 = {
                address: address,
                name: name,
                ownerName: ownerName,
                description: description,
                email: email,
                phoneNumber: phoneNumber,
                images: newImages,
                deliveryCharges: deliveryCharges,
                perOrderCommission: perOrderCommission,
                category_id: category_id
              }, _defineProperty(_payload2, "address", address), _defineProperty(_payload2, "customerSupport", {
                email: email,
                phoneNumber: phoneNumber
              }), _payload2);
              _context5.next = 20;
              return this.model.findByIdAndUpdate(_id, payload, {
                "new": true
              });
            case 20:
              data = _context5.sent;
              return _context5.abrupt("return", {
                error: false,
                message: "sucess",
                statusCode: 200,
                data: data
              });
            case 24:
              _context5.prev = 24;
              _context5.t0 = _context5["catch"](0);
              console.log('updateRestorent', _context5.t0);
              return _context5.abrupt("return", {
                error: true,
                message: _context5.t0.message,
                statusCode: 400,
                data: null
              });
            case 28:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 24]]);
      }));
      function updateRestaurant(_x5) {
        return _updateRestaurant.apply(this, arguments);
      }
      return updateRestaurant;
    }()
  }, {
    key: "insertCsvData",
    value: function () {
      var _insertCsvData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req) {
        var _this = this;
        var results, data;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return parseCsvData(req.file.path);
            case 3:
              results = _context7.sent;
              _context7.next = 6;
              return Promise.all(results.map( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(element) {
                  var perOrderCommission;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        perOrderCommission = [{
                          minOrderAmount: 50,
                          maxOrderAmount: 100,
                          charge: 10
                        }, {
                          minOrderAmount: 101,
                          maxOrderAmount: 500,
                          charge: 15
                        }, {
                          minOrderAmount: 501,
                          maxOrderAmount: 1000000000,
                          charge: 20
                        }];
                        element.perOrderCommission = perOrderCommission;
                        _context6.next = 4;
                        return _this.model.create(element);
                      case 4:
                        return _context6.abrupt("return", _context6.sent);
                      case 5:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x7) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 6:
              data = _context7.sent;
              return _context7.abrupt("return", {
                error: false,
                message: 'Successfully inserted data',
                statusCode: 201,
                data: data
              });
            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", {
                error: true,
                message: _context7.t0.message,
                statusCode: 400,
                data: null
              });
            case 13:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 10]]);
      }));
      function insertCsvData(_x6) {
        return _insertCsvData.apply(this, arguments);
      }
      return insertCsvData;
    }()
  }, {
    key: "getAllRestaurant",
    value: function () {
      var _getAllRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(query, user) {
        var _query$skip, skip, _query$limit, limit, _query$search, search, offset, restQuery, UserAddress, restaurantQuery, searchRegex, restaurants, total, distancePromises, restaurantsWithDistance;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _query$skip = query.skip, skip = _query$skip === void 0 ? 1 : _query$skip, _query$limit = query.limit, limit = _query$limit === void 0 ? 10 : _query$limit, _query$search = query.search, search = _query$search === void 0 ? '' : _query$search;
              offset = (skip - 1) * limit;
              restQuery = _extends({}, (_objectDestructuringEmpty(query), query)); //if (user?.address) {
              UserAddress = user !== null && user !== void 0 && user.address ? user.address : "Anand Nagar, Tharad, Gujarat 385565";
              restaurantQuery = _objectSpread(_objectSpread({}, restQuery), {}, {
                status: {
                  $ne: 'suspend'
                },
                deleted: {
                  $ne: true
                }
              });
              if (search) {
                searchRegex = new RegExp(search, 'i');
                restaurantQuery = _objectSpread(_objectSpread({}, restaurantQuery), {}, {
                  $or: [{
                    name: searchRegex
                  }, {
                    description: searchRegex
                  }, {
                    'location.state': searchRegex
                  }, {
                    'location.city': searchRegex
                  }, {
                    'location.country': searchRegex
                  }, {
                    'location.zip': searchRegex
                  }, {
                    address: searchRegex
                  }]
                });
              }
              _context9.next = 9;
              return this.model.find(restaurantQuery).select('-password').populate('category_id', '-image').skip(offset).limit(limit).sort({
                createdAt: -1
              });
            case 9:
              restaurants = _context9.sent;
              _context9.next = 12;
              return this.model.countDocuments(restaurantQuery);
            case 12:
              total = _context9.sent;
              distancePromises = restaurants.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(restaurant) {
                  var distanceInKm;
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        // const distanceInKm = await getDistance(UserAddress, restaurant.address);
                        distanceInKm = 3;
                        return _context8.abrupt("return", _objectSpread(_objectSpread({}, restaurant.toObject()), {}, {
                          distanceInKm: distanceInKm
                        }));
                      case 2:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x10) {
                  return _ref2.apply(this, arguments);
                };
              }());
              _context9.next = 16;
              return Promise.all(distancePromises);
            case 16:
              restaurantsWithDistance = _context9.sent;
              return _context9.abrupt("return", {
                error: false,
                message: 'Request successful',
                statusCode: 200,
                total: total,
                data: restaurantsWithDistance
              });
            case 20:
              _context9.prev = 20;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", {
                error: true,
                message: _context9.t0.message,
                statusCode: 400,
                data: null
              });
            case 23:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 20]]);
      }));
      function getAllRestaurant(_x8, _x9) {
        return _getAllRestaurant.apply(this, arguments);
      }
      return getAllRestaurant;
    }()
  }, {
    key: "getAllRestaurant2",
    value: function () {
      var _getAllRestaurant2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(query, user) {
        var _query$start, start, _query$end, end, _query$search2, search, limit, restQuery, UserAddress, restaurantQuery, searchRegex, restaurants, total, distancePromises, restaurantsWithDistance;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _query$start = query.start, start = _query$start === void 0 ? 1 : _query$start, _query$end = query.end, end = _query$end === void 0 ? 10 : _query$end, _query$search2 = query.search, search = _query$search2 === void 0 ? '' : _query$search2;
              limit = Number(end) - (start - 1);
              restQuery = _extends({}, (_objectDestructuringEmpty(query), query)); //if (user?.address) {
              UserAddress = user !== null && user !== void 0 && user.address ? user.address : "Anand Nagar, Tharad, Gujarat 385565";
              restaurantQuery = _objectSpread(_objectSpread({}, restQuery), {}, {
                status: {
                  $ne: 'suspend'
                },
                deleted: {
                  $ne: true
                }
              });
              if (search) {
                searchRegex = new RegExp(search, 'i');
                restaurantQuery = _objectSpread(_objectSpread({}, restaurantQuery), {}, {
                  $or: [{
                    name: searchRegex
                  }, {
                    description: searchRegex
                  }, {
                    'location.state': searchRegex
                  }, {
                    'location.city': searchRegex
                  }, {
                    'location.country': searchRegex
                  }, {
                    'location.zip': searchRegex
                  }, {
                    address: searchRegex
                  }]
                });
              }
              _context11.next = 9;
              return this.model.find(restaurantQuery).select('-password').populate('category_id', '-image').skip(start - 1).limit(limit).sort({
                createdAt: -1
              });
            case 9:
              restaurants = _context11.sent;
              _context11.next = 12;
              return this.model.countDocuments(restaurantQuery);
            case 12:
              total = _context11.sent;
              distancePromises = restaurants.map( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(restaurant) {
                  var distanceInKm;
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        // const distanceInKm = await getDistance(UserAddress, restaurant.address);
                        distanceInKm = 3;
                        return _context10.abrupt("return", _objectSpread(_objectSpread({}, restaurant.toObject()), {}, {
                          distanceInKm: distanceInKm
                        }));
                      case 2:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                }));
                return function (_x13) {
                  return _ref3.apply(this, arguments);
                };
              }());
              _context11.next = 16;
              return Promise.all(distancePromises);
            case 16:
              restaurantsWithDistance = _context11.sent;
              return _context11.abrupt("return", {
                error: false,
                message: 'Request successful',
                statusCode: 200,
                total: total,
                data: restaurantsWithDistance
              });
            case 20:
              _context11.prev = 20;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", {
                error: true,
                message: _context11.t0.message,
                statusCode: 400,
                data: null
              });
            case 23:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[0, 20]]);
      }));
      function getAllRestaurant2(_x11, _x12) {
        return _getAllRestaurant2.apply(this, arguments);
      }
      return getAllRestaurant2;
    }()
  }, {
    key: "getAllAdminRestaurant",
    value: function () {
      var _getAllAdminRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(query) {
        var skip, limit, id, items, total;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              skip = query.skip, limit = query.limit;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              id = query._id;
              if (id) {
                try {
                  // eslint-disable-next-line no-underscore-dangle
                  id = new mongoose.mongo.ObjectId(id);
                } catch (error) {
                  // console.log('not able to generate mongoose id with content', id);
                }
              }
              query.deleted = {
                $ne: true
              };
              _context12.prev = 9;
              _context12.next = 12;
              return this.model.find(query).skip(skip).limit(limit).sort({
                createdAt: -1
              });
            case 12:
              items = _context12.sent;
              _context12.next = 15;
              return this.model.countDocuments(query);
            case 15:
              total = _context12.sent;
              return _context12.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 19:
              _context12.prev = 19;
              _context12.t0 = _context12["catch"](9);
              return _context12.abrupt("return", {
                error: true,
                message: _context12.t0.message,
                statusCode: 400,
                data: null
              });
            case 22:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[9, 19]]);
      }));
      function getAllAdminRestaurant(_x14) {
        return _getAllAdminRestaurant.apply(this, arguments);
      }
      return getAllAdminRestaurant;
    }()
  }, {
    key: "getSingleRestaurantAndThereMenu",
    value: function () {
      var _getSingleRestaurantAndThereMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(id) {
        var items;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return this.model.findById(id).populate('category_id', '-image');
            case 3:
              items = _context13.sent;
              return _context13.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: items
              });
            case 7:
              _context13.prev = 7;
              _context13.t0 = _context13["catch"](0);
              return _context13.abrupt("return", {
                error: true,
                message: _context13.t0.message,
                statusCode: 400,
                data: null
              });
            case 10:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this, [[0, 7]]);
      }));
      function getSingleRestaurantAndThereMenu(_x15) {
        return _getSingleRestaurantAndThereMenu.apply(this, arguments);
      }
      return getSingleRestaurantAndThereMenu;
    }()
  }, {
    key: "getRestaurantProfile",
    value: function () {
      var _getRestaurantProfile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req) {
        var token, _verify, id, items;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              token = req.headers.authorization.replace('Bearer ', '');
              _verify = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET), id = _verify.id;
              _context14.prev = 2;
              _context14.next = 5;
              return this.model.findById(id).populate('category_id', '-image');
            case 5:
              items = _context14.sent;
              if (items) {
                _context14.next = 8;
                break;
              }
              return _context14.abrupt("return", {
                error: true,
                message: "request not found",
                statusCode: 404,
                data: null
              });
            case 8:
              return _context14.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: items
              });
            case 11:
              _context14.prev = 11;
              _context14.t0 = _context14["catch"](2);
              return _context14.abrupt("return", {
                error: true,
                message: _context14.t0.message,
                statusCode: 400,
                data: null
              });
            case 14:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[2, 11]]);
      }));
      function getRestaurantProfile(_x16) {
        return _getRestaurantProfile.apply(this, arguments);
      }
      return getRestaurantProfile;
    }()
  }, {
    key: "getAllCategoryRestaurant",
    value: function () {
      var _getAllCategoryRestaurant = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req) {
        var id, items;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              id = req.params.id;
              _context15.prev = 1;
              _context15.next = 4;
              return this.model.find({
                category_id: {
                  $in: id
                },
                deleted: {
                  $ne: true
                }
              }).populate('category_id', '-image');
            case 4:
              items = _context15.sent;
              return _context15.abrupt("return", {
                error: false,
                message: 'request successful',
                statusCode: 200,
                data: items
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
        }, _callee15, this, [[1, 8]]);
      }));
      function getAllCategoryRestaurant(_x17) {
        return _getAllCategoryRestaurant.apply(this, arguments);
      }
      return getAllCategoryRestaurant;
    }()
  }, {
    key: "getPerOrderCommission",
    value: function () {
      var _getPerOrderCommission = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req) {
        var items;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              _context16.next = 3;
              return this.model.find(req.params, {
                perOrderCommission: 1
              });
            case 3:
              items = _context16.sent;
              if (items) {
                _context16.next = 6;
                break;
              }
              return _context16.abrupt("return", {
                error: true,
                message: "request not found",
                statusCode: 404,
                data: null
              });
            case 6:
              return _context16.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: items
              });
            case 9:
              _context16.prev = 9;
              _context16.t0 = _context16["catch"](0);
              return _context16.abrupt("return", {
                error: true,
                statusCode: 400,
                message: _context16.t0.message,
                data: null
              });
            case 12:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this, [[0, 9]]);
      }));
      function getPerOrderCommission(_x18) {
        return _getPerOrderCommission.apply(this, arguments);
      }
      return getPerOrderCommission;
    }()
  }, {
    key: "changeRestaurantStatus",
    value: function () {
      var _changeRestaurantStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req) {
        var token, _verify2, _id2, userData;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              token = req.headers.authorization.replace('Bearer ', '');
              _verify2 = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET), _id2 = _verify2.id;
              _context17.next = 5;
              return this.model.findByIdAndUpdate({
                _id: _id2
              }, req.body, {
                "new": true
              });
            case 5:
              userData = _context17.sent;
              if (!(userData === null)) {
                _context17.next = 8;
                break;
              }
              return _context17.abrupt("return", {
                error: true,
                message: "this ".concat(_id2, " id is not found  "),
                statusCode: 400,
                data: null
              });
            case 8:
              return _context17.abrupt("return", {
                error: false,
                message: "availability updated successfullly",
                statusCode: 200,
                data: userData
              });
            case 11:
              _context17.prev = 11;
              _context17.t0 = _context17["catch"](0);
              return _context17.abrupt("return", {
                error: true,
                message: "Error while changing user availability ".concat(_context17.t0.message),
                statusCode: 400,
                data: null
              });
            case 14:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this, [[0, 11]]);
      }));
      function changeRestaurantStatus(_x19) {
        return _changeRestaurantStatus.apply(this, arguments);
      }
      return changeRestaurantStatus;
    }()
  }, {
    key: "changeAllRestaurantStatus",
    value: function () {
      var _changeAllRestaurantStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req) {
        var userData;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              _context18.next = 3;
              return this.model.update({}, req.body, {
                "new": true
              });
            case 3:
              userData = _context18.sent;
              if (!(userData === null)) {
                _context18.next = 6;
                break;
              }
              return _context18.abrupt("return", {
                error: true,
                message: "this ".concat(id, " id is not found"),
                statusCode: 400,
                data: null
              });
            case 6:
              return _context18.abrupt("return", {
                error: false,
                message: "All availability updated successfullly",
                statusCode: 200,
                data: userData
              });
            case 9:
              _context18.prev = 9;
              _context18.t0 = _context18["catch"](0);
              return _context18.abrupt("return", {
                error: true,
                message: "Error while changing restaurant availability ".concat(_context18.t0.message),
                statusCode: 400,
                data: null
              });
            case 12:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this, [[0, 9]]);
      }));
      function changeAllRestaurantStatus(_x20) {
        return _changeAllRestaurantStatus.apply(this, arguments);
      }
      return changeAllRestaurantStatus;
    }()
  }, {
    key: "dataUpdate",
    value: function () {
      var _dataUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
        var _this2 = this;
        var items, _iterator, _step, _loop;
        return _regeneratorRuntime().wrap(function _callee20$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              _context21.prev = 0;
              _context21.next = 3;
              return this.model.find().select(['-password']);
            case 3:
              items = _context21.sent;
              //.sort({ createdAt: -1 });
              //let index = 0;
              _iterator = _createForOfIteratorHelper(items);
              _context21.prev = 5;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var x, images, data;
                return _regeneratorRuntime().wrap(function _loop$(_context20) {
                  while (1) switch (_context20.prev = _context20.next) {
                    case 0:
                      x = _step.value;
                      // var x = items;
                      //if (index == 0) {
                      images = x.images.map( /*#__PURE__*/function () {
                        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(image) {
                          var imageString, base64Data, str, base64RegExp, isBase64, imageName, newImage;
                          return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                            while (1) switch (_context19.prev = _context19.next) {
                              case 0:
                                imageString = image;
                                base64Data = imageString.replace(/^data:image\/png;base64,/, "");
                                str = base64Data;
                                base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/; // const base64RegExp = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;
                                isBase64 = base64RegExp.test(str);
                                console.log('isBase64', isBase64);
                                if (!isBase64) {
                                  _context19.next = 15;
                                  break;
                                }
                                imageName = "images/restaurant_".concat(x._id, "_image.png");
                                console.log(imageName);
                                _context19.next = 11;
                                return _fs["default"].writeFile(imageName, base64Data, 'base64');
                              case 11:
                                newImage = _context19.sent;
                                return _context19.abrupt("return", imageName);
                              case 15:
                                return _context19.abrupt("return", image);
                              case 16:
                              case "end":
                                return _context19.stop();
                            }
                          }, _callee19);
                        }));
                        return function (_x21) {
                          return _ref4.apply(this, arguments);
                        };
                      }());
                      _context20.next = 4;
                      return Promise.all(images);
                    case 4:
                      data = _context20.sent;
                      _context20.next = 7;
                      return _this2.model.findByIdAndUpdate(x._id, {
                        images: data
                      });
                    case 7:
                    case "end":
                      return _context20.stop();
                  }
                }, _loop);
              });
              _iterator.s();
            case 8:
              if ((_step = _iterator.n()).done) {
                _context21.next = 12;
                break;
              }
              return _context21.delegateYield(_loop(), "t0", 10);
            case 10:
              _context21.next = 8;
              break;
            case 12:
              _context21.next = 17;
              break;
            case 14:
              _context21.prev = 14;
              _context21.t1 = _context21["catch"](5);
              _iterator.e(_context21.t1);
            case 17:
              _context21.prev = 17;
              _iterator.f();
              return _context21.finish(17);
            case 20:
              return _context21.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                // total,
                data: items
              });
            case 23:
              _context21.prev = 23;
              _context21.t2 = _context21["catch"](0);
              return _context21.abrupt("return", {
                error: true,
                message: _context21.t2.message,
                statusCode: 400,
                data: null
              });
            case 26:
            case "end":
              return _context21.stop();
          }
        }, _callee20, this, [[0, 23], [5, 14, 17, 20]]);
      }));
      function dataUpdate() {
        return _dataUpdate.apply(this, arguments);
      }
      return dataUpdate;
    }()
  }]);
  return RestaurantService;
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

// async function getDistance(origin, destination) {
//   const params = new URLSearchParams({
//     origins: origin,
//     destinations: destination,
//     key: process.env.GEOCODER_API_KEY,
//   });

//   try {
//     const response = await axios.get(
//       'https://maps.googleapis.com/maps/api/distancematrix/json?' + params,
//     );
//     const distance = response.data.rows[0].elements[0].distance.text;
//     // console.log(`Distance between ${origin} and ${destination}: ${distance}`);
//     return distance;
//   } catch (error) {
//     console.error(error);
//   }
// }
var _default = RestaurantService;
exports["default"] = _default;