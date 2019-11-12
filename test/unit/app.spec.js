/**
 * function: app.spec.js
 * author  : wq
 * update  : 2019/11/12 14:23
 */
import { setApp, getApp } from '../../lib/app'

describe('App', () => {
  it('setApp', () => {
    const data = 111
    setApp(data)
    expect(getApp().toBe(data))
  })
  it('setApp', () => {
    const data = {}
    setApp(data)
    expect(getApp().toBe(data))
  })
})
