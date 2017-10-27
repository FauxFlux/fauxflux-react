/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _fauxflux = __webpack_require__(1);

	var _fauxflux2 = _interopRequireDefault(_fauxflux);

	var _index = __webpack_require__(3);

	var _mobxReactDevtools = __webpack_require__(16);

	var _mobxReactDevtools2 = _interopRequireDefault(_mobxReactDevtools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FILTER_ALL = 'all';
	var FILTER_ACTIVE = 'active';
	var FILTER_COMPLETED = 'completed';
	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var store = {
	  newTodoText: '',
	  todos: [],
	  editing: null,
	  filter: FILTER_ALL,
	  activeTodoCount: function activeTodoCount() {
	    return store.todos.reduce(function (accum, todo) {
	      return todo.completed ? accum : accum + 1;
	    }, 0);
	  },
	  completedCount: function completedCount() {
	    return store.todos.length - store.activeTodoCount;
	  }
	};

	var actions = [{
	  name: 'hash_has_changed',
	  action: function action(_ref, payload) {
	    var store = _ref.store;

	    var filter = window.location.hash.substr(2);
	    if (!filter) {
	      filter = FILTER_ALL;
	    }
	    store.filter = filter;
	  }
	}, {
	  name: 'update_new_todo_text',
	  action: function action(_ref2, text) {
	    var store = _ref2.store;

	    store.newTodoText = text;
	  }
	}, {
	  name: 'add_new_todo',
	  action: function action(_ref3, payload) {
	    var store = _ref3.store;

	    var title = store.newTodoText.trim();

	    if (title) {
	      store.todos.push({ id: uuid(), completed: false, title: title, editingText: '' });
	      store.newTodoText = '';
	    }
	  }
	}, {
	  name: 'set_edit_id',
	  action: function action(_ref4, id) {
	    var store = _ref4.store;

	    store.editing = id;
	  }
	}, {
	  name: 'toggle_completed',
	  action: function action(_ref5, todoToToggle) {
	    var store = _ref5.store;

	    todoToToggle.completed = !todoToToggle.completed;
	  }
	},, {
	  name: 'toggle_all_completed',
	  action: function action(_ref6, checked) {
	    var store = _ref6.store,
	        mobx = _ref6.mobx;

	    mobx.transaction(function () {
	      store.todos.forEach(function (todo) {
	        todo.completed = checked;
	      });
	    });
	  }
	}, {
	  name: 'edit_todo_title',
	  action: function action(_ref7, _ref8) {
	    var store = _ref7.store;
	    var todoToEdit = _ref8.todoToEdit,
	        title = _ref8.title;

	    todoToEdit.title = title;
	  }
	}, {
	  name: 'edit_todo_editingText',
	  action: function action(_ref9, _ref10) {
	    var store = _ref9.store;
	    var todoToEdit = _ref10.todoToEdit,
	        editingText = _ref10.editingText;

	    todoToEdit.editingText = editingText;
	  }
	}, {
	  name: 'delete_todo',
	  action: function action(_ref11, todoToDelete) {
	    var store = _ref11.store;

	    store.todos.remove(todoToDelete);
	  }
	}, {
	  name: 'clear_completed',
	  action: function action(_ref12, payload) {
	    var store = _ref12.store;

	    store.todos = store.todos.filter(function (todo) {
	      return !todo.completed;
	    });
	  }
	}];

	var Footer = (0, _index.connect)(_react2.default.createClass({
	  displayName: 'Footer',


	  /* ------------------------- Component action handlers */

	  _clearCompleted: function _clearCompleted() {
	    return this.dispatch('clear_completed');
	  },
	  _isSelectedFilter: function _isSelectedFilter(filter) {
	    return filter === this.store.filter ? 'selected' : '';
	  },


	  /* ------------------------- View render functions */

	  _pluralizedItems: function _pluralizedItems() {
	    return this.store.activeTodoCount === 1 ? 'item' : 'items';
	  },


	  /* ------------------------- React methods and lifecycle events */

	  render: function render() {
	    return this.store.todos.length ? _react2.default.createElement(
	      'footer',
	      { className: 'footer' },
	      _react2.default.createElement(
	        'span',
	        { className: 'todo-count' },
	        _react2.default.createElement(
	          'strong',
	          null,
	          this.store.activeTodoCount
	        ),
	        ' ',
	        this._pluralizedItems(),
	        ' left'
	      ),
	      _react2.default.createElement(
	        'ul',
	        { className: 'filters' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: '#/', className: this._isSelectedFilter(FILTER_ALL) },
	            'All'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: '#/active', className: this._isSelectedFilter(FILTER_ACTIVE) },
	            'Active'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: '#/completed', className: this._isSelectedFilter(FILTER_COMPLETED) },
	            'Completed'
	          )
	        )
	      ),
	      this.store.completedCount > 0 ? _react2.default.createElement(
	        'button',
	        { className: 'clear-completed', onClick: this._clearCompleted },
	        'Clear completed'
	      ) : null
	    ) : null;
	  }
	}));

	var TodoItem = (0, _index.connect)(_react2.default.createClass({
	  displayName: 'TodoItem',


	  propTypes: {
	    todo: _react2.default.PropTypes.object.isRequired,
	    editing: _react2.default.PropTypes.bool.isRequired
	  },

	  /* ------------------------- Component action handlers */

	  _setEditId: function _setEditId(id) {
	    return this.dispatch('set_edit_id', id);
	  },
	  _editTodo: function _editTodo(editingText, e) {
	    if (e && e.target.value) {
	      editingText = e.target.value;
	    }
	    return this.dispatch('edit_todo_editingText', {
	      todoToEdit: this.props.todo,
	      editingText: editingText
	    });
	  },
	  _setUpTodoToBeEdited: function _setUpTodoToBeEdited() {
	    var _this = this;

	    var todo = this.props.todo;

	    return this._editTodo.bind(this, todo.title)().then(function () {
	      return _this._setEditId(_this.props.todo.id);
	    });
	  },
	  _toggleCompleted: function _toggleCompleted() {
	    return this.dispatch('toggle_completed', this.props.todo);
	  },
	  _updateTitle: function _updateTitle() {
	    var _this2 = this;

	    var todo = this.props.todo;

	    return this._setEditId(null).then(function () {
	      return _this2.dispatch('edit_todo_title', {
	        todoToEdit: todo,
	        title: todo.editingText
	      });
	    });
	  },
	  _deleteTodo: function _deleteTodo() {
	    return this.dispatch('delete_todo', this.props.todo);
	  },
	  _editingHandleKeyDown: function _editingHandleKeyDown(e) {
	    if (e.which === ESCAPE_KEY) {
	      e.preventDefault();
	      return this._setEditId(null);
	    } else if (e.which === ENTER_KEY) {
	      e.preventDefault();
	      return this._updateTitle();
	    }
	  },
	  _getClassNames: function _getClassNames() {
	    var _props = this.props,
	        todo = _props.todo,
	        editing = _props.editing;

	    var classes = [];
	    if (todo.completed) {
	      classes.push('completed');
	    }
	    if (editing) {
	      classes.push('editing');
	    }
	    return classes.join(' ');
	  },


	  /* ------------------------- React methods and lifecycle events */

	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var node = this.refs.editField;
	    if (!prevProps.editing && this.props.editing) {
	      node.focus();
	      node.setSelectionRange(node.value.length, node.value.length);
	    } else if (!this.props.editing && !this.props.todo.title) {
	      // If we have edited the todo title to a blank string, just deleted it on blur.
	      this._deleteTodo();
	    }
	  },
	  render: function render() {
	    var todo = this.props.todo;

	    return _react2.default.createElement(
	      'li',
	      { className: this._getClassNames() },
	      _react2.default.createElement(
	        'div',
	        { className: 'view' },
	        _react2.default.createElement('input', { className: 'toggle', type: 'checkbox', checked: todo.completed, onChange: this._toggleCompleted }),
	        _react2.default.createElement(
	          'label',
	          { onDoubleClick: this._setUpTodoToBeEdited },
	          todo.title
	        ),
	        _react2.default.createElement('button', { className: 'destroy', onClick: this._deleteTodo })
	      ),
	      _react2.default.createElement('input', {
	        ref: 'editField',
	        className: 'edit',
	        value: todo.editingText,
	        onChange: this._editTodo.bind(this, null),
	        onBlur: this._setEditId.bind(this, null),
	        onKeyDown: this._editingHandleKeyDown
	      })
	    );
	  }
	}));

	var TodoItems = (0, _index.connect)(_react2.default.createClass({
	  displayName: 'TodoItems',


	  /* ------------------------- Component action handlers */

	  _toggleAll: function _toggleAll(e) {
	    var checked = e.target.checked;
	    return this.dispatch('toggle_all_completed', checked);
	  },


	  /* ------------------------- React methods and lifecycle events */

	  render: function render() {
	    var _store = this.store,
	        todos = _store.todos,
	        filter = _store.filter,
	        editing = _store.editing,
	        activeTodoCount = _store.activeTodoCount;


	    var shownTodos = todos.filter(function (todo) {
	      switch (filter) {
	        case FILTER_ACTIVE:
	          return !todo.completed;
	        case FILTER_COMPLETED:
	          return todo.completed;
	        default:
	          return true;
	      }
	    });

	    return _react2.default.createElement(
	      'section',
	      { className: 'main', style: { display: todos.length ? 'block' : 'none' } },
	      _react2.default.createElement('input', {
	        className: 'toggle-all',
	        type: 'checkbox',
	        checked: activeTodoCount === 0,
	        onChange: this._toggleAll
	      }),
	      _react2.default.createElement(
	        'ul',
	        { className: 'todo-list' },
	        shownTodos.map(function (todo) {
	          return _react2.default.createElement(TodoItem, {
	            key: 'todo' + todo.id,
	            todo: todo,
	            editing: editing === todo.id
	          });
	        })
	      )
	    );
	  }
	}));

	var Header = (0, _index.connect)(_react2.default.createClass({
	  displayName: 'Header',


	  /* ------------------------- Component action handlers */

	  _handleKeyDown: function _handleKeyDown(e) {
	    if (e.keyCode !== ENTER_KEY) {
	      return;
	    }

	    e.preventDefault();
	    return this.dispatch('add_new_todo');
	  },
	  _newTodoChange: function _newTodoChange(e) {
	    return this.dispatch('update_new_todo_text', e.target.value);
	  },


	  /* ------------------------- React methods and lifecycle events */

	  render: function render() {
	    return _react2.default.createElement(
	      'header',
	      { className: 'header' },
	      _react2.default.createElement(
	        'h1',
	        null,
	        'todos'
	      ),
	      _react2.default.createElement('input', {
	        className: 'new-todo',
	        value: this.store.newTodoText,
	        onKeyDown: this._handleKeyDown,
	        onChange: this._newTodoChange,
	        placeholder: 'What needs to be done?',
	        autoFocus: true
	      })
	    );
	  }
	}));

	var App = (0, _index.connect)(_react2.default.createClass({
	  displayName: 'App',


	  /* ------------------------- React methods and lifecycle events */

	  componentDidMount: function componentDidMount() {
	    var _this3 = this;

	    window.addEventListener('hashchange', function () {
	      _this3.dispatch('hash_has_changed');
	    }, false);
	    // set the Filter, which is based off the hash, on the inital render.
	    this.dispatch('hash_has_changed');
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(Header, null),
	      _react2.default.createElement(TodoItems, null),
	      _react2.default.createElement(Footer, null)
	    );
	  }
	}));

	var FF = new _fauxflux2.default(store, actions);

	_reactDom2.default.render(_react2.default.createElement(
	  _index.FauxFluxProvider,
	  { FF: FF },
	  _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(App, null),
	    _react2.default.createElement(_mobxReactDevtools2.default, null)
	  )
	), document.getElementById('app'));

	////////////////////////// localStorage

	// localStorage key
	var key = 'todos-app';

	// actions used to initilize and set the todos
	var localStorageActions = [{
	  name: 'localStorage_init_todos',
	  action: function action(_ref13, key) {
	    var store = _ref13.store,
	        mobx = _ref13.mobx;

	    var jsonTodos = localStorage.getItem(key);
	    if (jsonTodos) {
	      mobx.extendObservable(store, { todos: JSON.parse(jsonTodos) });
	    }
	  }
	}, {
	  name: 'localStorage_set_todos',
	  action: function action(_ref14, key) {
	    var store = _ref14.store,
	        mobx = _ref14.mobx;

	    var todos = mobx.toJS(store.todos);
	    localStorage.setItem(key, JSON.stringify(todos));
	  }
	}];

	// Register our actions so we can call them with dispatch().
	FF.registerActions(localStorageActions);

	// Make sure to check for todos in the localStorage before autorunning our localStorage_set_todos dispatch function.
	FF.dispatch('localStorage_init_todos', key).then(function () {
	  // Run the localStorage_set_todos action anytime an observable inside that action changes.
	  // In this case the todos array. --- var todos = mobx.toJS(store.todos);
	  FF.mobx.autorun(function () {
	    return FF.dispatch('localStorage_set_todos', key);
	  });
	});

	////////////////////////// Utility Functions

	function uuid() {
	  var i = void 0,
	      random = void 0;
	  var uuid = '';

	  for (i = 0; i < 32; i++) {
	    random = Math.random() * 16 | 0;
	    if (i === 8 || i === 12 || i === 16 || i === 20) {
	      uuid += '-';
	    }
	    uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	  }

	  return uuid;
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2));
		else if(typeof define === 'function' && define.amd)
			define(["mobx"], factory);
		else if(typeof exports === 'object')
			exports["fauxflux"] = factory(require("mobx"));
		else
			root["fauxflux"] = factory(root["mobx"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

		/* WEBPACK VAR INJECTION */(function(process) {'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = undefined;

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _mobx = __webpack_require__(2);

		var _mobx2 = _interopRequireDefault(_mobx);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var FauxFlux = function () {
		  function FauxFlux(store, actions) {
		    _classCallCheck(this, FauxFlux);

		    // Make sure that a store and actions are passed in.
		    if (process.env.NODE_ENV !== 'production') {
		      if (!store) {
		        throw new Error('A store object should be passed as the first argument to the FauxFlux instance -- Example: new FauxFlux(store: {}, actions: [])');
		      }
		      if (!Array.isArray(actions)) {
		        throw new Error('An array of actions should be passed as the second argument to the FauxFlux instance -- Example: new FauxFlux(store: {}, actions: [])');
		      }
		    }

		    // Set up mobx. https://github.com/mobxjs/mobx
		    this.mobx = _mobx2.default;
		    // Set up the store as a Mobx Observable if it is not one already.
		    this.store = !this.mobx.isObservable(store) ? this.mobx.observable(store) : store;
		    // Get the actions object ready to add actions to in the registerActions method below.
		    this.actions = {};
		    // Autobind methods
		    this.registerActions = this.registerActions.bind(this);
		    this.dispatch = this.dispatch.bind(this);
		    // Register the actions that are passed in when initilizing.
		    this.registerActions(actions);
		  }

		  _createClass(FauxFlux, [{
		    key: 'registerActions',
		    value: function registerActions(actions) {
		      var _this = this;

		      actions.forEach(function (_ref) {
		        var name = _ref.name;
		        var action = _ref.action;

		        // Check for multiple actions with the same name being defined.
		        if (process.env.NODE_ENV !== 'production') {
		          if (_this.actions[name]) {
		            throw new Error('The action [' + name + '], has been created more than once! Please rename one of these actions.');
		          }
		        }
		        // Set the action as a method on this instance's actions object.
		        _this.actions[name] = action;
		      });
		    }
		  }, {
		    key: 'dispatch',
		    value: function dispatch(action, payload) {
		      // Check to make sure the action we are calling has been registered.
		      if (process.env.NODE_ENV !== 'production') {
		        if (!this.actions[action]) {
		          throw new Error('The action [' + action + '], is not a registered action. Please make sure you have spelled the action name correctly and it is in the actions available.');
		        }
		      }

		      return Promise.resolve(this.actions[action]({ store: this.store, dispatch: this.dispatch, mobx: this.mobx }, payload));
		    }
		  }]);

		  return FauxFlux;
		}();

		exports.default = FauxFlux;
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		// shim for using process in browser

		var process = module.exports = {};
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;

		function cleanUpNextTick() {
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}

		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = setTimeout(cleanUpNextTick);
		    draining = true;

		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    clearTimeout(timeout);
		}

		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        setTimeout(drainQueue, 0);
		    }
		};

		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};

		function noop() {}

		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;

		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};

		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };


	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

	/***/ }
	/******/ ])
	});
	;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	registerGlobals();
	exports.extras = {
	    allowStateChanges: allowStateChanges,
	    getAtom: getAtom,
	    getDebugName: getDebugName,
	    getDependencyTree: getDependencyTree,
	    getObserverTree: getObserverTree,
	    isComputingDerivation: isComputingDerivation,
	    isSpyEnabled: isSpyEnabled,
	    resetGlobalState: resetGlobalState,
	    spyReport: spyReport,
	    spyReportEnd: spyReportEnd,
	    spyReportStart: spyReportStart,
	    trackTransitions: trackTransitions,
	    setReactionScheduler: setReactionScheduler
	};
	exports._ = {
	    getAdministration: getAdministration,
	    resetGlobalState: resetGlobalState
	};
	if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
	    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx(module.exports);
	}
	var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
	    var actionName = (args && args.length === 1) ? args[0] : (value.name || key || "<unnamed action>");
	    var wrappedAction = action(actionName, value);
	    addHiddenProp(target, key, wrappedAction);
	}, function (key) {
	    return this[key];
	}, function () {
	    invariant(false, "It is not allowed to assign new values to @action fields");
	}, false, true);
	function action(arg1, arg2, arg3, arg4) {
	    if (arguments.length === 1 && typeof arg1 === "function")
	        return createAction(arg1.name || "<unnamed action>", arg1);
	    if (arguments.length === 2 && typeof arg2 === "function")
	        return createAction(arg1, arg2);
	    if (arguments.length === 1 && typeof arg1 === "string")
	        return namedActionDecorator(arg1);
	    return namedActionDecorator(arg2).apply(null, arguments);
	}
	exports.action = action;
	function namedActionDecorator(name) {
	    return function (target, prop, descriptor) {
	        if (descriptor && typeof descriptor.value === "function") {
	            descriptor.value = createAction(name, descriptor.value);
	            descriptor.enumerable = false;
	            descriptor.configurable = true;
	            return descriptor;
	        }
	        return actionFieldDecorator(name).apply(this, arguments);
	    };
	}
	function runInAction(arg1, arg2, arg3) {
	    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
	    var fn = typeof arg1 === "function" ? arg1 : arg2;
	    var scope = typeof arg1 === "function" ? arg2 : arg3;
	    invariant(typeof fn === "function", "`runInAction` expects a function");
	    invariant(fn.length === 0, "`runInAction` expects a function without arguments");
	    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
	    return executeAction(actionName, fn, scope, undefined);
	}
	exports.runInAction = runInAction;
	function isAction(thing) {
	    return typeof thing === "function" && thing.isMobxAction === true;
	}
	exports.isAction = isAction;
	function autorun(arg1, arg2, arg3) {
	    var name, view, scope;
	    if (typeof arg1 === "string") {
	        name = arg1;
	        view = arg2;
	        scope = arg3;
	    }
	    else if (typeof arg1 === "function") {
	        name = arg1.name || ("Autorun@" + getNextId());
	        view = arg1;
	        scope = arg2;
	    }
	    assertUnwrapped(view, "autorun methods cannot have modifiers");
	    invariant(typeof view === "function", "autorun expects a function");
	    invariant(isAction(view) === false, "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.");
	    if (scope)
	        view = view.bind(scope);
	    var reaction = new Reaction(name, function () {
	        this.track(reactionRunner);
	    });
	    function reactionRunner() {
	        view(reaction);
	    }
	    reaction.schedule();
	    return reaction.getDisposer();
	}
	exports.autorun = autorun;
	function when(arg1, arg2, arg3, arg4) {
	    var name, predicate, effect, scope;
	    if (typeof arg1 === "string") {
	        name = arg1;
	        predicate = arg2;
	        effect = arg3;
	        scope = arg4;
	    }
	    else if (typeof arg1 === "function") {
	        name = ("When@" + getNextId());
	        predicate = arg1;
	        effect = arg2;
	        scope = arg3;
	    }
	    var disposer = autorun(name, function (r) {
	        if (predicate.call(scope)) {
	            r.dispose();
	            var prevUntracked = untrackedStart();
	            effect.call(scope);
	            untrackedEnd(prevUntracked);
	        }
	    });
	    return disposer;
	}
	exports.when = when;
	function autorunUntil(predicate, effect, scope) {
	    deprecated("`autorunUntil` is deprecated, please use `when`.");
	    return when.apply(null, arguments);
	}
	exports.autorunUntil = autorunUntil;
	function autorunAsync(arg1, arg2, arg3, arg4) {
	    var name, func, delay, scope;
	    if (typeof arg1 === "string") {
	        name = arg1;
	        func = arg2;
	        delay = arg3;
	        scope = arg4;
	    }
	    else if (typeof arg1 === "function") {
	        name = arg1.name || ("AutorunAsync@" + getNextId());
	        func = arg1;
	        delay = arg2;
	        scope = arg3;
	    }
	    invariant(isAction(func) === false, "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.");
	    if (delay === void 0)
	        delay = 1;
	    if (scope)
	        func = func.bind(scope);
	    var isScheduled = false;
	    var r = new Reaction(name, function () {
	        if (!isScheduled) {
	            isScheduled = true;
	            setTimeout(function () {
	                isScheduled = false;
	                if (!r.isDisposed)
	                    r.track(reactionRunner);
	            }, delay);
	        }
	    });
	    function reactionRunner() { func(r); }
	    r.schedule();
	    return r.getDisposer();
	}
	exports.autorunAsync = autorunAsync;
	function reaction(arg1, arg2, arg3, arg4, arg5, arg6) {
	    var name, expression, effect, fireImmediately, delay, scope;
	    if (typeof arg1 === "string") {
	        name = arg1;
	        expression = arg2;
	        effect = arg3;
	        fireImmediately = arg4;
	        delay = arg5;
	        scope = arg6;
	    }
	    else {
	        name = arg1.name || arg2.name || ("Reaction@" + getNextId());
	        expression = arg1;
	        effect = arg2;
	        fireImmediately = arg3;
	        delay = arg4;
	        scope = arg5;
	    }
	    if (fireImmediately === void 0)
	        fireImmediately = false;
	    if (delay === void 0)
	        delay = 0;
	    var _a = getValueModeFromValue(expression, ValueMode.Reference), valueMode = _a[0], unwrappedExpression = _a[1];
	    var compareStructural = valueMode === ValueMode.Structure;
	    if (scope) {
	        unwrappedExpression = unwrappedExpression.bind(scope);
	        effect = action(name, effect.bind(scope));
	    }
	    var firstTime = true;
	    var isScheduled = false;
	    var nextValue = undefined;
	    var r = new Reaction(name, function () {
	        if (delay < 1) {
	            reactionRunner();
	        }
	        else if (!isScheduled) {
	            isScheduled = true;
	            setTimeout(function () {
	                isScheduled = false;
	                reactionRunner();
	            }, delay);
	        }
	    });
	    function reactionRunner() {
	        if (r.isDisposed)
	            return;
	        var changed = false;
	        r.track(function () {
	            var v = unwrappedExpression(r);
	            changed = valueDidChange(compareStructural, nextValue, v);
	            nextValue = v;
	        });
	        if (firstTime && fireImmediately)
	            effect(nextValue, r);
	        if (!firstTime && changed === true)
	            effect(nextValue, r);
	        if (firstTime)
	            firstTime = false;
	    }
	    r.schedule();
	    return r.getDisposer();
	}
	exports.reaction = reaction;
	var computedDecorator = createClassPropertyDecorator(function (target, name, _, decoratorArgs, originalDescriptor) {
	    invariant(typeof originalDescriptor !== "undefined", "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.");
	    var baseValue = originalDescriptor.get;
	    var setter = originalDescriptor.set;
	    invariant(typeof baseValue === "function", "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'");
	    var compareStructural = false;
	    if (decoratorArgs && decoratorArgs.length === 1 && decoratorArgs[0].asStructure === true)
	        compareStructural = true;
	    var adm = asObservableObject(target, undefined, ValueMode.Recursive);
	    defineObservableProperty(adm, name, compareStructural ? asStructure(baseValue) : baseValue, false, setter);
	}, function (name) {
	    var observable = this.$mobx.values[name];
	    if (observable === undefined)
	        return undefined;
	    return observable.get();
	}, function (name, value) {
	    this.$mobx.values[name].set(value);
	}, false, true);
	function computed(targetOrExpr, keyOrScopeOrSetter, baseDescriptor, options) {
	    if ((typeof targetOrExpr === "function" || isModifierWrapper(targetOrExpr)) && arguments.length < 3) {
	        if (typeof keyOrScopeOrSetter === "function")
	            return computedExpr(targetOrExpr, keyOrScopeOrSetter, undefined);
	        else
	            return computedExpr(targetOrExpr, undefined, keyOrScopeOrSetter);
	    }
	    return computedDecorator.apply(null, arguments);
	}
	exports.computed = computed;
	function computedExpr(expr, setter, scope) {
	    var _a = getValueModeFromValue(expr, ValueMode.Recursive), mode = _a[0], value = _a[1];
	    return new ComputedValue(value, scope, mode === ValueMode.Structure, value.name, setter);
	}
	function createTransformer(transformer, onCleanup) {
	    invariant(typeof transformer === "function" && transformer.length === 1, "createTransformer expects a function that accepts one argument");
	    var objectCache = {};
	    var resetId = globalState.resetId;
	    var Transformer = (function (_super) {
	        __extends(Transformer, _super);
	        function Transformer(sourceIdentifier, sourceObject) {
	            _super.call(this, function () { return transformer(sourceObject); }, null, false, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined);
	            this.sourceIdentifier = sourceIdentifier;
	            this.sourceObject = sourceObject;
	        }
	        Transformer.prototype.onBecomeUnobserved = function () {
	            var lastValue = this.value;
	            _super.prototype.onBecomeUnobserved.call(this);
	            delete objectCache[this.sourceIdentifier];
	            if (onCleanup)
	                onCleanup(lastValue, this.sourceObject);
	        };
	        return Transformer;
	    }(ComputedValue));
	    return function (object) {
	        if (resetId !== globalState.resetId) {
	            objectCache = {};
	            resetId = globalState.resetId;
	        }
	        var identifier = getMemoizationId(object);
	        var reactiveTransformer = objectCache[identifier];
	        if (reactiveTransformer)
	            return reactiveTransformer.get();
	        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
	        return reactiveTransformer.get();
	    };
	}
	exports.createTransformer = createTransformer;
	function getMemoizationId(object) {
	    if (object === null || typeof object !== "object")
	        throw new Error("[mobx] transform expected some kind of object, got: " + object);
	    var tid = object.$transformId;
	    if (tid === undefined) {
	        tid = getNextId();
	        addHiddenProp(object, "$transformId", tid);
	    }
	    return tid;
	}
	function expr(expr, scope) {
	    if (!isComputingDerivation())
	        console.warn("[mobx.expr] 'expr' should only be used inside other reactive functions.");
	    return computed(expr, scope).get();
	}
	exports.expr = expr;
	function extendObservable(target) {
	    var properties = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        properties[_i - 1] = arguments[_i];
	    }
	    invariant(arguments.length >= 2, "extendObservable expected 2 or more arguments");
	    invariant(typeof target === "object", "extendObservable expects an object as first argument");
	    invariant(!(isObservableMap(target)), "extendObservable should not be used on maps, use map.merge instead");
	    properties.forEach(function (propSet) {
	        invariant(typeof propSet === "object", "all arguments of extendObservable should be objects");
	        invariant(!isObservable(propSet), "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
	        extendObservableHelper(target, propSet, ValueMode.Recursive, null);
	    });
	    return target;
	}
	exports.extendObservable = extendObservable;
	function extendObservableHelper(target, properties, mode, name) {
	    var adm = asObservableObject(target, name, mode);
	    for (var key in properties)
	        if (hasOwnProperty(properties, key)) {
	            if (target === properties && !isPropertyConfigurable(target, key))
	                continue;
	            var descriptor = Object.getOwnPropertyDescriptor(properties, key);
	            setObservableObjectInstanceProperty(adm, key, descriptor);
	        }
	    return target;
	}
	function getDependencyTree(thing, property) {
	    return nodeToDependencyTree(getAtom(thing, property));
	}
	function nodeToDependencyTree(node) {
	    var result = {
	        name: node.name
	    };
	    if (node.observing && node.observing.length > 0)
	        result.dependencies = unique(node.observing).map(nodeToDependencyTree);
	    return result;
	}
	function getObserverTree(thing, property) {
	    return nodeToObserverTree(getAtom(thing, property));
	}
	function nodeToObserverTree(node) {
	    var result = {
	        name: node.name
	    };
	    if (hasObservers(node))
	        result.observers = getObservers(node).map(nodeToObserverTree);
	    return result;
	}
	function intercept(thing, propOrHandler, handler) {
	    if (typeof handler === "function")
	        return interceptProperty(thing, propOrHandler, handler);
	    else
	        return interceptInterceptable(thing, propOrHandler);
	}
	exports.intercept = intercept;
	function interceptInterceptable(thing, handler) {
	    if (isPlainObject(thing) && !isObservableObject(thing)) {
	        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
	        return getAdministration(observable(thing)).intercept(handler);
	    }
	    return getAdministration(thing).intercept(handler);
	}
	function interceptProperty(thing, property, handler) {
	    if (isPlainObject(thing) && !isObservableObject(thing)) {
	        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
	        extendObservable(thing, {
	            property: thing[property]
	        });
	        return interceptProperty(thing, property, handler);
	    }
	    return getAdministration(thing, property).intercept(handler);
	}
	function isComputed(value, property) {
	    if (value === null || value === undefined)
	        return false;
	    if (property !== undefined) {
	        if (isObservableObject(value) === false)
	            return false;
	        var atom = getAtom(value, property);
	        return isComputedValue(atom);
	    }
	    return isComputedValue(value);
	}
	exports.isComputed = isComputed;
	function isObservable(value, property) {
	    if (value === null || value === undefined)
	        return false;
	    if (property !== undefined) {
	        if (isObservableArray(value) || isObservableMap(value))
	            throw new Error("[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
	        else if (isObservableObject(value)) {
	            var o = value.$mobx;
	            return o.values && !!o.values[property];
	        }
	        return false;
	    }
	    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
	}
	exports.isObservable = isObservable;
	var decoratorImpl = createClassPropertyDecorator(function (target, name, baseValue) {
	    var prevA = allowStateChangesStart(true);
	    if (typeof baseValue === "function")
	        baseValue = asReference(baseValue);
	    var adm = asObservableObject(target, undefined, ValueMode.Recursive);
	    defineObservableProperty(adm, name, baseValue, true, undefined);
	    allowStateChangesEnd(prevA);
	}, function (name) {
	    var observable = this.$mobx.values[name];
	    if (observable === undefined)
	        return undefined;
	    return observable.get();
	}, function (name, value) {
	    setPropertyValue(this, name, value);
	}, true, false);
	function observableDecorator(target, key, baseDescriptor) {
	    invariant(arguments.length >= 2 && arguments.length <= 3, "Illegal decorator config", key);
	    assertPropertyConfigurable(target, key);
	    invariant(!baseDescriptor || !baseDescriptor.get, "@observable can not be used on getters, use @computed instead");
	    return decoratorImpl.apply(null, arguments);
	}
	function observable(v, keyOrScope) {
	    if (v === void 0) { v = undefined; }
	    if (typeof arguments[1] === "string")
	        return observableDecorator.apply(null, arguments);
	    invariant(arguments.length < 3, "observable expects zero, one or two arguments");
	    if (isObservable(v))
	        return v;
	    var _a = getValueModeFromValue(v, ValueMode.Recursive), mode = _a[0], value = _a[1];
	    var sourceType = mode === ValueMode.Reference ? ValueType.Reference : getTypeOfValue(value);
	    switch (sourceType) {
	        case ValueType.Array:
	        case ValueType.PlainObject:
	            return makeChildObservable(value, mode);
	        case ValueType.Reference:
	        case ValueType.ComplexObject:
	            return new ObservableValue(value, mode);
	        case ValueType.ComplexFunction:
	            throw new Error("[mobx.observable] To be able to make a function reactive it should not have arguments. If you need an observable reference to a function, use `observable(asReference(f))`");
	        case ValueType.ViewFunction:
	            deprecated("Use `computed(expr)` instead of `observable(expr)`");
	            return computed(v, keyOrScope);
	    }
	    invariant(false, "Illegal State");
	}
	exports.observable = observable;
	var ValueType;
	(function (ValueType) {
	    ValueType[ValueType["Reference"] = 0] = "Reference";
	    ValueType[ValueType["PlainObject"] = 1] = "PlainObject";
	    ValueType[ValueType["ComplexObject"] = 2] = "ComplexObject";
	    ValueType[ValueType["Array"] = 3] = "Array";
	    ValueType[ValueType["ViewFunction"] = 4] = "ViewFunction";
	    ValueType[ValueType["ComplexFunction"] = 5] = "ComplexFunction";
	})(ValueType || (ValueType = {}));
	function getTypeOfValue(value) {
	    if (value === null || value === undefined)
	        return ValueType.Reference;
	    if (typeof value === "function")
	        return value.length ? ValueType.ComplexFunction : ValueType.ViewFunction;
	    if (isArrayLike(value))
	        return ValueType.Array;
	    if (typeof value === "object")
	        return isPlainObject(value) ? ValueType.PlainObject : ValueType.ComplexObject;
	    return ValueType.Reference;
	}
	function observe(thing, propOrCb, cbOrFire, fireImmediately) {
	    if (typeof cbOrFire === "function")
	        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
	    else
	        return observeObservable(thing, propOrCb, cbOrFire);
	}
	exports.observe = observe;
	function observeObservable(thing, listener, fireImmediately) {
	    if (isPlainObject(thing) && !isObservableObject(thing)) {
	        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
	        return getAdministration(observable(thing)).observe(listener, fireImmediately);
	    }
	    return getAdministration(thing).observe(listener, fireImmediately);
	}
	function observeObservableProperty(thing, property, listener, fireImmediately) {
	    if (isPlainObject(thing) && !isObservableObject(thing)) {
	        deprecated("Passing plain objects to intercept / observe is deprecated and will be removed in 3.0");
	        extendObservable(thing, {
	            property: thing[property]
	        });
	        return observeObservableProperty(thing, property, listener, fireImmediately);
	    }
	    return getAdministration(thing, property).observe(listener, fireImmediately);
	}
	function toJS(source, detectCycles, __alreadySeen) {
	    if (detectCycles === void 0) { detectCycles = true; }
	    if (__alreadySeen === void 0) { __alreadySeen = null; }
	    function cache(value) {
	        if (detectCycles)
	            __alreadySeen.push([source, value]);
	        return value;
	    }
	    if (isObservable(source)) {
	        if (detectCycles && __alreadySeen === null)
	            __alreadySeen = [];
	        if (detectCycles && source !== null && typeof source === "object") {
	            for (var i = 0, l = __alreadySeen.length; i < l; i++)
	                if (__alreadySeen[i][0] === source)
	                    return __alreadySeen[i][1];
	        }
	        if (isObservableArray(source)) {
	            var res = cache([]);
	            var toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
	            res.length = toAdd.length;
	            for (var i = 0, l = toAdd.length; i < l; i++)
	                res[i] = toAdd[i];
	            return res;
	        }
	        if (isObservableObject(source)) {
	            var res = cache({});
	            for (var key in source)
	                res[key] = toJS(source[key], detectCycles, __alreadySeen);
	            return res;
	        }
	        if (isObservableMap(source)) {
	            var res_1 = cache({});
	            source.forEach(function (value, key) { return res_1[key] = toJS(value, detectCycles, __alreadySeen); });
	            return res_1;
	        }
	        if (isObservableValue(source))
	            return toJS(source.get(), detectCycles, __alreadySeen);
	    }
	    return source;
	}
	exports.toJS = toJS;
	function toJSlegacy(source, detectCycles, __alreadySeen) {
	    if (detectCycles === void 0) { detectCycles = true; }
	    if (__alreadySeen === void 0) { __alreadySeen = null; }
	    deprecated("toJSlegacy is deprecated and will be removed in the next major. Use `toJS` instead. See #566");
	    function cache(value) {
	        if (detectCycles)
	            __alreadySeen.push([source, value]);
	        return value;
	    }
	    if (source instanceof Date || source instanceof RegExp)
	        return source;
	    if (detectCycles && __alreadySeen === null)
	        __alreadySeen = [];
	    if (detectCycles && source !== null && typeof source === "object") {
	        for (var i = 0, l = __alreadySeen.length; i < l; i++)
	            if (__alreadySeen[i][0] === source)
	                return __alreadySeen[i][1];
	    }
	    if (!source)
	        return source;
	    if (isArrayLike(source)) {
	        var res = cache([]);
	        var toAdd = source.map(function (value) { return toJSlegacy(value, detectCycles, __alreadySeen); });
	        res.length = toAdd.length;
	        for (var i = 0, l = toAdd.length; i < l; i++)
	            res[i] = toAdd[i];
	        return res;
	    }
	    if (isObservableMap(source)) {
	        var res_2 = cache({});
	        source.forEach(function (value, key) { return res_2[key] = toJSlegacy(value, detectCycles, __alreadySeen); });
	        return res_2;
	    }
	    if (isObservableValue(source))
	        return toJSlegacy(source.get(), detectCycles, __alreadySeen);
	    if (typeof source === "object") {
	        var res = cache({});
	        for (var key in source)
	            res[key] = toJSlegacy(source[key], detectCycles, __alreadySeen);
	        return res;
	    }
	    return source;
	}
	exports.toJSlegacy = toJSlegacy;
	function toJSON(source, detectCycles, __alreadySeen) {
	    if (detectCycles === void 0) { detectCycles = true; }
	    if (__alreadySeen === void 0) { __alreadySeen = null; }
	    deprecated("toJSON is deprecated. Use toJS instead");
	    return toJSlegacy.apply(null, arguments);
	}
	exports.toJSON = toJSON;
	function log(msg) {
	    console.log(msg);
	    return msg;
	}
	function whyRun(thing, prop) {
	    switch (arguments.length) {
	        case 0:
	            thing = globalState.trackingDerivation;
	            if (!thing)
	                return log("whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested it's value.");
	            break;
	        case 2:
	            thing = getAtom(thing, prop);
	            break;
	    }
	    thing = getAtom(thing);
	    if (isComputedValue(thing))
	        return log(thing.whyRun());
	    else if (isReaction(thing))
	        return log(thing.whyRun());
	    else
	        invariant(false, "whyRun can only be used on reactions and computed values");
	}
	exports.whyRun = whyRun;
	function createAction(actionName, fn) {
	    invariant(typeof fn === "function", "`action` can only be invoked on functions");
	    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
	    var res = function () {
	        return executeAction(actionName, fn, this, arguments);
	    };
	    res.isMobxAction = true;
	    return res;
	}
	function executeAction(actionName, fn, scope, args) {
	    invariant(!isComputedValue(globalState.trackingDerivation), "Computed values or transformers should not invoke actions or trigger other side effects");
	    var notifySpy = isSpyEnabled();
	    var startTime;
	    if (notifySpy) {
	        startTime = Date.now();
	        var l = (args && args.length) || 0;
	        var flattendArgs = new Array(l);
	        if (l > 0)
	            for (var i = 0; i < l; i++)
	                flattendArgs[i] = args[i];
	        spyReportStart({
	            type: "action",
	            name: actionName,
	            fn: fn,
	            target: scope,
	            arguments: flattendArgs
	        });
	    }
	    var prevUntracked = untrackedStart();
	    transactionStart(actionName, scope, false);
	    var prevAllowStateChanges = allowStateChangesStart(true);
	    try {
	        return fn.apply(scope, args);
	    }
	    finally {
	        allowStateChangesEnd(prevAllowStateChanges);
	        transactionEnd(false);
	        untrackedEnd(prevUntracked);
	        if (notifySpy)
	            spyReportEnd({ time: Date.now() - startTime });
	    }
	}
	function useStrict(strict) {
	    if (arguments.length === 0) {
	        deprecated("`useStrict` without arguments is deprecated, use `isStrictModeEnabled()` instead");
	        return globalState.strictMode;
	    }
	    else {
	        invariant(globalState.trackingDerivation === null, "It is not allowed to set `useStrict` when a derivation is running");
	        globalState.strictMode = strict;
	        globalState.allowStateChanges = !strict;
	    }
	}
	exports.useStrict = useStrict;
	function isStrictModeEnabled() {
	    return globalState.strictMode;
	}
	exports.isStrictModeEnabled = isStrictModeEnabled;
	function allowStateChanges(allowStateChanges, func) {
	    var prev = allowStateChangesStart(allowStateChanges);
	    var res = func();
	    allowStateChangesEnd(prev);
	    return res;
	}
	function allowStateChangesStart(allowStateChanges) {
	    var prev = globalState.allowStateChanges;
	    globalState.allowStateChanges = allowStateChanges;
	    return prev;
	}
	function allowStateChangesEnd(prev) {
	    globalState.allowStateChanges = prev;
	}
	var BaseAtom = (function () {
	    function BaseAtom(name) {
	        if (name === void 0) { name = "Atom@" + getNextId(); }
	        this.name = name;
	        this.isPendingUnobservation = true;
	        this.observers = [];
	        this.observersIndexes = {};
	        this.diffValue = 0;
	        this.lastAccessedBy = 0;
	        this.lowestObserverState = IDerivationState.NOT_TRACKING;
	    }
	    BaseAtom.prototype.onBecomeUnobserved = function () {
	    };
	    BaseAtom.prototype.reportObserved = function () {
	        reportObserved(this);
	    };
	    BaseAtom.prototype.reportChanged = function () {
	        transactionStart("propagatingAtomChange", null, false);
	        propagateChanged(this);
	        transactionEnd(false);
	    };
	    BaseAtom.prototype.toString = function () {
	        return this.name;
	    };
	    return BaseAtom;
	}());
	exports.BaseAtom = BaseAtom;
	var Atom = (function (_super) {
	    __extends(Atom, _super);
	    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
	        if (name === void 0) { name = "Atom@" + getNextId(); }
	        if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
	        if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
	        _super.call(this, name);
	        this.name = name;
	        this.onBecomeObservedHandler = onBecomeObservedHandler;
	        this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
	        this.isPendingUnobservation = false;
	        this.isBeingTracked = false;
	    }
	    Atom.prototype.reportObserved = function () {
	        startBatch();
	        _super.prototype.reportObserved.call(this);
	        if (!this.isBeingTracked) {
	            this.isBeingTracked = true;
	            this.onBecomeObservedHandler();
	        }
	        endBatch();
	        return !!globalState.trackingDerivation;
	    };
	    Atom.prototype.onBecomeUnobserved = function () {
	        this.isBeingTracked = false;
	        this.onBecomeUnobservedHandler();
	    };
	    return Atom;
	}(BaseAtom));
	exports.Atom = Atom;
	var isAtom = createInstanceofPredicate("Atom", BaseAtom);
	var ComputedValue = (function () {
	    function ComputedValue(derivation, scope, compareStructural, name, setter) {
	        this.derivation = derivation;
	        this.scope = scope;
	        this.compareStructural = compareStructural;
	        this.dependenciesState = IDerivationState.NOT_TRACKING;
	        this.observing = [];
	        this.newObserving = null;
	        this.isPendingUnobservation = false;
	        this.observers = [];
	        this.observersIndexes = {};
	        this.diffValue = 0;
	        this.runId = 0;
	        this.lastAccessedBy = 0;
	        this.lowestObserverState = IDerivationState.UP_TO_DATE;
	        this.unboundDepsCount = 0;
	        this.__mapid = "#" + getNextId();
	        this.value = undefined;
	        this.isComputing = false;
	        this.isRunningSetter = false;
	        this.name = name || "ComputedValue@" + getNextId();
	        if (setter)
	            this.setter = createAction(name + "-setter", setter);
	    }
	    ComputedValue.prototype.peek = function () {
	        this.isComputing = true;
	        var prevAllowStateChanges = allowStateChangesStart(false);
	        var res = this.derivation.call(this.scope);
	        allowStateChangesEnd(prevAllowStateChanges);
	        this.isComputing = false;
	        return res;
	    };
	    ;
	    ComputedValue.prototype.peekUntracked = function () {
	        var hasError = true;
	        try {
	            var res = this.peek();
	            hasError = false;
	            return res;
	        }
	        finally {
	            if (hasError)
	                handleExceptionInDerivation(this);
	        }
	    };
	    ComputedValue.prototype.onBecomeStale = function () {
	        propagateMaybeChanged(this);
	    };
	    ComputedValue.prototype.onBecomeUnobserved = function () {
	        invariant(this.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row");
	        clearObserving(this);
	        this.value = undefined;
	    };
	    ComputedValue.prototype.get = function () {
	        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
	        startBatch();
	        if (globalState.inBatch === 1) {
	            if (shouldCompute(this))
	                this.value = this.peekUntracked();
	        }
	        else {
	            reportObserved(this);
	            if (shouldCompute(this))
	                if (this.trackAndCompute())
	                    propagateChangeConfirmed(this);
	        }
	        var result = this.value;
	        endBatch();
	        return result;
	    };
	    ComputedValue.prototype.recoverFromError = function () {
	        this.isComputing = false;
	    };
	    ComputedValue.prototype.set = function (value) {
	        if (this.setter) {
	            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
	            this.isRunningSetter = true;
	            try {
	                this.setter.call(this.scope, value);
	            }
	            finally {
	                this.isRunningSetter = false;
	            }
	        }
	        else
	            invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
	    };
	    ComputedValue.prototype.trackAndCompute = function () {
	        if (isSpyEnabled()) {
	            spyReport({
	                object: this,
	                type: "compute",
	                fn: this.derivation,
	                target: this.scope
	            });
	        }
	        var oldValue = this.value;
	        var newValue = this.value = trackDerivedFunction(this, this.peek);
	        return valueDidChange(this.compareStructural, newValue, oldValue);
	    };
	    ComputedValue.prototype.observe = function (listener, fireImmediately) {
	        var _this = this;
	        var firstTime = true;
	        var prevValue = undefined;
	        return autorun(function () {
	            var newValue = _this.get();
	            if (!firstTime || fireImmediately) {
	                var prevU = untrackedStart();
	                listener(newValue, prevValue);
	                untrackedEnd(prevU);
	            }
	            firstTime = false;
	            prevValue = newValue;
	        });
	    };
	    ComputedValue.prototype.toJSON = function () {
	        return this.get();
	    };
	    ComputedValue.prototype.toString = function () {
	        return this.name + "[" + this.derivation.toString() + "]";
	    };
	    ComputedValue.prototype.whyRun = function () {
	        var isTracking = Boolean(globalState.trackingDerivation);
	        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
	        var observers = unique(getObservers(this).map(function (dep) { return dep.name; }));
	        return (("\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n") +
	            (this.dependenciesState === IDerivationState.NOT_TRACKING
	                ?
	                    " * This computation is suspended (not in use by any reaction) and won't run automatically.\n\tDidn't expect this computation to be suspended at this point?\n\t  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n\t  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).\n"
	                :
	                    " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this.isComputing && isTracking) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\tMissing items in this list?\n\t  1. Check whether all used values are properly marked as observable (use isObservable to verify)\n\t  2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n"));
	    };
	    return ComputedValue;
	}());
	var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
	var IDerivationState;
	(function (IDerivationState) {
	    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
	    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
	    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
	    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
	})(IDerivationState || (IDerivationState = {}));
	exports.IDerivationState = IDerivationState;
	function shouldCompute(derivation) {
	    switch (derivation.dependenciesState) {
	        case IDerivationState.UP_TO_DATE: return false;
	        case IDerivationState.NOT_TRACKING:
	        case IDerivationState.STALE: return true;
	        case IDerivationState.POSSIBLY_STALE: {
	            var hasError = true;
	            var prevUntracked = untrackedStart();
	            try {
	                var obs = derivation.observing, l = obs.length;
	                for (var i = 0; i < l; i++) {
	                    var obj = obs[i];
	                    if (isComputedValue(obj)) {
	                        obj.get();
	                        if (derivation.dependenciesState === IDerivationState.STALE) {
	                            hasError = false;
	                            untrackedEnd(prevUntracked);
	                            return true;
	                        }
	                    }
	                }
	                hasError = false;
	                changeDependenciesStateTo0(derivation);
	                untrackedEnd(prevUntracked);
	                return false;
	            }
	            finally {
	                if (hasError) {
	                    changeDependenciesStateTo0(derivation);
	                }
	            }
	        }
	    }
	}
	function isComputingDerivation() {
	    return globalState.trackingDerivation !== null;
	}
	function checkIfStateModificationsAreAllowed() {
	    if (!globalState.allowStateChanges) {
	        invariant(false, globalState.strictMode
	            ? "It is not allowed to create or change state outside an `action` when MobX is in strict mode. Wrap the current method in `action` if this state change is intended"
	            : "It is not allowed to change the state when a computed value or transformer is being evaluated. Use 'autorun' to create reactive functions with side-effects.");
	    }
	}
	function trackDerivedFunction(derivation, f) {
	    changeDependenciesStateTo0(derivation);
	    derivation.newObserving = new Array(derivation.observing.length + 100);
	    derivation.unboundDepsCount = 0;
	    derivation.runId = ++globalState.runId;
	    var prevTracking = globalState.trackingDerivation;
	    globalState.trackingDerivation = derivation;
	    var hasException = true;
	    var result;
	    try {
	        result = f.call(derivation);
	        hasException = false;
	    }
	    finally {
	        if (hasException) {
	            handleExceptionInDerivation(derivation);
	        }
	        else {
	            globalState.trackingDerivation = prevTracking;
	            bindDependencies(derivation);
	        }
	    }
	    return result;
	}
	function handleExceptionInDerivation(derivation) {
	    var message = ("[mobx] An uncaught exception occurred while calculating your computed value, autorun or transformer. Or inside the render() method of an observer based React component. " +
	        "These functions should never throw exceptions as MobX will not always be able to recover from them. " +
	        ("Please fix the error reported after this message or enable 'Pause on (caught) exceptions' in your debugger to find the root cause. In: '" + derivation.name + "'. ") +
	        "For more details see https://github.com/mobxjs/mobx/issues/462");
	    if (isSpyEnabled()) {
	        spyReport({
	            type: "error",
	            message: message
	        });
	    }
	    console.warn(message);
	    changeDependenciesStateTo0(derivation);
	    derivation.newObserving = null;
	    derivation.unboundDepsCount = 0;
	    derivation.recoverFromError();
	    endBatch();
	    resetGlobalState();
	}
	function bindDependencies(derivation) {
	    var prevObserving = derivation.observing;
	    var observing = derivation.observing = derivation.newObserving;
	    derivation.newObserving = null;
	    var i0 = 0, l = derivation.unboundDepsCount;
	    for (var i = 0; i < l; i++) {
	        var dep = observing[i];
	        if (dep.diffValue === 0) {
	            dep.diffValue = 1;
	            if (i0 !== i)
	                observing[i0] = dep;
	            i0++;
	        }
	    }
	    observing.length = i0;
	    l = prevObserving.length;
	    while (l--) {
	        var dep = prevObserving[l];
	        if (dep.diffValue === 0) {
	            removeObserver(dep, derivation);
	        }
	        dep.diffValue = 0;
	    }
	    while (i0--) {
	        var dep = observing[i0];
	        if (dep.diffValue === 1) {
	            dep.diffValue = 0;
	            addObserver(dep, derivation);
	        }
	    }
	}
	function clearObserving(derivation) {
	    var obs = derivation.observing;
	    var i = obs.length;
	    while (i--)
	        removeObserver(obs[i], derivation);
	    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
	    obs.length = 0;
	}
	function untracked(action) {
	    var prev = untrackedStart();
	    var res = action();
	    untrackedEnd(prev);
	    return res;
	}
	exports.untracked = untracked;
	function untrackedStart() {
	    var prev = globalState.trackingDerivation;
	    globalState.trackingDerivation = null;
	    return prev;
	}
	function untrackedEnd(prev) {
	    globalState.trackingDerivation = prev;
	}
	function changeDependenciesStateTo0(derivation) {
	    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
	        return;
	    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
	    var obs = derivation.observing;
	    var i = obs.length;
	    while (i--)
	        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
	}
	var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
	var MobXGlobals = (function () {
	    function MobXGlobals() {
	        this.version = 4;
	        this.trackingDerivation = null;
	        this.runId = 0;
	        this.mobxGuid = 0;
	        this.inTransaction = 0;
	        this.isRunningReactions = false;
	        this.inBatch = 0;
	        this.pendingUnobservations = [];
	        this.pendingReactions = [];
	        this.allowStateChanges = true;
	        this.strictMode = false;
	        this.resetId = 0;
	        this.spyListeners = [];
	    }
	    return MobXGlobals;
	}());
	var globalState = (function () {
	    var res = new MobXGlobals();
	    if (global.__mobservableTrackingStack || global.__mobservableViewStack)
	        throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
	    if (global.__mobxGlobal && global.__mobxGlobal.version !== res.version)
	        throw new Error("[mobx] An incompatible version of mobx is already loaded.");
	    if (global.__mobxGlobal)
	        return global.__mobxGlobal;
	    return global.__mobxGlobal = res;
	})();
	function registerGlobals() {
	}
	function resetGlobalState() {
	    globalState.resetId++;
	    var defaultGlobals = new MobXGlobals();
	    for (var key in defaultGlobals)
	        if (persistentKeys.indexOf(key) === -1)
	            globalState[key] = defaultGlobals[key];
	    globalState.allowStateChanges = !globalState.strictMode;
	}
	function hasObservers(observable) {
	    return observable.observers && observable.observers.length > 0;
	}
	function getObservers(observable) {
	    return observable.observers;
	}
	function invariantObservers(observable) {
	    var list = observable.observers;
	    var map = observable.observersIndexes;
	    var l = list.length;
	    for (var i = 0; i < l; i++) {
	        var id = list[i].__mapid;
	        if (i) {
	            invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list");
	        }
	        else {
	            invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldnt be held in map.");
	        }
	    }
	    invariant(list.length === 0 || Object.keys(map).length === list.length - 1, "INTERNAL ERROR there is no junk in map");
	}
	function addObserver(observable, node) {
	    var l = observable.observers.length;
	    if (l) {
	        observable.observersIndexes[node.__mapid] = l;
	    }
	    observable.observers[l] = node;
	    if (observable.lowestObserverState > node.dependenciesState)
	        observable.lowestObserverState = node.dependenciesState;
	}
	function removeObserver(observable, node) {
	    if (observable.observers.length === 1) {
	        observable.observers.length = 0;
	        queueForUnobservation(observable);
	    }
	    else {
	        var list = observable.observers;
	        var map_1 = observable.observersIndexes;
	        var filler = list.pop();
	        if (filler !== node) {
	            var index = map_1[node.__mapid] || 0;
	            if (index) {
	                map_1[filler.__mapid] = index;
	            }
	            else {
	                delete map_1[filler.__mapid];
	            }
	            list[index] = filler;
	        }
	        delete map_1[node.__mapid];
	    }
	}
	function queueForUnobservation(observable) {
	    if (!observable.isPendingUnobservation) {
	        observable.isPendingUnobservation = true;
	        globalState.pendingUnobservations.push(observable);
	    }
	}
	function startBatch() {
	    globalState.inBatch++;
	}
	function endBatch() {
	    if (globalState.inBatch === 1) {
	        var list = globalState.pendingUnobservations;
	        for (var i = 0; i < list.length; i++) {
	            var observable_1 = list[i];
	            observable_1.isPendingUnobservation = false;
	            if (observable_1.observers.length === 0) {
	                observable_1.onBecomeUnobserved();
	            }
	        }
	        globalState.pendingUnobservations = [];
	    }
	    globalState.inBatch--;
	}
	function reportObserved(observable) {
	    var derivation = globalState.trackingDerivation;
	    if (derivation !== null) {
	        if (derivation.runId !== observable.lastAccessedBy) {
	            observable.lastAccessedBy = derivation.runId;
	            derivation.newObserving[derivation.unboundDepsCount++] = observable;
	        }
	    }
	    else if (observable.observers.length === 0) {
	        queueForUnobservation(observable);
	    }
	}
	function invariantLOS(observable, msg) {
	    var min = getObservers(observable).reduce(function (a, b) { return Math.min(a, b.dependenciesState); }, 2);
	    if (min >= observable.lowestObserverState)
	        return;
	    throw new Error("lowestObserverState is wrong for " + msg + " because " + min + " < " + observable.lowestObserverState);
	}
	function propagateChanged(observable) {
	    if (observable.lowestObserverState === IDerivationState.STALE)
	        return;
	    observable.lowestObserverState = IDerivationState.STALE;
	    var observers = observable.observers;
	    var i = observers.length;
	    while (i--) {
	        var d = observers[i];
	        if (d.dependenciesState === IDerivationState.UP_TO_DATE)
	            d.onBecomeStale();
	        d.dependenciesState = IDerivationState.STALE;
	    }
	}
	function propagateChangeConfirmed(observable) {
	    if (observable.lowestObserverState === IDerivationState.STALE)
	        return;
	    observable.lowestObserverState = IDerivationState.STALE;
	    var observers = observable.observers;
	    var i = observers.length;
	    while (i--) {
	        var d = observers[i];
	        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
	            d.dependenciesState = IDerivationState.STALE;
	        else if (d.dependenciesState === IDerivationState.UP_TO_DATE)
	            observable.lowestObserverState = IDerivationState.UP_TO_DATE;
	    }
	}
	function propagateMaybeChanged(observable) {
	    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE)
	        return;
	    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
	    var observers = observable.observers;
	    var i = observers.length;
	    while (i--) {
	        var d = observers[i];
	        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
	            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
	            d.onBecomeStale();
	        }
	    }
	}
	var Reaction = (function () {
	    function Reaction(name, onInvalidate) {
	        if (name === void 0) { name = "Reaction@" + getNextId(); }
	        this.name = name;
	        this.onInvalidate = onInvalidate;
	        this.observing = [];
	        this.newObserving = [];
	        this.dependenciesState = IDerivationState.NOT_TRACKING;
	        this.diffValue = 0;
	        this.runId = 0;
	        this.unboundDepsCount = 0;
	        this.__mapid = "#" + getNextId();
	        this.isDisposed = false;
	        this._isScheduled = false;
	        this._isTrackPending = false;
	        this._isRunning = false;
	    }
	    Reaction.prototype.onBecomeStale = function () {
	        this.schedule();
	    };
	    Reaction.prototype.schedule = function () {
	        if (!this._isScheduled) {
	            this._isScheduled = true;
	            globalState.pendingReactions.push(this);
	            startBatch();
	            runReactions();
	            endBatch();
	        }
	    };
	    Reaction.prototype.isScheduled = function () {
	        return this._isScheduled;
	    };
	    Reaction.prototype.runReaction = function () {
	        if (!this.isDisposed) {
	            this._isScheduled = false;
	            if (shouldCompute(this)) {
	                this._isTrackPending = true;
	                this.onInvalidate();
	                if (this._isTrackPending && isSpyEnabled()) {
	                    spyReport({
	                        object: this,
	                        type: "scheduled-reaction"
	                    });
	                }
	            }
	        }
	    };
	    Reaction.prototype.track = function (fn) {
	        startBatch();
	        var notify = isSpyEnabled();
	        var startTime;
	        if (notify) {
	            startTime = Date.now();
	            spyReportStart({
	                object: this,
	                type: "reaction",
	                fn: fn
	            });
	        }
	        this._isRunning = true;
	        trackDerivedFunction(this, fn);
	        this._isRunning = false;
	        this._isTrackPending = false;
	        if (this.isDisposed) {
	            clearObserving(this);
	        }
	        if (notify) {
	            spyReportEnd({
	                time: Date.now() - startTime
	            });
	        }
	        endBatch();
	    };
	    Reaction.prototype.recoverFromError = function () {
	        this._isRunning = false;
	        this._isTrackPending = false;
	    };
	    Reaction.prototype.dispose = function () {
	        if (!this.isDisposed) {
	            this.isDisposed = true;
	            if (!this._isRunning) {
	                startBatch();
	                clearObserving(this);
	                endBatch();
	            }
	        }
	    };
	    Reaction.prototype.getDisposer = function () {
	        var r = this.dispose.bind(this);
	        r.$mobx = this;
	        return r;
	    };
	    Reaction.prototype.toString = function () {
	        return "Reaction[" + this.name + "]";
	    };
	    Reaction.prototype.whyRun = function () {
	        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) { return dep.name; });
	        return ("\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + ((this._isRunning) ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\tMissing items in this list?\n\t  1. Check whether all used values are properly marked as observable (use isObservable to verify)\n\t  2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n");
	    };
	    return Reaction;
	}());
	exports.Reaction = Reaction;
	var MAX_REACTION_ITERATIONS = 100;
	var reactionScheduler = function (f) { return f(); };
	function runReactions() {
	    if (globalState.isRunningReactions === true || globalState.inTransaction > 0)
	        return;
	    reactionScheduler(runReactionsHelper);
	}
	function runReactionsHelper() {
	    globalState.isRunningReactions = true;
	    var allReactions = globalState.pendingReactions;
	    var iterations = 0;
	    while (allReactions.length > 0) {
	        if (++iterations === MAX_REACTION_ITERATIONS) {
	            resetGlobalState();
	            throw new Error(("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations.")
	                + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
	        }
	        var remainingReactions = allReactions.splice(0);
	        for (var i = 0, l = remainingReactions.length; i < l; i++)
	            remainingReactions[i].runReaction();
	    }
	    globalState.isRunningReactions = false;
	}
	var isReaction = createInstanceofPredicate("Reaction", Reaction);
	function setReactionScheduler(fn) {
	    var baseScheduler = reactionScheduler;
	    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
	}
	function isSpyEnabled() {
	    return !!globalState.spyListeners.length;
	}
	function spyReport(event) {
	    if (!globalState.spyListeners.length)
	        return false;
	    var listeners = globalState.spyListeners;
	    for (var i = 0, l = listeners.length; i < l; i++)
	        listeners[i](event);
	}
	function spyReportStart(event) {
	    var change = objectAssign({}, event, { spyReportStart: true });
	    spyReport(change);
	}
	var END_EVENT = { spyReportEnd: true };
	function spyReportEnd(change) {
	    if (change)
	        spyReport(objectAssign({}, change, END_EVENT));
	    else
	        spyReport(END_EVENT);
	}
	function spy(listener) {
	    globalState.spyListeners.push(listener);
	    return once(function () {
	        var idx = globalState.spyListeners.indexOf(listener);
	        if (idx !== -1)
	            globalState.spyListeners.splice(idx, 1);
	    });
	}
	exports.spy = spy;
	function trackTransitions(onReport) {
	    deprecated("trackTransitions is deprecated. Use mobx.spy instead");
	    if (typeof onReport === "boolean") {
	        deprecated("trackTransitions only takes a single callback function. If you are using the mobx-react-devtools, please update them first");
	        onReport = arguments[1];
	    }
	    if (!onReport) {
	        deprecated("trackTransitions without callback has been deprecated and is a no-op now. If you are using the mobx-react-devtools, please update them first");
	        return function () { };
	    }
	    return spy(onReport);
	}
	function transaction(action, thisArg, report) {
	    if (thisArg === void 0) { thisArg = undefined; }
	    if (report === void 0) { report = true; }
	    transactionStart((action.name) || "anonymous transaction", thisArg, report);
	    try {
	        return action.call(thisArg);
	    }
	    finally {
	        transactionEnd(report);
	    }
	}
	exports.transaction = transaction;
	function transactionStart(name, thisArg, report) {
	    if (thisArg === void 0) { thisArg = undefined; }
	    if (report === void 0) { report = true; }
	    startBatch();
	    globalState.inTransaction += 1;
	    if (report && isSpyEnabled()) {
	        spyReportStart({
	            type: "transaction",
	            target: thisArg,
	            name: name
	        });
	    }
	}
	function transactionEnd(report) {
	    if (report === void 0) { report = true; }
	    if (--globalState.inTransaction === 0) {
	        runReactions();
	    }
	    if (report && isSpyEnabled())
	        spyReportEnd();
	    endBatch();
	}
	function hasInterceptors(interceptable) {
	    return (interceptable.interceptors && interceptable.interceptors.length > 0);
	}
	function registerInterceptor(interceptable, handler) {
	    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
	    interceptors.push(handler);
	    return once(function () {
	        var idx = interceptors.indexOf(handler);
	        if (idx !== -1)
	            interceptors.splice(idx, 1);
	    });
	}
	function interceptChange(interceptable, change) {
	    var prevU = untrackedStart();
	    try {
	        var interceptors = interceptable.interceptors;
	        for (var i = 0, l = interceptors.length; i < l; i++) {
	            change = interceptors[i](change);
	            invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
	            if (!change)
	                break;
	        }
	        return change;
	    }
	    finally {
	        untrackedEnd(prevU);
	    }
	}
	function hasListeners(listenable) {
	    return listenable.changeListeners && listenable.changeListeners.length > 0;
	}
	function registerListener(listenable, handler) {
	    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
	    listeners.push(handler);
	    return once(function () {
	        var idx = listeners.indexOf(handler);
	        if (idx !== -1)
	            listeners.splice(idx, 1);
	    });
	}
	function notifyListeners(listenable, change) {
	    var prevU = untrackedStart();
	    var listeners = listenable.changeListeners;
	    if (!listeners)
	        return;
	    listeners = listeners.slice();
	    for (var i = 0, l = listeners.length; i < l; i++) {
	        if (Array.isArray(change)) {
	            listeners[i].apply(null, change);
	        }
	        else {
	            listeners[i](change);
	        }
	    }
	    untrackedEnd(prevU);
	}
	var ValueMode;
	(function (ValueMode) {
	    ValueMode[ValueMode["Recursive"] = 0] = "Recursive";
	    ValueMode[ValueMode["Reference"] = 1] = "Reference";
	    ValueMode[ValueMode["Structure"] = 2] = "Structure";
	    ValueMode[ValueMode["Flat"] = 3] = "Flat";
	})(ValueMode || (ValueMode = {}));
	exports.ValueMode = ValueMode;
	function withModifier(modifier, value) {
	    assertUnwrapped(value, "Modifiers are not allowed to be nested");
	    return {
	        mobxModifier: modifier,
	        value: value
	    };
	}
	function getModifier(value) {
	    if (value) {
	        return value.mobxModifier || null;
	    }
	    return null;
	}
	function asReference(value) {
	    return withModifier(ValueMode.Reference, value);
	}
	exports.asReference = asReference;
	asReference.mobxModifier = ValueMode.Reference;
	function asStructure(value) {
	    return withModifier(ValueMode.Structure, value);
	}
	exports.asStructure = asStructure;
	asStructure.mobxModifier = ValueMode.Structure;
	function asFlat(value) {
	    return withModifier(ValueMode.Flat, value);
	}
	exports.asFlat = asFlat;
	asFlat.mobxModifier = ValueMode.Flat;
	function asMap(data, modifierFunc) {
	    return map(data, modifierFunc);
	}
	exports.asMap = asMap;
	function getValueModeFromValue(value, defaultMode) {
	    var mode = getModifier(value);
	    if (mode)
	        return [mode, value.value];
	    return [defaultMode, value];
	}
	function getValueModeFromModifierFunc(func) {
	    if (func === undefined)
	        return ValueMode.Recursive;
	    var mod = getModifier(func);
	    invariant(mod !== null, "Cannot determine value mode from function. Please pass in one of these: mobx.asReference, mobx.asStructure or mobx.asFlat, got: " + func);
	    return mod;
	}
	function isModifierWrapper(value) {
	    return value.mobxModifier !== undefined;
	}
	function makeChildObservable(value, parentMode, name) {
	    var childMode;
	    if (isObservable(value))
	        return value;
	    switch (parentMode) {
	        case ValueMode.Reference:
	            return value;
	        case ValueMode.Flat:
	            assertUnwrapped(value, "Items inside 'asFlat' cannot have modifiers");
	            childMode = ValueMode.Reference;
	            break;
	        case ValueMode.Structure:
	            assertUnwrapped(value, "Items inside 'asStructure' cannot have modifiers");
	            childMode = ValueMode.Structure;
	            break;
	        case ValueMode.Recursive:
	            _a = getValueModeFromValue(value, ValueMode.Recursive), childMode = _a[0], value = _a[1];
	            break;
	        default:
	            invariant(false, "Illegal State");
	    }
	    if (Array.isArray(value))
	        return createObservableArray(value, childMode, name);
	    if (isPlainObject(value) && Object.isExtensible(value))
	        return extendObservableHelper(value, value, childMode, name);
	    return value;
	    var _a;
	}
	function assertUnwrapped(value, message) {
	    if (getModifier(value) !== null)
	        throw new Error("[mobx] asStructure / asReference / asFlat cannot be used here. " + message);
	}
	var safariPrototypeSetterInheritanceBug = (function () {
	    var v = false;
	    var p = {};
	    Object.defineProperty(p, "0", { set: function () { v = true; } });
	    Object.create(p)["0"] = 1;
	    return v === false;
	})();
	var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
	var StubArray = (function () {
	    function StubArray() {
	    }
	    return StubArray;
	}());
	StubArray.prototype = [];
	var ObservableArrayAdministration = (function () {
	    function ObservableArrayAdministration(name, mode, array, owned) {
	        this.mode = mode;
	        this.array = array;
	        this.owned = owned;
	        this.lastKnownLength = 0;
	        this.interceptors = null;
	        this.changeListeners = null;
	        this.atom = new BaseAtom(name || ("ObservableArray@" + getNextId()));
	    }
	    ObservableArrayAdministration.prototype.makeReactiveArrayItem = function (value) {
	        assertUnwrapped(value, "Array values cannot have modifiers");
	        if (this.mode === ValueMode.Flat || this.mode === ValueMode.Reference)
	            return value;
	        return makeChildObservable(value, this.mode, this.atom.name + "[..]");
	    };
	    ObservableArrayAdministration.prototype.intercept = function (handler) {
	        return registerInterceptor(this, handler);
	    };
	    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
	        if (fireImmediately === void 0) { fireImmediately = false; }
	        if (fireImmediately) {
	            listener({
	                object: this.array,
	                type: "splice",
	                index: 0,
	                added: this.values.slice(),
	                addedCount: this.values.length,
	                removed: [],
	                removedCount: 0
	            });
	        }
	        return registerListener(this, listener);
	    };
	    ObservableArrayAdministration.prototype.getArrayLength = function () {
	        this.atom.reportObserved();
	        return this.values.length;
	    };
	    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
	        if (typeof newLength !== "number" || newLength < 0)
	            throw new Error("[mobx.array] Out of range: " + newLength);
	        var currentLength = this.values.length;
	        if (newLength === currentLength)
	            return;
	        else if (newLength > currentLength)
	            this.spliceWithArray(currentLength, 0, new Array(newLength - currentLength));
	        else
	            this.spliceWithArray(newLength, currentLength - newLength);
	    };
	    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
	        if (oldLength !== this.lastKnownLength)
	            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
	        this.lastKnownLength += delta;
	        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE)
	            reserveArrayBuffer(oldLength + delta + 1);
	    };
	    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
	        checkIfStateModificationsAreAllowed();
	        var length = this.values.length;
	        if (index === undefined)
	            index = 0;
	        else if (index > length)
	            index = length;
	        else if (index < 0)
	            index = Math.max(0, length + index);
	        if (arguments.length === 1)
	            deleteCount = length - index;
	        else if (deleteCount === undefined || deleteCount === null)
	            deleteCount = 0;
	        else
	            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
	        if (newItems === undefined)
	            newItems = [];
	        if (hasInterceptors(this)) {
	            var change = interceptChange(this, {
	                object: this.array,
	                type: "splice",
	                index: index,
	                removedCount: deleteCount,
	                added: newItems
	            });
	            if (!change)
	                return EMPTY_ARRAY;
	            deleteCount = change.removedCount;
	            newItems = change.added;
	        }
	        newItems = newItems.map(this.makeReactiveArrayItem, this);
	        var lengthDelta = newItems.length - deleteCount;
	        this.updateArrayLength(length, lengthDelta);
	        var res = (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
	        if (deleteCount !== 0 || newItems.length !== 0)
	            this.notifyArraySplice(index, newItems, res);
	        return res;
	        var _a;
	    };
	    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
	        var notifySpy = !this.owned && isSpyEnabled();
	        var notify = hasListeners(this);
	        var change = notify || notifySpy ? {
	            object: this.array,
	            type: "update",
	            index: index, newValue: newValue, oldValue: oldValue
	        } : null;
	        if (notifySpy)
	            spyReportStart(change);
	        this.atom.reportChanged();
	        if (notify)
	            notifyListeners(this, change);
	        if (notifySpy)
	            spyReportEnd();
	    };
	    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
	        var notifySpy = !this.owned && isSpyEnabled();
	        var notify = hasListeners(this);
	        var change = notify || notifySpy ? {
	            object: this.array,
	            type: "splice",
	            index: index, removed: removed, added: added,
	            removedCount: removed.length,
	            addedCount: added.length
	        } : null;
	        if (notifySpy)
	            spyReportStart(change);
	        this.atom.reportChanged();
	        if (notify)
	            notifyListeners(this, change);
	        if (notifySpy)
	            spyReportEnd();
	    };
	    return ObservableArrayAdministration;
	}());
	var ObservableArray = (function (_super) {
	    __extends(ObservableArray, _super);
	    function ObservableArray(initialValues, mode, name, owned) {
	        if (owned === void 0) { owned = false; }
	        _super.call(this);
	        var adm = new ObservableArrayAdministration(name, mode, this, owned);
	        addHiddenFinalProp(this, "$mobx", adm);
	        if (initialValues && initialValues.length) {
	            adm.updateArrayLength(0, initialValues.length);
	            adm.values = initialValues.map(adm.makeReactiveArrayItem, adm);
	            adm.notifyArraySplice(0, adm.values.slice(), EMPTY_ARRAY);
	        }
	        else {
	            adm.values = [];
	        }
	        if (safariPrototypeSetterInheritanceBug) {
	            Object.defineProperty(adm.array, "0", ENTRY_0);
	        }
	    }
	    ObservableArray.prototype.intercept = function (handler) {
	        return this.$mobx.intercept(handler);
	    };
	    ObservableArray.prototype.observe = function (listener, fireImmediately) {
	        if (fireImmediately === void 0) { fireImmediately = false; }
	        return this.$mobx.observe(listener, fireImmediately);
	    };
	    ObservableArray.prototype.clear = function () {
	        return this.splice(0);
	    };
	    ObservableArray.prototype.concat = function () {
	        var arrays = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            arrays[_i - 0] = arguments[_i];
	        }
	        this.$mobx.atom.reportObserved();
	        return Array.prototype.concat.apply(this.slice(), arrays.map(function (a) { return isObservableArray(a) ? a.slice() : a; }));
	    };
	    ObservableArray.prototype.replace = function (newItems) {
	        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
	    };
	    ObservableArray.prototype.toJS = function () {
	        return this.slice();
	    };
	    ObservableArray.prototype.toJSON = function () {
	        return this.toJS();
	    };
	    ObservableArray.prototype.peek = function () {
	        return this.$mobx.values;
	    };
	    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
	        if (fromIndex === void 0) { fromIndex = 0; }
	        this.$mobx.atom.reportObserved();
	        var items = this.$mobx.values, l = items.length;
	        for (var i = fromIndex; i < l; i++)
	            if (predicate.call(thisArg, items[i], i, this))
	                return items[i];
	        return undefined;
	    };
	    ObservableArray.prototype.splice = function (index, deleteCount) {
	        var newItems = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            newItems[_i - 2] = arguments[_i];
	        }
	        switch (arguments.length) {
	            case 0:
	                return [];
	            case 1:
	                return this.$mobx.spliceWithArray(index);
	            case 2:
	                return this.$mobx.spliceWithArray(index, deleteCount);
	        }
	        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
	    };
	    ObservableArray.prototype.push = function () {
	        var items = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            items[_i - 0] = arguments[_i];
	        }
	        var adm = this.$mobx;
	        adm.spliceWithArray(adm.values.length, 0, items);
	        return adm.values.length;
	    };
	    ObservableArray.prototype.pop = function () {
	        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
	    };
	    ObservableArray.prototype.shift = function () {
	        return this.splice(0, 1)[0];
	    };
	    ObservableArray.prototype.unshift = function () {
	        var items = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            items[_i - 0] = arguments[_i];
	        }
	        var adm = this.$mobx;
	        adm.spliceWithArray(0, 0, items);
	        return adm.values.length;
	    };
	    ObservableArray.prototype.reverse = function () {
	        this.$mobx.atom.reportObserved();
	        var clone = this.slice();
	        return clone.reverse.apply(clone, arguments);
	    };
	    ObservableArray.prototype.sort = function (compareFn) {
	        this.$mobx.atom.reportObserved();
	        var clone = this.slice();
	        return clone.sort.apply(clone, arguments);
	    };
	    ObservableArray.prototype.remove = function (value) {
	        var idx = this.$mobx.values.indexOf(value);
	        if (idx > -1) {
	            this.splice(idx, 1);
	            return true;
	        }
	        return false;
	    };
	    ObservableArray.prototype.move = function (fromIndex, toIndex) {
	        function checkIndex(index) {
	            if (index < 0) {
	                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
	            }
	            var length = this.$mobx.values.length;
	            if (index >= length) {
	                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
	            }
	        }
	        checkIndex.call(this, fromIndex);
	        checkIndex.call(this, toIndex);
	        if (fromIndex === toIndex) {
	            return;
	        }
	        var oldItems = this.$mobx.values;
	        var newItems;
	        if (fromIndex < toIndex) {
	            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
	        }
	        else {
	            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
	        }
	        this.replace(newItems);
	    };
	    ObservableArray.prototype.toString = function () {
	        return "[mobx.array] " + Array.prototype.toString.apply(this.$mobx.values, arguments);
	    };
	    ObservableArray.prototype.toLocaleString = function () {
	        return "[mobx.array] " + Array.prototype.toLocaleString.apply(this.$mobx.values, arguments);
	    };
	    return ObservableArray;
	}(StubArray));
	declareIterator(ObservableArray.prototype, function () {
	    return arrayAsIterator(this.slice());
	});
	makeNonEnumerable(ObservableArray.prototype, [
	    "constructor",
	    "intercept",
	    "observe",
	    "clear",
	    "concat",
	    "replace",
	    "toJS",
	    "toJSON",
	    "peek",
	    "find",
	    "splice",
	    "push",
	    "pop",
	    "shift",
	    "unshift",
	    "reverse",
	    "sort",
	    "remove",
	    "move",
	    "toString",
	    "toLocaleString"
	]);
	Object.defineProperty(ObservableArray.prototype, "length", {
	    enumerable: false,
	    configurable: true,
	    get: function () {
	        return this.$mobx.getArrayLength();
	    },
	    set: function (newLength) {
	        this.$mobx.setArrayLength(newLength);
	    }
	});
	[
	    "every",
	    "filter",
	    "forEach",
	    "indexOf",
	    "join",
	    "lastIndexOf",
	    "map",
	    "reduce",
	    "reduceRight",
	    "slice",
	    "some"
	].forEach(function (funcName) {
	    var baseFunc = Array.prototype[funcName];
	    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
	    addHiddenProp(ObservableArray.prototype, funcName, function () {
	        this.$mobx.atom.reportObserved();
	        return baseFunc.apply(this.$mobx.values, arguments);
	    });
	});
	var ENTRY_0 = {
	    configurable: true,
	    enumerable: false,
	    set: createArraySetter(0),
	    get: createArrayGetter(0)
	};
	function createArrayBufferItem(index) {
	    var set = createArraySetter(index);
	    var get = createArrayGetter(index);
	    Object.defineProperty(ObservableArray.prototype, "" + index, {
	        enumerable: false,
	        configurable: true,
	        set: set, get: get
	    });
	}
	function createArraySetter(index) {
	    return function (newValue) {
	        var adm = this.$mobx;
	        var values = adm.values;
	        assertUnwrapped(newValue, "Modifiers cannot be used on array values. For non-reactive array values use makeReactive(asFlat(array)).");
	        if (index < values.length) {
	            checkIfStateModificationsAreAllowed();
	            var oldValue = values[index];
	            if (hasInterceptors(adm)) {
	                var change = interceptChange(adm, {
	                    type: "update",
	                    object: adm.array,
	                    index: index, newValue: newValue
	                });
	                if (!change)
	                    return;
	                newValue = change.newValue;
	            }
	            newValue = adm.makeReactiveArrayItem(newValue);
	            var changed = (adm.mode === ValueMode.Structure) ? !deepEquals(oldValue, newValue) : oldValue !== newValue;
	            if (changed) {
	                values[index] = newValue;
	                adm.notifyArrayChildUpdate(index, newValue, oldValue);
	            }
	        }
	        else if (index === values.length) {
	            adm.spliceWithArray(index, 0, [newValue]);
	        }
	        else
	            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
	    };
	}
	function createArrayGetter(index) {
	    return function () {
	        var impl = this.$mobx;
	        if (impl && index < impl.values.length) {
	            impl.atom.reportObserved();
	            return impl.values[index];
	        }
	        console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
	        return undefined;
	    };
	}
	function reserveArrayBuffer(max) {
	    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
	        createArrayBufferItem(index);
	    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
	}
	reserveArrayBuffer(1000);
	function createObservableArray(initialValues, mode, name) {
	    return new ObservableArray(initialValues, mode, name);
	}
	function fastArray(initialValues) {
	    deprecated("fastArray is deprecated. Please use `observable(asFlat([]))`");
	    return createObservableArray(initialValues, ValueMode.Flat, null);
	}
	exports.fastArray = fastArray;
	var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
	function isObservableArray(thing) {
	    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
	}
	exports.isObservableArray = isObservableArray;
	var ObservableMapMarker = {};
	var ObservableMap = (function () {
	    function ObservableMap(initialData, valueModeFunc) {
	        var _this = this;
	        this.$mobx = ObservableMapMarker;
	        this._data = {};
	        this._hasMap = {};
	        this.name = "ObservableMap@" + getNextId();
	        this._keys = new ObservableArray(null, ValueMode.Reference, this.name + ".keys()", true);
	        this.interceptors = null;
	        this.changeListeners = null;
	        this._valueMode = getValueModeFromModifierFunc(valueModeFunc);
	        if (this._valueMode === ValueMode.Flat)
	            this._valueMode = ValueMode.Reference;
	        allowStateChanges(true, function () {
	            if (isPlainObject(initialData))
	                _this.merge(initialData);
	            else if (Array.isArray(initialData))
	                initialData.forEach(function (_a) {
	                    var key = _a[0], value = _a[1];
	                    return _this.set(key, value);
	                });
	        });
	    }
	    ObservableMap.prototype._has = function (key) {
	        return typeof this._data[key] !== "undefined";
	    };
	    ObservableMap.prototype.has = function (key) {
	        if (!this.isValidKey(key))
	            return false;
	        key = "" + key;
	        if (this._hasMap[key])
	            return this._hasMap[key].get();
	        return this._updateHasMapEntry(key, false).get();
	    };
	    ObservableMap.prototype.set = function (key, value) {
	        this.assertValidKey(key);
	        key = "" + key;
	        var hasKey = this._has(key);
	        assertUnwrapped(value, "[mobx.map.set] Expected unwrapped value to be inserted to key '" + key + "'. If you need to use modifiers pass them as second argument to the constructor");
	        if (hasInterceptors(this)) {
	            var change = interceptChange(this, {
	                type: hasKey ? "update" : "add",
	                object: this,
	                newValue: value,
	                name: key
	            });
	            if (!change)
	                return;
	            value = change.newValue;
	        }
	        if (hasKey) {
	            this._updateValue(key, value);
	        }
	        else {
	            this._addValue(key, value);
	        }
	    };
	    ObservableMap.prototype.delete = function (key) {
	        var _this = this;
	        this.assertValidKey(key);
	        key = "" + key;
	        if (hasInterceptors(this)) {
	            var change = interceptChange(this, {
	                type: "delete",
	                object: this,
	                name: key
	            });
	            if (!change)
	                return false;
	        }
	        if (this._has(key)) {
	            var notifySpy = isSpyEnabled();
	            var notify = hasListeners(this);
	            var change = notify || notifySpy ? {
	                type: "delete",
	                object: this,
	                oldValue: this._data[key].value,
	                name: key
	            } : null;
	            if (notifySpy)
	                spyReportStart(change);
	            transaction(function () {
	                _this._keys.remove(key);
	                _this._updateHasMapEntry(key, false);
	                var observable = _this._data[key];
	                observable.setNewValue(undefined);
	                _this._data[key] = undefined;
	            }, undefined, false);
	            if (notify)
	                notifyListeners(this, change);
	            if (notifySpy)
	                spyReportEnd();
	            return true;
	        }
	        return false;
	    };
	    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
	        var entry = this._hasMap[key];
	        if (entry) {
	            entry.setNewValue(value);
	        }
	        else {
	            entry = this._hasMap[key] = new ObservableValue(value, ValueMode.Reference, this.name + "." + key + "?", false);
	        }
	        return entry;
	    };
	    ObservableMap.prototype._updateValue = function (name, newValue) {
	        var observable = this._data[name];
	        newValue = observable.prepareNewValue(newValue);
	        if (newValue !== UNCHANGED) {
	            var notifySpy = isSpyEnabled();
	            var notify = hasListeners(this);
	            var change = notify || notifySpy ? {
	                type: "update",
	                object: this,
	                oldValue: observable.value,
	                name: name, newValue: newValue
	            } : null;
	            if (notifySpy)
	                spyReportStart(change);
	            observable.setNewValue(newValue);
	            if (notify)
	                notifyListeners(this, change);
	            if (notifySpy)
	                spyReportEnd();
	        }
	    };
	    ObservableMap.prototype._addValue = function (name, newValue) {
	        var _this = this;
	        transaction(function () {
	            var observable = _this._data[name] = new ObservableValue(newValue, _this._valueMode, _this.name + "." + name, false);
	            newValue = observable.value;
	            _this._updateHasMapEntry(name, true);
	            _this._keys.push(name);
	        }, undefined, false);
	        var notifySpy = isSpyEnabled();
	        var notify = hasListeners(this);
	        var change = notify || notifySpy ? {
	            type: "add",
	            object: this,
	            name: name, newValue: newValue
	        } : null;
	        if (notifySpy)
	            spyReportStart(change);
	        if (notify)
	            notifyListeners(this, change);
	        if (notifySpy)
	            spyReportEnd();
	    };
	    ObservableMap.prototype.get = function (key) {
	        key = "" + key;
	        if (this.has(key))
	            return this._data[key].get();
	        return undefined;
	    };
	    ObservableMap.prototype.keys = function () {
	        return arrayAsIterator(this._keys.slice());
	    };
	    ObservableMap.prototype.values = function () {
	        return arrayAsIterator(this._keys.map(this.get, this));
	    };
	    ObservableMap.prototype.entries = function () {
	        var _this = this;
	        return arrayAsIterator(this._keys.map(function (key) { return [key, _this.get(key)]; }));
	    };
	    ObservableMap.prototype.forEach = function (callback, thisArg) {
	        var _this = this;
	        this.keys().forEach(function (key) { return callback.call(thisArg, _this.get(key), key); });
	    };
	    ObservableMap.prototype.merge = function (other) {
	        var _this = this;
	        transaction(function () {
	            if (isObservableMap(other))
	                other.keys().forEach(function (key) { return _this.set(key, other.get(key)); });
	            else
	                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
	        }, undefined, false);
	        return this;
	    };
	    ObservableMap.prototype.clear = function () {
	        var _this = this;
	        transaction(function () {
	            untracked(function () {
	                _this.keys().forEach(_this.delete, _this);
	            });
	        }, undefined, false);
	    };
	    Object.defineProperty(ObservableMap.prototype, "size", {
	        get: function () {
	            return this._keys.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ObservableMap.prototype.toJS = function () {
	        var _this = this;
	        var res = {};
	        this.keys().forEach(function (key) { return res[key] = _this.get(key); });
	        return res;
	    };
	    ObservableMap.prototype.toJs = function () {
	        deprecated("toJs is deprecated, use toJS instead");
	        return this.toJS();
	    };
	    ObservableMap.prototype.toJSON = function () {
	        return this.toJS();
	    };
	    ObservableMap.prototype.isValidKey = function (key) {
	        if (key === null || key === undefined)
	            return false;
	        if (typeof key !== "string" && typeof key !== "number" && typeof key !== "boolean")
	            return false;
	        return true;
	    };
	    ObservableMap.prototype.assertValidKey = function (key) {
	        if (!this.isValidKey(key))
	            throw new Error("[mobx.map] Invalid key: '" + key + "'");
	    };
	    ObservableMap.prototype.toString = function () {
	        var _this = this;
	        return this.name + "[{ " + this.keys().map(function (key) { return (key + ": " + ("" + _this.get(key))); }).join(", ") + " }]";
	    };
	    ObservableMap.prototype.observe = function (listener, fireImmediately) {
	        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable maps.");
	        return registerListener(this, listener);
	    };
	    ObservableMap.prototype.intercept = function (handler) {
	        return registerInterceptor(this, handler);
	    };
	    return ObservableMap;
	}());
	exports.ObservableMap = ObservableMap;
	declareIterator(ObservableMap.prototype, function () {
	    return this.entries();
	});
	function map(initialValues, valueModifier) {
	    return new ObservableMap(initialValues, valueModifier);
	}
	exports.map = map;
	var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
	exports.isObservableMap = isObservableMap;
	var COMPUTED_FUNC_DEPRECATED = ("\nIn MobX 2.* passing a function without arguments to (extend)observable will automatically be inferred to be a computed value.\nThis behavior is ambiguous and will change in MobX 3 to create just an observable reference to the value passed in.\nTo disambiguate, please pass the function wrapped with a modifier: use 'computed(fn)' (for current behavior; automatic conversion), or 'asReference(fn)' (future behavior, just store reference) or 'action(fn)'.\nNote that the idiomatic way to write computed properties is 'observable({ get propertyName() { ... }})'.\nFor more details, see https://github.com/mobxjs/mobx/issues/532");
	var ObservableObjectAdministration = (function () {
	    function ObservableObjectAdministration(target, name, mode) {
	        this.target = target;
	        this.name = name;
	        this.mode = mode;
	        this.values = {};
	        this.changeListeners = null;
	        this.interceptors = null;
	    }
	    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
	        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
	        return registerListener(this, callback);
	    };
	    ObservableObjectAdministration.prototype.intercept = function (handler) {
	        return registerInterceptor(this, handler);
	    };
	    return ObservableObjectAdministration;
	}());
	function asObservableObject(target, name, mode) {
	    if (mode === void 0) { mode = ValueMode.Recursive; }
	    if (isObservableObject(target))
	        return target.$mobx;
	    if (!isPlainObject(target))
	        name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
	    if (!name)
	        name = "ObservableObject@" + getNextId();
	    var adm = new ObservableObjectAdministration(target, name, mode);
	    addHiddenFinalProp(target, "$mobx", adm);
	    return adm;
	}
	function handleAsComputedValue(value) {
	    return typeof value === "function" && value.length === 0 && !isAction(value);
	}
	function setObservableObjectInstanceProperty(adm, propName, descriptor) {
	    if (adm.values[propName]) {
	        invariant("value" in descriptor, "cannot redefine property " + propName);
	        adm.target[propName] = descriptor.value;
	    }
	    else {
	        if ("value" in descriptor) {
	            if (handleAsComputedValue(descriptor.value)) {
	                deprecated(COMPUTED_FUNC_DEPRECATED + ")in: " + adm.name + "." + propName);
	            }
	            defineObservableProperty(adm, propName, descriptor.value, true, undefined);
	        }
	        else {
	            defineObservableProperty(adm, propName, descriptor.get, true, descriptor.set);
	        }
	    }
	}
	function defineObservableProperty(adm, propName, newValue, asInstanceProperty, setter) {
	    if (asInstanceProperty)
	        assertPropertyConfigurable(adm.target, propName);
	    var observable;
	    var name = adm.name + "." + propName;
	    var isComputed = true;
	    if (isComputedValue(newValue)) {
	        observable = newValue;
	        newValue.name = name;
	        if (!newValue.scope)
	            newValue.scope = adm.target;
	    }
	    else if (handleAsComputedValue(newValue)) {
	        observable = new ComputedValue(newValue, adm.target, false, name, setter);
	    }
	    else if (getModifier(newValue) === ValueMode.Structure && typeof newValue.value === "function" && newValue.value.length === 0) {
	        observable = new ComputedValue(newValue.value, adm.target, true, name, setter);
	    }
	    else {
	        isComputed = false;
	        if (hasInterceptors(adm)) {
	            var change = interceptChange(adm, {
	                object: adm.target,
	                name: propName,
	                type: "add",
	                newValue: newValue
	            });
	            if (!change)
	                return;
	            newValue = change.newValue;
	        }
	        observable = new ObservableValue(newValue, adm.mode, name, false);
	        newValue = observable.value;
	    }
	    adm.values[propName] = observable;
	    if (asInstanceProperty) {
	        Object.defineProperty(adm.target, propName, isComputed ? generateComputedPropConfig(propName) : generateObservablePropConfig(propName));
	    }
	    if (!isComputed)
	        notifyPropertyAddition(adm, adm.target, propName, newValue);
	}
	var observablePropertyConfigs = {};
	var computedPropertyConfigs = {};
	function generateObservablePropConfig(propName) {
	    var config = observablePropertyConfigs[propName];
	    if (config)
	        return config;
	    return observablePropertyConfigs[propName] = {
	        configurable: true,
	        enumerable: true,
	        get: function () {
	            return this.$mobx.values[propName].get();
	        },
	        set: function (v) {
	            setPropertyValue(this, propName, v);
	        }
	    };
	}
	function generateComputedPropConfig(propName) {
	    var config = computedPropertyConfigs[propName];
	    if (config)
	        return config;
	    return computedPropertyConfigs[propName] = {
	        configurable: true,
	        enumerable: false,
	        get: function () {
	            return this.$mobx.values[propName].get();
	        },
	        set: function (v) {
	            return this.$mobx.values[propName].set(v);
	        }
	    };
	}
	function setPropertyValue(instance, name, newValue) {
	    var adm = instance.$mobx;
	    var observable = adm.values[name];
	    if (hasInterceptors(adm)) {
	        var change = interceptChange(adm, {
	            type: "update",
	            object: instance,
	            name: name, newValue: newValue
	        });
	        if (!change)
	            return;
	        newValue = change.newValue;
	    }
	    newValue = observable.prepareNewValue(newValue);
	    if (newValue !== UNCHANGED) {
	        var notify = hasListeners(adm);
	        var notifySpy = isSpyEnabled();
	        var change = notify || notifySpy ? {
	            type: "update",
	            object: instance,
	            oldValue: observable.value,
	            name: name, newValue: newValue
	        } : null;
	        if (notifySpy)
	            spyReportStart(change);
	        observable.setNewValue(newValue);
	        if (notify)
	            notifyListeners(adm, change);
	        if (notifySpy)
	            spyReportEnd();
	    }
	}
	function notifyPropertyAddition(adm, object, name, newValue) {
	    var notify = hasListeners(adm);
	    var notifySpy = isSpyEnabled();
	    var change = notify || notifySpy ? {
	        type: "add",
	        object: object, name: name, newValue: newValue
	    } : null;
	    if (notifySpy)
	        spyReportStart(change);
	    if (notify)
	        notifyListeners(adm, change);
	    if (notifySpy)
	        spyReportEnd();
	}
	var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
	function isObservableObject(thing) {
	    if (isObject(thing)) {
	        runLazyInitializers(thing);
	        return isObservableObjectAdministration(thing.$mobx);
	    }
	    return false;
	}
	exports.isObservableObject = isObservableObject;
	var UNCHANGED = {};
	var ObservableValue = (function (_super) {
	    __extends(ObservableValue, _super);
	    function ObservableValue(value, mode, name, notifySpy) {
	        if (name === void 0) { name = "ObservableValue@" + getNextId(); }
	        if (notifySpy === void 0) { notifySpy = true; }
	        _super.call(this, name);
	        this.mode = mode;
	        this.hasUnreportedChange = false;
	        this.value = undefined;
	        var _a = getValueModeFromValue(value, ValueMode.Recursive), childmode = _a[0], unwrappedValue = _a[1];
	        if (this.mode === ValueMode.Recursive)
	            this.mode = childmode;
	        this.value = makeChildObservable(unwrappedValue, this.mode, this.name);
	        if (notifySpy && isSpyEnabled()) {
	            spyReport({ type: "create", object: this, newValue: this.value });
	        }
	    }
	    ObservableValue.prototype.set = function (newValue) {
	        var oldValue = this.value;
	        newValue = this.prepareNewValue(newValue);
	        if (newValue !== UNCHANGED) {
	            var notifySpy = isSpyEnabled();
	            if (notifySpy) {
	                spyReportStart({
	                    type: "update",
	                    object: this,
	                    newValue: newValue, oldValue: oldValue
	                });
	            }
	            this.setNewValue(newValue);
	            if (notifySpy)
	                spyReportEnd();
	        }
	    };
	    ObservableValue.prototype.prepareNewValue = function (newValue) {
	        assertUnwrapped(newValue, "Modifiers cannot be used on non-initial values.");
	        checkIfStateModificationsAreAllowed();
	        if (hasInterceptors(this)) {
	            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
	            if (!change)
	                return UNCHANGED;
	            newValue = change.newValue;
	        }
	        var changed = valueDidChange(this.mode === ValueMode.Structure, this.value, newValue);
	        if (changed)
	            return makeChildObservable(newValue, this.mode, this.name);
	        return UNCHANGED;
	    };
	    ObservableValue.prototype.setNewValue = function (newValue) {
	        var oldValue = this.value;
	        this.value = newValue;
	        this.reportChanged();
	        if (hasListeners(this))
	            notifyListeners(this, [newValue, oldValue]);
	    };
	    ObservableValue.prototype.get = function () {
	        this.reportObserved();
	        return this.value;
	    };
	    ObservableValue.prototype.intercept = function (handler) {
	        return registerInterceptor(this, handler);
	    };
	    ObservableValue.prototype.observe = function (listener, fireImmediately) {
	        if (fireImmediately)
	            listener(this.value, undefined);
	        return registerListener(this, listener);
	    };
	    ObservableValue.prototype.toJSON = function () {
	        return this.get();
	    };
	    ObservableValue.prototype.toString = function () {
	        return this.name + "[" + this.value + "]";
	    };
	    return ObservableValue;
	}(BaseAtom));
	var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
	function getAtom(thing, property) {
	    if (typeof thing === "object" && thing !== null) {
	        if (isObservableArray(thing)) {
	            invariant(property === undefined, "It is not possible to get index atoms from arrays");
	            return thing.$mobx.atom;
	        }
	        if (isObservableMap(thing)) {
	            if (property === undefined)
	                return getAtom(thing._keys);
	            var observable_2 = thing._data[property] || thing._hasMap[property];
	            invariant(!!observable_2, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
	            return observable_2;
	        }
	        runLazyInitializers(thing);
	        if (isObservableObject(thing)) {
	            invariant(!!property, "please specify a property");
	            var observable_3 = thing.$mobx.values[property];
	            invariant(!!observable_3, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
	            return observable_3;
	        }
	        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
	            return thing;
	        }
	    }
	    else if (typeof thing === "function") {
	        if (isReaction(thing.$mobx)) {
	            return thing.$mobx;
	        }
	    }
	    invariant(false, "Cannot obtain atom from " + thing);
	}
	function getAdministration(thing, property) {
	    invariant(thing, "Expecting some object");
	    if (property !== undefined)
	        return getAdministration(getAtom(thing, property));
	    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
	        return thing;
	    if (isObservableMap(thing))
	        return thing;
	    runLazyInitializers(thing);
	    if (thing.$mobx)
	        return thing.$mobx;
	    invariant(false, "Cannot obtain administration from " + thing);
	}
	function getDebugName(thing, property) {
	    var named;
	    if (property !== undefined)
	        named = getAtom(thing, property);
	    else if (isObservableObject(thing) || isObservableMap(thing))
	        named = getAdministration(thing);
	    else
	        named = getAtom(thing);
	    return named.name;
	}
	function createClassPropertyDecorator(onInitialize, get, set, enumerable, allowCustomArguments) {
	    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
	        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
	        if (!descriptor) {
	            var newDescriptor = {
	                enumerable: enumerable,
	                configurable: true,
	                get: function () {
	                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true)
	                        typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
	                    return get.call(this, key);
	                },
	                set: function (v) {
	                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
	                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
	                    }
	                    else {
	                        set.call(this, key, v);
	                    }
	                }
	            };
	            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
	                Object.defineProperty(target, key, newDescriptor);
	            }
	            return newDescriptor;
	        }
	        else {
	            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
	                addHiddenProp(target, "__mobxLazyInitializers", (target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice()) || []);
	            }
	            var value_1 = descriptor.value, initializer_1 = descriptor.initializer;
	            target.__mobxLazyInitializers.push(function (instance) {
	                onInitialize(instance, key, (initializer_1 ? initializer_1.call(instance) : value_1), customArgs, descriptor);
	            });
	            return {
	                enumerable: enumerable, configurable: true,
	                get: function () {
	                    if (this.__mobxDidRunLazyInitializers !== true)
	                        runLazyInitializers(this);
	                    return get.call(this, key);
	                },
	                set: function (v) {
	                    if (this.__mobxDidRunLazyInitializers !== true)
	                        runLazyInitializers(this);
	                    set.call(this, key, v);
	                }
	            };
	        }
	    }
	    if (allowCustomArguments) {
	        return function () {
	            if (quacksLikeADecorator(arguments))
	                return classPropertyDecorator.apply(null, arguments);
	            var outerArgs = arguments;
	            var argLen = arguments.length;
	            return function (target, key, descriptor) { return classPropertyDecorator(target, key, descriptor, outerArgs, argLen); };
	        };
	    }
	    return classPropertyDecorator;
	}
	function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
	    if (!hasOwnProperty(instance, "__mobxInitializedProps"))
	        addHiddenProp(instance, "__mobxInitializedProps", {});
	    instance.__mobxInitializedProps[key] = true;
	    onInitialize(instance, key, v, customArgs, baseDescriptor);
	}
	function runLazyInitializers(instance) {
	    if (instance.__mobxDidRunLazyInitializers === true)
	        return;
	    if (instance.__mobxLazyInitializers) {
	        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
	        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) { return initializer(instance); });
	    }
	}
	function quacksLikeADecorator(args) {
	    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
	}
	function iteratorSymbol() {
	    return (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
	}
	var IS_ITERATING_MARKER = "__$$iterating";
	function arrayAsIterator(array) {
	    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
	    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
	    var idx = -1;
	    addHiddenFinalProp(array, "next", function next() {
	        idx++;
	        return {
	            done: idx >= this.length,
	            value: idx < this.length ? this[idx] : undefined
	        };
	    });
	    return array;
	}
	function declareIterator(prototType, iteratorFactory) {
	    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
	}
	var SimpleEventEmitter = (function () {
	    function SimpleEventEmitter() {
	        this.listeners = [];
	        deprecated("extras.SimpleEventEmitter is deprecated and will be removed in the next major release");
	    }
	    SimpleEventEmitter.prototype.emit = function () {
	        var listeners = this.listeners.slice();
	        for (var i = 0, l = listeners.length; i < l; i++)
	            listeners[i].apply(null, arguments);
	    };
	    SimpleEventEmitter.prototype.on = function (listener) {
	        var _this = this;
	        this.listeners.push(listener);
	        return once(function () {
	            var idx = _this.listeners.indexOf(listener);
	            if (idx !== -1)
	                _this.listeners.splice(idx, 1);
	        });
	    };
	    SimpleEventEmitter.prototype.once = function (listener) {
	        var subscription = this.on(function () {
	            subscription();
	            listener.apply(this, arguments);
	        });
	        return subscription;
	    };
	    return SimpleEventEmitter;
	}());
	exports.SimpleEventEmitter = SimpleEventEmitter;
	var EMPTY_ARRAY = [];
	Object.freeze(EMPTY_ARRAY);
	function getNextId() {
	    return ++globalState.mobxGuid;
	}
	function invariant(check, message, thing) {
	    if (!check)
	        throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
	}
	var deprecatedMessages = [];
	function deprecated(msg) {
	    if (deprecatedMessages.indexOf(msg) !== -1)
	        return;
	    deprecatedMessages.push(msg);
	    console.error("[mobx] Deprecated: " + msg);
	}
	function once(func) {
	    var invoked = false;
	    return function () {
	        if (invoked)
	            return;
	        invoked = true;
	        return func.apply(this, arguments);
	    };
	}
	var noop = function () { };
	function unique(list) {
	    var res = [];
	    list.forEach(function (item) {
	        if (res.indexOf(item) === -1)
	            res.push(item);
	    });
	    return res;
	}
	function joinStrings(things, limit, separator) {
	    if (limit === void 0) { limit = 100; }
	    if (separator === void 0) { separator = " - "; }
	    if (!things)
	        return "";
	    var sliced = things.slice(0, limit);
	    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
	}
	function isObject(value) {
	    return value !== null && typeof value === "object";
	}
	function isPlainObject(value) {
	    if (value === null || typeof value !== "object")
	        return false;
	    var proto = Object.getPrototypeOf(value);
	    return proto === Object.prototype || proto === null;
	}
	function objectAssign() {
	    var res = arguments[0];
	    for (var i = 1, l = arguments.length; i < l; i++) {
	        var source = arguments[i];
	        for (var key in source)
	            if (hasOwnProperty(source, key)) {
	                res[key] = source[key];
	            }
	    }
	    return res;
	}
	function valueDidChange(compareStructural, oldValue, newValue) {
	    return compareStructural
	        ? !deepEquals(oldValue, newValue)
	        : oldValue !== newValue;
	}
	var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwnProperty(object, propName) {
	    return prototypeHasOwnProperty.call(object, propName);
	}
	function makeNonEnumerable(object, propNames) {
	    for (var i = 0; i < propNames.length; i++) {
	        addHiddenProp(object, propNames[i], object[propNames[i]]);
	    }
	}
	function addHiddenProp(object, propName, value) {
	    Object.defineProperty(object, propName, {
	        enumerable: false,
	        writable: true,
	        configurable: true,
	        value: value
	    });
	}
	function addHiddenFinalProp(object, propName, value) {
	    Object.defineProperty(object, propName, {
	        enumerable: false,
	        writable: false,
	        configurable: true,
	        value: value
	    });
	}
	function isPropertyConfigurable(object, prop) {
	    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
	    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
	}
	function assertPropertyConfigurable(object, prop) {
	    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
	}
	function getEnumerableKeys(obj) {
	    var res = [];
	    for (var key in obj)
	        res.push(key);
	    return res;
	}
	function deepEquals(a, b) {
	    if (a === null && b === null)
	        return true;
	    if (a === undefined && b === undefined)
	        return true;
	    var aIsArray = isArrayLike(a);
	    if (aIsArray !== isArrayLike(b)) {
	        return false;
	    }
	    else if (aIsArray) {
	        if (a.length !== b.length)
	            return false;
	        for (var i = a.length - 1; i >= 0; i--)
	            if (!deepEquals(a[i], b[i]))
	                return false;
	        return true;
	    }
	    else if (typeof a === "object" && typeof b === "object") {
	        if (a === null || b === null)
	            return false;
	        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length)
	            return false;
	        for (var prop in a) {
	            if (!(prop in b))
	                return false;
	            if (!deepEquals(a[prop], b[prop]))
	                return false;
	        }
	        return true;
	    }
	    return a === b;
	}
	function createInstanceofPredicate(name, clazz) {
	    var propName = "isMobX" + name;
	    clazz.prototype[propName] = true;
	    return function (x) {
	        return isObject(x) && x[propName] === true;
	    };
	}
	function isArrayLike(x) {
	    return Array.isArray(x) || isObservableArray(x);
	}
	exports.isArrayLike = isArrayLike;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function webpackUniversalModuleDefinition(root, factory) {
		if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(5), __webpack_require__(15));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), __webpack_require__(5), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["fauxfluxReact"] = factory(require("react"), require("prop-types"), require("mobx-react"));else root["fauxfluxReact"] = factory(root["React"], root["PropTypes"], root["mobxReact"]);
	})(undefined, function (__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_6__) {
		return (/******/function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};

				/******/ // The require function
				/******/function __webpack_require__(moduleId) {

					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;

					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };

					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

					/******/ // Flag the module as loaded
					/******/module.loaded = true;

					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}

				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;

				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;

				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";

				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			}(
			/************************************************************************/
			/******/[
			/* 0 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				Object.defineProperty(exports, "__esModule", {
					value: true
				});
				exports.connect = exports.FauxFluxProvider = undefined;

				var _FauxFluxProvider = __webpack_require__(1);

				var _FauxFluxProvider2 = _interopRequireDefault(_FauxFluxProvider);

				var _connect = __webpack_require__(5);

				var _connect2 = _interopRequireDefault(_connect);

				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { default: obj };
				}

				exports.FauxFluxProvider = _FauxFluxProvider2.default;
				exports.connect = _connect2.default;

				/***/
			},
			/* 1 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				Object.defineProperty(exports, "__esModule", {
					value: true
				});
				exports.default = undefined;

				var _createClass = function () {
					function defineProperties(target, props) {
						for (var i = 0; i < props.length; i++) {
							var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
						}
					}return function (Constructor, protoProps, staticProps) {
						if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
					};
				}();

				var _react = __webpack_require__(2);

				var _react2 = _interopRequireDefault(_react);

				var _propTypes = __webpack_require__(3);

				var _propTypes2 = _interopRequireDefault(_propTypes);

				var _defaultContextTypes = __webpack_require__(4);

				var _defaultContextTypes2 = _interopRequireDefault(_defaultContextTypes);

				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { default: obj };
				}

				function _classCallCheck(instance, Constructor) {
					if (!(instance instanceof Constructor)) {
						throw new TypeError("Cannot call a class as a function");
					}
				}

				function _possibleConstructorReturn(self, call) {
					if (!self) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
				}

				function _inherits(subClass, superClass) {
					if (typeof superClass !== "function" && superClass !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
					}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
				}

				var FauxFluxProvider = function (_React$Component) {
					_inherits(FauxFluxProvider, _React$Component);

					function FauxFluxProvider(props) {
						_classCallCheck(this, FauxFluxProvider);

						return _possibleConstructorReturn(this, (FauxFluxProvider.__proto__ || Object.getPrototypeOf(FauxFluxProvider)).call(this, props));
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
					children: _propTypes2.default.element.isRequired,
					FF: _propTypes2.default.object.isRequired // The FauxFlux singleton.
				};

				exports.default = FauxFluxProvider;

				/***/
			},
			/* 2 */
			/***/function (module, exports) {

				module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

				/***/
			},
			/* 3 */
			/***/function (module, exports) {

				module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

				/***/
			},
			/* 4 */
			/***/function (module, exports) {

				"use strict";

				Object.defineProperty(exports, "__esModule", {
					value: true
				});
				exports.default = {
					ff: function ff() {}
				};

				/***/
			},
			/* 5 */
			/***/function (module, exports, __webpack_require__) {

				'use strict';

				Object.defineProperty(exports, "__esModule", {
					value: true
				});
				exports.default = undefined;

				var _mobxReact = __webpack_require__(6);

				var _defaultContextTypes = __webpack_require__(4);

				var _defaultContextTypes2 = _interopRequireDefault(_defaultContextTypes);

				function _interopRequireDefault(obj) {
					return obj && obj.__esModule ? obj : { default: obj };
				}

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
					originalContextTypes.ff = _defaultContextTypes2.default.ff;
					NewObservedComponent.contextTypes = originalContextTypes;
					// Return the niffty new component.
					return NewObservedComponent;
				};

				exports.default = connect;

				/***/
			},
			/* 6 */
			/***/function (module, exports) {

				module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

				/***/
			}]
			/******/)
		);
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(7)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(14)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(8);
	var invariant = __webpack_require__(9);
	var warning = __webpack_require__(10);
	var assign = __webpack_require__(11);

	var ReactPropTypesSecret = __webpack_require__(12);
	var checkPropTypes = __webpack_require__(13);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(8);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(9);
	  var warning = __webpack_require__(10);
	  var ReactPropTypesSecret = __webpack_require__(12);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(8);
	var invariant = __webpack_require__(9);
	var ReactPropTypesSecret = __webpack_require__(12);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2), __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())), __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
		else if(typeof define === 'function' && define.amd)
			define(["mobx", "react", "react-dom"], factory);
		else if(typeof exports === 'object')
			exports["mobxReact"] = factory(require("mobx"), require("react"), require("react-dom"));
		else
			root["mobxReact"] = factory(root["mobx"], root["React"], root["ReactDOM"]);
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
		exports.reactiveComponent = exports.PropTypes = exports.propTypes = exports.inject = exports.Provider = exports.useStaticRendering = exports.trackComponents = exports.componentByNodeRegistery = exports.renderReporter = exports.observer = undefined;

		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

		var _arguments = arguments;

		var _observer = __webpack_require__(1);

		Object.defineProperty(exports, 'observer', {
		  enumerable: true,
		  get: function get() {
		    return _observer.observer;
		  }
		});
		Object.defineProperty(exports, 'renderReporter', {
		  enumerable: true,
		  get: function get() {
		    return _observer.renderReporter;
		  }
		});
		Object.defineProperty(exports, 'componentByNodeRegistery', {
		  enumerable: true,
		  get: function get() {
		    return _observer.componentByNodeRegistery;
		  }
		});
		Object.defineProperty(exports, 'trackComponents', {
		  enumerable: true,
		  get: function get() {
		    return _observer.trackComponents;
		  }
		});
		Object.defineProperty(exports, 'useStaticRendering', {
		  enumerable: true,
		  get: function get() {
		    return _observer.useStaticRendering;
		  }
		});

		var _Provider = __webpack_require__(9);

		Object.defineProperty(exports, 'Provider', {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_Provider).default;
		  }
		});

		var _inject = __webpack_require__(6);

		Object.defineProperty(exports, 'inject', {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_inject).default;
		  }
		});

		var _mobx = __webpack_require__(2);

		var _mobx2 = _interopRequireDefault(_mobx);

		var _react = __webpack_require__(3);

		var _react2 = _interopRequireDefault(_react);

		var _propTypes = __webpack_require__(10);

		var propTypes = _interopRequireWildcard(_propTypes);

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var TARGET_LIB_NAME = void 0;
		if (true) TARGET_LIB_NAME = 'mobx-react';
		if (false) TARGET_LIB_NAME = 'mobx-react/native';
		if (false) TARGET_LIB_NAME = 'mobx-react/custom';

		if (!_mobx2.default) throw new Error(TARGET_LIB_NAME + ' requires the MobX package');
		if (!_react2.default) throw new Error(TARGET_LIB_NAME + ' requires React to be available');

		exports.propTypes = propTypes;
		exports.PropTypes = propTypes;
		exports.default = module.exports;

		/* Deprecated */

		var reactiveComponent = exports.reactiveComponent = function reactiveComponent() {
		  console.warn('[mobx-react] `reactiveComponent` has been renamed to `observer` ' + 'and will be removed in 1.1.');
		  return observer.apply(null, _arguments);
		};

		/* DevTool support */
		if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ? 'undefined' : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === 'object') {
		  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(module.exports, _mobx2.default);
		}

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.renderReporter = exports.componentByNodeRegistery = undefined;

		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

		exports.trackComponents = trackComponents;
		exports.useStaticRendering = useStaticRendering;
		exports.observer = observer;

		var _mobx = __webpack_require__(2);

		var _mobx2 = _interopRequireDefault(_mobx);

		var _react = __webpack_require__(3);

		var _react2 = _interopRequireDefault(_react);

		var _reactDom = __webpack_require__(4);

		var _reactDom2 = _interopRequireDefault(_reactDom);

		var _EventEmitter = __webpack_require__(5);

		var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

		var _inject = __webpack_require__(6);

		var _inject2 = _interopRequireDefault(_inject);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/**
		 * dev tool support
		 */
		var isDevtoolsEnabled = false;

		var isUsingStaticRendering = false;

		// WeakMap<Node, Object>;
		var componentByNodeRegistery = exports.componentByNodeRegistery = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
		var renderReporter = exports.renderReporter = new _EventEmitter2.default();

		function findDOMNode(component) {
		  if (_reactDom2.default) return _reactDom2.default.findDOMNode(component);
		  return null;
		}

		function reportRendering(component) {
		  var node = findDOMNode(component);
		  if (node && componentByNodeRegistery) componentByNodeRegistery.set(node, component);

		  renderReporter.emit({
		    event: 'render',
		    renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
		    totalTime: Date.now() - component.__$mobRenderStart,
		    component: component,
		    node: node
		  });
		}

		function trackComponents() {
		  if (typeof WeakMap === "undefined") throw new Error("[mobx-react] tracking components is not supported in this browser.");
		  if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
		}

		function useStaticRendering(useStaticRendering) {
		  isUsingStaticRendering = useStaticRendering;
		}

		/**
		 * Utilities
		 */

		function patch(target, funcName) {
		  var base = target[funcName];
		  var mixinFunc = reactiveMixin[funcName];
		  if (!base) {
		    target[funcName] = mixinFunc;
		  } else {
		    target[funcName] = function () {
		      base.apply(this, arguments);
		      mixinFunc.apply(this, arguments);
		    };
		  }
		}

		/**
		 * ReactiveMixin
		 */
		var reactiveMixin = {
		  componentWillMount: function componentWillMount() {
		    var _this = this;

		    if (isUsingStaticRendering === true) return;
		    // Generate friendly name for debugging
		    var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || "<component>";
		    var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID;
		    var baseRender = this.render.bind(this);
		    var reaction = null;
		    var isRenderingPending = false;

		    var initialRender = function initialRender() {
		      reaction = new _mobx2.default.Reaction(initialName + '#' + rootNodeID + '.render()', function () {
		        if (!isRenderingPending) {
		          // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
		          // This unidiomatic React usage but React will correctly warn about this so we continue as usual
		          // See #85 / Pull #44
		          isRenderingPending = true;
		          if (typeof _this.componentWillReact === "function") _this.componentWillReact(); // TODO: wrap in action?
		          if (_this.__$mobxIsUnmounted !== true) {
		            // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
		            // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
		            // However, people also claim this migth happen during unit tests..
		            var hasError = true;
		            try {
		              _react2.default.Component.prototype.forceUpdate.call(_this);
		              hasError = false;
		            } finally {
		              if (hasError) reaction.dispose();
		            }
		          }
		        }
		      });
		      reactiveRender.$mobx = reaction;
		      _this.render = reactiveRender;
		      return reactiveRender();
		    };

		    var reactiveRender = function reactiveRender() {
		      isRenderingPending = false;
		      var rendering = undefined;
		      reaction.track(function () {
		        if (isDevtoolsEnabled) {
		          _this.__$mobRenderStart = Date.now();
		        }
		        rendering = _mobx2.default.extras.allowStateChanges(false, baseRender);
		        if (isDevtoolsEnabled) {
		          _this.__$mobRenderEnd = Date.now();
		        }
		      });
		      return rendering;
		    };

		    this.render = initialRender;
		  },

		  componentWillUnmount: function componentWillUnmount() {
		    if (isUsingStaticRendering === true) return;
		    this.render.$mobx && this.render.$mobx.dispose();
		    this.__$mobxIsUnmounted = true;
		    if (isDevtoolsEnabled) {
		      var node = findDOMNode(this);
		      if (node && componentByNodeRegistery) {
		        componentByNodeRegistery.delete(node);
		      }
		      renderReporter.emit({
		        event: 'destroy',
		        component: this,
		        node: node
		      });
		    }
		  },

		  componentDidMount: function componentDidMount() {
		    if (isDevtoolsEnabled) {
		      reportRendering(this);
		    }
		  },

		  componentDidUpdate: function componentDidUpdate() {
		    if (isDevtoolsEnabled) {
		      reportRendering(this);
		    }
		  },

		  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		    if (isUsingStaticRendering) {
		      console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
		    }
		    // update on any state changes (as is the default)
		    if (this.state !== nextState) {
		      return true;
		    }
		    // update if props are shallowly not equal, inspired by PureRenderMixin
		    var keys = Object.keys(this.props);
		    if (keys.length !== Object.keys(nextProps).length) {
		      return true;
		    }
		    var key = void 0;
		    for (var i = keys.length - 1; i >= 0, key = keys[i]; i--) {
		      var newValue = nextProps[key];
		      if (newValue !== this.props[key]) {
		        return true;
		      } else if (newValue && (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === "object" && !_mobx2.default.isObservable(newValue)) {
		        /**
		         * If the newValue is still the same object, but that object is not observable,
		         * fallback to the default React behavior: update, because the object *might* have changed.
		         * If you need the non default behavior, just use the React pure render mixin, as that one
		         * will work fine with mobx as well, instead of the default implementation of
		         * observer.
		         */
		        return true;
		      }
		    }
		    return false;
		  }
		};

		/**
		 * Observer function / decorator
		 */
		function observer(arg1, arg2) {
		  if (typeof arg1 === "string") {
		    throw new Error("Store names should be provided as array");
		  }
		  if (Array.isArray(arg1)) {
		    // component needs stores
		    if (!arg2) {
		      // invoked as decorator
		      return function (componentClass) {
		        return observer(arg1, componentClass);
		      };
		    } else {
		      // TODO: deprecate this invocation style
		      return _inject2.default.apply(null, arg1)(observer(arg2));
		    }
		  }
		  var componentClass = arg1;

		  if (componentClass.isInjector !== undefined && componentClass.isInjector) {
		    console.warn('Mobx Observer: You are trying to use \'observer\' on a component that already has \'inject\'. Please apply \'observer\' before applying \'inject\'');
		  }

		  // Stateless function component:
		  // If it is function but doesn't seem to be a react class constructor,
		  // wrap it to a react class automatically
		  if (typeof componentClass === "function" && (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !_react2.default.Component.isPrototypeOf(componentClass)) {

		    return observer(_react2.default.createClass({
		      displayName: componentClass.displayName || componentClass.name,
		      propTypes: componentClass.propTypes,
		      contextTypes: componentClass.contextTypes,
		      getDefaultProps: function getDefaultProps() {
		        return componentClass.defaultProps;
		      },
		      render: function render() {
		        return componentClass.call(this, this.props, this.context);
		      }
		    }));
		  }

		  if (!componentClass) {
		    throw new Error("Please pass a valid component to 'observer'");
		  }

		  var target = componentClass.prototype || componentClass;
		  ["componentWillMount", "componentWillUnmount", "componentDidMount", "componentDidUpdate"].forEach(function (funcName) {
		    patch(target, funcName);
		  });
		  if (!target.shouldComponentUpdate) {
		    target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
		  }
		  componentClass.isMobXReactObserver = true;
		  return componentClass;
		}

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

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var EventEmitter = function () {
		  function EventEmitter() {
		    _classCallCheck(this, EventEmitter);

		    this.listeners = [];
		  }

		  _createClass(EventEmitter, [{
		    key: "on",
		    value: function on(cb) {
		      var _this = this;

		      this.listeners.push(cb);
		      return function () {
		        var index = _this.listeners.indexOf(cb);
		        if (index !== -1) _this.listeners.splice(index, 1);
		      };
		    }
		  }, {
		    key: "emit",
		    value: function emit(data) {
		      this.listeners.forEach(function (fn) {
		        return fn(data);
		      });
		    }
		  }]);

		  return EventEmitter;
		}();

		exports.default = EventEmitter;

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = inject;

		var _react = __webpack_require__(3);

		var _react2 = _interopRequireDefault(_react);

		var _hoistNonReactStatics = __webpack_require__(8);

		var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/**
		 * Store Injection
		 */
		function createStoreInjector(grabStoresFn, component) {
		  var Injector = _react2.default.createClass({
		    displayName: "MobXStoreInjector",
		    render: function render() {
		      var _this = this;

		      var newProps = {};
		      for (var key in this.props) {
		        if (this.props.hasOwnProperty(key)) {
		          newProps[key] = this.props[key];
		        }
		      }var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {};
		      for (var _key in additionalProps) {
		        newProps[_key] = additionalProps[_key];
		      }
		      newProps.ref = function (instance) {
		        _this.wrappedInstance = instance;
		      };

		      return _react2.default.createElement(component, newProps);
		    }
		    // TODO: should have shouldComponentUpdate?
		  });

		  Injector.isInjector = true;
		  Injector.contextTypes = { mobxStores: _react.PropTypes.object };
		  Injector.wrappedComponent = component;
		  injectStaticWarnings(Injector, component);
		  (0, _hoistNonReactStatics2.default)(Injector, component);
		  return Injector;
		}

		function injectStaticWarnings(hoc, component) {
		  if (typeof process === "undefined" || !process.env || process.env.NODE_ENV === "production") return;

		  ['propTypes', 'defaultProps', 'contextTypes'].forEach(function (prop) {
		    var propValue = hoc[prop];
		    Object.defineProperty(hoc, prop, {
		      set: function set(_) {
		        // enable for testing:
		        var name = component.displayName || component.name;
		        console.warn('Mobx Injector: you are trying to attach ' + prop + ' to HOC instead of ' + name + '. Use `wrappedComponent` property.');
		      },
		      get: function get() {
		        return propValue;
		      },
		      configurable: true
		    });
		  });
		}

		function grabStoresByName(storeNames) {
		  return function (baseStores, nextProps) {
		    storeNames.forEach(function (storeName) {
		      if (storeName in nextProps) // prefer props over stores
		        return;
		      if (!(storeName in baseStores)) throw new Error("MobX observer: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
		      nextProps[storeName] = baseStores[storeName];
		    });
		    return nextProps;
		  };
		}

		/**
		 * higher order component that injects stores to a child.
		 * takes either a varargs list of strings, which are stores read from the context,
		 * or a function that manually maps the available stores from the context to props:
		 * storesToProps(mobxStores, props, context) => newProps
		 */
		function inject() /* fn(stores, nextProps) or ...storeNames */{
		  var grabStoresFn = void 0;
		  if (typeof arguments[0] === "function") {
		    grabStoresFn = arguments[0];
		  } else {
		    var storesNames = [];
		    for (var i = 0; i < arguments.length; i++) {
		      storesNames[i] = arguments[i];
		    }grabStoresFn = grabStoresByName(storesNames);
		  }
		  return function (componentClass) {
		    return createStoreInjector(grabStoresFn, componentClass);
		  };
		}
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		// shim for using process in browser
		var process = module.exports = {};

		// cached from whatever global is present so that test runners that stub it
		// don't break things.  But we need to wrap it in a try catch in case it is
		// wrapped in strict mode code which doesn't define any globals.  It's inside a
		// function because try/catches deoptimize in certain engines.

		var cachedSetTimeout;
		var cachedClearTimeout;

		(function () {
		    try {
		        cachedSetTimeout = setTimeout;
		    } catch (e) {
		        cachedSetTimeout = function () {
		            throw new Error('setTimeout is not defined');
		        }
		    }
		    try {
		        cachedClearTimeout = clearTimeout;
		    } catch (e) {
		        cachedClearTimeout = function () {
		            throw new Error('clearTimeout is not defined');
		        }
		    }
		} ())
		function runTimeout(fun) {
		    if (cachedSetTimeout === setTimeout) {
		        return setTimeout(fun, 0);
		    } else {
		        return cachedSetTimeout.call(null, fun, 0);
		    }
		}
		function runClearTimeout(marker) {
		    if (cachedClearTimeout === clearTimeout) {
		        clearTimeout(marker);
		    } else {
		        cachedClearTimeout.call(null, marker);
		    }
		}
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;

		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}

		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = runTimeout(cleanUpNextTick);
		    draining = true;

		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    runClearTimeout(timeout);
		}

		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        runTimeout(drainQueue);
		    }
		};

		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};

		function noop() {}

		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;

		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};

		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };


	/***/ },
	/* 8 */
	/***/ function(module, exports) {

		/**
		 * Copyright 2015, Yahoo! Inc.
		 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
		 */
		'use strict';

		var REACT_STATICS = {
		    childContextTypes: true,
		    contextTypes: true,
		    defaultProps: true,
		    displayName: true,
		    getDefaultProps: true,
		    mixins: true,
		    propTypes: true,
		    type: true
		};

		var KNOWN_STATICS = {
		    name: true,
		    length: true,
		    prototype: true,
		    caller: true,
		    arguments: true,
		    arity: true
		};

		var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

		module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
		    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
		        var keys = Object.getOwnPropertyNames(sourceComponent);

		        /* istanbul ignore else */
		        if (isGetOwnPropertySymbolsAvailable) {
		            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
		        }

		        for (var i = 0; i < keys.length; ++i) {
		            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
		                try {
		                    targetComponent[keys[i]] = sourceComponent[keys[i]];
		                } catch (error) {

		                }
		            }
		        }
		    }

		    return targetComponent;
		};


	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _react = __webpack_require__(3);

		var _react2 = _interopRequireDefault(_react);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

		var specialReactKeys = { children: true, key: true, ref: true };

		var Provider = function (_Component) {
		  _inherits(Provider, _Component);

		  function Provider() {
		    _classCallCheck(this, Provider);

		    return _possibleConstructorReturn(this, Object.getPrototypeOf(Provider).apply(this, arguments));
		  }

		  _createClass(Provider, [{
		    key: "render",
		    value: function render() {
		      return _react2.default.Children.only(this.props.children);
		    }
		  }, {
		    key: "getChildContext",
		    value: function getChildContext() {
		      var stores = {};
		      // inherit stores
		      var baseStores = this.context.mobxStores;
		      if (baseStores) for (var key in baseStores) {
		        stores[key] = baseStores[key];
		      }
		      // add own stores
		      for (var _key in this.props) {
		        if (!specialReactKeys[_key]) stores[_key] = this.props[_key];
		      }return {
		        mobxStores: stores
		      };
		    }
		  }, {
		    key: "componentWillReceiveProps",
		    value: function componentWillReceiveProps(nextProps) {
		      // Maybe this warning is to aggressive?
		      if (Object.keys(nextProps).length !== Object.keys(this.props).length) console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");
		      for (var key in nextProps) {
		        if (!specialReactKeys[key] && this.props[key] !== nextProps[key]) console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
		      }
		    }
		  }]);

		  return Provider;
		}(_react.Component);

		Provider.contextTypes = {
		  mobxStores: _react.PropTypes.object
		};
		Provider.childContextTypes = {
		  mobxStores: _react.PropTypes.object.isRequired
		};
		exports.default = Provider;

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.objectOrObservableObject = exports.arrayOrObservableArrayOf = exports.arrayOrObservableArray = exports.observableObject = exports.observableMap = exports.observableArrayOf = exports.observableArray = undefined;

		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

		var _mobx = __webpack_require__(2);

		// Copied from React.PropTypes
		function createChainableTypeChecker(validate) {
		  function checkType(isRequired, props, propName, componentName, location, propFullName) {
		    for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
		      rest[_key - 6] = arguments[_key];
		    }

		    return (0, _mobx.untracked)(function () {
		      componentName = componentName || '<<anonymous>>';
		      propFullName = propFullName || propName;
		      if (props[propName] == null) {
		        if (isRequired) {
		          var actual = props[propName] === null ? 'null' : 'undefined';
		          return new Error('The ' + location + ' `' + propFullName + '` is marked as required ' + 'in `' + componentName + '`, but its value is `' + actual + '`.');
		        }
		        return null;
		      } else {
		        return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
		      }
		    });
		  }

		  var chainedCheckType = checkType.bind(null, false);
		  chainedCheckType.isRequired = checkType.bind(null, true);
		  return chainedCheckType;
		}

		// Copied from React.PropTypes
		function isSymbol(propType, propValue) {
		  // Native Symbol.
		  if (propType === 'symbol') {
		    return true;
		  }

		  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
		  if (propValue['@@toStringTag'] === 'Symbol') {
		    return true;
		  }

		  // Fallback for non-spec compliant Symbols which are polyfilled.
		  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
		    return true;
		  }

		  return false;
		}

		// Copied from React.PropTypes
		function getPropType(propValue) {
		  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
		  if (Array.isArray(propValue)) {
		    return 'array';
		  }
		  if (propValue instanceof RegExp) {
		    // Old webkits (at least until Android 4.0) return 'function' rather than
		    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
		    // passes PropTypes.object.
		    return 'object';
		  }
		  if (isSymbol(propType, propValue)) {
		    return 'symbol';
		  }
		  return propType;
		}

		// This handles more types than `getPropType`. Only used for error messages.
		// Copied from React.PropTypes
		function getPreciseType(propValue) {
		  var propType = getPropType(propValue);
		  if (propType === 'object') {
		    if (propValue instanceof Date) {
		      return 'date';
		    } else if (propValue instanceof RegExp) {
		      return 'regexp';
		    }
		  }
		  return propType;
		}

		function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
		  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
		    return (0, _mobx.untracked)(function () {
		      if (allowNativeType) {
		        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
		      }
		      var mobxChecker = void 0;
		      switch (mobxType) {
		        case 'Array':
		          mobxChecker = _mobx.isObservableArray;break;
		        case 'Object':
		          mobxChecker = _mobx.isObservableObject;break;
		        case 'Map':
		          mobxChecker = _mobx.isObservableMap;break;
		        default:
		          throw new Error('Unexpected mobxType: ' + mobxType);
		      }
		      var propValue = props[propName];
		      if (!mobxChecker(propValue)) {
		        var preciseType = getPreciseType(propValue);
		        var nativeTypeExpectationMessage = allowNativeType ? ' or javascript `' + mobxType.toLowerCase() + '`' : '';
		        return new Error('Invalid prop `' + propFullName + '` of type `' + preciseType + '` supplied to' + ' `' + componentName + '`, expected `mobx.Observable' + mobxType + '`' + nativeTypeExpectationMessage + '.');
		      }
		      return null;
		    });
		  });
		}

		function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
		  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
		    for (var _len2 = arguments.length, rest = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
		      rest[_key2 - 5] = arguments[_key2];
		    }

		    return (0, _mobx.untracked)(function () {
		      if (typeof typeChecker !== 'function') {
		        return new Error('Property `' + propFullName + '` of component `' + componentName + '` has ' + 'invalid PropType notation.');
		      }
		      var error = createObservableTypeCheckerCreator(allowNativeType, 'Array')(props, propName, componentName);
		      if (error instanceof Error) return error;
		      var propValue = props[propName];
		      for (var i = 0; i < propValue.length; i++) {
		        error = typeChecker.apply(undefined, [propValue, i, componentName, location, propFullName + '[' + i + ']'].concat(rest));
		        if (error instanceof Error) return error;
		      }
		      return null;
		    });
		  });
		}

		var observableArray = exports.observableArray = createObservableTypeCheckerCreator(false, 'Array');
		var observableArrayOf = exports.observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
		var observableMap = exports.observableMap = createObservableTypeCheckerCreator(false, 'Map');
		var observableObject = exports.observableObject = createObservableTypeCheckerCreator(false, 'Object');
		var arrayOrObservableArray = exports.arrayOrObservableArray = createObservableTypeCheckerCreator(true, 'Array');
		var arrayOrObservableArrayOf = exports.arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
		var objectOrObservableObject = exports.objectOrObservableObject = createObservableTypeCheckerCreator(true, 'Object');

	/***/ }
	/******/ ])
	});
	;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),__webpack_require__(2),__webpack_require__(15)):"function"==typeof define&&define.amd?define(["react","mobx","mobx-react"],t):"object"==typeof exports?exports.mobxDevtools=t(require("react"),require("mobx"),require("mobx-react")):e.mobxDevtools=t(e.React,e.mobx,e.mobxReact)}(this,function(e,t,n){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogEnabled=t.setGraphEnabled=t.setUpdatesEnabled=t.configureDevtool=t.UpdatesControl=t.LogControl=t.GraphControl=t.default=void 0;var o=n(1);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r(o).default}});var i=n(19);Object.defineProperty(t,"GraphControl",{enumerable:!0,get:function(){return r(i).default}});var a=n(20);Object.defineProperty(t,"LogControl",{enumerable:!0,get:function(){return r(a).default}});var u=n(21);Object.defineProperty(t,"UpdatesControl",{enumerable:!0,get:function(){return r(u).default}});var l=n(37),s=r(l),c=n(12);s.default.polyfill();var f=t.configureDevtool=function(e){var t=e.logEnabled,n=e.updatesEnabled,r=e.graphEnabled,o=e.logFilter,i={};void 0!==t&&(i.logEnabled=Boolean(t)),void 0!==n&&(i.updatesEnabled=Boolean(n)),void 0!==r&&(i.graphEnabled=Boolean(r)),"function"==typeof o&&(i.logFilter=o),(0,c.setGlobalState)(i)};t.setUpdatesEnabled=function(e){return f({updatesEnabled:e})},t.setGraphEnabled=function(e){return f({graphEnabled:e})},t.setLogEnabled=function(e){return f({logEnabled:e})}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(2),s=r(l),c=n(3),f=r(c),d=n(12),p=n(18),h=r(p),g=n(31),y=r(g),b=n(33),v=r(b),m=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.handleUpdate=function(){return r.setState((0,d.getGlobalState)())},r.handleToggleGraph=function(){r.setState({hoverBoxes:[],graphEnabled:!r.state.graphEnabled})},a=n,i(r,a)}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.setState((0,d.getGlobalState)())}},{key:"componentDidMount",value:function(){d.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){d.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=this.props,t=e.noPanel,n=e.highlightTimeout,r=this.state,o=r.renderingBoxes,i=r.hoverBoxes;return s.default.createElement("div",null,t!==!0&&s.default.createElement(h.default,{position:this.props.position,highlightTimeout:n}),s.default.createElement(y.default,{boxes:o.concat(i)}),s.default.createElement(v.default,null))}}]),t}(l.Component);m.propTypes={highlightTimeout:f.default.number,position:f.default.object,noPanel:f.default.bool},m.defaultProps={noPanel:!1},t.default=m},function(t,n){t.exports=e},function(e,t,n){(function(t){if("production"!==t.env.NODE_ENV){var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,o=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r},i=!0;e.exports=n(5)(o,i)}else e.exports=n(11)()}).call(t,n(4))},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(c===setTimeout)return setTimeout(e,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(e,0);try{return c(e,0)}catch(t){try{return c.call(null,e,0)}catch(t){return c.call(this,e,0)}}}function i(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function a(){g&&p&&(g=!1,p.length?h=p.concat(h):y=-1,h.length&&u())}function u(){if(!g){var e=o(a);g=!0;for(var t=h.length;t;){for(p=h,h=[];++y<t;)p&&p[y].run();y=-1,t=h.length}p=null,g=!1,i(e)}}function l(e,t){this.fun=e,this.array=t}function s(){}var c,f,d=e.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(e){c=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var p,h=[],g=!1,y=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new l(e,t)),1!==h.length||g||o(u)},l.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=s,d.addListener=s,d.once=s,d.off=s,d.removeListener=s,d.removeAllListeners=s,d.emit=s,d.prependListener=s,d.prependOnceListener=s,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,n){(function(t){"use strict";var r=n(6),o=n(7),i=n(8),a=n(9),u=n(10);e.exports=function(e,n){function l(e){var t=e&&(P&&e[P]||e[T]);if("function"==typeof t)return t}function s(e,t){return e===t?0!==e||1/e===1/t:e!==e&&t!==t}function c(e){this.message=e,this.stack=""}function f(e){function r(r,s,f,d,p,h,g){if(d=d||A,h=h||f,g!==a)if(n)o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==t.env.NODE_ENV&&"undefined"!=typeof console){var y=d+":"+f;!u[y]&&l<3&&(i(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",h,d),u[y]=!0,l++)}return null==s[f]?r?new c(null===s[f]?"The "+p+" `"+h+"` is marked as required "+("in `"+d+"`, but its value is `null`."):"The "+p+" `"+h+"` is marked as required in "+("`"+d+"`, but its value is `undefined`.")):null:e(s,f,d,p,h)}if("production"!==t.env.NODE_ENV)var u={},l=0;var s=r.bind(null,!1);return s.isRequired=r.bind(null,!0),s}function d(e){function t(t,n,r,o,i,a){var u=t[n],l=E(u);if(l!==e){var s=j(u);return new c("Invalid "+o+" `"+i+"` of type "+("`"+s+"` supplied to `"+r+"`, expected ")+("`"+e+"`."))}return null}return f(t)}function p(){return f(r.thatReturnsNull)}function h(e){function t(t,n,r,o,i){if("function"!=typeof e)return new c("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=t[n];if(!Array.isArray(u)){var l=E(u);return new c("Invalid "+o+" `"+i+"` of type "+("`"+l+"` supplied to `"+r+"`, expected an array."))}for(var s=0;s<u.length;s++){var f=e(u,s,r,o,i+"["+s+"]",a);if(f instanceof Error)return f}return null}return f(t)}function g(){function t(t,n,r,o,i){var a=t[n];if(!e(a)){var u=E(a);return new c("Invalid "+o+" `"+i+"` of type "+("`"+u+"` supplied to `"+r+"`, expected a single ReactElement."))}return null}return f(t)}function y(e){function t(t,n,r,o,i){if(!(t[n]instanceof e)){var a=e.name||A,u=C(t[n]);return new c("Invalid "+o+" `"+i+"` of type "+("`"+u+"` supplied to `"+r+"`, expected ")+("instance of `"+a+"`."))}return null}return f(t)}function b(e){function n(t,n,r,o,i){for(var a=t[n],u=0;u<e.length;u++)if(s(a,e[u]))return null;var l=JSON.stringify(e);return new c("Invalid "+o+" `"+i+"` of value `"+a+"` "+("supplied to `"+r+"`, expected one of "+l+"."))}return Array.isArray(e)?f(n):("production"!==t.env.NODE_ENV?i(!1,"Invalid argument supplied to oneOf, expected an instance of array."):void 0,r.thatReturnsNull)}function v(e){function t(t,n,r,o,i){if("function"!=typeof e)return new c("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var u=t[n],l=E(u);if("object"!==l)return new c("Invalid "+o+" `"+i+"` of type "+("`"+l+"` supplied to `"+r+"`, expected an object."));for(var s in u)if(u.hasOwnProperty(s)){var f=e(u,s,r,o,i+"."+s,a);if(f instanceof Error)return f}return null}return f(t)}function m(e){function n(t,n,r,o,i){for(var u=0;u<e.length;u++){var l=e[u];if(null==l(t,n,r,o,i,a))return null}return new c("Invalid "+o+" `"+i+"` supplied to "+("`"+r+"`."))}if(!Array.isArray(e))return"production"!==t.env.NODE_ENV?i(!1,"Invalid argument supplied to oneOfType, expected an instance of array."):void 0,r.thatReturnsNull;for(var o=0;o<e.length;o++){var u=e[o];if("function"!=typeof u)return i(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",O(u),o),r.thatReturnsNull}return f(n)}function I(){function e(e,t,n,r,o){return x(e[t])?null:new c("Invalid "+r+" `"+o+"` supplied to "+("`"+n+"`, expected a ReactNode."))}return f(e)}function w(e){function t(t,n,r,o,i){var u=t[n],l=E(u);if("object"!==l)return new c("Invalid "+o+" `"+i+"` of type `"+l+"` "+("supplied to `"+r+"`, expected `object`."));for(var s in e){var f=e[s];if(f){var d=f(u,s,r,o,i+"."+s,a);if(d)return d}}return null}return f(t)}function x(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(x);if(null===t||e(t))return!0;var n=l(t);if(!n)return!1;var r,o=n.call(t);if(n!==t.entries){for(;!(r=o.next()).done;)if(!x(r.value))return!1}else for(;!(r=o.next()).done;){var i=r.value;if(i&&!x(i[1]))return!1}return!0;default:return!1}}function _(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}function E(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":_(t,e)?"symbol":t}function j(e){if("undefined"==typeof e||null===e)return""+e;var t=E(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function O(e){var t=j(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}function C(e){return e.constructor&&e.constructor.name?e.constructor.name:A}var P="function"==typeof Symbol&&Symbol.iterator,T="@@iterator",A="<<anonymous>>",M={array:d("array"),bool:d("boolean"),func:d("function"),number:d("number"),object:d("object"),string:d("string"),symbol:d("symbol"),any:p(),arrayOf:h,element:g(),instanceOf:y,node:I(),objectOf:v,oneOf:b,oneOfType:m,shape:w};return c.prototype=Error.prototype,M.checkPropTypes=u,M.PropTypes=M,M}}).call(t,n(4))},function(e,t){"use strict";function n(e){return function(){return e}}var r=function(){};r.thatReturns=n,r.thatReturnsFalse=n(!1),r.thatReturnsTrue=n(!0),r.thatReturnsNull=n(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){(function(t){"use strict";function n(e,t,n,o,i,a,u,l){if(r(t),!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,o,i,a,u,l],f=0;s=new Error(t.replace(/%s/g,function(){return c[f++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}}var r=function(e){};"production"!==t.env.NODE_ENV&&(r=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")}),e.exports=n}).call(t,n(4))},function(e,t,n){(function(t){"use strict";var r=n(6),o=r;"production"!==t.env.NODE_ENV&&!function(){var e=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=0,i="Warning: "+e.replace(/%s/g,function(){return n[o++]});"undefined"!=typeof console&&console.error(i);try{throw new Error(i)}catch(e){}};o=function(t,n){if(void 0===n)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==n.indexOf("Failed Composite propType: ")&&!t){for(var r=arguments.length,o=Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];e.apply(void 0,[n].concat(o))}}}(),e.exports=o}).call(t,n(4))},function(e,t){"use strict";var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=n},function(e,t,n){(function(t){"use strict";function r(e,n,r,l,s){if("production"!==t.env.NODE_ENV)for(var c in e)if(e.hasOwnProperty(c)){var f;try{o("function"==typeof e[c],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",l||"React class",r,c),f=e[c](n,c,l,r,null,a)}catch(e){f=e}if(i(!f||f instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",l||"React class",r,c,typeof f),f instanceof Error&&!(f.message in u)){u[f.message]=!0;var d=s?s():"";i(!1,"Failed %s type: %s%s",r,f.message,null!=d?d:"")}}}if("production"!==t.env.NODE_ENV)var o=n(7),i=n(8),a=n(9),u={};e.exports=r}).call(t,n(4))},function(e,t,n){"use strict";var r=n(6),o=n(7),i=n(9);e.exports=function(){function e(e,t,n,r,a,u){u!==i&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return n.checkPropTypes=r,n.PropTypes=n,n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t._handleClick=t._handleMouseMove=t.restoreLogFromLocalstorage=t.restoreUpdatesFromLocalstorage=t.getGlobalState=t.setGlobalState=t.eventEmitter=void 0;var o=n(13),i=n(14),a=n(15),u=r(a),l=n(16),s=r(l),c=n(17),f=r(c),d="mobx-react-devtool__updatesEnabled",p="mobx-react-devtool__logEnabled",h={updatesEnabled:!1,graphEnabled:!1,logEnabled:!1,hoverBoxes:[],renderingBoxes:[],logFilter:function(){return!0}},g=t.eventEmitter=new u.default;g.setMaxListeners(1/0);var y=void 0,b=t.setGlobalState=function(e){h.logEnabled!==e.logEnabled&&(e.logEnabled===!0?(y&&y(),y=(0,o.spy)(function(e){return(0,f.default)(e,h.logFilter)})):e.logEnabled===!1&&y&&y()),"undefined"!=typeof window&&window.localStorage&&(e.updatesEnabled===!0?window.localStorage.setItem(d,"YES"):e.updatesEnabled===!1&&window.localStorage.removeItem(d),e.logEnabled===!0?window.localStorage.setItem(p,"YES"):e.logEnabled===!1&&window.localStorage.removeItem(p)),e.graphEnabled===!1&&(e.hoverBoxes=[]),h=Object.assign({},h,e),g.emit("update")},v=(t.getGlobalState=function(){return h},t.restoreUpdatesFromLocalstorage=function(){if("undefined"!=typeof window&&window.localStorage){var e="YES"===window.localStorage.getItem(d);b({updatesEnabled:e})}},t.restoreLogFromLocalstorage=function(){if("undefined"!=typeof window&&window.localStorage){var e="YES"===window.localStorage.getItem(p);b({logEnabled:e})}},function(e){for(var t=e,n=void 0;t;){if(n=i.componentByNodeRegistery.get(t))return{component:n,node:t};t=t.parentNode}return{component:void 0,node:void 0}});t._handleMouseMove=function(e){if(h.graphEnabled){var t=e.target,n=v(t).node;if(n){var r=n.getBoundingClientRect();b({hoverBoxes:[{id:"the hovered node",type:"hover",x:r.left,y:r.top,width:r.width,height:r.height,lifeTime:1/0}]})}}},t._handleClick=function(e){if(h.graphEnabled){var t=e.target,n=v(t).component;if(n){e.stopPropagation(),e.preventDefault();var r=o.extras.getDependencyTree(n.render.$mobx);(0,s.default)(r),b({dependencyTree:r,hoverBoxes:[],graphEnabled:!1})}}}},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function o(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!o(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,o,u,l,s;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}if(n=this._events[e],a(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:u=Array.prototype.slice.call(arguments,1),n.apply(this,u)}else if(i(n))for(u=Array.prototype.slice.call(arguments,1),s=n.slice(),o=s.length,l=0;l<o;l++)s[l].apply(this,u);return!0},n.prototype.addListener=function(e,t){var o;if(!r(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned&&(o=a(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,o&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),o||(o=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var o=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,o,a,u;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],a=n.length,o=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(n)){for(u=a;u-- >0;)if(n[u]===t||n[u].listener&&n[u].listener===t){o=u;break}if(o<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(r(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function e(t){if(t.dependencies){for(var n=t.dependencies.length-1;n>=0;n--)for(var r=t.dependencies[n].name,o=n-1;o>=0;o--)if(t.dependencies[o].name===r){t.dependencies[o].dependencies=[].concat(t.dependencies[o].dependencies||[],t.dependencies[n].dependencies||[]),t.dependencies.splice(n,1);break}t.dependencies.forEach(e)}};t.default=n},function(e,t,n){"use strict";function r(e,t){b===!1&&"undefined"!=typeof navigator&&navigator.userAgent.indexOf("Chrome")===-1&&(console.warn("The output of the MobX logger is optimized for Chrome"),b=!0);var n=e.spyReportStart===!0,r=e.spyReportEnd===!0,h=void 0;if(0===v?(h=t(e),n&&!h&&(m=!0)):r&&m&&1===v?(h=!1,m=!1):h=m!==!0,h&&r)i(e.time);else if(h){var g=n?o:a;switch(e.type){case"action":g("%caction '%s' %s","color:dodgerblue",e.name,c("(",p(e.target))),a(e.arguments),l();break;case"transaction":g("%ctransaction '%s' %s","color:gray",e.name,c("(",p(e.target)));break;case"scheduled-reaction":g("%cscheduled async reaction '%s'","color:#10a210",f(e.object));break;case"reaction":g("%creaction '%s'","color:#10a210",f(e.object)),l();break;case"compute":o("%ccomputed '%s' %s","color:#10a210",f(e.object),c("(",p(e.target))),i();break;case"error":g("%cerror: %s","color:tomato",e.message),l(),s();break;case"update":(0,y.isObservableArray)(e.object)?g("updated '%s[%s]': %s (was: %s)",f(e.object),e.index,d(e.newValue),d(e.oldValue)):(0,y.isObservableObject)(e.object)?g("updated '%s.%s': %s (was: %s)",f(e.object),e.name,d(e.newValue),d(e.oldValue)):g("updated '%s': %s (was: %s)",f(e.object),d(e.newValue),d(e.oldValue)),u({newValue:e.newValue,oldValue:e.oldValue}),l();break;case"splice":g("spliced '%s': index %d, added %d, removed %d",f(e.object),e.index,e.addedCount,e.removedCount),u({added:e.added,removed:e.removed}),l();break;case"add":g("set '%s.%s': %s",f(e.object),e.name,d(e.newValue)),u({newValue:e.newValue}),l();break;case"delete":g("removed '%s.%s' (was %s)",f(e.object),e.name,d(e.oldValue)),u({oldValue:e.oldValue}),l();break;case"create":g("set '%s': %s",f(e.object),d(e.newValue)),u({newValue:e.newValue}),l();break;default:g(e.type),u(e)}}n&&v++,r&&v--}function o(){console[I?"groupCollapsed":"log"].apply(console,arguments),w++}function i(e){w--,"number"==typeof e&&a("%ctotal time: %sms","color:gray",e),I&&console.groupEnd()}function a(){console.log.apply(console,arguments)}function u(){console.dir.apply(console,arguments)}function l(){console.trace("stack")}function s(){for(var e=0,t=w;e<t;e++)i()}function c(e,t){return t?(e||"")+t+(x[e]||""):""}function f(e){return e?y.extras.getDebugName(e):String(e)}function d(e){return h(e)?"string"==typeof e&&e.length>100?e.substr(0,97)+"...":e:c("(",p(e))}function p(e){if(null===e||void 0===e)return"";if(e&&"object"===("undefined"==typeof e?"undefined":g(e))){if(e&&e.$mobx)return e.$mobx.name;if(e.constructor)return e.constructor.name||"object"}return""+("undefined"==typeof e?"undefined":g(e))}function h(e){return null===e||void 0===e||"string"==typeof e||"number"==typeof e||"boolean"==typeof e}Object.defineProperty(t,"__esModule",{value:!0});var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=r;var y=n(13),b=!1,v=0,m=!1,I="function"==typeof console.groupCollapsed,w=0,x={'"':'"',"'":"'","(":")","[":"]","<":"]","#":""}},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),c=o(s),f=n(3),d=o(f),p=n(12),h=n(19),g=o(h),y=n(20),b=o(y),v=n(21),m=o(v),I=n(23),w=o(I),x=n(24),_=r(x),E=function(e){function t(){var e,n,r,o;i(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.handleUpdate=function(){return r.setState({})},o=n,a(r,o)}return u(t,e),l(t,[{key:"componentDidMount",value:function(){p.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){p.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=this.props,t=e.position,n=e.highlightTimeout,r={};return t?(r.top=t.top,r.right=t.right,r.bottom=t.bottom,r.left=t.left):(r.top="0px",r.right="20px"),c.default.createElement("div",null,c.default.createElement("div",{style:Object.assign({},_.panel,r)},c.default.createElement(m.default,{highlightTimeout:n},c.default.createElement(w.default,{id:"buttonUpdates"})),c.default.createElement(g.default,null,c.default.createElement(w.default,{id:"buttonGraph"})),c.default.createElement(b.default,null,c.default.createElement(w.default,{id:"buttonLog"}))))}}]),t}(s.Component);E.propTypes={highlightTimeout:d.default.number},t.default=E},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(2),s=r(l),c=n(3),f=(r(c),n(14)),d=n(12),p=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.handleUpdate=function(){return r.setState({})},r.handleToggleGraph=function(){var e=(0,d.getGlobalState)(),t=e.graphEnabled;(0,d.setGlobalState)({hoverBoxes:[],graphEnabled:!t})},a=n,i(r,a)}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.setState({})}},{key:"componentDidMount",value:function(){(0,f.trackComponents)(),d.eventEmitter.on("update",this.handleUpdate),"undefined"!=typeof window&&"undefined"!=typeof document&&(document.body.addEventListener("mousemove",d._handleMouseMove,!0),document.body.addEventListener("click",d._handleClick,!0))}},{key:"componentWillUnmount",value:function(){d.eventEmitter.removeListener("update",this.handleUpdate),"undefined"!=typeof document&&(document.body.removeEventListener("mousemove",d._handleMouseMove,!0),document.body.removeEventListener("click",d._handleMouseMove,!0))}},{key:"render",value:function(){var e=(0,d.getGlobalState)(),t=e.graphEnabled,n=this.props.children;return s.default.cloneElement(n,{onToggle:this.handleToggleGraph,active:t})}}]),t}(l.Component);t.default=p},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(2),s=r(l),c=n(3),f=(r(c),n(12)),d=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.handleUpdate=function(){r.setState({})},r.handleToggleLog=function(){var e=(0,f.getGlobalState)(),t=e.logEnabled;(0,f.setGlobalState)({logEnabled:!t})},a=n,i(r,a)}return a(t,e),u(t,[{key:"componentDidMount",value:function(){f.eventEmitter.on("update",this.handleUpdate),(0,f.restoreLogFromLocalstorage)()}},{key:"componentWillUnmount",value:function(){f.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=(0,f.getGlobalState)(),t=e.logEnabled,n=this.props.children;return s.default.cloneElement(n,{onToggle:this.handleToggleLog,active:t})}}]),t}(l.Component);t.default=d},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(2),s=r(l),c=n(3),f=r(c),d=n(22),p=r(d),h=n(12),g=function(e){function t(){var e,n,r,a;o(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.handleUpdate=function(){return r.setState({})},r.handleToggleUpdates=function(){var e=(0,h.getGlobalState)(),t=e.updatesEnabled;(0,h.setGlobalState)({updatesEnabled:!t})},a=n,i(r,a)}return a(t,e),u(t,[{key:"componentDidMount",value:function(){h.eventEmitter.on("update",this.handleUpdate);var e=this.props.highlightTimeout;this.renderingMonitor=new p.default({highlightTimeout:e}),(0,h.restoreUpdatesFromLocalstorage)()}},{key:"componentWillUnmount",value:function(){h.eventEmitter.removeListener("update",this.handleUpdate),this.renderingMonitor.dispose()}},{key:"render",value:function(){
	var e=(0,h.getGlobalState)(),t=e.updatesEnabled,n=this.props.children;return s.default.cloneElement(n,{onToggle:this.handleToggleUpdates,active:t})}}]),t}(l.Component);g.propTypes={highlightTimeout:f.default.number},g.defaultProps={highlightTimeout:1500},t.default=g},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(14),a=n(12),u=function(e){switch(!0){case e<25:return"cheap";case e<100:return"acceptable";default:return"expensive"}},l=function(){function e(t){var n=this,o=t.highlightTimeout;r(this,e),this._boxesRegistry="undefined"!=typeof WeakMap?new WeakMap:new Map,this._renderReporterDisposer=i.renderReporter.on(function(e){if((0,a.getGlobalState)().updatesEnabled===!0)switch(e.event){case"render":if(!e.node||isNaN(e.renderTime))return;var t=e.node.getBoundingClientRect(),r=n.getBoxForNode(e.node);r.type="rendering",r.y=t.top,r.x=t.left,r.width=t.width,r.height=t.height,r.renderInfo={count:r.renderInfo&&++r.renderInfo.count||1,renderTime:e.renderTime,totalTime:e.totalTime,cost:u(e.renderTime)},r.lifeTime=o;var i=(0,a.getGlobalState)().renderingBoxes;return i.indexOf(r)===-1&&(i=i.concat([r])),(0,a.setGlobalState)({renderingBoxes:i}),r._timeout&&clearTimeout(r._timeout),void(r._timeout=setTimeout(function(){return n.removeBox(e.node,!0)},o));case"destroy":return n.removeBox(e.node),void n._boxesRegistry.delete(e.node);default:return}})}return o(e,[{key:"getBoxForNode",value:function(e){if(this._boxesRegistry.has(e))return this._boxesRegistry.get(e);var t={id:Math.random().toString(32).substr(2)};return this._boxesRegistry.set(e,t),t}},{key:"dispose",value:function(){this._renderReporterDisposer()}},{key:"removeBox",value:function(e){if(this._boxesRegistry.has(e)!==!1){var t=(0,a.getGlobalState)().renderingBoxes,n=t.indexOf(this._boxesRegistry.get(e));n!==-1&&(t=t.slice(0,n).concat(t.slice(n+1)),(0,a.setGlobalState)({renderingBoxes:t}))}}}]),e}();t.default=l},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),c=o(s),f=n(3),d=o(f),p=n(24),h=r(p),g=function(e){function t(){var e,n,r,o;i(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.state={hovered:!1},r.handleMouseOver=function(){return r.setState({hovered:!0})},r.handleMouseOut=function(){return r.setState({hovered:!1})},o=n,a(r,o)}return u(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.active,n=e.id,r=e.onToggle,o=this.state.hovered,i=function(){switch(n){case"buttonUpdates":return t?h.buttonUpdatesActive:h.buttonUpdates;case"buttonGraph":return t?h.buttonGraphActive:h.buttonGraph;case"buttonLog":return t?h.buttonLogActive:h.buttonLog}}(),a=function(){switch(n){case"buttonUpdates":return"Visualize component re-renders";case"buttonGraph":return"Select a component and show its dependency tree";case"buttonLog":return"Log all MobX state changes and reactions to the browser console (use F12 to show / hide the console). Use Chrome / Chromium for an optimal experience"}}(),u=Object.assign({},h.button,i,t&&h.button.active,o&&h.button.hover);return c.default.createElement("button",{type:"button",onClick:r,title:a,style:u,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut})}}]),t}(s.Component);g.props={onToggle:d.default.bool.isRequired,active:d.default.bool.isRequired,name:d.default.oneOf(["buttonUpdates","buttonGraph","buttonLog"]).isRequired},t.default=g},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.panel={position:"fixed",height:"26px",backgroundColor:"#fff",color:"rgba(0, 0, 0, 0.8)",borderRadius:"0 0 2px 2px",borderStyle:"solid",borderWidth:"0 1px 1px",borderColor:"rgba(0, 0, 0, 0.1)",zIndex:"65000",fontFamily:"Helvetica, sans-serif",display:"flex",padding:"0 5px"},t.button={opacity:.45,background:"transparent none center / 16px 16px no-repeat",width:"26px",margin:"0 10px",cursor:"pointer",border:"none",hover:{opacity:.7},active:{opacity:1,":hover":{opacity:1}}},t.buttonLog={backgroundImage:"url("+n(25)+")"},t.buttonLogActive={backgroundImage:"url("+n(26)+")"},t.buttonUpdates={backgroundImage:"url("+n(27)+")"},t.buttonUpdatesActive={backgroundImage:"url("+n(28)+")"},t.buttonGraph={backgroundImage:"url("+n(29)+")"},t.buttonGraphActive={backgroundImage:"url("+n(30)+")"}},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0xMi41IDMuNWgtOGMtMS4xIDAtMiAuOS0yIDJ2NWMwIDEuMS45IDIgMiAyaDF2Mmw1LTJoMmMxLjEgMCAyLS45IDItMnYtNWMwLTEuMS0uOS0yLTItMnoiLz4KICAgICAgICA8cGF0aCBkPSJNNSA2LjVoNyIvPgogICAgICAgIDxwYXRoIGQ9Ik01IDkuNWg3Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij4KICAgIDxnIHN0cm9rZT0iIzE3ODBmYSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjI1Ij4KICAgICAgICA8cGF0aCBkPSJNMTIuNSAzLjVoLThjLTEuMSAwLTIgLjktMiAydjVjMCAxLjEuOSAyIDIgMmgxdjJsNS0yaDJjMS4xIDAgMi0uOSAyLTJ2LTVjMC0xLjEtLjktMi0yLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTUgNi41aDciLz4KICAgICAgICA8cGF0aCBkPSJNNSA5LjVoNyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMDAwIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMTc4MGZhIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),c=o(s),f=n(3),d=o(f),p=n(32),h=r(p),g=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"componentWillAppear",value:function(e){this.props.willAppear(e)}},{key:"componentWillLeave",value:function(){this.props.willLeave()}},{key:"render",value:function(){return this.props.children}}]),t}(s.Component);g.propTypes={willAppear:d.default.function,willLeave:d.default.function},g.defaultProps={willAppear:function(){},willLeave:function(){}};var y=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"renderBox",value:function(e){switch(e.type){case"rendering":var t=h.rendering[e.renderInfo.cost]||{};return c.default.createElement("div",{key:e.id,ref:function(t){return setTimeout(function(){t&&(t.style.opacity=0)},e.lifeTime-500)},style:Object.assign({},h.box,h.rendering,t,{left:e.x,top:e.y,width:e.width,height:e.height})},c.default.createElement("span",{style:Object.assign({},h.text,t.text)},e.renderInfo.count,"x | ",e.renderInfo.renderTime," / ",e.renderInfo.totalTime," ms"));case"hover":return c.default.createElement("div",{key:e.id,style:Object.assign({},h.box,h.hover,{left:e.x,top:e.y,width:e.width,height:e.height})});default:throw new Error}}},{key:"render",value:function(){var e=this,t=this.props.boxes;return c.default.createElement("div",null,t.map(function(t){return e.renderBox(t)}))}}]),t}(s.Component);y.propTypes={boxes:d.default.arrayOf(d.default.shape({type:d.default.oneOf(["rendering","hover"]).isRequired,x:d.default.number.isRequired,y:d.default.number.isRequired,width:d.default.number.isRequired,height:d.default.number.isRequired,renderInfo:d.default.shape({count:d.default.number.isRequired,renderTime:d.default.number.isRequired,totalTime:d.default.number.isRequired,cost:d.default.oneOf(["cheap","acceptable","expensive"]).isRequired}),lifeTime:d.default.number.isRequired})).isRequired},t.default=y},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.box={display:"block",position:"fixed",zIndex:"64998",minWidth:"60px",outline:"3px solid",pointerEvents:"none",transition:"opacity 500ms ease-in"},t.text={fontFamily:"verdana, sans-serif",padding:"0 4px 2px",color:"rgba(0, 0, 0, 0.6)",fontSize:"10px",lineHeight:"12px",pointerEvents:"none",float:"right",borderBottomRightRadius:"2px",maxWidth:"100%",maxHeight:"100%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},t.rendering={cheap:{outlineColor:"rgba(182, 218, 146, 0.75)",text:{backgroundColor:"rgba(182, 218, 146, 0.75)"}},acceptable:{outlineColor:"rgba(228, 195, 66, 0.85)",text:{backgroundColor:"rgba(228, 195, 66, 0.85)"}},expensive:{outlineColor:"rgba(228, 171, 171, 0.95)",text:{backgroundColor:"rgba(228, 171, 171, 0.95)"}}},t.hover={outlineColor:"rgba(128, 128, 255, 0.5)"}},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),c=o(s),f=n(3),d=(o(f),n(34)),p=o(d),h=n(12),g=n(36),y=r(g),b=function(e){function t(){var e,n,r,o;i(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.handleUpdate=function(){return r.setState({})},r.handleClose=function(){return(0,h.setGlobalState)({dependencyTree:void 0})},o=n,a(r,o)}return u(t,e),l(t,[{key:"componentDidMount",value:function(){h.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){h.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"renderTreeItem",value:function(e,t,n){var r=e.name,o=e.dependencies,i=this;return c.default.createElement("div",{style:y.item,key:r},c.default.createElement("span",{style:Object.assign({},y.box,n&&y.box.root)},r),o&&c.default.createElement("div",{style:y.tree},o.map(function(e,t){return i.renderTreeItem(e,t==o.length-1)})),!n&&c.default.createElement("span",{style:y.itemHorisontalDash}),!n&&c.default.createElement("span",{style:Object.assign({},y.itemVericalStick,t&&y.itemVericalStick.short)}))}},{key:"render",value:function(){var e=(0,h.getGlobalState)(),t=e.dependencyTree;return c.default.createElement(p.default,{onOverlayClick:this.handleClose},t&&c.default.createElement("div",{style:y.graph},c.default.createElement("span",{style:y.close,onClick:this.handleClose},"×"),c.default.createElement("div",{style:y.tree},this.renderTreeItem(t,!0,!0))))}}]),t}(s.Component);t.default=b},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),c=o(s),f=n(3),d=o(f),p=n(35),h=r(p),g=function(e){function t(){var e,n,r,o;i(this,t);for(var u=arguments.length,l=Array(u),s=0;s<u;s++)l[s]=arguments[s];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.stopPropogation=function(e){return e.stopPropagation()},o=n,a(r,o)}return u(t,e),l(t,[{key:"componentDidUpdate",value:function(e){var t=document.body.parentNode;if(e.children&&!this.props.children)this.rightOffset=0,t.style.borderRight=null,t.style.overflow=null;else if(!e.children&&this.props.children){var n=t.offsetWidth;t.style.overflow="hidden";var r=t.offsetWidth,o=Math.max(0,r-n);t.style.borderRight=o+"px solid transparent"}}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.onOverlayClick;return t?c.default.createElement("div",{style:h.overlay,onClick:n},c.default.createElement("div",{key:"content",style:h.modal,onClick:this.stopPropogation},t)):null}}]),t}(s.Component);g.propTypes={children:d.default.node,onOverlayClick:d.default.func.isRequired},t.default=g},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.overlay={position:"fixed",top:0,right:0,bottom:0,left:0,zIndex:66e3,overflow:"auto",WebkitOverflowScrolling:"touch",outline:0,backgroundColor:"rgba(40, 40, 50, 0.5)",transformOrigin:"50% 25%"},t.modal={position:"relative",width:"auto",margin:"5% 10%",zIndex:1060}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.graph={background:"white",padding:"40px"},t.close={color:"rgba(0, 0, 0, 0.2)",fontSize:"36px",position:"absolute",top:"5px",right:"5px",width:"40px",height:"40px",lineHeight:"34px",textAlign:"center",cursor:"pointer",":hover":{color:"rgba(0, 0, 0, 0.5)"}},t.tree={position:"relative",paddingLeft:"25px"},t.item={position:"relative"},t.box={padding:"4px 10px",background:"rgba(0, 0, 0, 0.05)",display:"inline-block",marginBottom:"8px",color:"#000",root:{fontSize:"15px",fontWeight:"bold",padding:"6px 13px"}},t.itemHorisontalDash={position:"absolute",left:"-12px",borderTop:"1px solid rgba(0, 0, 0, 0.2)",top:"14px",width:"12px",height:"0"},t.itemVericalStick={position:"absolute",left:"-12px",borderLeft:"1px solid rgba(0, 0, 0, 0.2)",height:"100%",width:0,top:"-8px",short:{height:"23px"}}},function(e,t){"use strict";function n(e,t){if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var n=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(void 0!==o&&null!==o)for(var i=Object.keys(Object(o)),a=0,u=i.length;a<u;a++){var l=i[a],s=Object.getOwnPropertyDescriptor(o,l);void 0!==s&&s.enumerable&&(n[l]=o[l])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:n})}e.exports={assign:n,polyfill:r}}])});

/***/ })
/******/ ]);