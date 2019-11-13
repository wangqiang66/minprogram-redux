/**
 * function: index
 * author  : wq
 * update  : 2019/5/23 15:41
 */
import Provider from './Provider.js'
import connect from './connect.js'
import { setApp, getApp } from './app.js'
import createStore from './createStore'

module.exports = {
  Provider: Provider,
  connect: connect,
  setApp,
  getApp,
  createStore
}
