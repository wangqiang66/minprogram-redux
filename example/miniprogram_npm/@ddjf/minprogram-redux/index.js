module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1573636568085, function(require, module, exports) {


var _Provider = _interopRequireDefault(require("./Provider.js"));

var _connect = _interopRequireDefault(require("./connect.js"));

var _app = require("./app.js");

var _createStore = _interopRequireDefault(require("./createStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * function: index
 * author  : wq
 * update  : 2019/5/23 15:41
 */
module.exports = {
  Provider: _Provider["default"],
  connect: _connect["default"],
  setApp: _app.setApp,
  getApp: _app.getApp,
  createStore: _createStore["default"]
};
}, function(modId) {var map = {"./Provider.js":1573636568086,"./connect.js":1573636568089,"./app.js":1573636568093,"./createStore":1573636568094}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568086, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _warning = _interopRequireDefault(require("./warning.js"));

var _store = require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function checkStoreShape(store) {
  var missingMethods = ['subscribe', 'dispatch', 'getState'].filter(function (m) {
    return !store.hasOwnProperty(m);
  });

  if (missingMethods.length > 0) {
    (0, _warning["default"])('Store似乎不是一个合法的Redux Store对象: ' + '缺少这些方法: ' + missingMethods.join(', ') + '。');
  }
}

function Provider(store) {
  checkStoreShape(store);
  (0, _store.setStore)(store);
  return function (appConfig) {
    return _extends({}, appConfig, {
      store: store
    });
  };
}

var _default = Provider;
exports["default"] = _default;
}, function(modId) { var map = {"./warning.js":1573636568087,"./store":1573636568088}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568087, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * function: warning
 * author  : wq
 * update  : 2019/5/23 15:43
 */

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

}

var _default = warning;
exports["default"] = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568088, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStore = exports.setStore = void 0;

/**
 * function: store
 * author  : wq
 * update  : 2019/5/27 11:38
 */
var _store = null;

var setStore = function setStore(store) {
  _store = store;
};

exports.setStore = setStore;

var getStore = function getStore() {
  return _store;
};

exports.getStore = getStore;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568089, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = connect;

var _shallowEqual = _interopRequireWildcard(require("./shallowEqual"));

var _warning = _interopRequireDefault(require("./warning"));

var _wrapActionCreators = _interopRequireDefault(require("./wrapActionCreators.js"));

var _store = require("./store");

var _Targets = _interopRequireDefault(require("./Targets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var defaultMapStateToProps = function defaultMapStateToProps() {
  return {};
};

var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

function connect(mapState, mapDispatch, preLoad) {
  if (mapState === void 0) {
    mapState = defaultMapStateToProps;
  }

  if (mapDispatch === void 0) {
    mapDispatch = defaultMapDispatchToProps;
  }

  if (preLoad === void 0) {
    preLoad = false;
  }

  var shouldSubscribe = Boolean(mapState);
  var store = (0, _store.getStore)();

  if (typeof mapDispatch !== 'function') {
    mapDispatch = (0, _wrapActionCreators["default"])(mapDispatch);
  }

  return function wrapWithConnect(pageConfig, target) {
    if (target === void 0) {
      target = _Targets["default"].Wechat.name;
    }

    // 推迟10ms支持，便于setData的一次性数据传递，避免多次比较
    var handleChange = (0, _shallowEqual.debounce)(function (options) {
      if (!this.unsubscribe) {
        return false;
      }

      var state = this.$store.getState();
      var mappedState = mapState.call(this, state, options);

      if (!this.data || (0, _shallowEqual["default"])(this.data, mappedState)) {
        return true;
      }

      var updatedState = (0, _shallowEqual.updateState)(mappedState, this.data, '');

      if (Object.keys(updatedState).length > 0) {
        console.log('更新数据对象', updatedState);
        this.setData(updatedState);
      }
    }, 1);

    function setPageData(options) {
      var state = store.getState();
      var mappedState = mapState.call(this, state, options);

      if (preLoad) {
        pageConfig.data = _extends({}, pageConfig.data || {}, {}, mappedState || {});
      } else {
        this.setData(mappedState || {});
      }
    }

    var _didMount;

    var _didUnmount;

    if (pageConfig.isComponent) {
      _didMount = pageConfig[_Targets["default"][target].connectComponentLife];
      _didUnmount = pageConfig[_Targets["default"][target].disconnectComponentLife];
    } else {
      _didMount = pageConfig[_Targets["default"][target].connectPageLife];
      _didUnmount = pageConfig[_Targets["default"][target].disconnectPageLife];
    }

    if (preLoad) {
      setPageData();
    }

    function didMount(options) {
      this.$store = store;

      if (!store) {
        (0, _warning["default"])('请在app.js 中引入redux');
      }

      if (shouldSubscribe) {
        this.unsubscribe = this.$store.subscribe(handleChange.bind(this, options));

        if (!preLoad) {
          setPageData.call(this, options);
        }
      }

      if (typeof _didMount === 'function') {
        _didMount.call(this, options);
      }
    }

    function didUnmount() {
      if (typeof _didUnmount === 'function') {
        _didUnmount.call(this);
      }

      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }

    if (pageConfig.isComponent) {
      var _extends2;

      return _extends({}, pageConfig, (_extends2 = {
        methods: _extends({}, pageConfig.methods, {}, mapDispatch(store.dispatch, store.getState()))
      }, _extends2[_Targets["default"][target].connectComponentLife] = didMount, _extends2[_Targets["default"][target].disconnectComponentLife] = didUnmount, _extends2));
    } else {
      var _extends3;

      return _extends({}, pageConfig, {}, mapDispatch(store.dispatch, store.getState()), (_extends3 = {}, _extends3[_Targets["default"][target].connectPageLife] = didMount, _extends3[_Targets["default"][target].disconnectPageLife] = didUnmount, _extends3));
    }
  };
}
}, function(modId) { var map = {"./shallowEqual":1573636568090,"./warning":1573636568087,"./wrapActionCreators.js":1573636568091,"./store":1573636568088,"./Targets":1573636568092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568090, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.updateState = updateState;
exports["default"] = shallowEqual;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * function: shallowEqual
 * author  : wq
 * update  : 2019/5/23 11:00
 */
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function isObject(data) {
  return typeof data === 'object';
}

function isEmptyData(data) {
  return typeof data !== 'object' || data === null || Object.keys(data).length === 0;
}

function exsitKeyNotInB(arrA, arrB) {
  var obj = {};

  if (arrA.length > arrB.length) {
    return true;
  }

  arrB.forEach(function (item) {
    obj[item] = true;
  });

  for (var i in arrA) {
    if (!obj[arrA[i]]) {
      return true;
    }
  }

  return false;
}

function diffState(state, oldState, path) {
  var diff = {}; // 两种类型不一样

  if (Object.prototype.toString.call(state) !== Object.prototype.toString.call(oldState)) {
    var _ref;

    return _ref = {}, _ref[path] = state, _ref;
  }

  if (isEmptyData(state)) {
    var _ref2;

    if (is(state, oldState)) {
      return diff;
    }

    if (isObject(state) && isObject(oldState) && JSON.stringify(state) === JSON.stringify(oldState)) {
      return diff;
    }

    return _ref2 = {}, _ref2[path] = state, _ref2;
  }

  if (isEmptyData(oldState)) {
    var _ref3;

    return _ref3 = {}, _ref3[path] = state, _ref3;
  } // 数组处理


  if (Array.isArray(state)) {
    // 因为没有数组删除的功能，所以只能进行整个数组重新赋值
    if (oldState.length > state.length) {
      var _ref4;

      return _ref4 = {}, _ref4[path] = state, _ref4;
    }

    state.forEach(function (item, index) {
      diff = _extends({}, diff, {}, diffState(item, oldState[index], path + "[" + index + "]"));
    });
    return diff;
  }

  if (isObject(state)) {
    // 对象属性删除，setData没有对象删除的功能，所以只能重置整个对象
    Object.keys(state).forEach(function (item) {
      if (oldState.hasOwnProperty(item)) {
        diff = _extends({}, diff, {}, diffState(state[item], oldState[item], path + "." + item));
      } else {
        var _extends2;

        diff = _extends({}, diff, (_extends2 = {}, _extends2[path + "." + item] = state[item], _extends2));
      }
    });
    return diff;
  }
}

function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  var timer; // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数

  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this;
    var args = arguments; // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn

    clearTimeout(timer); // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

function updateState(state, oldState) {
  if (!isObject(state)) {
    return {};
  }

  if (typeof oldState !== 'object' || Object.keys(oldState).length === 0) {
    return state;
  }

  var diff = {};
  Object.keys(state).forEach(function (item) {
    diff = _extends({}, diff, {}, diffState(state[item], oldState[item], item));
  });
  return diff;
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568091, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * function: wrapActionCreators
 * author  : wq
 * update  : 2019/5/23 15:44
 */
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function wrapActionCreators(actionCreators) {
  return function (dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  };
}

var _default = wrapActionCreators;
exports["default"] = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568092, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * function: Targets
 * author  : wq
 * update  : 2019/11/5 16:12
 */
var _default = {
  Wechat: {
    connectComponentLife: 'attached',
    disconnectComponentLife: 'detached',
    connectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'Wechat'
  },
  Alipay: {
    connectComponentLife: 'didMount',
    disconnectComponentLife: 'didUnmount',
    connectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'Alipay'
  },
  DingTalk: {
    connectComponentLife: 'didMount',
    disconnectComponentLife: 'didUnmount',
    connectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'DingTalk'
  }
};
exports["default"] = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568093, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApp = exports.setApp = void 0;

/**
 * function: dd
 * author  : wq
 * update  : 2019/5/13 17:13
 */
var _app;

var setApp = function setApp(app) {
  _app = app;
};

exports.setApp = setApp;

var getApp = function getApp() {
  return _app;
};

exports.getApp = getApp;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1573636568094, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxPromiseMiddleware = _interopRequireDefault(require("redux-promise-middleware"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * function: createStore
 * author  : wq
 * update  : 2019/11/13 16:58
 */
var middleWare = (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxPromiseMiddleware["default"], _reduxLogger["default"]);

var _default = function _default(reducer, data) {
  if (data === void 0) {
    data = {};
  }

  return (0, _redux.createStore)(reducer, data, middleWare);
};

exports["default"] = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1573636568085);
})()
//# sourceMappingURL=index.js.map