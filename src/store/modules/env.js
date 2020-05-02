import env from '../../../env'

export default {
  state: {
    config: null,
  },
  getters: {
    config (state) {
      return state.config
    },
    instance (state) {
      return state.config.INSTANCE
    },
    INSTANCE_NAVBAR_COLOR (state) {
      return state.config.INSTANCE_NAVBAR_COLOR
    },
    apiUrl (state) {
      return state.config.API_URL
    }

  },
  mutations: {
    setConfig (state, data) {
      state.config = data
    },
  },
  actions: {
    setConfig (context, data) {
      context.commit('setConfig', env)
    },
  }
}
