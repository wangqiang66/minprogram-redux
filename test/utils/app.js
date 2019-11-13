/**
 * function: app
 * author  : wq
 * update  : 2019/11/13 9:04
 */
class AppClass {

  constructor(config) {
    const _config = config || {}
    Object.keys(_config).forEach(key => {
      this[key] = _config[key]
    })
    const onLaunch = this.onLaunch
    this.onLaunch = (options) => {
      if (typeof onLaunch === 'function') {
        onLaunch.call(this, options)
      }
    }
    const onShow = this.onShow
    this.onShow = (options) => {
      if (typeof onShow === 'function') {
        onShow.call(this, options)
      }
    }
    const onHide = this.onHide
    this.onHide = () => {
      if (typeof onHide === 'function') {
        onHide.call(this)
      }
    }
    const onError = this.onError
    this.onError = (error) => {
      if (typeof onError === 'function') {
        onError.call(this, error)
      }
    }
    const onPageNotFound = this.onPageNotFound
    this.onPageNotFound = (options) => {
      if (typeof onPageNotFound === 'function') {
        onPageNotFound.call(this, options)
      }
    }
    this.onLaunch()
    this.onShow()
  }
}

export default function App(config) {
  return new AppClass(config)
}
