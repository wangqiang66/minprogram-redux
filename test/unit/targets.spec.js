/**
 * function: targets.spec
 * author  : wq
 * update  : 2019/11/12 15:15
 */
import Targets from '../../lib/Targets'

describe('Targets', () => {
  it('Wechat Target', () => {
    const wechatTarget = Targets['Wechat']
    expect(wechatTarget.name).toBe('Wechat')
    expect(wechatTarget.connectComponentLife).toBe('attached')
    expect(wechatTarget.disconnectComponentLife).toBe('detached')
    expect(wechatTarget.connectPageLife).toBe('onLoad')
    expect(wechatTarget.disconnectPageLife).toBe('onUnload')
  })
  it('Alipay Target', () => {
    expect(Targets['Alipay']).toEqual({
      connectComponentLife: 'didMount',
      disconnectComponentLife: 'didUnmount',
      connectPageLife: 'onLoad',
      disconnectPageLife: 'onUnload',
      name: 'Alipay'
    })
  })
  it('DingTalk Target', () => {
    expect(Targets['DingTalk']).toEqual({
      connectComponentLife: 'didMount',
      disconnectComponentLife: 'didUnmount',
      connectPageLife: 'onLoad',
      disconnectPageLife: 'onUnload',
      name: 'DingTalk'
    })
  })
})
