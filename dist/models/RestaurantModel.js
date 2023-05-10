"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _geocoder = _interopRequireDefault(require("../helpers/geocoder"));
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
var RestaurantModel = /*#__PURE__*/function () {
  function RestaurantModel() {
    _classCallCheck(this, RestaurantModel);
  }
  _createClass(RestaurantModel, [{
    key: "initSchema",
    value:
    // eslint-disable-next-line class-methods-use-this
    function initSchema() {
      var schema = new _mongoose.Schema({
        name: {
          type: String,
          required: [true, 'please add a name']
        },
        ownerName: {
          type: String,
          "default": null
        },
        images: {
          type: [String],
          "default": 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          get: function get(v) {
            return v.map(function (item) {
              if (item != 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80') {
                return "".concat(process.env.BASE_URL, "/").concat(item);
              } else {
                return item;
              }
            });
          }
        },
        description: {
          type: String,
          required: [true, 'please add a description'],
          maxlength: [500, 'description can not be more then 500 characters']
        },
        email: {
          type: String
        },
        phoneNumber: {
          type: String,
          required: [true, 'please add a phone Number']
        },
        address: {
          type: String,
          required: [true, 'Please add an address']
        },
        location: {
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
        deliveryCharges: [{
          minOrderAmount: {
            type: Number
          },
          maxOrderAmount: {
            type: Number
          },
          charge: {
            type: Number
          }
        }],
        perOrderCommission: [{
          minOrderAmount: {
            type: Number
          },
          maxOrderAmount: {
            type: Number
          },
          charge: {
            type: Number
          }
        }],
        category_id: [{
          type: _mongoose.Schema.Types.ObjectId,
          ref: 'categorys',
          "default": null
        }],
        customerSupport: {
          email: {
            type: String,
            "default": 'admin@example.com'
          },
          phoneNumber: {
            type: String,
            "default": 'xxx-xxx-xxxx'
          }
        },
        averageRating: {
          type: Number
          // min: [1, 'Rating must be at leaset 1'],
          // max: [5, 'Rating must can not be more then 5'],
        },

        restaurantStatus: {
          type: Boolean,
          "default": true
        },
        openingHours: [{
          dayOfWeek: Number,
          // 0 for Sunday, 1 for Monday, and so on
          openTime: String,
          closeTime: String
        }],
        isAccountVerified: {
          type: Boolean,
          "default": false
        },
        isAccountVerifiedOtp: {
          type: Number,
          "default": null,
          minlength: 6
        },
        otpExpirationTime: {
          type: String,
          "default": null
        },
        status: {
          type: String,
          "enum": ['availableNow', 'suspend'],
          "default": 'availableNow'
        },
        deviceToken: {
          type: [String]
        },
        role: {
          type: String,
          "default": 'restaurant'
        },
        deleted: {
          type: Boolean,
          "default": false
        }
      }, {
        timestamps: true
      });

      // define pre and save methods here
      schema.pre('save', function (next) {
        this.averageRating = 4;
        next();
      });
      // schema.set('toObject', { getters: true });
      // schema.set('toJSON', { getters: true });
      // define virtuals here
      // schema.virtual('outlet', {
      //   ref: 'outlets',
      //   localField: '_id',
      //   foreignField: 'restaurant_id',
      //   count: true,
      // });

      schema.plugin(_mongooseUniqueValidator["default"]);
      _mongoose["default"].model('restaurents', schema);
      schema.set('toObject', {
        virtuals: true,
        getters: true
      });
      schema.set('toJSON', {
        virtuals: true,
        getters: true
      });
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      this.initSchema();
      return _mongoose["default"].model('restaurents');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getModel",
    value: function getModel() {
      return _mongoose["default"].model('restaurents');
    }
  }]);
  return RestaurantModel;
}();
var _default = RestaurantModel;
exports["default"] = _default;