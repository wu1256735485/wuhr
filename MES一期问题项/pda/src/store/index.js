import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // vuex调试工具
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user
  },
  getters,
  mutations,
  state,
  strict: debug, // debug测试工具需要遵循严格模式
  plugins: debug ? [createLogger()] : [] // 开发环境下vuex数据修改打印日志
})
