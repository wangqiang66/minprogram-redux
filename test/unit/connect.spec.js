/**
 * function: connect.spec
 * author  : wq
 * update  : 2019/11/12 15:14
 */
import connect from '../../src/connect'
import { setStore } from '../../src/store'

// 这个需要配合Provide一起测试
describe('Connect', () => {
  const languageTypeUpdate = jest.fn()
  let pageConnect
  setStore({
    getState: () => {
      language: {
        cn: '中文'
      }
    },
    dispatch: (dispatch) => dispatch
  })
  beforeEach(() => {
    const mapStateToData = state => {
      return {
        language: state.language
      }
    }
    const mapDispatchToPage = (dispatch, state) => ({
      languageTypeUpdate: (type) => dispatch(languageTypeUpdate(type)),
    })
    pageConnect = connect(mapStateToData, mapDispatchToPage)
  })
  it('Connent Page', () => {
    const pageConfig = {
      switchTab(e) {
        const type = e.target.dataset.type
        this.languageTypeUpdate(type)
      }
    }
    expect(pageConnect(pageConfig).languageTypeUpdate).toBeDefined()
    //
  })
  it('Connent Component', () => {
    const pageConfig = {
      isComponent: true,
      switchTab(e) {
        const type = e.target.dataset.type
        this.languageTypeUpdate(type)
      }
    }
    expect(pageConnect(pageConfig).methods.languageTypeUpdate).toBeDefined()
    //
  })
})
