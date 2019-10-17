/**
 * function: store
 * author  : wq
 * update  : 2019/5/27 11:38
 */
let _store = null

export const setStore = (store) => {
  _store = store
}

export const getStore = () => {
  return _store
}
