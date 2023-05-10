"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var OrderModel = /*#__PURE__*/function () {
  function OrderModel() {
    _classCallCheck(this, OrderModel);
  }
  _createClass(OrderModel, [{
    key: "initSchema",
    value:
    // eslint-disable-next-line class-methods-use-this
    function initSchema() {
      var schema = new _mongoose.Schema({
        items: Array,
        totalQuantity: {
          type: Number,
          "default": 0,
          required: true
        },
        totalPrice: {
          type: Number,
          "default": null
        },
        deliveryCharge: {
          type: Number,
          "default": null
        },
        totalPriceWithDeliveryCharge: {
          type: Number,
          "default": null
        },
        adminCommission: {
          type: Number,
          "default": null
        },
        totalPriceAfterAdminCommission: {
          type: Number,
          "default": null
        },
        deliveryAddress: {
          //GeoJson poit
          type: {
            type: String,
            "enum": ['Point']
          },
          coordinates: {
            type: [Number],
            index: '2dsphere'
          },
          formattedAddress: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          country: String,
          countryCode: String
        },
        deliveryPhone: {
          type: String,
          "default": null
        },
        deliveryInstructions: {
          type: String,
          "default": null
        },
        orderId: {
          type: String,
          "default": null
        },
        deliveryTime: {
          type: Date
        },
        paymentMethod: {
          type: String,
          "default": null
        },
        orderStatus: {
          type: String,
          "default": 'Pending',
          "enum": ['Pending', 'Confirmed', 'Cancelled', 'Completed']
        },
        orderRestaurant: {
          type: _mongoose.Schema.Types.ObjectId,
          ref: 'restaurents',
          "default": null
        },
        deliveryBoy: {
          type: _mongoose.Schema.Types.ObjectId,
          ref: 'deliveryBoys',
          "default": null
        },
        distance: {
          type: Object,
          "default": null
        },
        isdeliveryBoyAccept: {
          type: Boolean,
          "default": false
        },
        orderdBy: {
          type: _mongoose.Schema.Types.ObjectId,
          ref: 'users',
          "default": null
        },
        orderDate: {
          type: Date,
          "default": Date.now
        },
        deleted: {
          type: Boolean,
          "default": false
        }
      }, {
        timestamps: true
      });
      schema.virtual('adminTotalCommission').get(function () {
        return this.deliveryCharge + this.adminCommission;
      });
      schema.plugin(_mongooseUniqueValidator["default"]);
      _mongoose["default"].model('orders', schema);
      schema.set('toObject', {
        virtuals: true
      });
      schema.set('toJSON', {
        virtuals: true
      });
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      this.initSchema();
      return _mongoose["default"].model('orders');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getModel",
    value: function getModel() {
      return _mongoose["default"].model('orders');
    }
  }]);
  return OrderModel;
}();
var _default = OrderModel;
exports["default"] = _default;