import ApiSettings from '../ApiSettings'

/**
 * ClaimPlot API Resource
 */
export default {
  /**
   * ClaimPlots for Claim
   * @returns {*}
   */
  getClaimPlotsForClaim: function (claim_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim/' + claim_id + '/claim-plot'))
  },

  /**
   * Get Claim Plot
   * @param claim_plot_id
   * @returns {*}
   */
  getClaimPlot: function (claim_plot_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('claim-plot/' + claim_plot_id))
  },



}
