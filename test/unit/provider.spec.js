/**
 * function: provider.spec
 * author  : wq
 * update  : 2019/11/12 15:15
 */
import Provider from '../../lib/Provider'
import { getStore } from '../../lib/store'

describe('Provider', () => {
  it('Provider Store Error', () => {
    const store = {}
    try {
      Provider(store)
    } catch (e) {
      expect(e).toBe('Store似乎不是一个合法的Redux Store对象: ' +
        '缺少这些方法: ' + ['subscribe', 'dispatch', 'getState'].join(', ') + '。')
    }
  })

  it('Provider Store Error', () => {
    const store = {
      subscribe: function(e) {}
    }
    try {
      Provider(store)
    } catch (e) {
      expect(e).toBe('Store似乎不是一个合法的Redux Store对象: ' +
        '缺少这些方法: ' + ['dispatch', 'getState'].join(', ') + '。')
    }
  })

  it('Provider Store Error', () => {
    const store = {
      subscribe: function(e) {},
      dispatch: () => ({}),
      getState: () => ({})
    }
    const storeData =  Provider(store)
    expect(typeof storeData === 'function').toBeTruthy()
    const appConfig = {
      onLaunch() {}
    }
    expect(storeData(appConfig)).toEqual({
      ...appConfig, store
    })
    expect(getStore()).toEqual(store)
  })
})
