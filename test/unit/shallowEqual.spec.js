/**
 * function: shallowEqual.spec
 * author  : wq
 * update  : 2019/11/12 15:23
 */
import shallowEqual, { debounce, updateState } from '../../lib/shallowEqual'

describe('ShallowEqual', () => {
  it('ShallowEqual', () => {
    const a = { a: 1, b: 2 }
    const b = { a: 1, b: 2, c: 3 }
    expect(shallowEqual(a, b)).toBeFalsy()
    expect(shallowEqual(a, { a: 1, b: 2 })).toBeTruthy()
  })
  it('debounce', () => {
    const fn = jest.fn()
    const callback = debounce(fn, 200)
    callback()
    callback()
    expect(fn).not.toBeCalled()
    setTimeout(() => {
      expect(fn).toBeCalled()
      expect(fn).toBeCalledTimes(1)
    }, 200)
  })

  it('updateState single Type', () => {
    let state = 111
    let oldState = {}
    let newState = { a: 1111 }
    expect(updateState(state, oldState)).toEqual({})
    expect(updateState(newState, oldState)).toEqual(newState)
    expect(updateState(newState, { a: 2222 })).toEqual({ a: 1111 })
    expect(updateState(newState, { a: 2222, c: 11111 })).toEqual({ a: 1111 })
  })

  it('updateState Mil Type Object', () => {
    const state = {
      a: {
        a: 111,
        b: {
          b: 22222222,
          c: 22222222
        }
      }
    }
    const oldState = {
      a: {
        a: 22222,
        b: {
          b: 22222222,
          d: 22222222
        }
      },
      c: 22222
    }
    expect(updateState(state, oldState)).toEqual({
      'a.a': 111,
      'a.b.c': 22222222
    })
  })

  it('updateState Mil Type Array', () => {
    let state = {
      a: {
        a: 111,
        b: ['a', 'c']
      }
    }
    let oldState = {
      a: {
        a: 22222,
        b: ['b', 'c']
      },
      c: 22222
    }
    expect(updateState(state, oldState)).toEqual({
      'a.a': 111,
      'a.b[0]': 'a'
    })
    oldState = {
      a: {
        a: 22222,
        b: ['b', 'c', 'd']
      }
    }
    expect(updateState(state, oldState)).toEqual({
      'a.a': 111,
      'a.b': ['a', 'c']
    })
  })
})
