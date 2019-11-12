/**
 * function: index.spec
 * author  : wq
 * update  : 2019/11/12 18:04
 */
import { combineReducers, createStore } from 'redux'
import { Provider, connect } from '../../lib/index'

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
const store = createStoreObject()

describe('Index', () => {

  beforeAll(() => {
    const appConfig = {}
    App(Provider(store)(appConfig))
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
    const page = Page(pageConnect(pageConfig))
    expect(page.data.language).toBeDefined()
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
    const component = Component(pageConnect(pageConfig))
    expect(component.data.language).toBeDefined()
    //
  })
})
