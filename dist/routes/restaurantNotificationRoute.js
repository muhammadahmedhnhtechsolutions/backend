"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RestaurantNotificationController = _interopRequireDefault(require("../controllers/RestaurantNotificationController"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  router.get("/api/restaurant/notification", _auth["default"], _RestaurantNotificationController["default"].getAllNotification);
  router["delete"]("/api/restaurant/notification", _auth["default"], _RestaurantNotificationController["default"].softDeleteAllNotification);
};
exports["default"] = _default;