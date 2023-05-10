"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _OrderController = _interopRequireDefault(require("../controllers/OrderController"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
var _deliveryBoyAuth = _interopRequireDefault(require("../middleware/deliveryBoy.Auth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  router.post("/api/admin/sendUserAnyNotification", _OrderController["default"].sendAdminNotificationToAll);
  router.post("/api/order", _auth["default"], _OrderController["default"].createOrder);
  router.post("/api/order/:orderId/confirm", _auth["default"], _OrderController["default"].confirmOrder);
  router.get("/api/deliveryboy/:deliveryBoyId/:orderId", _OrderController["default"].getDeliverBoyAndOrderData);
  router.post("/api/order/:orderId/cancel", _auth["default"], _OrderController["default"].cancelOrder);

  //for deliveryBoyAllOrder
  router.post("/api/order/:orderId/accept", _deliveryBoyAuth["default"], _OrderController["default"].acceptOrder);
  router.post("/api/order/:orderId/complete", _deliveryBoyAuth["default"], _OrderController["default"].completeOrder);
  /////////////////
  router.get("/api/order", _auth["default"], _OrderController["default"].getAllOrder);
  router.get("/api/order/restaurant", _auth["default"], _OrderController["default"].getAllOrderByRestaurantId);
  router.get("/api/order/todayRestaurantOrder/:restroId", _auth["default"], _OrderController["default"].getAllTodayRestaurantOrder);
  router.get("/api/order/customer", _auth["default"], _OrderController["default"].getAllOrderByCustomerId);
  // dahsboard
  router.get("/api/dashboard/restaurent", _auth["default"], _OrderController["default"].getRestaurantDashboardData);
  router.get("/api/report/todayRestaurantReport", _auth["default"], _OrderController["default"].todayRestaurantReport);

  // router.get(`/api/todayRestro/:id`, auth, OrderController.getOrder);

  router.get("/api/order/:id", _auth["default"], _OrderController["default"].getOrder);
  router.put("/api/order/:id", _auth["default"], _OrderController["default"].update);
  router["delete"]("/api/order/:id", _auth["default"], _OrderController["default"].softDelete);

  // deliveryBoy route
  router.get("/api/deliveryBoyAllOrder", _deliveryBoyAuth["default"], _OrderController["default"].deliveryBoyAllOrder);
  router.get("/api/deliveryBoyOrderHistory", _deliveryBoyAuth["default"], _OrderController["default"].deliveryBoyOrderHistory);
  router.get("/api/dashboard/deliveryBoyDashboardData", _deliveryBoyAuth["default"], _OrderController["default"].deliveryBoyDashboardData);
};
exports["default"] = _default;