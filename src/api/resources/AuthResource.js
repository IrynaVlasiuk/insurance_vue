import ApiSettings from '../ApiSettings'

/**
 * Auth Api Resource
 */
export default {

  /**
   * Login
   * @returns {*}
   */
  login: function (data) {
    return ApiSettings.http.post(ApiSettings.coreUrl + '/oauth/token', data)
  },

  forgotPassword: function (data) {
    return ApiSettings.http.post(ApiSettings.apiRoute('password/email'), data)
  },


  me: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('me'))
  },

  authWithUser (user_id) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('user/authenticate/' + user_id))
  }
}
