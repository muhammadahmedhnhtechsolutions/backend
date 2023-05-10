"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _CommonEnumController = _interopRequireDefault(require("../controllers/CommonEnumController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  router.post("/api/commonEnum", _CommonEnumController["default"].insertCommonEnum);
  router.get("/api/commonEnum", _CommonEnumController["default"].getAllEnums);
  router.get("/api/commonEnum/:id", _CommonEnumController["default"].get);
  router.put("/api/commonEnum/:id", _CommonEnumController["default"].updateCommonEnum);
  router.put("/api/commonEnum/:id", _CommonEnumController["default"].update);
  router["delete"]("/api/commonEnum/:id", _CommonEnumController["default"].deleteCommonEnum);
};
exports["default"] = _default;