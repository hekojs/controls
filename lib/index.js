"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

var _Keyboard = _interopRequireDefault(require("./Inputs/Keyboard"));

var _Components = _interopRequireDefault(require("./Components"));

var _Plugin = _interopRequireDefault(require("./Plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].registerComponents(_Components["default"]);

var _default = {
  Inputs: {
    Keyboard: _Keyboard["default"]
  },
  Components: _Components["default"],
  Plugin: _Plugin["default"]
};
exports["default"] = _default;