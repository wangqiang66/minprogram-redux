/**
 * function: Targets
 * author  : wq
 * update  : 2019/11/5 16:12
 */
export default {
  Wechat: {
    connectComponentLife: 'attached',
    disconnectComponenentLife: 'detached',
    conectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'Wechat'
  },
  Alipay: {
    connectComponentLife: 'didMount',
    disconnectComponenentLife: 'didUnmount',
    conectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'Alipay'
  },
  DingTalk: {
    connectComponentLife: 'didMount',
    disconnectComponenentLife: 'didUnmount',
    conectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'DingTalk'
  }
}
