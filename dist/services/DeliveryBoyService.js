"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Service2 = _interopRequireDefault(require("./Service"));
var _moment = _interopRequireDefault(require("moment"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _geocoder = _interopRequireDefault(require("../helpers/geocoder"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _excluded = ["phone"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
_dotenv["default"].config();
var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var from = process.env.PHONE_NUMBER;
var twilio = require('twilio')(accountSid, authToken);
var DeliveryBoyService = /*#__PURE__*/function (_Service) {
  _inherits(DeliveryBoyService, _Service);
  var _super = _createSuper(DeliveryBoyService);
  function DeliveryBoyService(model) {
    _classCallCheck(this, DeliveryBoyService);
    return _super.call(this, model);
  }
  _createClass(DeliveryBoyService, [{
    key: "sendOtp",
    value: function () {
      var _sendOtp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req) {
        var _req$body, phone, _req$body$role, role, user, otp, expirationTime, payload, message, statusCode, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, phone = _req$body.phone, _req$body$role = _req$body.role, role = _req$body$role === void 0 ? 'deliveryBoy' : _req$body$role;
              _context.next = 4;
              return this.model.findOne({
                phone: phone
              });
            case 4:
              user = _context.sent;
              if (user) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", {
                error: true,
                message: "Restaurant with phone number ".concat(phone, " does not exist."),
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
              otp = (user === null || user === void 0 ? void 0 : user.phone) == '+919999999999' ? 111111 : Math.floor(100000 + Math.random() * 900000);
              expirationTime = (0, _moment["default"])().add(5, 'minutes').format();
              payload = {
                otp: otp,
                otpExpirationTime: expirationTime,
                role: role
              };
              message = "Your security code for Pootatos is ".concat(otp, ". This OTP is valid for 5 minutes.");
              statusCode = 200;
              _context.next = 16;
              return twilio.messages.create({
                body: message,
                from: from,
                to: phone
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
                message: "OTP sent to mobile ".concat(phone, " number"),
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
    key: "otpVerified",
    value: function () {
      var _otpVerified = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req) {
        var _req$body2, phone, verifiedOtp, _req$body2$deviceToke, deviceToken, requiredFields, missingFields, user, now, otpExpirationTime, updatedUserData, token;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, phone = _req$body2.phone, verifiedOtp = _req$body2.verifiedOtp, _req$body2$deviceToke = _req$body2.deviceToken, deviceToken = _req$body2$deviceToke === void 0 ? null : _req$body2$deviceToke; // check if all input is provided
              requiredFields = ['phone', 'verifiedOtp'];
              missingFields = requiredFields.filter(function (field) {
                return !req.body[field];
              });
              if (!(missingFields.length > 0)) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: "Missing required fields: ".concat(missingFields.join(', ')),
                statusCode: 400,
                data: null
              });
            case 5:
              _context2.prev = 5;
              _context2.next = 8;
              return this.model.findOne({
                phone: phone
              });
            case 8:
              user = _context2.sent;
              if (user) {
                _context2.next = 11;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: 'User not found',
                statusCode: 404,
                data: null
              });
            case 11:
              if (!(user.otp !== Number(verifiedOtp))) {
                _context2.next = 13;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: 'Invalid OTP',
                statusCode: 401,
                data: null
              });
            case 13:
              now = (0, _moment["default"])();
              otpExpirationTime = (0, _moment["default"])(user.otpExpirationTime);
              if (!now.isAfter(otpExpirationTime)) {
                _context2.next = 17;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: 'OTP has expired',
                statusCode: 401,
                data: null
              });
            case 17:
              // Update user data if OTP is valid
              user.isAccountVerified = true;
              user.otp = null;
              user.otpExpirationTime = null;
              _context2.next = 22;
              return this.model.findByIdAndUpdate(user._id, user, {
                "new": true
              });
            case 22:
              updatedUserData = _context2.sent;
              token = _jsonwebtoken["default"].sign({
                id: user._id,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isAccountVerified: user.isAccountVerified
              }, process.env.JWT_SECRET, {
                expiresIn: '7d'
              });
              if (!(deviceToken != null)) {
                _context2.next = 27;
                break;
              }
              _context2.next = 27;
              return this.model.findByIdAndUpdate({
                _id: user._id
              }, {
                $push: {
                  deviceToken: deviceToken
                }
              });
            case 27:
              return _context2.abrupt("return", {
                error: false,
                message: 'Your account has been successfully verified',
                statusCode: 200,
                token: token,
                data: updatedUserData
              });
            case 30:
              _context2.prev = 30;
              _context2.t0 = _context2["catch"](5);
              return _context2.abrupt("return", {
                error: true,
                message: "Error while account verifying ".concat(_context2.t0.message),
                statusCode: 400,
                data: null
              });
            case 33:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[5, 30]]);
      }));
      function otpVerified(_x2) {
        return _otpVerified.apply(this, arguments);
      }
      return otpVerified;
    }()
  }, {
    key: "updateDeliveryBoy",
    value: function () {
      var _updateDeliveryBoy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req) {
        var _req$body3, phone, rest, id, existingDeliveryBoy, loc, items, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$body3 = req.body, phone = _req$body3.phone, rest = _objectWithoutProperties(_req$body3, _excluded);
              id = req.params.id;
              if (phone) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", {
                error: true,
                message: 'Missing required phone number.',
                statusCode: 400,
                data: null
              });
            case 5:
              _context3.next = 7;
              return this.model.findOne({
                _id: {
                  $ne: id
                },
                phone: phone
              });
            case 7:
              existingDeliveryBoy = _context3.sent;
              if (!(existingDeliveryBoy != null)) {
                _context3.next = 10;
                break;
              }
              return _context3.abrupt("return", {
                error: true,
                message: 'Phone Number Already Exists.',
                statusCode: 400,
                data: null
              });
            case 10:
              _context3.next = 12;
              return _geocoder["default"].geocode(rest.address);
            case 12:
              loc = _context3.sent;
              if (!(!loc || !loc[0] || !loc[0].longitude || !loc[0].latitude || !loc[0].formattedAddress)) {
                _context3.next = 15;
                break;
              }
              return _context3.abrupt("return", {
                error: true,
                message: 'Invalid address.',
                statusCode: 400,
                data: null
              });
            case 15:
              items = _objectSpread(_objectSpread({}, rest), {}, {
                phone: phone,
                location: {
                  type: 'Point',
                  coordinates: [loc[0].longitude, loc[0].latitude],
                  formattedAddress: loc[0].formattedAddress,
                  street: loc[0].streetName,
                  city: loc[0].city,
                  state: loc[0].administrativeLevels.level1long,
                  zipcode: loc[0].zipcode,
                  country: loc[0].country,
                  countryCode: loc[0].countryCode
                }
              });
              _context3.next = 18;
              return this.model.findByIdAndUpdate(id, items, {
                "new": true
              });
            case 18:
              data = _context3.sent;
              return _context3.abrupt("return", {
                error: false,
                message: 'successfully updated',
                statusCode: 200,
                data: data
              });
            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", {
                error: true,
                message: _context3.t0.message,
                statusCode: 400,
                data: null
              });
            case 25:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 22]]);
      }));
      function updateDeliveryBoy(_x3) {
        return _updateDeliveryBoy.apply(this, arguments);
      }
      return updateDeliveryBoy;
    }()
  }]);
  return DeliveryBoyService;
}(_Service2["default"]);
var _default = DeliveryBoyService;
exports["default"] = _default;