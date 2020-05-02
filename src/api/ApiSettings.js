import axios from 'axios'
import store from '../store'
import env from '../../env'

export default {
  coreUrl: env.API_URL,
  apiUrl: env.API_URL + '/api/',

  /**
   * Http Default
   */
  http: axios.create({}),

  /**
   * Fetch Api Token from store
   */
  updateAccessToken: function () {
    //console.log('setting token ' + store.getters.accessToken)
    this.http.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.accessToken;
  },

  /**
   * Get Api App route
   *
   * @param additional
   * @returns {string}
   */
  apiRoute: function (additional) {
    this.updateAccessToken();
    return this.apiUrl + additional
  },


  /**
   * Get Api App route with Role
   *
   * @param additional
   * @returns {string}
   */
  apiRoleRoute: function (additional) {
    this.updateAccessToken();
    let role = store.getters.userRole;
    if(role == 'admin'){
      role = 'backoffice';
    }
    return this.apiUrl +'role/'+ role + '/' + additional
  },
}
