"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controls = _interopRequireDefault(require("@hekojs/controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  bind: function bind(ticker, entity) {
    var _this = this;

    var controls = new _controls["default"].Keyboard(ticker);
    controls.events.on('updated.arrows', function (_ref) {
      var up = _ref.up,
          right = _ref.right,
          down = _ref.down,
          left = _ref.left;

      _this._applyDirectionToEntity(entity, {
        up: up,
        right: right,
        down: down,
        left: left
      });
    });
  },
  _applyDirectionToEntity: function _applyDirectionToEntity(entity, _ref2) {
    var up = _ref2.up,
        right = _ref2.right,
        down = _ref2.down,
        left = _ref2.left;

    if (up && right) {
      this._setEntityMoveToAngle(entity, 45);
    } else if (right && down) {
      this._setEntityMoveToAngle(entity, 135);
    } else if (down && left) {
      this._setEntityMoveToAngle(entity, 225);
    } else if (left && up) {
      this._setEntityMoveToAngle(entity, 315);
    } else if (up) {
      this._setEntityMoveToAngle(entity, 0);
    } else if (right) {
      this._setEntityMoveToAngle(entity, 90);
    } else if (down) {
      this._setEntityMoveToAngle(entity, 180);
    } else if (left) {
      this._setEntityMoveToAngle(entity, 270);
    } else {
      this._setEntityStopMoving(entity);
    }
  },
  _setEntityMoveToAngle: function _setEntityMoveToAngle(entity, angle) {
    entity.components.canMove.toAngle({
      angle: angle
    });
  },
  _setEntityStopMoving: function _setEntityStopMoving(entity) {
    entity.components.canMove.stop();
  }
};
exports["default"] = _default;