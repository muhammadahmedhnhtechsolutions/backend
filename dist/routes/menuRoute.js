"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MenuController = _interopRequireDefault(require("../controllers/MenuController"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
var _adminAuth = _interopRequireDefault(require("../middleware/adminAuth.middleware"));
var _uploadCsv = _interopRequireDefault(require("../middleware/uploadCsv.middlevare"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //App Route
  router.get("/api/menu", _auth["default"], _MenuController["default"].getAllMenu);
  router.get("/api/v2/menu", _auth["default"], _MenuController["default"].getAllV2);
  
  router.get("/api/getRestaurant/allMenu", _auth["default"], _MenuController["default"].getRestaurantMenu);
  router.get("/api/menu/:id", _auth["default"], _MenuController["default"].getSingleMenu);
  router.put("/api/menu/review/:id", _auth["default"], _MenuController["default"].addReview);

  //Admin Route
  router.post("/api/menu", _auth["default"], _MenuController["default"].createMenu);
  router.post("/api/menu/csvUpload", _auth["default"], _uploadCsv["default"], _MenuController["default"].insertCsvData);
  router.get("/api/adminMenu/menu", _auth["default"], _MenuController["default"].getAllAdminMenu);
  router.get("/api/getRestaurantMenu/:restaurantId", _adminAuth["default"], _MenuController["default"].getAdminRestaurantMenu);
  router.put("/api/menu/:id", _auth["default"], _MenuController["default"].update);
  router.put("/api/UpdateAllmenu", _auth["default"], _MenuController["default"].UpdateAllmenu);
  router["delete"]("/api/menu/:id", _auth["default"], _MenuController["default"].softDelete);

  // router.get(`/api/menu/data/update`, MenuController.dataUpdate);

  
};
exports["default"] = _default;