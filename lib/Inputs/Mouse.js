"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mouse = /*#__PURE__*/function () {
  function Mouse(view, renderer) {
    _classCallCheck(this, Mouse);

    this.view = view;
    this.renderer = renderer;
    this.events = new _events["default"]();
    this._events = new _events["default"]();
    this.borders = {
      top: false,
      right: false,
      bottom: false,
      left: false
    };
    this.inside = true;
    this.isDown = false;
    this.click = {
      x: null,
      y: null
    };

    this._start();
  }

  _createClass(Mouse, [{
    key: "_start",
    value: function _start() {
      this._createCursor();

      this._createSelection();

      this._applyPreferences();

      this._fireMouseEvents();

      this._handleLeave();

      this._handleMove();

      this._handleMoveOnBorders();

      this._handleClickDown();

      this._handleClickUp();
    }
  }, {
    key: "_getRelativePositionFromMouseEvent",
    value: function _getRelativePositionFromMouseEvent(event) {
      return {
        x: event.clientX / this.renderer.resolution.absolute.scale,
        y: event.clientY / this.renderer.resolution.absolute.scale
      };
    }
  }, {
    key: "_fireMouseEvents",
    value: function _fireMouseEvents() {
      var _this = this;

      var throttle = [];
      Ticker.add(function () {
        throttle = [];
      });
      var events = {
        onmousemove: 'move',
        onmouseout: 'out',
        onmouseup: 'up',
        onmousedown: 'down',
        oncontextmenu: 'context'
      };

      var _loop = function _loop(name) {
        _this.view[name] = function (event) {
          event.preventDefault();

          if (!throttle.includes(events[name])) {
            _this._events.emit(events[name], event);

            throttle.push(events[name]);
          }
        };
      };

      for (var name in events) {
        _loop(name);
      }
    }
  }, {
    key: "_handleMove",
    value: function _handleMove() {
      var _this2 = this;

      this._events.on('move', function (event) {
        var coordinates = _this2._getRelativePositionFromMouseEvent(event);

        if (_this2.isDown) {
          _this2._updateSelection(_this2.click.x, _this2.click.y, coordinates.x - _this2.click.x, coordinates.y - _this2.click.y);

          _this2.events.emit('selecting', _objectSpread(_objectSpread({}, _this2.click), {}, {
            width: coordinates.x - _this2.click.x,
            height: coordinates.y - _this2.click.y
          }));
        }

        _this2.events.emit('move', coordinates);

        _this2._updateCursor(coordinates.x, coordinates.y);
      });
    }
  }, {
    key: "_handleClickUp",
    value: function _handleClickUp() {
      var _this3 = this;

      this._events.on('up', function (event) {
        var coordinates = _this3._getRelativePositionFromMouseEvent(event);

        if (event.button === 0) {
          _this3.events.emit('clickUp', coordinates); // If we did not moved during the click


          if (coordinates.x === _this3.click.x && coordinates.y === _this3.click.y) {
            _this3.events.emit('click', coordinates);
          } else {
            _this3.events.emit('select', _objectSpread(_objectSpread({}, _this3.click), {}, {
              width: coordinates.x - _this3.click.x,
              height: coordinates.y - _this3.click.y
            }));
          } // Remove the click


          _this3.isDown = false;
          _this3.click = {
            x: null,
            y: null
          }; // If rect was shown, hide it

          _this3._clearSelection();
        } else if (event.button === 2) {
          _this3.events.emit('rightClick', coordinates);
        }
      });
    }
  }, {
    key: "_handleClickDown",
    value: function _handleClickDown() {
      var _this4 = this;

      this._events.on('down', function (event) {
        var coordinates = _this4._getRelativePositionFromMouseEvent(event);

        if (event.button === 0) {
          _this4.isDown = true;
          _this4.click = coordinates;

          _this4.events.emit('clickDown', coordinates);
        }
      });
    }
  }, {
    key: "_handleLeave",
    value: function _handleLeave() {
      var _this5 = this;

      this._events.on('out', function () {
        _this5.inside = false;

        _this5.events.emit('left');
      });

      this._events.on('move', function () {
        if (!_this5.inside) {
          _this5.inside = true;

          _this5.events.emit('back');
        }
      });
    }
  }, {
    key: "_handleMoveOnBorders",
    value: function _handleMoveOnBorders() {
      var _this6 = this;

      var detection = {
        x: this.view.width * 0.05,
        y: this.view.height * 0.05
      };

      this._events.on('move', function (event) {
        _this6.borders.left = _this6.inside && event.offsetX < detection.x;
        _this6.borders.right = _this6.inside && event.offsetX > _this6.view.width - detection.x;
        _this6.borders.top = _this6.inside && event.offsetY < detection.y;
        _this6.borders.bottom = _this6.inside && event.offsetY > _this6.view.height - detection.y;

        _this6.events.emit('onBorders', {
          borders: _this6.borders
        });
      });

      this._events.on('out', function () {
        _this6.borders.left = false;
        _this6.borders.right = false;
        _this6.borders.top = false;
        _this6.borders.bottom = false;

        _this6.events.emit('onBorders', {
          borders: _this6.borders
        });
      });
    }
  }, {
    key: "_createCursor",
    value: function _createCursor(renderer) {
      this.cursor = new PIXI.Graphics();
      this.cursor.lineStyle(1, 0x00CD05, 1);
      this.cursor.moveTo(0, 0);
      this.cursor.lineTo(0, 10);
      this.cursor.lineTo(2, 5);
      this.cursor.lineTo(8, 8);
      this.cursor.lineTo(0, 0);
      this.cursor.endFill();
      this.renderer.containers.ui.addChild(this.cursor);
    }
  }, {
    key: "_updateCursor",
    value: function _updateCursor(x, y) {
      this.cursor.x = x;
      this.cursor.y = y;
    }
  }, {
    key: "_createSelection",
    value: function _createSelection(renderer) {
      this.selection = new PIXI.Graphics();
      this.renderer.containers.ui.addChild(this.selection);
    }
  }, {
    key: "_clearSelection",
    value: function _clearSelection() {
      this.selection.clear();
    }
  }, {
    key: "_updateSelection",
    value: function _updateSelection(fromX, fromY, width, height) {
      this.selection.clear();
      this.selection.lineStyle(1, 0x00CD05, 0.5);
      this.selection.beginFill(0x00CD05, 0.1);
      this.selection.drawRect(fromX, fromY, width, height);
      this.selection.endFill();
    }
  }]);

  return Mouse;
}();

exports["default"] = Mouse;