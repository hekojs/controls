"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard = /*#__PURE__*/function () {
  function Keyboard(world, mapping) {
    var _this = this;

    _classCallCheck(this, Keyboard);

    this.mapping = Object.assign({
      // Arrows
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowRight': 'right',
      'ArrowLeft': 'left',
      // WASD
      'w': 'up',
      'd': 'right',
      's': 'down',
      'a': 'left',
      // Other
      ' ': 'space'
    }, mapping);
    this.pressed = {};
    Object.values(this.mapping).forEach(function (key) {
      return _this.pressed[key] = false;
    });
    this.updated = false;
    this.events = new _events["default"]();

    this._fireKeyPressed(world.ticker);

    this._handleKeypress();
  }

  _createClass(Keyboard, [{
    key: "_fireKeyPressed",
    value: function _fireKeyPressed(ticker) {
      var _this2 = this;

      ticker.add(function () {
        for (var key in _this2.pressed) {
          if (_this2.pressed[key]) {
            _this2._fireKeyEvent('pressing', key);
          }
        }
      });
    }
  }, {
    key: "_handleKeypress",
    value: function _handleKeypress() {
      var _this3 = this;

      document.addEventListener('keydown', function (event) {
        var key = _this3._resolveKey(event);

        if (!(key in _this3.pressed) || _this3.pressed[key] === false) {
          _this3.pressed[key] = true;

          _this3._fireKeyEvent('pressed', key);

          _this3._fireAllKeysEvent();
        }
      });
      document.addEventListener('keyup', function (event) {
        var key = _this3._resolveKey(event);

        if (!(key in _this3.pressed) || _this3.pressed[key] === true) {
          _this3.pressed[key] = false;

          _this3._fireKeyEvent('released', key);

          _this3._fireAllKeysEvent();
        }
      });
    }
  }, {
    key: "_resolveKey",
    value: function _resolveKey(event) {
      var key = _keyboardKey["default"].getKey(event);

      if (key in this.mapping) {
        key = this.mapping[key];
      }

      return key;
    }
  }, {
    key: "_fireKeyEvent",
    value: function _fireKeyEvent(name, key) {
      this.events.emit(name, {
        key: key
      });
    }
  }, {
    key: "_fireAllKeysEvent",
    value: function _fireAllKeysEvent() {
      this.events.emit('keys', this.pressed);
    }
  }]);

  return Keyboard;
}();

exports["default"] = Keyboard;