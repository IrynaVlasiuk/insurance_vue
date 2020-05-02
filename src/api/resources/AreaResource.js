import ApiSettings from '../ApiSettings'

/**
 * Area API Resource
 */
export default {

  /**
   * Get Areas
   * @returns {*}
   */
  getAreas: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('area'))
  }

}
