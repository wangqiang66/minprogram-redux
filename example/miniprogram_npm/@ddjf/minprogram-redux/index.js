module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1571306823435, function(require, module, exports) {
/**
 * function: index
 * author  : wq
 * update  : 2019/5/23 15:41
 */
var __TEMP__ = require('./Provider.js');var Provider = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./connect.js');var connect = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./app.js');var setApp = __TEMP__['setApp'];var getApp = __TEMP__['getApp'];

module.exports = {
  Provider: Provider,
  connect: connect,
  setApp,
  getApp
}

}, function(modId) {var map = {"./Provider.js":1571306823436,"./connect.js":1571306823439,"./app.js":1571306823442}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571306823436, function(require, module, exports) {
/**
 * function: Provider
 * author  : wq
 * update  : 2019/5/23 15:41
 */
var __TEMP__ = require('./warning.js');var warning = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./store');var setStore = __TEMP__['setStore'];

function checkStoreShape(store) {
  const missingMethods = ['subscribe', 'dispatch', 'getState'].filter(m => !store.hasOwnProperty(m));

  if (missingMethods.length > 0) {
    warning(
      'Store似乎不是一个合法的Redux Store对象: ' +
      '缺少这些方法: ' + missingMethods.join(', ') + '。'
    )
  }
}

function Provider(store) {
  checkStoreShape(store)
  setStore(store)
  return function (appConfig) {
    return { ...appConfig, store }
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = Provider;

}, function(modId) { var map = {"./warning.js":1571306823437,"./store":1571306823438}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571306823437, function(require, module, exports) {
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
    console.error(message)
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message)
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = warning;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571306823438, function(require, module, exports) {
/**
 * function: store
 * author  : wq
 * update  : 2019/5/27 11:38
 */
let _store = null

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var setStore = exports.setStore = (store) => {
  _store = store
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var getStore = exports.getStore = () => {
  return _store
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571306823439, function(require, module, exports) {
/**
 * function: connect
 * author  : wq
 * update  : 2019/5/23 10:36
 */
var __TEMP__ = require('./shallowEqual');var shallowEqual = __REQUIRE_DEFAULT__(__TEMP__);var updateState = __TEMP__['updateState'];var debounce = __TEMP__['debounce'];
var __TEMP__ = require('./warning');var warning = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./wrapActionCreators.js');var wrapActionCreators = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./store');var getStore = __TEMP__['getStore'];

const defaultMapStateToProps = state => ({})
const defaultMapDispatchToProps = dispatch => ({ dispatch })

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function connect(mapState = defaultMapStateToProps, mapDispatch = defaultMapDispatchToProps, preLoad = true) {
  const shouldSubscribe = Boolean(mapState)
  const store = getStore()
  if (typeof mapDispatch !== 'function') {
    mapDispatch = wrapActionCreators(mapDispatch)
  }

  return function wrapWithConnect(pageConfig) {
    // 推迟10ms支持，便于setData的一次性数据传递，避免多次比较
    const handleChange = debounce(function(options) {
      if (!this.unsubscribe) {
        return false
      }
      const state = this.$store.getState()
      const mappedState = mapState(state, options)
      if (!this.data || shallowEqual(this.data, mappedState)) {
        return true
      }
      const updatedState = updateState(mappedState, this.data, '')
      if (Object.keys(updatedState).length > 0) {
        console.log('更新数据对象', updatedState)
        this.setData(updatedState)
      }
    }, 1)
    function setPageData(options) {
      const state = store.getState()
      const mappedState = mapState(state, options)
      if (preLoad) {
        pageConfig.data = { ...(pageConfig.data || {}), ...(mappedState || {}) }
      } else {
        this.setData(mappedState || {})
      }
    }
    let _didMount
    let _didUnmount
    let _onLoad
    let _onUnload
    if (pageConfig.isComponent) {
      _didMount = pageConfig.didMount
      _didUnmount = pageConfig.didUnmount
    } else {
      _onLoad = pageConfig.onLoad
      _onUnload = pageConfig.onUnload
    }
    if (preLoad) {
      setPageData()
    }

    function onLoad(options) {
      this.$store = store
      if (!store) {
        warning('请在app.js 中引入redux')
      }
      if (shouldSubscribe) {
        this.unsubscribe = this.$store.subscribe(handleChange.bind(this, options))
        if (!preLoad) {
          setPageData.call(this, options)
        }
      }
      if (typeof _onLoad === 'function') {
        _onLoad.call(this, options)
      }
    }

    function onUnLoad() {
      if (typeof _onUnload === 'function') {
        _onUnload.call(this)
      }
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
        this.unsubscribe = null
      }
    }

    function didMount(options) {
      this.$store = store
      if (!store) {
        warning('请在app.js 中引入redux')
      }
      if (shouldSubscribe) {
        this.unsubscribe = this.$store.subscribe(handleChange.bind(this, options))
        handleChange.call(this, options)
      }
      if (typeof _didMount === 'function') {
        _didMount.call(this, options)
      }
    }

    function didUnmount() {
      if (typeof _didUnmount === 'function') {
        _didUnmount.call(this)
      }
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
        this.unsubscribe = null
      }
    }
    if (pageConfig.isComponent) {
      return { ...pageConfig, ...mapDispatch(store.dispatch, store.getState()), didMount, didUnmount }
    } else {
      return { ...pageConfig, ...mapDispatch(store.dispatch, store.getState()), onLoad, onUnLoad }
    }
  }
};

}, function(modId) { var map = {"./shallowEqual":1571306823440,"./warning":1571306823437,"./wrapActionCreators.js":1571306823441,"./store":1571306823438}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571306823440, function(require, module, exports) {
/**
 * function: shallowEqual
 * author  : wq
 * update  : 2019/5/23 11:00
 */
const hasOwn = Object.prototype.hasOwnProperty

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

function isObject(data) {
  return typeof data === 'object'
}

function isEmptyData(data) {
  return typeof data !== 'object' || data === null || data === undefined || typeof data === 'object' && Object.keys(data).length === 0
}

function exsitKeyNotInB(arrA, arrB) {
  const obj = {}
  if (arrA.length > arrB.length) {
    return true
  }
  arrB.forEach(item => {
    obj[item] = true
  })
  for (let i in arrA) {
    if(!obj[arrA[i]]) {
      return true
    }
  }
  return false
}

function diffState(state, oldState, path) {
  let diff = {}
  // 两种类型不一样
  if (Object.prototype.toString.call(state) !== Object.prototype.toString.call(oldState)) {
    return {
      [path]: state
    }
  }
  if (isEmptyData(state)) {
    if (is(state, oldState)) {
      return diff
    }
    if (isObject(state) && isObject(oldState) && JSON.stringify(state) === JSON.stringify(oldState)) {
      return diff
    }
    return {
      [path]: state
    }
  }
  if (isEmptyData(oldState)) {
    return {
      [path]: state
    }
  }
  // 数组处理
  if (Array.isArray(state)) {
    // 因为没有数组删除的功能，所以只能进行整个数组重新赋值
    if (oldState.length > state.length) {
      return {
        [path]: state
      }
    }
    state.forEach((item, index) => {
      diff = { ...diff, ...(diffState(item, oldState[index], `${path}[${index}]`)) }
    })
    return diff
  }

  if (isObject(state)) {
    // 对象属性删除，setData没有对象删除的功能，所以只能重置整个对象
    if (exsitKeyNotInB(Object.keys(oldState), Object.keys(state))) {
      return {
        [path]: state
      }
    }
    Object.keys(state).forEach(item => {
      diff = { ...diff, ...(diffState(state[item], oldState[item], `${path}.${item}`)) }
    })
    return diff
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.debounce = function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  let timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this
    const args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.updateState = function updateState(state, oldState, path) {
  if (typeof oldState !== 'object' || Object.keys(oldState).length === 0) {
    return state
  }
  if (!isObject(state)) {
    return {}
  }
  let diff = {}
  Object.keys(state).forEach(item => {
    diff = { ...diff, ...(diffState(state[item], oldState[item], item)) }
  })
  return diff
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571306823441, function(require, module, exports) {
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
  return dispatch => bindActionCreators(actionCreators, dispatch)
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = wrapActionCreators;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1571306823442, function(require, module, exports) {
/**
 * function: dd
 * author  : wq
 * update  : 2019/5/13 17:13
 */
let _app

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var setApp = exports.setApp = (app) => {
  _app = app
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var getApp = exports.getApp = (app) => {
  return _app
};


}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1571306823435);
})()
//# sourceMappingURL=index.js.map