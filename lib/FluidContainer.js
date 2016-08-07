'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _getPublicProps = require('./get-public-props');

var _getPublicProps2 = _interopRequireDefault(_getPublicProps);

var privateProps = {
  tag: _react.PropTypes.string,
  height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.oneOf(['auto'])]),
  rmConfig: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.number),
  children: _react.PropTypes.node.isRequired,
  beforeAnimation: _react.PropTypes.func,
  afterAnimation: _react.PropTypes.func
};

var noop = function noop() {
  return null;
};

var FluidContainer = (function (_Component) {
  _inherits(FluidContainer, _Component);

  _createClass(FluidContainer, null, [{
    key: 'propTypes',
    value: privateProps,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      tag: 'div',
      height: 'auto',
      rmConfig: _reactMotion.presets.noWobble,
      beforeAnimation: noop,
      afterAnimation: noop
    },
    enumerable: true
  }]);

  function FluidContainer(props) {
    var _this = this;

    _classCallCheck(this, FluidContainer);

    _get(Object.getPrototypeOf(FluidContainer.prototype), 'constructor', this).call(this, props);

    this._handleMeasure = function (_ref) {
      var height = _ref.height;

      // store the height so we can apply it to the element immediately
      // and avoid any element jumping
      if (height > 0) {
        _this._currHeight = height;
      }
      if (height !== _this.state.height) {
        _this.props.beforeAnimation(height, _this.state.height);
        _this.setState({ height: height });
      }
    };

    this._handleRest = function () {
      _this.props.afterAnimation();
    };

    this.state = {
      height: 0
    };

    this._heightReady = props.height !== 'auto';
    this._currHeight = null;
  }

  _createClass(FluidContainer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(lastProps, lastState) {
      // don't apply height until we have our first real measurement
      if (this.props.height > 0 || lastState.height > 0) {
        this._heightReady = true;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var tag = _props.tag;
      var height = _props.height;
      var rmConfig = _props.rmConfig;
      var children = _props.children;

      var publicProps = (0, _getPublicProps2['default'])(this.props, privateProps);
      var rmHeight = height === 'auto' ? this.state.height : height;
      var child = _react2['default'].createElement(
        _reactMeasure2['default'],
        { whitelist: ['height'], onMeasure: this._handleMeasure },
        _react.Children.only(children)
      );

      return _react2['default'].createElement(
        _reactMotion.Motion,
        {
          defaultStyle: { _height: rmHeight },
          style: {
            _height: (0, _reactMotion.spring)(rmHeight, _extends({ precision: 0.5 }, rmConfig))
          },
          onRest: this._handleRest
        },
        function (_ref2) {
          var _height = _ref2._height;
          return (0, _react.createElement)(tag, _extends({}, publicProps, {
            style: _extends({
              height: _this2._heightReady ? _height : _this2._currHeight || 'auto'
            }, publicProps.style)
          }), child);
        }
      );
    }
  }]);

  return FluidContainer;
})(_react.Component);

exports['default'] = FluidContainer;
module.exports = exports['default'];