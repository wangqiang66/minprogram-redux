/**
 * function: index
 * author  : wq
 * update  : 2019/5/23 15:41
 */
import Provider from './Provider.js'
import connect from './connect.js'
import createStore from './createStore'
import { combineReducers } from 'redux'

module.exports = {
  Provider: Provider,
  connect: connect,
  createStore,
  combineReducers
}
