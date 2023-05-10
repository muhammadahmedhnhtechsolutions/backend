"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _UserController = _interopRequireDefault(require("../controllers/UserController"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
var _adminAuth = _interopRequireDefault(require("../middleware/adminAuth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  router.post("/api/auth/sendOtp", _UserController["default"].sendOtp);
  router.post("/api/auth/reSendOtp", _UserController["default"].reSendOtp);
  router.post("/api/auth/otpVerified", _UserController["default"].otpVerified);
  router.put("/api/auth/address", _auth["default"], _UserController["default"].updateAddress);
  router.put("/api/auth/signUp", _auth["default"], _UserController["default"].signUp);
  router.get("/api/user/profile", _auth["default"], _UserController["default"].getUserProfile);
  router.put("/api/user/profile", _auth["default"], _UserController["default"].updateUserProfile);
  router.get("/api/user", _adminAuth["default"], _UserController["default"].getAll);
  router.get("/api/user/:id", _adminAuth["default"], _UserController["default"].get);
  router.put("/api/user/:id", _adminAuth["default"], _UserController["default"].update);
  router["delete"]("/api/user/:id", _auth["default"], _UserController["default"].softDelete);
  router.post("/api/v2/auth/login", _UserController["default"].login);
};
exports["default"] = _default;