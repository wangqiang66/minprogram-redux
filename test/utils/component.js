/**
 * function: app
 * author  : wq
 * update  : 2019/11/13 9:04
 */
function setData(key, value, context) {
  const Fn = Function
  return (new Fn('key', 'value', 'context', `return context[key] = value`))(key, value, context)
}

class ComponentClass {
  constructor(config) {
    this.data = {}
    this.properties = {}
    const _config = config || {}
    Object.keys(_config).forEach(key => {
      if (key === 'methods') {
        Object.keys(_config[key]).forEach(item => {
          this[item] = _config[key][item]
        })
      } else {
        this[key] = _config[key]
      }
    })
    const created = this.created
    this.created = (query) => {
      if (typeof created === 'function') {
        created.call(this, query)
      }
    }
    const attached = this.attached
    this.attached = () => {
      if (typeof attached === 'function') {
        attached.call(this)
      }
    }
    const ready = this.ready
    this.ready = (query) => {
      if (typeof ready === 'function') {
        ready.call(this)
      }
    }
    const moved = this.moved
    this.moved = () => {
      if (typeof moved === 'function') {
        moved.call(this)
      }
    }
    const detached = this.detached
    this.detached = () => {
      if (typeof detached === 'function') {
        detached.call(this)
      }
    }
    this.created()
    this.attached()
    this.ready()
  }

  setData(options) {
    const keys = Object.keys(options)
    keys.forEach(key => {
      setData(key, options[key], this.data)
    })
  }
}

export default function Component(config) {
  return new ComponentClass(config)
}
