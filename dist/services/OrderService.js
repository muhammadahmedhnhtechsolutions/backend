"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Service2 = _interopRequireDefault(require("./Service"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _axios = _interopRequireDefault(require("axios"));
var _moment = _interopRequireDefault(require("moment"));
var _url = require("url");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
require('dotenv').config();
// const origin = 'JJ Hospital, NH15, Tharad, Gujarat 385565';
// const destination = `Anand Nagar, Tharad, Gujarat 385565`;

// const params = new URLSearchParams({
//   origins: origin,
//   destinations: destination,
//   key: process.env.GEOCODER_API_KEY,
// });

// async function getDist() {
//   await axios
//     .get('https://maps.googleapis.com/maps/api/distancematrix/json?' + params)
//     .then((response) => {
//       const distance = response.data.rows[0].elements[0].distance.text;
//       console.log(distance);
//       console.log(`Distance between ${origin} and ${destination}: ${distance}`);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// getDist();

var JJ_HOSPITAL_ADDRESS = 'JJ Hospital, NH15, Tharad, Gujarat 385565';
var MAX_DISTANCE_IN_KM = 5000;
var OrderService = /*#__PURE__*/function (_Service) {
  _inherits(OrderService, _Service);
  var _super = _createSuper(OrderService);
  function OrderService(model) {
    _classCallCheck(this, OrderService);
    return _super.call(this, model);
  }
  _createClass(OrderService, [{
    key: "todayRestaurantReport",
    value: function () {
      var _todayRestaurantReport = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
        var today, startOfToday, endOfToday, items;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              //get yesterday report
              // const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
              // const today = new Date();
              // const startOfYesterday = new Date(today.getTime() - oneDay);
              // startOfYesterday.setHours(0, 0, 0, 0); // Set to 00:00:00:000
              // const endOfYesterday = new Date(today.getTime() - oneDay);
              // endOfYesterday.setHours(23, 59, 59, 999); // Set to 23:59:59:999
              // Get start and end of today
              today = new Date();
              startOfToday = new Date(today.setHours(0, 0, 0, 0));
              endOfToday = new Date(today.setHours(23, 59, 59, 999));
              _context.prev = 3;
              _context.next = 6;
              return this.model.aggregate([{
                $match: {
                  deleted: {
                    $ne: true
                  },
                  createdAt: {
                    $gte: startOfToday,
                    $lt: endOfToday
                  }
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalOrders: {
                    $sum: 1
                  },
                  totalPriceAfterAdminCommission: {
                    $sum: '$totalPriceAfterAdminCommission'
                  },
                  totalAdminCommission: {
                    $sum: '$adminCommission'
                  },
                  totalDeliveryCharge: {
                    $sum: '$deliveryCharge'
                  },
                  todaysTotal: {
                    $sum: {
                      $add: ['$totalPriceAfterAdminCommission', '$totalAdminCommission', '$totalDeliveryCharge']
                    }
                  }
                }
              }, {
                $project: {
                  _id: 1,
                  orderRestaurant: '$_id',
                  totalPriceAfterAdminCommission: 1,
                  totalOrders: 1,
                  totalAdminCommission: 1,
                  totalDeliveryCharge: 1,
                  todaysTotal: {
                    $sum: {
                      $add: ['$totalPriceAfterAdminCommission', '$totalAdminCommission', '$totalDeliveryCharge']
                    }
                  }
                }
              }, {
                $sort: {
                  totalOrders: -1
                }
              }]);
            case 6:
              items = _context.sent;
              _context.next = 9;
              return this.model.populate(items, {
                path: 'orderRestaurant',
                select: {
                  _id: 1,
                  name: 1,
                  ownerName: 1,
                  description: 1,
                  phoneNumber: 1,
                  address: 1,
                  role: 1
                }
              });
            case 9:
              return _context.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: items
              });
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", {
                error: true,
                message: _context.t0.message,
                statusCode: 400,
                data: null
              });
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 12]]);
      }));
      function todayRestaurantReport(_x) {
        return _todayRestaurantReport.apply(this, arguments);
      }
      return todayRestaurantReport;
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, userData, restaurantData) {
        var getRestaurantId, distance, _req$body, deliveryCharge, deliveryInstructions, cartItems, _req$body$deliveryPho, deliveryPhone, requiredFields, missingFields, restaurantIds, RestaurantDistance, restaurantId, totalQuantity, totalPrice, perOrderCommission, adminCommission, i, _perOrderCommission$i, minOrderAmount, maxOrderAmount, charge, totalPriceAfterAdminCommission, totalPriceWithDeliveryCharge, orderId, payload, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              getRestaurantId = function getRestaurantId(cartItems) {
                for (var index = 0; index < cartItems.length; index++) {
                  var element = cartItems[index];
                  return element.restaurant_id._id;
                }
              }; // Calculate total quantity and price of items in the cart
              // Get the latitude and longitude of JJ Hospital using the Google Maps Geocoding API
              // const jjHospital = await getCoordinates(JJ_HOSPITAL_ADDRESS);
              // Get the latitude and longitude of the customer's address using the Google Maps Geocoding API
              // const customerLocation = await getCoordinates(userData.address);
              // console.log(customerLocation, 'customerLocation');
              // Calculate the distance between JJ Hospital and the customer's location using the Haversine formula
              distance = 3; // const distance = await getDistance(JJ_HOSPITAL_ADDRESS, userData.address);
              _req$body = req.body, deliveryCharge = _req$body.deliveryCharge, deliveryInstructions = _req$body.deliveryInstructions, cartItems = _req$body.item, _req$body$deliveryPho = _req$body.deliveryPhone, deliveryPhone = _req$body$deliveryPho === void 0 ? null : _req$body$deliveryPho;
              if (!(restaurantData.error === true)) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: "restaurant is not found can't place order",
                statusCode: 400,
                data: null
              });
            case 6:
              // Check if all required fields are provided in user profile
              requiredFields = ['firstName', 'lastName', 'phoneNumber', 'address'];
              missingFields = requiredFields.filter(function (field) {
                return !userData[field];
              });
              if (!(missingFields.length > 0)) {
                _context2.next = 10;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: "Missing required fields In User Profile: ".concat(missingFields.join(', ')),
                statusCode: 400,
                data: null
              });
            case 10:
              // Check if all items in the cart belong to the same restaurant
              restaurantIds = new Set(cartItems.map(function (item) {
                return item.restaurant_id._id;
              }));
              if (!(restaurantIds.size !== 1)) {
                _context2.next = 13;
                break;
              }
              return _context2.abrupt("return", {
                error: true,
                message: 'All items in the order must be from the same restaurant',
                statusCode: 400,
                data: null
              });
            case 13:
              // const RestaurantDistance = await getDistance(
              //   restaurantData.data?.address,
              //   userData.address,
              // );
              RestaurantDistance = 3; // Get restaurant ID from cart items
              restaurantId = getRestaurantId(cartItems);
              totalQuantity = cartItems.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue.qty;
              }, 0);
              totalPrice = cartItems.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue.price * currentValue.qty;
              }, 0); // Calculate admin commission based on total price
              perOrderCommission = restaurantData === null || restaurantData === void 0 ? void 0 : restaurantData.data.perOrderCommission;
              adminCommission = 0;
              i = 0;
            case 20:
              if (!(i < perOrderCommission.length)) {
                _context2.next = 28;
                break;
              }
              _perOrderCommission$i = perOrderCommission[i], minOrderAmount = _perOrderCommission$i.minOrderAmount, maxOrderAmount = _perOrderCommission$i.maxOrderAmount, charge = _perOrderCommission$i.charge;
              if (!(totalPrice >= minOrderAmount && totalPrice <= maxOrderAmount)) {
                _context2.next = 25;
                break;
              }
              adminCommission = charge;
              return _context2.abrupt("break", 28);
            case 25:
              i++;
              _context2.next = 20;
              break;
            case 28:
              // Calculate total price after admin commission and with delivery charge
              totalPriceAfterAdminCommission = totalPrice - adminCommission;
              totalPriceWithDeliveryCharge = deliveryCharge + totalPrice;
              _context2.next = 32;
              return this.model.countDocuments();
            case 32:
              _context2.t0 = _context2.sent;
              orderId = _context2.t0 + 1;
              payload = {
                items: cartItems,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice,
                deliveryCharge: deliveryCharge,
                adminCommission: adminCommission,
                totalPriceAfterAdminCommission: totalPriceAfterAdminCommission,
                totalPriceWithDeliveryCharge: totalPriceWithDeliveryCharge,
                deliveryInstructions: deliveryInstructions,
                deliveryAddress: userData.location,
                deliveryPhone: deliveryPhone,
                deliveryTime: new Date(Date.now() + 30 * 60000),
                orderId: orderId,
                orderRestaurant: restaurantId,
                paymentMethod: 'COD',
                orderdBy: userData._id,
                orderDate: new Date(),
                distance: RestaurantDistance
              };
              _context2.next = 37;
              return this.model.create(payload);
            case 37:
              data = _context2.sent;
              return _context2.abrupt("return", {
                error: false,
                message: "Order placed successfully",
                statusCode: 200,
                data: data
              });
            case 41:
              _context2.prev = 41;
              _context2.t1 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: true,
                message: _context2.t1.message,
                statusCode: 400,
                data: null
              });
            case 44:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 41]]);
      }));
      function createOrder(_x2, _x3, _x4) {
        return _createOrder.apply(this, arguments);
      }
      return createOrder;
    }()
  }, {
    key: "getAllOrder2",
    value: function () {
      var _getAllOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(query) {
        var skip, limit, start, length, _query$search, search, id, where, items, total;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              console.log(query);
              skip = query.skip, limit = query.limit, start = query.start, length = query.length, _query$search = query.search, search = _query$search === void 0 ? '' : _query$search;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              id = query._id;
              if (id) {
                try {
                  id = new _mongoose["default"].mongo.ObjectId(id);
                } catch (error) {
                  // console.log('not able to generate mongoose id with content', id);
                }
              }
              where = {
                deleted: {
                  $ne: true
                }
              }; // if (search) {
              //   where['$or'] = [
              //     // { title: { $regex: new RegExp(search, 'i') } },
              //     // { description: { $regex: new RegExp(search, 'i') } },
              //     {
              //       'orderRestaurant.name': { $regex: new RegExp(search, 'i') },
              //     },
              //     {
              //       'orderdBy.firstName': { $regex: new RegExp(search, 'i') },
              //     },
              //     {
              //       'orderdBy.lastName': { $regex: new RegExp(search, 'i') },
              //     },
              //     {
              //       'deliveryBoy.firstName': { $regex: new RegExp(search, 'i') },
              //     },
              //     {
              //       'deliveryBoy.lastName': { $regex: new RegExp(search, 'i') },
              //     },
              //   ];
              // }
              _context3.prev = 10;
              _context3.next = 13;
              return this.model.find(where).select('-items').populate('orderRestaurant', '-images').populate('orderdBy', '-profileImage').populate('deliveryBoy').skip(start).limit(length).sort({
                createdAt: -1
              });
            case 13:
              items = _context3.sent;
              _context3.next = 16;
              return this.model.countDocuments(where);
            case 16:
              total = _context3.sent;
              return _context3.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                recordsTotal: total,
                recordsFiltered: total,
                data: items
              });
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](10);
              return _context3.abrupt("return", {
                error: true,
                message: _context3.t0.message,
                statusCode: 400,
                data: null
              });
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[10, 20]]);
      }));
      function getAllOrder2(_x5) {
        return _getAllOrder.apply(this, arguments);
      }
      return getAllOrder2;
    }()
  }, {
    key: "getAllOrder",
    value: function () {
      var _getAllOrder2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(query) {
        var skip, limit, id, items, total;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
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
                  id = new _mongoose["default"].mongo.ObjectId(id);
                } catch (error) {
                  // console.log('not able to generate mongoose id with content', id);
                }
              }
              query.deleted = {
                $ne: true
              };
              _context4.prev = 9;
              _context4.next = 12;
              return this.model.find(query).select('-items').populate('orderRestaurant', '-images').populate('orderdBy', '-profileImage').populate('deliveryBoy').skip(skip).limit(limit).sort({
                createdAt: -1
              });
            case 12:
              items = _context4.sent;
              _context4.next = 15;
              return this.model.countDocuments(query);
            case 15:
              total = _context4.sent;
              return _context4.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                recordsTotal: total,
                // total number of records
                recordsFiltered: total,
                data: items
                // draw: req.query.draw,
              });
            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](9);
              return _context4.abrupt("return", {
                error: true,
                message: _context4.t0.message,
                statusCode: 400,
                data: null
              });
            case 22:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[9, 19]]);
      }));
      function getAllOrder(_x6) {
        return _getAllOrder2.apply(this, arguments);
      }
      return getAllOrder;
    }()
  }, {
    key: "getDeliverBoyAndOrderData",
    value: function () {
      var _getDeliverBoyAndOrderData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req) {
        var orderId, items;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              orderId = req.params.orderId;
              _context5.prev = 1;
              _context5.next = 4;
              return this.model.findById(orderId).populate('orderRestaurant', '-image').populate('orderdBy').populate('deliveryBoy').exec();
            case 4:
              items = _context5.sent;
              if (items) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", {
                error: true,
                message: "request not found",
                statusCode: 404,
                data: null
              });
            case 7:
              return _context5.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: items
              });
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", {
                error: true,
                message: _context5.t0.message,
                statusCode: 400,
                data: null
              });
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[1, 10]]);
      }));
      function getDeliverBoyAndOrderData(_x7) {
        return _getDeliverBoyAndOrderData.apply(this, arguments);
      }
      return getDeliverBoyAndOrderData;
    }()
  }, {
    key: "getAllOrderByRestaurantId",
    value: function () {
      var _getAllOrderByRestaurantId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(query, restaurantId) {
        var skip, limit, items, total;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              skip = query.skip, limit = query.limit;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              if (restaurantId) {
                try {
                  query.orderRestaurant = _mongoose["default"].Types.ObjectId(restaurantId);
                } catch (error) {
                  console.error("Failed to create an object ID from ".concat(query.userId));
                }
              }
              query.deleted = {
                $ne: true
              };
              _context6.prev = 8;
              _context6.next = 11;
              return this.model.find(query).populate('orderRestaurant', '-image').populate('orderdBy').populate('deliveryBoy').skip(skip).limit(limit).sort({
                createdAt: -1
              });
            case 11:
              items = _context6.sent;
              _context6.next = 14;
              return this.model.countDocuments(query);
            case 14:
              total = _context6.sent;
              return _context6.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6["catch"](8);
              return _context6.abrupt("return", {
                error: true,
                message: _context6.t0.message,
                statusCode: 400,
                data: null
              });
            case 21:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[8, 18]]);
      }));
      function getAllOrderByRestaurantId(_x8, _x9) {
        return _getAllOrderByRestaurantId.apply(this, arguments);
      }
      return getAllOrderByRestaurantId;
    }()
  }, {
    key: "getAllTodayRestaurantOrder",
    value: function () {
      var _getAllTodayRestaurantOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req) {
        var restroId, today, query, items, total;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              restroId = req.params.restroId;
              today = (0, _moment["default"])().startOf('day');
              query = {
                orderRestaurant: restroId,
                createdAt: {
                  $gte: today.toDate(),
                  $lt: (0, _moment["default"])(today).endOf('day').toDate()
                },
                deleted: {
                  $ne: true
                }
              };
              _context7.prev = 3;
              _context7.next = 6;
              return this.model.find(query).populate('orderRestaurant', '-image').populate('orderdBy').populate('deliveryBoy').sort({
                createdAt: -1
              });
            case 6:
              items = _context7.sent;
              _context7.next = 9;
              return this.model.countDocuments(query);
            case 9:
              total = _context7.sent;
              return _context7.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](3);
              return _context7.abrupt("return", {
                error: true,
                message: _context7.t0.message,
                statusCode: 400,
                data: null
              });
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[3, 13]]);
      }));
      function getAllTodayRestaurantOrder(_x10) {
        return _getAllTodayRestaurantOrder.apply(this, arguments);
      }
      return getAllTodayRestaurantOrder;
    }()
  }, {
    key: "getAllOrderByCustomerId",
    value: function () {
      var _getAllOrderByCustomerId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(query) {
        var userId,
          skip,
          limit,
          items,
          total,
          _args8 = arguments;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              userId = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : null;
              skip = query.skip, limit = query.limit;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              if (userId) {
                try {
                  query.orderdBy = _mongoose["default"].Types.ObjectId(userId);
                } catch (error) {
                  console.error("Failed to create an object ID from ".concat(query.userId));
                }
              }
              query.deleted = {
                $ne: true
              };
              _context8.prev = 9;
              _context8.next = 12;
              return this.model.find(query).populate('orderRestaurant', '-image').populate('orderdBy').populate('deliveryBoy').skip(skip).limit(limit).sort({
                createdAt: -1
              });
            case 12:
              items = _context8.sent;
              _context8.next = 15;
              return this.model.countDocuments(query);
            case 15:
              total = _context8.sent;
              return _context8.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 19:
              _context8.prev = 19;
              _context8.t0 = _context8["catch"](9);
              return _context8.abrupt("return", {
                error: true,
                message: _context8.t0.message,
                statusCode: 400,
                data: null
              });
            case 22:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this, [[9, 19]]);
      }));
      function getAllOrderByCustomerId(_x11) {
        return _getAllOrderByCustomerId.apply(this, arguments);
      }
      return getAllOrderByCustomerId;
    }()
  }, {
    key: "getOrder",
    value: function () {
      var _getOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id) {
        var items;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return this.model.findById(id).populate('orderRestaurant', '-image').populate('orderdBy').populate('deliveryBoy').select(['-password']);
            case 3:
              items = _context9.sent;
              if (items) {
                _context9.next = 6;
                break;
              }
              return _context9.abrupt("return", {
                error: true,
                message: "request not found",
                statusCode: 404,
                data: null
              });
            case 6:
              return _context9.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: items
              });
            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", {
                error: true,
                message: _context9.t0.message,
                statusCode: 400,
                data: null
              });
            case 12:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[0, 9]]);
      }));
      function getOrder(_x12) {
        return _getOrder.apply(this, arguments);
      }
      return getOrder;
    }()
  }, {
    key: "confirmOrder",
    value: function () {
      var _confirmOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req) {
        var id, item, data;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              id = req.params.orderId;
              item = {
                orderStatus: 'Confirmed'
              };
              _context10.prev = 2;
              _context10.next = 5;
              return this.model.findByIdAndUpdate(id, item, {
                "new": true
              });
            case 5:
              data = _context10.sent;
              return _context10.abrupt("return", {
                error: false,
                message: 'Order Confirm successfully',
                statusCode: 200,
                data: data
              });
            case 9:
              _context10.prev = 9;
              _context10.t0 = _context10["catch"](2);
              return _context10.abrupt("return", {
                error: true,
                message: _context10.t0.message,
                statusCode: 400,
                data: null
              });
            case 12:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[2, 9]]);
      }));
      function confirmOrder(_x13) {
        return _confirmOrder.apply(this, arguments);
      }
      return confirmOrder;
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req) {
        var id, item, data;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              id = req.params.orderId;
              item = {
                orderStatus: 'Cancelled'
              };
              _context11.next = 5;
              return this.model.findByIdAndUpdate(id, item, {
                "new": true
              });
            case 5:
              data = _context11.sent;
              return _context11.abrupt("return", {
                error: false,
                message: 'Order Cancelled',
                statusCode: 200,
                data: data
              });
            case 9:
              _context11.prev = 9;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", {
                error: true,
                message: _context11.t0.message,
                statusCode: 400,
                data: null
              });
            case 12:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[0, 9]]);
      }));
      function cancelOrder(_x14) {
        return _cancelOrder.apply(this, arguments);
      }
      return cancelOrder;
    }()
  }, {
    key: "acceptOrder",
    value: function () {
      var _acceptOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, deliveryBoy) {
        var id, item, data;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              id = req.params.orderId;
              item = {
                deliveryBoy: deliveryBoy,
                isdeliveryBoyAccept: true
              };
              _context12.prev = 2;
              _context12.next = 5;
              return this.model.findByIdAndUpdate(id, item, {
                "new": true
              });
            case 5:
              data = _context12.sent;
              return _context12.abrupt("return", {
                error: false,
                message: 'successfullly Deliver the order',
                statusCode: 200,
                data: data
              });
            case 9:
              _context12.prev = 9;
              _context12.t0 = _context12["catch"](2);
              return _context12.abrupt("return", {
                error: true,
                message: _context12.t0.message,
                statusCode: 400,
                data: null
              });
            case 12:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this, [[2, 9]]);
      }));
      function acceptOrder(_x15, _x16) {
        return _acceptOrder.apply(this, arguments);
      }
      return acceptOrder;
    }()
  }, {
    key: "completeOrder",
    value: function () {
      var _completeOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, deliveryBoy) {
        var id, item, data;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              id = req.params.orderId;
              item = {
                orderStatus: 'Completed',
                deliveryBoy: deliveryBoy
              };
              _context13.prev = 2;
              _context13.next = 5;
              return this.model.findByIdAndUpdate(id, item, {
                "new": true
              });
            case 5:
              data = _context13.sent;
              return _context13.abrupt("return", {
                error: false,
                message: 'successfullly Deliver the order',
                statusCode: 200,
                data: data
              });
            case 9:
              _context13.prev = 9;
              _context13.t0 = _context13["catch"](2);
              return _context13.abrupt("return", {
                error: true,
                message: _context13.t0.message,
                statusCode: 400,
                data: null
              });
            case 12:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this, [[2, 9]]);
      }));
      function completeOrder(_x17, _x18) {
        return _completeOrder.apply(this, arguments);
      }
      return completeOrder;
    }()
  }, {
    key: "getRestaurantDashboardData",
    value: function () {
      var _getRestaurantDashboardData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(id, RestroStatus) {
        var today, thisWeek, thisMonth, todayOrdersRevenue, thisWeekOrdersRevenue, thisMonthOrdersRevenue, dashBoardData;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              today = (0, _moment["default"])().startOf('day');
              thisWeek = (0, _moment["default"])().startOf('week');
              thisMonth = (0, _moment["default"])().startOf('month');
              _context14.next = 6;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: today.toDate(),
                    $lte: (0, _moment["default"])().endOf('day').toDate()
                  },
                  orderStatus: 'Completed',
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$totalPriceAfterAdminCommission'
                  }
                }
              }]);
            case 6:
              todayOrdersRevenue = _context14.sent;
              _context14.next = 9;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisWeek.toDate(),
                    $lte: (0, _moment["default"])().endOf('week').toDate()
                  },
                  orderStatus: 'Completed',
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$totalPriceAfterAdminCommission'
                  }
                }
              }]);
            case 9:
              thisWeekOrdersRevenue = _context14.sent;
              _context14.next = 12;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisMonth.toDate(),
                    $lte: (0, _moment["default"])().endOf('month').toDate()
                  },
                  orderStatus: 'Completed',
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$totalPriceAfterAdminCommission'
                  }
                }
              }]);
            case 12:
              thisMonthOrdersRevenue = _context14.sent;
              dashBoardData = {
                todayOrdersRevenue: todayOrdersRevenue.length >= 1 ? todayOrdersRevenue[0].totalAmount : 0,
                thisWeekOrdersRevenue: thisWeekOrdersRevenue.length >= 1 ? thisWeekOrdersRevenue[0].totalAmount : 0,
                thisMonthOrdersRevenue: thisMonthOrdersRevenue.length >= 1 ? thisMonthOrdersRevenue[0].totalAmount : 0,
                restroStatus: RestroStatus.restaurantStatus
              };
              return _context14.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: dashBoardData
              });
            case 17:
              _context14.prev = 17;
              _context14.t0 = _context14["catch"](0);
              return _context14.abrupt("return", {
                error: true,
                message: _context14.t0.message,
                statusCode: 400,
                data: null
              });
            case 20:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[0, 17]]);
      }));
      function getRestaurantDashboardData(_x19, _x20) {
        return _getRestaurantDashboardData.apply(this, arguments);
      }
      return getRestaurantDashboardData;
    }()
  }, {
    key: "getSingleRestaurantDeshboardData",
    value: function () {
      var _getSingleRestaurantDeshboardData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(id) {
        var today, thisWeek, thisMonth, todayOrdersRevenue, thisWeekOrdersRevenue, thisMonthOrdersRevenue, todayOrderCount, weekOrderCount, monthOrderCount, todayDeliveryCharge, thisWeekDeliveryCharge, thisMonthDeliveryCharge, todayAdminCommission, thisWeekadminCommission, thisMonthadminCommission, totalOrderRevenue, totalOrder, totalDeliveryCharge, totalAdminCommission, data;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              today = (0, _moment["default"])().startOf('day');
              thisWeek = (0, _moment["default"])().startOf('week');
              thisMonth = (0, _moment["default"])().startOf('month'); // Total Revenu
              _context15.next = 6;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: today.toDate(),
                    $lte: (0, _moment["default"])().endOf('day').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$totalPriceAfterAdminCommission'
                  }
                }
              }]);
            case 6:
              todayOrdersRevenue = _context15.sent;
              _context15.next = 9;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisWeek.toDate(),
                    $lte: (0, _moment["default"])().endOf('week').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$totalPriceAfterAdminCommission'
                  }
                }
              }]);
            case 9:
              thisWeekOrdersRevenue = _context15.sent;
              _context15.next = 12;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisMonth.toDate(),
                    $lte: (0, _moment["default"])().endOf('month').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$totalPriceAfterAdminCommission'
                  }
                }
              }]);
            case 12:
              thisMonthOrdersRevenue = _context15.sent;
              _context15.next = 15;
              return this.model.countDocuments({
                createdAt: {
                  $gte: today.toDate(),
                  $lte: (0, _moment["default"])().endOf('day').toDate()
                },
                deleted: {
                  $ne: true
                },
                orderRestaurant: id
              });
            case 15:
              todayOrderCount = _context15.sent;
              _context15.next = 18;
              return this.model.countDocuments({
                createdAt: {
                  $gte: thisWeek.toDate(),
                  $lte: (0, _moment["default"])().endOf('week').toDate()
                },
                deleted: {
                  $ne: true
                },
                orderRestaurant: id
              });
            case 18:
              weekOrderCount = _context15.sent;
              _context15.next = 21;
              return this.model.countDocuments({
                createdAt: {
                  $gte: thisMonth.toDate(),
                  $lte: (0, _moment["default"])().endOf('month').toDate()
                },
                deleted: {
                  $ne: true
                },
                orderRestaurant: id
              });
            case 21:
              monthOrderCount = _context15.sent;
              _context15.next = 24;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisWeek.toDate(),
                    $lte: (0, _moment["default"])().endOf('week').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$deliveryCharge'
                  }
                }
              }]);
            case 24:
              todayDeliveryCharge = _context15.sent;
              _context15.next = 27;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisWeek.toDate(),
                    $lte: (0, _moment["default"])().endOf('week').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$deliveryCharge'
                  }
                }
              }]);
            case 27:
              thisWeekDeliveryCharge = _context15.sent;
              _context15.next = 30;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisMonth.toDate(),
                    $lte: (0, _moment["default"])().endOf('month').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$deliveryCharge'
                  }
                }
              }]);
            case 30:
              thisMonthDeliveryCharge = _context15.sent;
              _context15.next = 33;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisWeek.toDate(),
                    $lte: (0, _moment["default"])().endOf('week').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$adminCommission'
                  }
                }
              }]);
            case 33:
              todayAdminCommission = _context15.sent;
              _context15.next = 36;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisWeek.toDate(),
                    $lte: (0, _moment["default"])().endOf('week').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$adminCommission'
                  }
                }
              }]);
            case 36:
              thisWeekadminCommission = _context15.sent;
              _context15.next = 39;
              return this.model.aggregate([{
                $match: {
                  createdAt: {
                    $gte: thisMonth.toDate(),
                    $lte: (0, _moment["default"])().endOf('month').toDate()
                  },
                  deleted: {
                    $ne: true
                  },
                  orderRestaurant: _mongoose["default"].Types.ObjectId(id)
                }
              }, {
                $group: {
                  _id: '$orderRestaurant',
                  totalAmount: {
                    $sum: '$adminCommission'
                  }
                }
              }]);
            case 39:
              thisMonthadminCommission = _context15.sent;
              // total order revenue
              totalOrderRevenue = {
                todayOrdersRevenue: todayOrdersRevenue.length >= 1 ? todayOrdersRevenue[0].totalAmount : 0,
                thisWeekOrdersRevenue: thisWeekOrdersRevenue.length >= 1 ? thisWeekOrdersRevenue[0].totalAmount : 0,
                thisMonthOrdersRevenue: thisMonthOrdersRevenue.length >= 1 ? thisMonthOrdersRevenue[0].totalAmount : 0
              }; //total order
              totalOrder = {
                todayOrderCount: todayOrderCount,
                weekOrderCount: weekOrderCount,
                monthOrderCount: monthOrderCount
              }; //total Delivery Charge
              totalDeliveryCharge = {
                todayDeliveryCharge: todayDeliveryCharge.length >= 1 ? todayDeliveryCharge[0].totalAmount : 0,
                thisWeekDeliveryCharge: thisWeekDeliveryCharge.length >= 1 ? thisWeekDeliveryCharge[0].totalAmount : 0,
                thisMonthDeliveryCharge: thisMonthDeliveryCharge.length >= 1 ? thisMonthDeliveryCharge[0].totalAmount : 0
              }; // total Admin Commission
              totalAdminCommission = {
                todayAdminCommission: todayAdminCommission.length >= 1 ? todayAdminCommission[0].totalAmount : 0,
                thisWeekadminCommission: thisWeekadminCommission.length >= 1 ? thisWeekadminCommission[0].totalAmount : 0,
                thisMonthadminCommission: thisMonthadminCommission.length >= 1 ? thisMonthadminCommission[0].totalAmount : 0
              };
              data = {
                totalOrderRevenue: totalOrderRevenue,
                totalOrder: totalOrder,
                totalDeliveryCharge: totalDeliveryCharge,
                totalAdminCommission: totalAdminCommission
              };
              return _context15.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                data: data
              });
            case 48:
              _context15.prev = 48;
              _context15.t0 = _context15["catch"](0);
              return _context15.abrupt("return", {
                error: true,
                message: _context15.t0.message,
                statusCode: 400,
                data: null
              });
            case 51:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this, [[0, 48]]);
      }));
      function getSingleRestaurantDeshboardData(_x21) {
        return _getSingleRestaurantDeshboardData.apply(this, arguments);
      }
      return getSingleRestaurantDeshboardData;
    }()
  }, {
    key: "deliveryBoyAllOrder",
    value: function () {
      var _deliveryBoyAllOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(query, id) {
        var _query, skip, limit, _query$orderStatus, orderStatus, _query$isdeliveryBoyA, isdeliveryBoyAccept, today, items, total;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _query = query, skip = _query.skip, limit = _query.limit, _query$orderStatus = _query.orderStatus, orderStatus = _query$orderStatus === void 0 ? null : _query$orderStatus, _query$isdeliveryBoyA = _query.isdeliveryBoyAccept, isdeliveryBoyAccept = _query$isdeliveryBoyA === void 0 ? null : _query$isdeliveryBoyA;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              today = (0, _moment["default"])().startOf('day');
              query = {
                createdAt: {
                  $gte: today.toDate(),
                  $lt: (0, _moment["default"])(today).endOf('day').toDate()
                },
                deleted: {
                  $ne: true
                }
              };
              if (orderStatus === 'Confirmed' && isdeliveryBoyAccept === 'false') {
                query.orderStatus = 'Confirmed';
                query.isdeliveryBoyAccept = false;
              }
              if (orderStatus === 'Confirmed' && isdeliveryBoyAccept === 'true' || orderStatus === 'Completed' && isdeliveryBoyAccept === 'true') {
                query.$and = [{
                  deliveryBoy: _mongoose["default"].mongo.ObjectId(id)
                }, {
                  isdeliveryBoyAccept: true
                }, {
                  orderStatus: orderStatus
                }];
              }
              _context16.prev = 10;
              _context16.next = 13;
              return this.model.find(query).populate('orderRestaurant', '-image').populate('orderdBy').populate('deliveryBoy').skip(skip).limit(limit).sort({
                createdAt: -1
              }).lean();
            case 13:
              items = _context16.sent;
              _context16.next = 16;
              return this.model.countDocuments(query);
            case 16:
              total = _context16.sent;
              return _context16.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 20:
              _context16.prev = 20;
              _context16.t0 = _context16["catch"](10);
              return _context16.abrupt("return", {
                error: true,
                message: _context16.t0.message,
                statusCode: 400,
                data: null
              });
            case 23:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this, [[10, 20]]);
      }));
      function deliveryBoyAllOrder(_x22, _x23) {
        return _deliveryBoyAllOrder.apply(this, arguments);
      }
      return deliveryBoyAllOrder;
    }()
  }, {
    key: "deliveryBoyOrderHistory",
    value: function () {
      var _deliveryBoyOrderHistory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(query, id) {
        var _query2, skip, limit, items, total;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _query2 = query, skip = _query2.skip, limit = _query2.limit;
              skip = skip ? Number(skip) : 1;
              limit = limit ? Number(limit) : 10;
              skip = (skip - 1) * limit;
              delete query.skip;
              delete query.limit;
              query = {
                deliveryBoy: _mongoose["default"].mongo.ObjectId(id),
                orderStatus: 'Completed',
                isdeliveryBoyAccept: true,
                deleted: {
                  $ne: true
                }
              };
              _context17.prev = 7;
              _context17.next = 10;
              return this.model.find(query).skip(skip).limit(limit).sort({
                createdAt: -1
              });
            case 10:
              items = _context17.sent;
              _context17.next = 13;
              return this.model.countDocuments(query);
            case 13:
              total = _context17.sent;
              return _context17.abrupt("return", {
                error: false,
                message: 'request successfullly',
                statusCode: 200,
                total: total,
                data: items
              });
            case 17:
              _context17.prev = 17;
              _context17.t0 = _context17["catch"](7);
              return _context17.abrupt("return", {
                error: true,
                message: _context17.t0.message,
                statusCode: 400,
                data: null
              });
            case 20:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this, [[7, 17]]);
      }));
      function deliveryBoyOrderHistory(_x24, _x25) {
        return _deliveryBoyOrderHistory.apply(this, arguments);
      }
      return deliveryBoyOrderHistory;
    }()
  }, {
    key: "deliveryBoyDashboardData",
    value: function () {
      var _deliveryBoyDashboardData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req) {
        var _this = this;
        var id, today, thisWeek, thisMonth, filters, getOrdersRevenue, _yield$Promise$all, _yield$Promise$all2, todayOrdersRevenue, thisWeekOrdersRevenue, thisMonthOrdersRevenue, dashBoardData;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              id = req.user.id;
              today = (0, _moment["default"])().startOf('day');
              thisWeek = (0, _moment["default"])().startOf('week');
              thisMonth = (0, _moment["default"])().startOf('month');
              filters = {
                orderStatus: 'Completed',
                isdeliveryBoyAccept: true,
                deleted: {
                  $ne: true
                },
                deliveryBoy: _mongoose["default"].Types.ObjectId(id)
              };
              getOrdersRevenue = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(startDate, endDate) {
                  var ordersRevenue;
                  return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.next = 2;
                        return _this.model.find(_objectSpread({
                          createdAt: {
                            $gte: startDate.toDate(),
                            $lte: endDate.toDate()
                          }
                        }, filters));
                      case 2:
                        ordersRevenue = _context18.sent;
                        return _context18.abrupt("return", ordersRevenue);
                      case 4:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                }));
                return function getOrdersRevenue(_x27, _x28) {
                  return _ref.apply(this, arguments);
                };
              }();
              _context19.prev = 6;
              _context19.next = 9;
              return Promise.all([getOrdersRevenue(today, (0, _moment["default"])().endOf('day')), getOrdersRevenue(thisWeek, (0, _moment["default"])().endOf('week')), getOrdersRevenue(thisMonth, (0, _moment["default"])().endOf('month'))]);
            case 9:
              _yield$Promise$all = _context19.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
              todayOrdersRevenue = _yield$Promise$all2[0];
              thisWeekOrdersRevenue = _yield$Promise$all2[1];
              thisMonthOrdersRevenue = _yield$Promise$all2[2];
              dashBoardData = {
                today: {
                  orders: todayOrdersRevenue.length,
                  revenue: todayOrdersRevenue.reduce(function (total, order) {
                    return total + order.deliveryCharge;
                  }, 0)
                },
                thisWeek: {
                  orders: thisWeekOrdersRevenue.length,
                  revenue: thisWeekOrdersRevenue.reduce(function (total, order) {
                    return total + order.deliveryCharge;
                  }, 0)
                },
                thisMonth: {
                  orders: thisMonthOrdersRevenue.length,
                  revenue: thisMonthOrdersRevenue.reduce(function (total, order) {
                    return total + order.deliveryCharge;
                  }, 0)
                }
              };
              return _context19.abrupt("return", {
                error: false,
                message: 'Request successful',
                statusCode: 200,
                data: dashBoardData
              });
            case 18:
              _context19.prev = 18;
              _context19.t0 = _context19["catch"](6);
              return _context19.abrupt("return", {
                error: true,
                message: _context19.t0.message,
                statusCode: 400,
                data: null
              });
            case 21:
            case "end":
              return _context19.stop();
          }
        }, _callee19, null, [[6, 18]]);
      }));
      function deliveryBoyDashboardData(_x26) {
        return _deliveryBoyDashboardData.apply(this, arguments);
      }
      return deliveryBoyDashboardData;
    }() // async sandUserAnyNotification(req) {
    //   try {
    //     const users = await this.model.find();
    //     const userPayload = {
    //       subTitle: `આશ્ચર્યજનક સમાચાર!`,
    //       title: `આશ્ચર્યજનક સમાચાર!`,
    //       body: `અમારા સન્ડે સ્પેશિયલ સાથે તમારા સપ્તાહની શરૂઆત કરો! હમણાં જ ઓર્ડર કરો અને સ્વાદિષ્ટ ભોજન સાથે તમારા રવિવારનો આનંદ માણો.`,
    //     };
    //     users?.forEach((user) => {
    //       if (user) {
    //         user?.deviceToken?.forEach((token) => {
    //           sendNotificationToUser(
    //             userPayload.subTitle,
    //             userPayload.body,
    //             userPayload.title,
    //             token,
    //             user._id,
    //           );
    //         });
    //       }
    //     });
    //     return {
    //       error: false,
    //       message: 'send notificaton successfullly',
    //       statusCode: 200,
    //       data: `send notificatioin successfullly`,
    //     };
    //   } catch (error) {
    //     return {
    //       error: true,
    //       message: error.message,
    //       statusCode: 400,
    //       data: null,
    //     };
    //   }
    // }
  }]);
  return OrderService;
}(_Service2["default"]); // async function getDistance(origin, destination) {
//   const params = new URLSearchParams({
//     origins: origin,
//     destinations: destination,
//     key: process.env.GEOCODER_API_KEY,
//   });
//   try {
//     const response = await axios.get(
//       'https://maps.googleapis.com/maps/api/distancematrix/json?' + params,
//     );
//     const distance = response.data.rows[0].elements[0];
//     // console.log(
//     //   `Distance between ${origin} and ${destination}: ${distance?.distance?.text}`,
//     // );
//     return distance;
//   } catch (error) {
//     console.error(error);
//   }
// }
var _default = OrderService;
exports["default"] = _default;