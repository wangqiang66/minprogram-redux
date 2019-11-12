/**
 * function: warning.spec
 * author  : wq
 * update  : 2019/11/12 15:24
 */
import warning from '../../lib/warning'

describe('Warning', () => {
  beforeEach(() => {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      const doError = jest.fn()
      console.error = doError
    }
  })

  it('Warning Function Param String', () => {
    const data = '1111111'
    try {
      warning(data)
    } catch (e) {
      expect(e).toBe(data)
    }
  })

  it('Warning Function Param Object', () => {
    const data = {
      message: "111111111"
    }
    try {
      warning(data)
    } catch (e) {
      expect(e).toEqual(data)
    }
  })

  it('console.error Function', () => {
    const data = {
      message: "111111111"
    }
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      const doError = jest.fn()
      console.error = doError
      warning(data)
      expect(doError).toBeCalled()
      expect(doError).toBeCalledWith(data)
    }
  })
})
