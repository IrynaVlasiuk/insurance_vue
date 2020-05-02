import ApiSettings from '../ApiSettings'


export default {

  getAssessments: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessment'))
  },

  getAssessmentForPlotSurvey: function(survey_id, assessment_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessment/claim-plot/' + assessment_id+'/survey/'+survey_id))
  },

  getAssessment: function (id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessment/' + id))
  },

  storeAssessment: function(body) {
    return ApiSettings.http.post(ApiSettings.apiRoute('assessment'), body)
  },

  updateAssessment: function (id, body) {
    return ApiSettings.http.patch(ApiSettings.apiRoute('assessment/' + id), body)
  },

  deleteAssessment: function(assessment_id) {
    return ApiSettings.http.delete(ApiSettings.apiRoute('assessment/'+assessment_id))
  },

  getStatuses: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessment/status'))
  },

  getDamageTypes: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessment/damage-type'))
  },

  getCompensationTypes: function () {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessment/compensation-type'))
  },

  getClaimPlotSurveyAssessmsents(claim_plot_id, survey_id) {
    return ApiSettings.http.get(ApiSettings.apiRoute('assessment/claim-plot/'+claim_plot_id+/survey/+survey_id))
  }
}



