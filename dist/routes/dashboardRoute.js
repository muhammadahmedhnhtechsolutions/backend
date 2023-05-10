"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DashboardController = require("../controllers/DashboardController");
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  router.get("/api/adminDashboard", _DashboardController.adminDashboard);
};
exports["default"] = _default;