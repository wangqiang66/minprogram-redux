/**
 * function: search
 * author  : wq
 * update  : 2019/8/1 14:44
 */
import { LANGUAGE_UPDATE, LANGUAGE_TYPE_UPDATE } from '../types/index'

export function languageUpdate(language) {
  return {
    type: LANGUAGE_UPDATE,
    language
  }
}

export function languageTypeUpdate(type) {
  return {
    type: LANGUAGE_TYPE_UPDATE,
    languageType: type
  }
}
