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

export function debounce(fn, delay) {
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
}

export function updateState(state, oldState, path) {
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
}

export default function shallowEqual(objA, objB) {
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
}
