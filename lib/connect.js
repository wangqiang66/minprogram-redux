/**
 * function: connect
 * author  : wq
 * update  : 2019/5/23 10:36
 */
import shallowEqual, { updateState, debounce } from './shallowEqual'
import warning from './warning'
import wrapActionCreators from './wrapActionCreators.js'
import { getStore } from './store'

const defaultMapStateToProps = state => ({})
const defaultMapDispatchToProps = dispatch => ({ dispatch })

export default function connect(mapState = defaultMapStateToProps, mapDispatch = defaultMapDispatchToProps, preLoad = true) {
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
      return { ...pageConfig, methods: { ...pageConfig.methods, ...mapDispatch(store.dispatch, store.getState()) }, didMount, didUnmount }
    } else {
      return { ...pageConfig, ...mapDispatch(store.dispatch, store.getState()), onLoad, onUnLoad }
    }
  }
}
