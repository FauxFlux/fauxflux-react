(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("mobx-react"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "mobx-react"], factory);
	else if(typeof exports === 'object')
		exports["fauxfluxReact"] = factory(require("react"), require("mobx-react"));
	else
		root["fauxfluxReact"] = factory(root["React"], root["mobxReact"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.connect = exports.FauxFluxProvider = undefined;

	var _FauxFluxProvider = __webpack_require__(1);

	var _FauxFluxProvider2 = _interopRequireDefault(_FauxFluxProvider);

	var _connect = __webpack_require__(4);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.FauxFluxProvider = _FauxFluxProvider2.default;
	exports.connect = _connect2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _defaultContextTypes = __webpack_require__(3);

	var _defaultContextTypes2 = _interopRequireDefault(_defaultContextTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FauxFluxProvider = function (_React$Component) {
	  _inherits(FauxFluxProvider, _React$Component);

	  function FauxFluxProvider(props) {
	    _classCallCheck(this, FauxFluxProvider);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FauxFluxProvider).call(this, props));
	  }

	  _createClass(FauxFluxProvider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        ff: {
	          store: this.props.FF.store,
	          dispatch: this.props.FF.dispatch,
	          mobx: this.props.FF.mobx
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return FauxFluxProvider;
	}(_react2.default.Component);

	FauxFluxProvider.childContextTypes = _defaultContextTypes2.default;

	FauxFluxProvider.propTypes = {
	  children: _react2.default.PropTypes.element.isRequired,
	  FF: _react2.default.PropTypes.object.isRequired // The FauxFlux singleton.
	};

	exports.default = FauxFluxProvider;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  ff: function ff() {}
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _mobxReact = __webpack_require__(5);

	var _defaultContextTypes = __webpack_require__(3);

	var _defaultContextTypes2 = _interopRequireDefault(_defaultContextTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function connect(Component) {
	  // Turn the Component into an observed component.
	  var NewObservedComponent = (0, _mobxReact.observer)(Component);
	  // Monkey patch the componentWillMount method so we can set
	  // this.store and this.dispatch in our components.
	  // http://me.dt.in.th/page/JavaScript-override/
	  var originalComponentWillMount = NewObservedComponent.prototype.componentWillMount || function () {};
	  NewObservedComponent.prototype.componentWillMount = function componentWillMount() {
	    this.store = this.context.ff.store;
	    this.dispatch = this.context.ff.dispatch;
	    this.mobx = this.context.ff.mobx;
	    originalComponentWillMount.apply(this, arguments);
	  };
	  // Declare the fauxflux (ff) context on this component so we can use it throughout the methods
	  // like the componentWillMount method we monkey patch above. Extend it with the components original contextTypes.
	  var originalContextTypes = NewObservedComponent.contextTypes || {};
	  NewObservedComponent.contextTypes = Object.assign(originalContextTypes, _defaultContextTypes2.default);
	  // Return the niffty new component.
	  return NewObservedComponent;
	};

	exports.default = connect;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;