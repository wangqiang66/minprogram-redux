/**
 * function: wrapActionCreators.spec
 * author  : wq
 * update  : 2019/11/12 15:24
 */
import wrapActionCreators from '../../src/wrapActionCreators'

describe('WrapActionCreators', () => {
  it("WrapActionCreators Params Function", () => {
    const fn = jest.fn()
    const action = wrapActionCreators(fn)
    expect(typeof action === 'function').toBeTruthy()
    const defaultMapDispatchToProps = dispatch => ({ dispatch })
    const params = [111, 2222, {}]
    const actionReturn = action(defaultMapDispatchToProps)
    expect(typeof actionReturn === 'function').toBeTruthy()
    // expect(fn).toBeCalledWith(111, 222, {})
    actionReturn(params)
    expect(fn).toBeCalled()
    expect(fn).toBeCalledWith(params)
  })
  it("WrapActionCreators Params null", () => {
    const fn = null
    try {
      wrapActionCreators(fn)
    } catch (e) {
      expect(e).toBe('bindActionCreators expected an object or a function, instead received ' + (fn === null ? 'null' : typeof fn) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?')
    }
  })
  it("WrapActionCreators Params String", () => {
    const fn = '11111'
    try {
      wrapActionCreators(fn)
    } catch (e) {
      expect(e).toBe('bindActionCreators expected an object or a function, instead received ' + (fn === null ? 'null' : typeof fn) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?')
    }
  })
  it("WrapActionCreators Params Number", () => {
    const fn = 11111
    try {
      wrapActionCreators(fn)
    } catch (e) {
      expect(e).toBe('bindActionCreators expected an object or a function, instead received ' + (fn === null ? 'null' : typeof fn) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?')
    }
  })
  it("WrapActionCreators Params Object", () => {
    const fn = jest.fn()
    const obj = {
      a: fn,
      b: fn
    }
    const defaultMapDispatchToProps = dispatch => ({ dispatch })
    const action = wrapActionCreators(obj)
    const actionReturn = action(defaultMapDispatchToProps)
    const keys = Object.keys(actionReturn)
    expect(keys).toEqual(['a', 'b'])
    const params = [111, 2222, {}]
    keys.forEach(item => {
      actionReturn[item].apply(undefined, params)
    })
    expect(fn).toBeCalledTimes(2)
    expect(fn).toBeCalledWith(111, 2222, {})
  })
})
