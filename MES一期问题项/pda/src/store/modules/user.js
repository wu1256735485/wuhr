import {
  getNoahsessionID,
  setNoahsessionID,
  getNoaToken,
  setNoaToken,
  setLanguage
} from '@/common/js/auth'

const user = {
  state: {
    user: '',
    token: {
      noahsessionID: getNoahsessionID(),
      noaToken: getNoaToken()
    },
    name: '',
    username: '',
    userId: '',
    password: '',
    businessId: '1',
    language: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      // console.info(token.noahsessionID)
      // console.info(token.noaToken)
      state.token.noahsessionID = token.noahsessionID
      state.token.noaToken = token.noaToken
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_PASSWORD: (state, password) => {
      state.password = password
    },
    SET_BUSINESS: (state, businessId) => {
      state.businessId = businessId
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    }
  },

  actions: {
    // 模拟登陆
    SimulateLogin({
      commit
    }, userInfo) {
      console.info('noahsessionID..........' + userInfo.noahsessionID)
      console.info('noaToken..........' + userInfo.noaToken)
      console.info('language..........' + userInfo.language)
      if (userInfo.noahsessionID && userInfo.noaToken) {
        commit('SET_TOKEN', {
          noahsessionID: userInfo.noahsessionID,
          noaToken: userInfo.noaToken
        })
        setNoaToken(userInfo.noaToken)
        setNoahsessionID(userInfo.noahsessionID)
      }
      if (userInfo.username) {
        commit('SET_USERNAME', userInfo.username)
      }
      if (userInfo.businessId) {
        commit('SET_BUSINESS', userInfo.businessId)
      }
      if (userInfo.language) {
        commit('SET_LANGUAGE', userInfo.language)
        setLanguage(userInfo.language)
      }
      return 'sucess'
    }
  }
}

export default user
