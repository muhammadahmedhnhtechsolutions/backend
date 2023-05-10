"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AdminController = _interopRequireDefault(require("../controllers/AdminController"));
var _adminAuth = _interopRequireDefault(require("../middleware/adminAuth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  router.post("/api/auth/admin", _AdminController["default"].addAdmin);
  router.post("/api/auth/admin/login", _AdminController["default"].login);
  router.post("/api/auth/admin/changePassword/:id", _adminAuth["default"], _AdminController["default"].changePassword);
  router.get("/api/auth/admin", _adminAuth["default"], _AdminController["default"].getAdminProfile);
  router.get("/api/auth/admin/:id", _adminAuth["default"], _AdminController["default"].get);
  router.put("/api/auth/admin/:id", _adminAuth["default"], _AdminController["default"].update);
  router["delete"]("/api/auth/admin/:id", _adminAuth["default"], _AdminController["default"].softDelete);
};
exports["default"] = _default;