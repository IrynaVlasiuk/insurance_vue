import ApiSettings from '../ApiSettings'

/**
 * Contract API Resource
 */
export default {
  /**
   * Get All Contracts
   * @returns {*}
   */
  getContracts: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('contract'))
  },
  /**
   * Get Contract by ID
   * @param id
   * @returns {*}
   */
  getContract: function (id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('contract/' + id))
  },
  /**
   * Get Contract Claims
   * @param id
   * @returns {*}
   */
  getContractClaims: function (id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('contract/' + id + '/claim'))
  }
}
