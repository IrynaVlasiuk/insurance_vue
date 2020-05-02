import ApiSettings from '../ApiSettings'

/**
 * Assessor API Resource
*/
export default {

  /**
   * Get Available Area Assessors for Claim
   * @returns {*}
   */
  getAvailableAssessors: function (claim_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/' + claim_id + '/assessor/available'))
  },

  /**
   * Get Claim Assistants
   * @param claim_id
   * @returns {*}
   */
  getClaimAssistants: function (claim_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/' + claim_id + '/assistant-assessors'))
  },


  /**
   * Get Manager Assessors
   * @returns {*}
   */
  getManagerAssessors: function() {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessor/manager'));
  }

}
