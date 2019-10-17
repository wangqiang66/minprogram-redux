// index.js
import { connect } from 'minprogram-redux/lib/index'
import { languageTypeUpdate } from '../../redux/actions'

const mapStateToData = state => {
  return {
    language: state.language
  }
}

const mapDispatchToPage = (dispatch, state) => ({
  languageTypeUpdate: (type) => dispatch(languageTypeUpdate(search)),
})

Page(connect(mapStateToData)({

}))
