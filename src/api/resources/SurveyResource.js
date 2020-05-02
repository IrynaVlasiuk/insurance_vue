import ApiSettings from '../ApiSettings'

/**
 * Survey API Resource
 */
export default {
  /**
   * Get All Surveys
   * @returns {*}
   */
  getSurveys: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('survey'))
  },

  /**
   * Get Survey
   *
   * @param id
   * @returns {*}
   */
  getSurvey: function(id)
  {
    return ApiSettings.http.get(ApiSettings.apiRoute('survey/'+id))
  },

  /**
   * Store Survey
   *
   * @param body
   * @returns {*}
   */
  storeSurvey: function (body) {
    return ApiSettings.http.post(ApiSettings.apiRoute('survey'), body)
  },

  /**
   * Update Survey
   *
   * @param id
   * @param body
   * @returns {*}
   */
  updateSurvey: function (id, body) {
    return ApiSettings.http.patch(ApiSettings.apiRoute('survey/'+id), body)
  },
  cancelSurvey: function (id, body) {
    return ApiSettings.http.get(ApiSettings.apiRoute('survey/cancel/'+id), body)
  },

  getRoleSpecificSurveys: function() {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('survey'))
  },

  search: function(params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute('survey/search/criteria'), {params: params})
  },


  validateSurveyByManager: function (survey_id) {
    return ApiSettings.http.patch(ApiSettings.apiRoute('survey/' + survey_id + '/validate'))
  },

  unvalidateSurveyByManager: function (survey_id) {
    return ApiSettings.http.patch(ApiSettings.apiRoute('survey/' + survey_id + '/unvalidate'))
  },


  surveyRoleCustomRequest: function (path, params) {
    return ApiSettings.http.get(ApiSettings.apiRoleRoute(path), {params: params})
  },

}

