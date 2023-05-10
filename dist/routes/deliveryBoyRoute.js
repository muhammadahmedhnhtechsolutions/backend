"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DeliveryBoyController = _interopRequireDefault(require("../controllers/DeliveryBoyController"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
var _adminAuth = _interopRequireDefault(require("../middleware/adminAuth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  // deliveryBoy route
  router.post("/api/deliveryBoy/auth/sendOtp", _DeliveryBoyController["default"].sendOtp);
  router.post("/api/deliveryBoy/auth/otpVerified", _DeliveryBoyController["default"].otpVerified);
  router.post("/api/deliveryBoy", _adminAuth["default"], _DeliveryBoyController["default"].insertDeliveryBoy);
  router.get("/api/deliveryBoy", _auth["default"], _DeliveryBoyController["default"].getAll);
  router.get("/api/deliveryBoy/:id", _auth["default"], _DeliveryBoyController["default"].get);
  router.put("/api/deliveryBoy/:id", _auth["default"], _DeliveryBoyController["default"].updateDeliveryBoy);
  router["delete"]("/api/deliveryBoy/:id", _auth["default"], _DeliveryBoyController["default"].softDelete);
};
exports["default"] = _default;