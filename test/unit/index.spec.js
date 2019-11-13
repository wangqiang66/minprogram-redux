/**
 * function: 需要小程序环境
 * author  : wq
 * update  : 2019/11/12 18:04
 */
import { combineReducers, createStore } from 'redux'
import { Provider, connect } from '../../src/index'

const LANGUAGE_TYPE_UPDATE = 'LANGUAGE_TYPE_UPDATE'

function languageTypeUpdate(type) {
  return {
    type: LANGUAGE_TYPE_UPDATE,
    languageType: type
  }
}

const languageText = {
  'cn': {
    word: '中文'
  },
  'en': {
    word: 'English'
  }
}

const language = (state = languageText['cn'], action) => {
  switch (action.type) {
    case LANGUAGE_TYPE_UPDATE:
      return {
        ...languageText[action.languageType]
      }
    default:
      return state
  }
}

const reducer = combineReducers({ language })

const createStoreObject = (data = {}) => {
  return createStore(reducer, data)
}

describe('Index', () => {
  let pageConnect

  beforeEach(() => {
    const store = createStoreObject()
    const appConfig = {}
    App(Provider(store)(appConfig))
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
      switchTab(type) {
        this.languageTypeUpdate(type)
      }
    }
    const page = Page(pageConnect(pageConfig))
    expect(page.data.language).toBeDefined()
    expect(page.data.language).toEqual({
      word: '中文'
    })
    expect(page.languageTypeUpdate).toBeDefined()
    page.switchTab('en')
    expect(page.data.language).toEqual({
      word: '中文'
    })
    setTimeout(() => {
      expect(page.data.language).toEqual({
        word: 'English'
      }, 100)
    })
    //
  })
  it('Connent Component', () => {
    const pageConfig = {
      isComponent: true,
      methods: {
        switchTab(type) {
          this.languageTypeUpdate(type)
        }
      }
    }
    const component = Component(pageConnect(pageConfig))
    expect(component.data.language).toBeDefined()
    expect(component.data.language).toEqual({
      word: '中文'
    })
    expect(component.languageTypeUpdate).toBeDefined()
    component.switchTab('en')
    expect(component.data.language).toEqual({
      word: '中文'
    })
    setTimeout(() => {
      expect(component.data.language).toEqual({
        word: 'English'
      }, 100)
    })
    //
  })
})
