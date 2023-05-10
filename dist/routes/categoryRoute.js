"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CategoryController = _interopRequireDefault(require("../controllers/CategoryController"));
var _adminAuth = _interopRequireDefault(require("../middleware/adminAuth.middleware"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  router.post("/api/category", _adminAuth["default"], _CategoryController["default"].createCategory);
  router.get("/api/category", _auth["default"], _CategoryController["default"].getAll);
  router.get("/api/adminCategory/category", _adminAuth["default"], _CategoryController["default"].getAllAdminCategory);
  router.get("/api/category/:id", _adminAuth["default"], _CategoryController["default"].get);
  router.put("/api/category/:id", _adminAuth["default"], _CategoryController["default"].update);
  router["delete"]("/api/category/:id", _adminAuth["default"], _CategoryController["default"].softDelete);

  // router.get(`/api/category/data/update`, CategoryController.dataUpdate);

  router.get("/api/v2/category", _auth["default"], _CategoryController["default"].getAllV2);
};
exports["default"] = _default;