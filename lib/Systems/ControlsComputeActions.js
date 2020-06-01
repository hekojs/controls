"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

var _dPhysics = _interopRequireDefault(require("@hekojs/2d-physics"));

var _helpers = _interopRequireDefault(require("@hekojs/helpers"));

var _TopDownRotateThrustControl = _interopRequireDefault(require("../Components/TopDownRotateThrustControl"));

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

var ControlsComputeActions = /*#__PURE__*/function (_Heko$System) {
  _inherits(ControlsComputeActions, _Heko$System);

  var _super = _createSuper(ControlsComputeActions);

  function ControlsComputeActions() {
    _classCallCheck(this, ControlsComputeActions);

    return _super.apply(this, arguments);
  }

  _createClass(ControlsComputeActions, [{
    key: "onTick",
    value: function onTick() {
      this.handleWithTopDownRotateThrustControl(this.queries.withTopDownRotateThrustControl.results);
    }
  }, {
    key: "handleWithTopDownRotateThrustControl",
    value: function handleWithTopDownRotateThrustControl(entities) {
      entities.forEach(function (entity) {
        var control = entity.getComponent(_TopDownRotateThrustControl["default"]);
        var physics = entity.getComponent(_dPhysics["default"].Components.Physics);

        if (control.actions.forward) {
          physics.applyForce({
            x: Math.cos(_helpers["default"].Angle.toRadian(physics.angle) - _helpers["default"].Angle.toRadian(90)) * 0.0002,
            y: Math.sin(_helpers["default"].Angle.toRadian(physics.angle) - _helpers["default"].Angle.toRadian(90)) * 0.0002
          });
        }

        if (control.actions.brake) {
          physics.applyForce({
            x: physics.velocity.x / 10000 * -1,
            y: physics.velocity.y / 10000 * -1
          });
        }

        if (control.actions.right) {
          physics.setAngle({
            angle: physics.angle + 2
          });
        }

        if (control.actions.left) {
          physics.setAngle({
            angle: physics.angle - 2
          });
        }
      });
    }
  }]);

  return ControlsComputeActions;
}(_core["default"].System);

exports["default"] = ControlsComputeActions;
ControlsComputeActions.queries = {
  withTopDownRotateThrustControl: {
    components: [_dPhysics["default"].Components.Physics, _TopDownRotateThrustControl["default"]]
  }
};