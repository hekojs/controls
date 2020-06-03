"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TopDownRotateThrustControl = _interopRequireDefault(require("./TopDownRotateThrustControl"));

var _SideWalkJumpControl = _interopRequireDefault(require("./SideWalkJumpControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  TopDownRotateThrustControl: _TopDownRotateThrustControl["default"],
  SideWalkJumpControl: _SideWalkJumpControl["default"]
};
exports["default"] = _default;