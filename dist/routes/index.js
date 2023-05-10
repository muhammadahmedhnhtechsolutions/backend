"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userRoute = _interopRequireDefault(require("./userRoute"));
var _userNotificationRoute = _interopRequireDefault(require("./userNotificationRoute"));
var _restaurantNotificationRoute = _interopRequireDefault(require("./restaurantNotificationRoute"));
var _adminRoute = _interopRequireDefault(require("./adminRoute"));
var _restaurantRoute = _interopRequireDefault(require("./restaurantRoute"));
var _menuRoute = _interopRequireDefault(require("./menuRoute"));
var _categoryRoute = _interopRequireDefault(require("./categoryRoute"));
var _sliderRoute = _interopRequireDefault(require("./sliderRoute"));
var _orderRoute = _interopRequireDefault(require("./orderRoute"));
var _deliveryBoyRoute = _interopRequireDefault(require("./deliveryBoyRoute"));
var _dashboardRoute = _interopRequireDefault(require("./dashboardRoute"));
var _commonEnumRoute = _interopRequireDefault(require("./commonEnumRoute"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
(0, _userRoute["default"])(router);
(0, _userNotificationRoute["default"])(router);
(0, _restaurantNotificationRoute["default"])(router);
(0, _adminRoute["default"])(router);
(0, _restaurantRoute["default"])(router);
(0, _menuRoute["default"])(router);
(0, _categoryRoute["default"])(router);
(0, _sliderRoute["default"])(router);
(0, _orderRoute["default"])(router);
(0, _deliveryBoyRoute["default"])(router);
(0, _dashboardRoute["default"])(router);
(0, _commonEnumRoute["default"])(router);
var _default = router;
exports["default"] = _default;