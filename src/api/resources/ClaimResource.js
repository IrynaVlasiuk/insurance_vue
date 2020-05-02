import ApiSettings from '../ApiSettings'

/**
 * Claim API Resource
 */
export default {
  /**
   * Get Claim
   * @returns {*}
   */
  getClaim: function (claim_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/' + claim_id))
  },

  /**
   * Get Claim
   * @returns {*}
   */
  getUserClaims: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('claim'), {params: params})
  },

  getUserClaimsGeoData: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('claim/geo-data'), {params: params})
  },

  /**
   * Get Claim DamageTypes Dictionary
   * @returns {*}
   */
  getClaimDamageTypesDictionary: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/damage-type/dictionary'))
  },

  getClaimCreateDamageTypesDictionary: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/create/damage-type/dictionary'))
  },

  /**
   * Get Claim DamageTypes Dictionary
   * @returns {*}
   */
  getClaimStatusesDictionary: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/status/dictionary'))
  },

  searchUserClaimsByCriteria: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('claim/search/criteria'), {params: params})
  },

  claimRoleCustomRequest: function (path, params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute(path), {params: params})
  },

  getClaims: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/'), {params: params})
  },

  delegate: function (claim_id, body) {
    return ApiSettings.http.post(ApiSettings.apiRoute('claim/' + claim_id + '/assessor/chief/delegate'), body)
  },

  assignManager: function (claim_id, body) {
    return ApiSettings.http.post(ApiSettings.apiRoute('claim/' + claim_id + '/assessor/manager/assign'), body)
  },

  assignAssistants: function (claim_id, body) {
    return ApiSettings.http.post(ApiSettings.apiRoute('claim/' + claim_id + '/assessor/assistants/assign'), body)
  },

  searchByCriteria: function (params) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/search/criteria'), {params: params})
  },

  getClaimDamageSurveys: function (claim_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/' + claim_id + '/survey'))
  },

  getClaimHistory: function (claim_id, params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('claim/' + claim_id + '/history'), {params: params})
  },

  createClaim: function (body) {
    return ApiSettings.http.post(ApiSettings.apiRoute('claim'), body)
  },


  validateByRole: function (claim_id, role) {
    return ApiSettings.http.patch(ApiSettings.apiRoleRoute('claim/' + claim_id + '/validate/' + role))
  },


  setClaimStatus: function (claim_id, status) {
    return ApiSettings.http.patch(ApiSettings.apiRoleRoute('claim/' + claim_id + '/status/' + status))
  },

  storeClaimComment: function (claim_id, body) {
    return ApiSettings.http.patch(ApiSettings.apiRoute('claim/comment/' + claim_id ), body)
  }
}
