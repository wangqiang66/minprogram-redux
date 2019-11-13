/**
 * function: app
 * author  : wq
 * update  : 2019/11/13 9:04
 */
function setData(key, value, context) {
  const Fn = Function
  return (new Fn('key', 'value', 'context', `return context[key] = value`))(key, value, context)
}

class PageClass {
  constructor(config) {
    this.data = {}
    const _config = config || {}
    Object.keys(_config).forEach(key => {
      this[key] = _config[key]
    })
    const onLoad = this.onLoad
    this.onLoad = (query) => {
      if (typeof onLoad === 'function') {
        onLoad.call(this, query)
      }
    }
    const onShow = this.onShow
    this.onShow = () => {
      if (typeof onShow === 'function') {
        onShow.call(this)
      }
    }
    const onReady = this.onReady
    this.onReady = (query) => {
      if (typeof onReady === 'function') {
        onReady.call(this)
      }
    }
    const onHide = this.onHide
    this.onHide = () => {
      if (typeof onHide === 'function') {
        onHide.call(this)
      }
    }
    const onUnload = this.onUnload
    this.onUnload = () => {
      if (typeof onUnload === 'function') {
        onUnload.call(this)
      }
    }
    const onPullDownRefresh = this.onPullDownRefresh
    this.onPullDownRefresh = () => {
      if (typeof onPullDownRefresh === 'function') {
        onPullDownRefresh.call(this)
      }
    }
    const onReachBottom = this.onReachBottom
    this.onReachBottom = () => {
      if (typeof onReachBottom === 'function') {
        onReachBottom.call(this)
      }
    }
    const onPageScroll = this.onPageScroll
    this.onPageScroll = (options) => {
      if (typeof onPageScroll === 'function') {
        onPageScroll.call(this, options)
      }
    }
    const onShareAppMessage = this.onShareAppMessage
    this.onShareAppMessage = (options) => {
      if (typeof onShareAppMessage === 'function') {
        onShareAppMessage.call(this, options)
      }
    }
    const onResize = this.onResize
    this.onResize = (options) => {
      if (typeof onResize === 'function') {
        onResize.call(this, options)
      }
    }
    const onTabItemTap = this.onTabItemTap
    this.onTabItemTap = (options) => {
      if (typeof onTabItemTap === 'function') {
        onTabItemTap.call(this, options)
      }
    }
    this.onLoad()
    this.onShow()
    this.onReady()
  }

  setData(options) {
    const keys = Object.keys(options)
    keys.forEach(key => {
      setData(key, options[key], this.data)
    })
  }
}

export default function Page(config) {
  return new PageClass(config)
}
