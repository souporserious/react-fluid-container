(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-motion"), require("react-measure"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-motion", "react-measure"], factory);
	else if(typeof exports === 'object')
		exports["ReactFluidContainer"] = factory(require("react"), require("react-motion"), require("react-measure"));
	else
		root["ReactFluidContainer"] = factory(root["React"], root["ReactMotion"], root["Measure"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _FluidContainer = __webpack_require__(1);

	var _FluidContainer2 = _interopRequireDefault(_FluidContainer);

	exports['default'] = _FluidContainer2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _reactMeasure = __webpack_require__(4);

	var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

	var _getPublicProps = __webpack_require__(5);

	var _getPublicProps2 = _interopRequireDefault(_getPublicProps);

	var privateProps = {
	  tag: _react.PropTypes.string,
	  height: _react.PropTypes.any,
	  rmConfig: _react2['default'].PropTypes.objectOf(_react2['default'].PropTypes.number),
	  children: _react.PropTypes.node.isRequired,
	  beforeAnimation: _react.PropTypes.func,
	  afterAnimation: _react.PropTypes.func
	};

	var FluidContainer = (function (_Component) {
	  _inherits(FluidContainer, _Component);

	  function FluidContainer() {
	    var _this = this;

	    _classCallCheck(this, FluidContainer);

	    _get(Object.getPrototypeOf(FluidContainer.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {
	      height: 0
	    };
	    this._heightReady = this.props.height !== 'auto';
	    this._currHeight = null;

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
	  }], [{
	    key: 'propTypes',
	    value: privateProps,
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      tag: 'div',
	      height: 'auto',
	      rmConfig: _reactMotion.presets.noWobble,
	      beforeAnimation: function beforeAnimation() {
	        return null;
	      },
	      afterAnimation: function afterAnimation() {
	        return null;
	      }
	    },
	    enumerable: true
	  }]);

	  return FluidContainer;
	})(_react.Component);

	exports['default'] = FluidContainer;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = getPublicProps;

	function getPublicProps(allowedProps, privateProps) {
	  var publicProps = {};
	  for (var key in allowedProps) {
	    if (allowedProps.hasOwnProperty(key) && !privateProps[key]) {
	      publicProps[key] = allowedProps[key];
	    }
	  }
	  return publicProps;
	}

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;