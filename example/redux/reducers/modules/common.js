/**
 * function: user
 * author  : wq
 * update  : 2019/5/22 17:36
 */
import languageText from '../../../illn/index.js'
import { LANGUAGE_TYPE_UPDATE } from '../../types/index'

const defaultLanguageType = 'zh_cn'
const defaultLanguage = languageText[defaultLanguageType]

export const language = (state = defaultLanguage, action) => {
  switch (action.type) {
    case LANGUAGE_TYPE_UPDATE:
      return {
        ...languageText[action.languageType]
      }
    default:
      return state
  }
}
