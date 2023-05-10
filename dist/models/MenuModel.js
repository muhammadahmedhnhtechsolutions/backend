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
var MenuModel = /*#__PURE__*/function () {
  function MenuModel() {
    _classCallCheck(this, MenuModel);
  }
  _createClass(MenuModel, [{
    key: "initSchema",
    value:
    // eslint-disable-next-line class-methods-use-this
    function initSchema() {
      var schema = new _mongoose.Schema({
        title: {
          type: String,
          required: true
        },
        images: {
          type: [String],
          "default": 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
          get: function get(v) {
            return v.map(function (item) {
              if (item != 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80') {
                // const base64Data = item.replace(/^data:image\/png;base64,/, "");
                // const base64RegExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                // const isBase64 = base64RegExp.test(base64Data)
                // if (isBase64) {
                //   return item;
                // } else {
                return "".concat(process.env.BASE_URL, "/").concat(item);
                // }
              } else {
                return item;
              }
            });
          }
        },
        isSize: {
          type: Boolean,
          "default": false
        },
        sizes: [{
          name: {
            type: String,
            "enum": [null, 'regular', 'medium', 'large'],
            "default": null
          },
          price: {
            type: Number,
            "default": null
          }
        }],
        description: {
          type: String,
          "default": null
        },
        price: {
          type: Number,
          trim: true,
          required: true
        },
        availability: {
          type: Boolean,
          "default": true
        },
        delivery: {
          type: Boolean,
          "default": true
        },
        category_id: {
          type: _mongoose.Schema.Types.ObjectId,
          ref: 'categorys'
        },
        reviews: [{
          customer: {
            type: _mongoose.Schema.Types.ObjectId,
            ref: 'users',
            "default": null
          },
          stars: {
            type: Number,
            "default": 0
          }
        }],
        averageRating: {
          type: Number,
          "default": 0
        },
        restaurant_id: {
          type: _mongoose.Schema.Types.ObjectId,
          ref: 'restaurents',
          required: true
        },
        deleted: {
          type: Boolean,
          "default": false
        }
      }, {
        timestamps: true
      });
      schema.plugin(_mongooseUniqueValidator["default"]);
      _mongoose["default"].model('menus', schema);
      schema.set('toObject', {
        getters: true
      });
      schema.set('toJSON', {
        getters: true
      });
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      this.initSchema();
      return _mongoose["default"].model('menus');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getModel",
    value: function getModel() {
      return _mongoose["default"].model('menus');
    }
  }]);
  return MenuModel;
}();
var _default = MenuModel;
exports["default"] = _default;