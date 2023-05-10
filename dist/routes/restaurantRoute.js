"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RestaurantController = _interopRequireDefault(require("../controllers/RestaurantController"));
var _adminAuth = _interopRequireDefault(require("../middleware/adminAuth.middleware"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
var _uploadCsv = _interopRequireDefault(require("../middleware/uploadCsv.middlevare"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  // resttaurant Auth
  router.post("/api/restaurant/auth/sendOtp", _RestaurantController["default"].sendOtp);
  router.post("/api/restaurant/auth/reSendOtp", _RestaurantController["default"].reSendOtp);
  router.post("/api/restaurant/auth/otpVerified", _RestaurantController["default"].otpVerified);

  //for App
  router.get("/api/restaurant", _auth["default"], _RestaurantController["default"].getAllRestaurant);
  router.get("/api/restaurantProfile", _auth["default"], _RestaurantController["default"].getRestaurantProfile);
  //restaurant and there menu
  router.get("/api/restaurant/:id", _auth["default"], _RestaurantController["default"].getSingleRestaurantAndThereMenu);
  router.put("/api/changeRestaurantStatus", _auth["default"], _RestaurantController["default"].changeRestaurantStatus);

  //for admin
  router.post("/api/restaurant", _adminAuth["default"], _RestaurantController["default"].createRestaurant);
  router.post("/api/restaurant/csvUpload", _adminAuth["default"], _uploadCsv["default"], _RestaurantController["default"].insertCsvData);
  router.get("/api/adminRestaurant/restaurant", _adminAuth["default"], _RestaurantController["default"].getAllAdminRestaurant);
  router.get("/api/restaurant/commission/:id", _adminAuth["default"], _RestaurantController["default"].getPerOrderCommission);
  router.put("/api/restaurant/commission/:id", _adminAuth["default"], _RestaurantController["default"].getPerOrderCommission);
  router.get("/api/singleRestaurant/:id", _adminAuth["default"], _RestaurantController["default"].getSingleRestaurant);
  router.get("/api/restaurant/category/:id", _auth["default"], _RestaurantController["default"].getAllCategoryRestaurant);
  router.put("/api/restaurant/:id", _auth["default"], _RestaurantController["default"].updateRestaurant);
  router.put("/api/admin/changeRestaurantStatus", _auth["default"], _RestaurantController["default"].changeRestaurantStatus);
  router.put("/api/admin/changeAllRestaurantStatus", _adminAuth["default"], _RestaurantController["default"].changeAllRestaurantStatus);
  router.put("/api/changeRestaurantStatus/:id", _adminAuth["default"], _RestaurantController["default"].adminChangeRestaurantStatus);
  router.put("/api/statusRestaurant/:id", _auth["default"], _RestaurantController["default"].update);
  router["delete"]("/api/restaurant/:id", _auth["default"], _RestaurantController["default"].deleteRestaurant);
  router["delete"]("/api/deleteUser", _auth["default"], _RestaurantController["default"].deleteUserAndRestaurant);

  //router.get(`/api/restaurant/data/update`, RestaurantController.dataUpdate);

  router.get("/api/v2/restaurant", _auth["default"], _RestaurantController["default"].getAllRestaurant2);
};
exports["default"] = _default;