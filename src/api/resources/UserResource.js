import ApiSettings from '../ApiSettings'

/**
 * User API Resource
 */
export default {

/**
 *
 * @returns {*}
 */
  getAllUsers: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoute('user'), {params: params})
  },

  getActiveUsers: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('user/active'), {params: params})
  },

  searchUsersByCriteria: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoute('user/search/criteria'), {params: params})
  },

  getUser: function (id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('user/' + id))
  },

  getUserDetails: function (id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('user/' + id + '/details'))
  },

  /**
   *
   * @returns {*}
   */
  getAuthUserProfile: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('me'))
  },

  /**
   *
   * @returns {*}
   */
  updateAuthUserProfile: function (body) {
    return ApiSettings.http.post(ApiSettings.apiRoute('me'), body)
  },

  updateUserProfile: function (user_id, body) {
    return ApiSettings.http.patch(ApiSettings.apiRoleRoute('user/' + user_id), body)
  },

  createUser: function (user_id, body) {
    return ApiSettings.http.post(ApiSettings.apiRoleRoute('user'), body)
  },

  getScopes: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('scope'))
  },

  getTypes: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('type'))
  },

  pingPong: function() {
    return ApiSettings.http.get(ApiSettings.apiRoute('ping'))
  }


}
