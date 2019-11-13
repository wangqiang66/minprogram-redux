/**
 * function: Targets
 * author  : wq
 * update  : 2019/11/5 16:12
 */
export default {
  Wechat: {
    connectComponentLife: 'attached',
    disconnectComponentLife: 'detached',
    connectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'Wechat'
  },
  Alipay: {
    connectComponentLife: 'didMount',
    disconnectComponentLife: 'didUnmount',
    connectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'Alipay'
  },
  DingTalk: {
    connectComponentLife: 'didMount',
    disconnectComponentLife: 'didUnmount',
    connectPageLife: 'onLoad',
    disconnectPageLife: 'onUnload',
    name: 'DingTalk'
  }
}
