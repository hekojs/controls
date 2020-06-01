"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TopDownRotateThrustControl = /*#__PURE__*/function (_Heko$Component) {
  _inherits(TopDownRotateThrustControl, _Heko$Component);

  var _super = _createSuper(TopDownRotateThrustControl);

  function TopDownRotateThrustControl() {
    var _this;

    _classCallCheck(this, TopDownRotateThrustControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.listener = function (keys) {
      var multiplayer = _this.getWorld().plugins.get('Multiplayer');

      if (multiplayer && multiplayer.isClient()) {
        multiplayer.sendMessage(_this.getNamespace() + '.actions', {
          'forward': keys['up'],
          'brake': keys['down'],
          'right': keys['right'],
          'left': keys['left']
        });
      }

      _this.actions.forward = keys['up'];
      _this.actions.brake = keys['down'];
      _this.actions.right = keys['right'];
      _this.actions.left = keys['left'];
    };

    return _this;
  }

  _createClass(TopDownRotateThrustControl, [{
    key: "onAdd",
    value: function onAdd() {
      var _this2 = this;

      var multiplayer = this.getWorld().plugins.get('Multiplayer');

      if (multiplayer && multiplayer.isServer()) {
        multiplayer.onMessage(this.getNamespace() + '.actions', function (actions) {
          for (var name in actions) {
            _this2.actions[name] = actions[name];
          }
        });
      }
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this.stopListening();
    }
  }, {
    key: "listen",
    value: function listen(keyboard) {
      this.keyboard = keyboard;
      this.keyboard.events.on('keys', this.listener);
      return this;
    }
  }, {
    key: "stopListening",
    value: function stopListening() {
      if (this.keyboard) {
        this.keyboard.events.off('keys', this.listener);
        this.keyboard = null;
      }

      return this;
    }
  }], [{
    key: "attributes",
    value: function attributes() {
      return {
        actions: new _core["default"].Schema.MapSchema({
          forward: false,
          brake: false,
          right: false,
          left: false
        }),
        keyboard: null
      };
    }
  }]);

  return TopDownRotateThrustControl;
}(_core["default"].Component);

exports["default"] = TopDownRotateThrustControl;
TopDownRotateThrustControl.multiplayerSchema = {
  actions: {
    map: 'boolean'
  }
};