import * as types from './mutation-types.js'
const mutations = {
  [types.SET_MATCHXLH_STATUS](state, status) {
    state.matchXlhStatus = status
  },
  [types.SET_IS_SELECT](state, status) {
    state.isSelect = status
  },
  [types.SET_AUTH_STATUS](state, auth) {
    state.authStatus = auth
  }
}
export default mutations
