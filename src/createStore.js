/**
 * function: createStore
 * author  : wq
 * update  : 2019/11/13 16:58
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'

const middleWare = applyMiddleware(thunk, promise, logger)

export default (reducer, data = {}) => {
  return createStore(reducer, data, middleWare)
}
