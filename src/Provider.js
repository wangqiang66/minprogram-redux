/**
 * function: Provider
 * author  : wq
 * update  : 2019/5/23 15:41
 */
import warning from './warning.js'
import { setStore } from './store'

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

export default Provider
