/**
 * function: store.spec
 * author  : wq
 * update  : 2019/11/12 15:24
 */
import { setStore, getStore } from '../../lib/store'

describe('Store', () => {
  it('setStore Number', () => {
    const data = 111
    setStore(data)
    expect(getStore()).toBe(data)
  })
  it('setStore Object', () => {
    const data = {}
    setStore(data)
    expect(getStore()).toEqual(data)
  })
})
