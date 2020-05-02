import ApiSettings from './../../api/ApiSettings'
import i18n from './../../lang'

export default {
  state: {
    userAccessToken: null,
    user: null,
  },
  getters: {
    isLoggedIn (state) {
      return !!state.userAccessToken
    },
    currentUser (state) {
      return state.user
    },
    userRole (state) {
      return (state.user) ? state.user.type.name : null
    },
    isAuthenticated (state) {
      return !!state.userAccessToken
    },
    isAgent(state) {
      return state.user.type.name == 'agent';
    },
    accessToken (state) {
      return (state.user && state.userAccessToken) ? state.userAccessToken.token : null
    },
    userLocale (state) {
      return (state.user) ? state.user.locale : 'fr'
    },
    isAuthAdmin (state) {
      return (state.user) ? (state.user.type.name === 'backoffice' || state.user.type.name === 'admin') : null
    },
    isBackoffice (state) {
      return (state.user) ? (state.user.type.name === 'backoffice') : null
    },
    defaultArea (state) {
      return (state.user) ? (state.user.area_id) : null
    }
  },
  mutations: {
    setUser (state, payload) {
      console.log('setUser Mutation');
      state.userAccessToken = Object.assign({}, {token: payload.access_token})
      ApiSettings.updateAccessToken(payload.access_token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload.access_token}`
      state.user = Object.assign({}, payload)
    },
    setUserDetails(state, payload) {
      console.log('setUserDetails Mutation');
      state.user = Object.assign({}, payload)
    },
    logout (state) {
      state.user = null
      state.userAccessToken = null
    },
    setLocale (state, data) {
      state.user.locale = data
    }
  },
  actions: {
    setAuthUser (context, data) {
      context.commit('setUser', data)
    },
    setUserDetails(context, data) {
      context.commit('setUserDetails', data)
    },
    setUserLocale (context, data) {
      context.commit('setLocale', data)
    },
    logout (context) {
      context.commit('logout')
    }
  }
}
