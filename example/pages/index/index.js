// index.js
import { connect } from '@ddjf/minprogram-redux/index'
import { languageTypeUpdate } from '../../redux/actions/index'

const mapStateToData = state => {
  console.log(11111111, state)
  return {
    language: state.language
  }
}

const mapDispatchToPage = (dispatch, state) => ({
  languageTypeUpdate: (type) => dispatch(languageTypeUpdate(type)),
})

Page(connect(mapStateToData, mapDispatchToPage)({
  switchTab(e) {
    const type = e.target.dataset.type
    this.languageTypeUpdate(type)
  }
}))
