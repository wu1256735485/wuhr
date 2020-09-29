import Cookies from 'js-cookie'

const noahsessionID = 'noahsessionID'
const noaToken = 'noaToken'
const language = 'language'

export function getNoahsessionID() {
  return Cookies.get(noahsessionID)
}

export function setNoahsessionID(token) {
  return Cookies.set(noahsessionID, token)
}

export function removeNoahsessionID() {
  return Cookies.remove(noahsessionID)
}

export function getNoaToken() {
  return Cookies.get(noaToken)
}

export function setNoaToken(token) {
  return Cookies.set(noaToken, token)
}

export function removeNoaToken() {
  return Cookies.remove(noaToken)
}

export function getLanguage() {
  return Cookies.get(language) || 'zh'
}

export function setLanguage(locale) {
  return Cookies.set(language, locale)
}

export function removeLanguage() {
  return Cookies.remove(language)
}
