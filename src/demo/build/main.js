/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createStore = createStore;

var _pubSub = __webpack_require__(3);

var _pubSub2 = _interopRequireDefault(_pubSub);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Status = {
  Resting: 'Resting',
  Mutating: 'Mutating'
};

var Store = exports.Store = function () {
  function Store(params) {
    var _this = this;

    _classCallCheck(this, Store);

    this.events = new _pubSub2.default();
    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }
    this.status = Status.Resting;
    this.state = new Proxy(params.state || {}, {
      set: function set(state, key, value) {
        state[key] = value;
        _this.events.publish('stateChanged', _this.state);
        if (_this.status !== Status.Mutating) {
          console.warn('You Should Mutate Your State By Action!');
        }
        _this.status = Status.Resting;
        return true;
      }
    });
  }

  _createClass(Store, [{
    key: 'commit',
    value: function commit(mutationType, payload) {
      this.status = Status.Mutating;
      if (typeof this.mutations[mutationType] === 'function') {
        this.mutations[mutationType](this.state, payload);
      }
    }
  }, {
    key: 'dispatch',
    value: function dispatch(actionType, payload) {
      if ((0, _utils.isPlainObject)(payload)) {
        throw Error('Payload Must Be A Plain Object!');
      }
      if (this.status === Status.Mutating) {
        throw Error('Can Not Dispatch Action In Mutation Function!');
      }
      this.commit(actionType, payload);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }]);

  return Store;
}();

function createStore(params) {
  return new Store(params || {});
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mutations;

var _lib = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actionTypes = {
  Increase: 'Increase',
  Decrease: 'Decrease',
  Reset: 'Reset'
};

var mutations = (_mutations = {}, _defineProperty(_mutations, actionTypes.Increase, function (state) {
  state.count += 1;
}), _defineProperty(_mutations, actionTypes.Decrease, function (state) {
  state.count -= 1;
}), _defineProperty(_mutations, actionTypes.Reset, function (state) {
  state.count = 0;
}), _mutations);

var store = (0, _lib.createStore)({
  mutations: mutations,
  state: {
    count: 0
  }
});

var createButton = function createButton(props) {
  var className = props.className,
      content = props.content,
      id = props.id;

  var btn = document.createElement('button');
  btn.classList.add(className);
  btn.innerHTML = content;
  if (id) {
    btn.id = id;
  }
  return btn;
};

var CounterBoard = function (_Component) {
  _inherits(CounterBoard, _Component);

  function CounterBoard(props) {
    _classCallCheck(this, CounterBoard);

    var _this = _possibleConstructorReturn(this, (CounterBoard.__proto__ || Object.getPrototypeOf(CounterBoard)).call(this, {
      store: props.store,
      element: props.element
    }));

    _this.state = store.getState();
    _this.score = document.createElement('div');
    _this.score.id = 'score';

    _this.element.appendChild(_this.score);
    _this.increateButton = createButton({
      className: 'inc',
      content: '+'
    });
    _this.decreaseButton = createButton({
      className: 'dec',
      content: '-'
    });
    _this.resetButton = createButton({
      className: 'reset',
      content: 'Reset'
    });
    _this.increateButton.addEventListener('click', function () {
      _this.store.dispatch(actionTypes.Increase);
    });
    _this.decreaseButton.addEventListener('click', function () {
      _this.store.dispatch(actionTypes.Decrease);
    });
    _this.resetButton.addEventListener('click', function () {
      _this.store.dispatch(actionTypes.Reset);
    });
    _this.element.appendChild(_this.increateButton);
    _this.element.appendChild(_this.decreaseButton);
    _this.element.appendChild(_this.resetButton);
    return _this;
  }

  _createClass(CounterBoard, [{
    key: 'render',
    value: function render() {
      this.score.innerHTML = '<span>' + this.state.count + '</span>';
    }
  }]);

  return CounterBoard;
}(_lib.Component);

var app = new CounterBoard({
  store: store,
  element: document.getElementById('root')
});

app.render();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.createStore = undefined;

var _store = __webpack_require__(0);

var _component = __webpack_require__(5);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createStore = _store.createStore;
exports.Component = _component2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubSub = function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.listeners = {};
  }

  _createClass(PubSub, [{
    key: 'publish',
    value: function publish(event, data) {
      var currentEventListeners = this.listeners[event];
      if (currentEventListeners) {
        currentEventListeners.forEach(function (listener) {
          listener(data);
        });
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(event, callback) {
      if (typeof callback !== 'function') {
        throw Error('callback is not a function!');
      }
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
  }]);

  return PubSub;
}();

exports.default = PubSub;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isPlainObject = exports.isPlainObject = function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
    return false;
  }
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// base class for component
var Component = function () {
  function Component(props) {
    var _this = this;

    _classCallCheck(this, Component);

    if (props.store instanceof _store.Store) {
      this.store = props.store;
      this.store.events.subscribe('stateChanged', function (state) {
        return _this.render(state);
      });
    }
    if (props.hasOwnProperty('element')) {
      this.element = props.element;
    }
  }

  _createClass(Component, [{
    key: 'render',
    value: function render() {}
  }]);

  return Component;
}();

exports.default = Component;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map