/* eslint-disable */
<template>
    <section id="survey-create-page">
        <div class="card" v-loading="loading">
            <div class="card-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card-content text-center">
                            <div>
                                <label>{{$t('labels.survey_datetime')}}</label>
                                <div class="form-group" :class="{ 'form-group--error': $v.survey.datetime_scheduled.$invalid }">
                                    <el-date-picker v-model="survey.datetime_scheduled"
                                                    type="datetime"
                                                    format="dd/MM/yyyy HH:mm:ss"
                                                    value-format="yyyy-MM-dd HH:mm:ss"
                                                    placeholder=""
                                                    :picker-options="pickerOptions1"
                                                    style="width: 100%">
                                    </el-date-picker>
                                    <div class="error" v-if="!$v.survey.datetime_scheduled.required">{{ $t('labels.validation.required') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="card-content text-center">
                            <label>{{$t('labels.survey_select_assistants')}}</label>
                            <el-select multiple class="select-primary"
                                       size="large"
                                       filterable
                                       v-model="survey.assistant_assessor_ids"
                                       style="width: 100%">
                                <el-option v-for="assessor in areaAssessors"
                                           :key="assessor.id"
                                           :label="assessor.full_name"
                                           :value="assessor.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- Note -->
                    <div class="col-sm-12">
                        <div class="card-content">
                            <label>Note</label>
                            <textarea class="form-control"
                                      v-model="survey.note"
                                      placeholder=""
                                      rows="3">
                            </textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card-content space-bottom">
                            <div @click="$router.push('/claims/'+survey.claim_id)"
                                 class="btn btn-fill btn-warning pull-right">{{$t('labels.cancel')}}
                            </div>
                            <div @click="initiateSurveySubmit" class="btn btn-fill btn-success pull-right">
                                <i class="ti-plus"></i>{{$t('labels.survey_save')}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="claim.external_system !== 'local'">
                    <div class="col-xs-12">
                        <div class="card-content">
                            <claim-plot-table :claimPlots="claimPlots"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
  import {DatePicker, Select, Option, Collapse, CollapseItem, OptionGroup} from 'element-ui'
  import swal from 'sweetalert2'
  // import ElOptionGroup from '../../../../../node_modules/element-ui/packages/select/src/option-group.vue'
  import ClaimPlotTable from '../ClaimPlots/components/ClaimPlotTable'
  import AssessorResource from '../../../../api/resources/AssessorResource'
  import ClaimPlotResource from '../../../../api/resources/ClaimPlotResource'
  import SurveyResource from '../../../../api/resources/SurveyResource'
  import {EventBus} from '../../../../bootstrap/event-bus'
  import DateTimePickerDefaultOptions from '../../../../helpers/datepicker/DateTimePickerDefaultOptions'
  import ClaimResource from '../../../../api/resources/ClaimResource'
  import Vue from 'vue'
  import moment from 'moment'
  import {Loading} from 'element-ui'
  import {required} from 'vuelidate/lib/validators'

  Vue.use(Loading.directive)

  Vue.use(Collapse)
  Vue.use(CollapseItem)

  export default {
    name: 'SurveyCreate',
    components: {
      ClaimPlotTable,
      // ElOptionGroup,
      [OptionGroup.name]: OptionGroup,
      [DatePicker.name]: DatePicker,
      [Select.name]: Select,
      [Option.name]: Option
    },
    data: function () {
      return {
        claimPlots: [],
        claim: {},
        loading:false,
        areaAssessors: [],
        survey: {
          datetime_scheduled: null,
          assistant_assessor_ids: [],
          note: '',
          claim_id: this.$route.params.claim_id,
        },
        pickerOptions1: DateTimePickerDefaultOptions
      }
    },
      validations: {
          survey: {
              datetime_scheduled: {
                  required,
              },
          },
      },
    created: function () {
      this.survey.datetime_scheduled = moment().add(1,'day').hours(8).minutes(0).seconds(0).format('YYYY-MM-DD hh:mm:ss');
      this.fetchInitialData()
    },
    methods: {
      /** Fetch Initial Data **/
      fetchInitialData: function () {
        this.fetchClaimPlots()
        this.fetchClaim()
        this.fetchAvailableAssessors()
      },
      /** Fetch ClaimPlots **/
      fetchClaimPlots () {
        ClaimPlotResource.getClaimPlotsForClaim(this.$route.params.claim_id).then(res => {
          this.claimPlots = res.data
        })
      },
      /** Fetch Claim **/
      fetchClaim: function () {
        ClaimResource.getClaim(this.$route.params.claim_id).then(res => {
          this.claim = res.data
        })
      },
      /** Fetch Assessors for dropdown **/
      fetchAvailableAssessors: function () {
        AssessorResource.getClaimAssistants(this.$route.params.claim_id).then(res => {
          this.areaAssessors = res.data
        })
      },
      initiateSurveySubmit: function () {
        if(!this.$v.survey.$invalid) {
           this.displayConfirmationAlert()
        }
      },
      submitSurvey: function () {
        SurveyResource.storeSurvey(this.survey).then(res => {
          let client = res.data.claim && res.data.claim.contract && res.data.claim.contract.customer && res.data.claim.contract.customer.email ?
              this.$i18n.t('labels.client_notified') + ' ' + res.data.claim.contract.customer.email.toLowerCase() :
              this.$i18n.t('labels.client_dont_notified');
          let agent = res.data.claim && res.data.claim.contract && res.data.claim.contract.agent && res.data.claim.contract.agent.email ?
              this.$i18n.t('labels.agent_notified') + ' ' + res.data.claim.contract.agent.email.toLowerCase() :
              this.$i18n.t('labels.agent_dont_notified');
          EventBus.$emit('notification-popup', {text: 'Rendez-vous d\'expertise créé avec succès<br>'+client+'<br>'+agent, status: 'success', timeout:15000})
          //this.$router.push('/surveys/' + res.data.id)
          this.$router.push('/claims/' + this.$route.params.claim_id + '/surveys')
          this.loading = false;


        })
      },
      displayConfirmationAlert: function () {
        this.loading = true;
        let vm = this
        swal({
          title: this.$t('dialog.are_you_sure'),
          text: 'Création d\'un nouveau rendez-vous',
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          confirmButtonText: this.$t('dialog.proceed_to_create'),
            cancelButtonText: this.$t('dialog.cancel'),
          buttonsStyling: false
        }).then(function () {
          vm.submitSurvey()
          swal({
            title: 'Opération effectuée',
            text: 'Rendez-vous créé.',
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          })
        })
      },
      displayError: function (text) {
        EventBus.$emit('notification-popup', {text: text, status: 'warning'})
      }
    },
  }
</script>

<style>
    .ti-plus {
        margin-right: 8px;
    }
</style>
