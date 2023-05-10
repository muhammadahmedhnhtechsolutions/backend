"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _SliderController = _interopRequireDefault(require("../controllers/SliderController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default(router) {
  //Public Route
  router.post("/api/slider", _SliderController["default"].insert);
  router.get("/api/slider", _SliderController["default"].getAll);
  router.get("/api/slider/:id", _SliderController["default"].get);
  router.put("/api/slider/:id", _SliderController["default"].update);
  router["delete"]("/api/slider/:id", _SliderController["default"]["delete"]);
};
exports["default"] = _default;