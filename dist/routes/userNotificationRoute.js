"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _UserNotificationController = _interopRequireDefault(require("../controllers/UserNotificationController"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  //   router.post(
  //     `/api/customer/notification`,
  //     auth,
  //     UserNotificationController.insert,
  //   );
  router.get("/api/customer/notification", _auth["default"], _UserNotificationController["default"].getAllNotification);
  //   router.get(
  //     `/api/customer/notification/:id`,
  //     auth,
  //     UserNotificationController.get,
  //   );
  //   router.put(
  //     `/api/customer/notification/:id`,
  //     auth,
  //     UserNotificationController.update,
  //   );
  //   router.delete(
  //     `/api/customer/notification/:id`,
  //     auth,
  //     UserNotificationController.delete,
  //   );
  router["delete"]("/api/customer/notification", _auth["default"], _UserNotificationController["default"].softDeleteAllNotification);
};
exports["default"] = _default;