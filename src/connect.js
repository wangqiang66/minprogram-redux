/**
 * function: connect
 * author  : wq
 * update  : 2019/5/23 10:36
 */
import shallowEqual, { updateState, debounce } from './shallowEqual'
import warning from './warning'
import wrapActionCreators from './wrapActionCreators.js'
import { getStore } from './store'
import Targets  from './Targets'

const defaultMapStateToProps = () => ({})
const defaultMapDispatchToProps = dispatch => ({ dispatch })

export default function connect(mapState = defaultMapStateToProps, mapDispatch = defaultMapDispatchToProps, preLoad = false) {
  const shouldSubscribe = Boolean(mapState)
  const store = getStore()
  if (typeof mapDispatch !== 'function') {
    mapDispatch = wrapActionCreators(mapDispatch)
  }

  return function wrapWithConnect(pageConfig, target = Targets.Wechat.name) {
    // 推迟10ms支持，便于setData的一次性数据传递，避免多次比较
    const handleChange = debounce(function(options) {
      if (!this.unsubscribe) {
        return false
      }
      const state = this.$store.getState()
      const mappedState = mapState.call(this, state, options)
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
      const mappedState = mapState.call(this, state, options)
      if (preLoad) {
        pageConfig.data = { ...(pageConfig.data || {}), ...(mappedState || {}) }
      } else {
        this.setData(mappedState || {})
      }
    }
    let _didMount
    let _didUnmount
    if (pageConfig.isComponent) {
      _didMount = pageConfig[Targets[target].connectComponentLife]
      _didUnmount = pageConfig[Targets[target].disconnectComponentLife]
    } else {
      _didMount = pageConfig[Targets[target].connectPageLife]
      _didUnmount = pageConfig[Targets[target].disconnectPageLife]
    }
    if (preLoad) {
      setPageData()
    }

    function didMount(options) {
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
      return { ...pageConfig, methods: { ...pageConfig.methods, ...mapDispatch(store.dispatch, store.getState()) }, [Targets[target].connectComponentLife]: didMount, [Targets[target].disconnectComponentLife]: didUnmount }
    } else {
      return { ...pageConfig, ...mapDispatch(store.dispatch, store.getState()), [Targets[target].connectPageLife]: didMount, [Targets[target].disconnectPageLife]: didUnmount }
    }
  }
}
