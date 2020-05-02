<template>
    <section id="survey-create-page">
        <div class="card" v-if="surveyExists">
            <div class="card-content">
                <div class="row" v-if="!survey.validated_at">
                    <div class="col-sm-12">
                        <p v-if="new Date(survey.datetime_scheduled) < new Date()" class="text-danger">
                            Rendez-vous à finaliser.
                        </p>
                        <p v-else class="text-warning">
                            Rendez-vous planifié.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card-content text-center">
                            <div>
                                <label>{{$t('labels.claim#')}}</label>
                                <div class="form-group">
                                    <input v-model="survey.claim.external_id"
                                           type="text"
                                           class="form-control"
                                           disabled="disabled"
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="card-content text-center">
                            <label>{{$t('labels.manager_assessor')}}</label>
                            <div class="form-group">
                                <input v-model="survey.claim.manager_assessor.full_name"
                                       type="text"
                                       class="form-control"
                                       disabled="disabled"
                                       >
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card-content text-center">
                            <div>
                                <label>{{$t('labels.survey_datetime')}}</label>
                                <div class="form-group" :class="{ 'form-group--error': $v.survey.datetime_scheduled.$invalid }">
                                    <el-date-picker v-model="survey.datetime_scheduled"
                                                    type="datetime"
                                                    name="datetime_scheduled"
                                                    format="dd/MM/yyyy HH:mm:ss"
                                                    value-format="yyyy-MM-dd HH:mm:ss"
                                                    placeholder="Sélectionner la date et l'heure"
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
                                <el-option v-for="assessor in claimAssistants"
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
                    <div class="col-xs-12">
                        <div class="card-content">
                            <button type="submit" class="btn btn-fill btn-danger pull-right"
                                    @click="cancelSurvey()"
                                    :disabled="$store.getters.isAgent"
                                    v-if="!survey.assessments">
                                <i class="ti-close"></i> Annuler le rendez-vous
                            </button>
                            <div v-if="!$store.getters.isAgent" @click="initiateSurveySubmit" class="btn btn-fill btn-warning pull-right">
                                <i class="ti-save"></i> {{$t('labels.survey_update')}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="card-content">
                            <claim-plot-table :claimPlots="sortedClaimPlotsArray"/>
                        </div>
                    </div>
                </div>

                <assessment-create-block v-if="selectedClaimPlot" :survey_id="survey.id" :claim_plot_id="selectedClaimPlot.id"/>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="card-content">
                            <button type="submit" class="btn btn-fill btn-success"
                                    @click="validate()"
                                    :disabled="$store.getters.isAgent"
                                    v-if="(isClaimManager || $store.getters.isAuthAdmin) && !survey.validated_at ">
                                <i class="ti-close"></i> Terminer la saisie
                            </button>

                            <button type="submit" class="btn btn-fill btn-warning"
                                    @click="unvalidate()"
                                    :disabled="$store.getters.isAgent"
                                    v-if="(isClaimManager || $store.getters.isAuthAdmin) && survey.validated_at ">
                                <i class="ti-close"></i> Reprendre la saisie
                            </button>

                            <div @click="$router.push('/claims/'+survey.claim_id)"
                                 class="btn btn-fill btn-info pull-right">
                                <i class="ti-control-skip-backward"></i> {{$t('labels.back_to_claim')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="errorPage">
            <div class="col-md-12 text-center">
                <div class="alert alert-danger">
                    <span>Erreur 403</span>
                </div>
                <h2 class="title">Accès refusé</h2>
                <h2>
                    <small>La ressource demandée n'existe pas ou vous n'y avez pas accès.</small>
                </h2>
            </div>
        </div>
    </section>

</template>

<script>
  import Vue from 'vue'
  import {DatePicker, Select, Option, Collapse, CollapseItem, OptionGroup} from 'element-ui'
  import swal from 'sweetalert2'
  // import ElOptionGroup from '../../../../../node_modules/element-ui/packages/select/src/option-group.vue'
  import ClaimPlotTable from '../ClaimPlots/components/ClaimPlotTable'
  import AssessorResource from '../../../../api/resources/AssessorResource'
  import ClaimPlotResource from '../../../../api/resources/ClaimPlotResource'
  import SurveyResource from '../../../../api/resources/SurveyResource'
  import {EventBus} from '../../../../bootstrap/event-bus'
  import DateTimePickerDefaultOptions from '../../../../helpers/datepicker/DateTimePickerDefaultOptions'
  import AssessmentCreateBlock from './Assessments/AssessmentCreateBlock'
  import {required} from 'vuelidate/lib/validators'

  Vue.use(Collapse)
  Vue.use(CollapseItem)

  export default {
    name: 'SurveyShow',
    components: {
      AssessmentCreateBlock,
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
        claimAssistants: [],
        selectedClaimPlot: null,
        survey: {
          datetime_scheduled: null,
          assistant_assessor_ids: [],
          claim: {
              manager_assessor: {
                  full_name: ''
              }
          },
          note: '',
          claim_id: this.$route.params.claim_id,
        },
        pickerOptions1: DateTimePickerDefaultOptions,
        errorPage: false,
        surveyExists: false
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
      this.fetchInitialData()
    },
    computed: {
        sortedClaimPlotsArray: function() {
            function compare(a, b) {
                if (a.plot_number < b.plot_number)
                    return -1;
                if (a.plot_number > b.plot_number)
                    return 1;
                return 0;
            }

            return this.claimPlots.sort(compare);
        },
      isClaimManager: function () {
        return this.$store.getters.currentUser.id === this.survey.claim.manager_assessor_id
      },
    },
    methods: {
      /** Fetch Initial Data **/
      fetchInitialData: function () {
        this.fetchSurvey()
      },
      fetchSurvey: function () {
      if(this.$route.params.survey_id){
          SurveyResource.getSurvey(this.$route.params.survey_id).then(res => {
              this.surveyExists = true;
              res.data.assistant_assessor_ids = [];
              this.survey = res.data
              this.populateAssistants()
              this.fetchClaimPlots()
              this.fetchAvailableAssessors()
          }).catch((error) => {
              this.errorPage = true;
              if(error) console.log(error);

          })
        }
      },
      /** Fetch ClaimPlots **/
      fetchClaimPlots () {
        ClaimPlotResource.getClaimPlotsForClaim(this.survey.claim_id).then(res => {
          this.claimPlots = res.data
        })
      },
      /** Fetch Assessors for dropdown **/
      fetchAvailableAssessors: function () {
        AssessorResource.getClaimAssistants(this.survey.claim_id).then(res => {
          this.claimAssistants = res.data
        })
      },
      initiateSurveySubmit: function () {
        if (!this.$v.survey.$invalid) {
          //return this.displayError('Please enter Survey Date/Time details')
            this.displayConfirmationAlert()
        }
      },
      selectClaimPlot: function (claimPlot) {
        this.selectClaimPlot = claimPlot
      },
      deselectClaimPlot: function () {
        this.selectedClaimPlot = null;
        this.fetchClaimPlots();
      },
      validate () {
        SurveyResource.validateSurveyByManager(this.survey.id).then(res => {
          this.fetchInitialData()
        })
          this.$router.push('/claims/' + this.survey.claim_id)
      },
      unvalidate () {
        SurveyResource.unvalidateSurveyByManager(this.survey.id).then(res => {
          this.fetchInitialData()
        })
      },
      cancelSurvey: function () {
        let vm = this
        swal({
            title: this.$t('dialog.are_you_sure'),
            text: `Etes-vous sûr de vouloir annuler le rendez-vous?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success btn-fill',
            cancelButtonClass: 'btn btn-danger btn-fill',
            confirmButtonText: this.$t('dialog.yes_i_want_to_proceed'),
            cancelButtonText: this.$t('dialog.cancel'),
            buttonsStyling: false
        }).then(function () {
            SurveyResource.cancelSurvey(vm.survey.id).then(res => {
                EventBus.$emit('notification-popup', {text: 'Rendez-vous d\'expertise annulé avec succès', status: 'success'})
                vm.fetchInitialData()
            })
            vm.$router.push('/claims/' + vm.survey.claim_id + '/surveys')
        })
      },
      submitSurvey: function () {
        SurveyResource.updateSurvey(this.survey.id, this.survey).then(res => {
          let client = res.data.claim && res.data.claim.contract && res.data.claim.contract.customer && res.data.claim.contract.customer.email ?
                  this.$i18n.t('labels.client_notified') + ' ' + res.data.claim.contract.customer.email.toLowerCase() :
                  this.$i18n.t('labels.client_dont_notified');
          let agent = res.data.claim && res.data.claim.contract && res.data.claim.contract.agent && res.data.claim.contract.agent.email ?
                  this.$i18n.t('labels.agent_notified') + ' ' + res.data.claim.contract.agent.email.toLowerCase() :
                  this.$i18n.t('labels.agent_dont_notified');
          EventBus.$emit('notification-popup', {text: 'Rendez-vous d\'expertise mis à jour avec succès<br>'+client+'<br>'+agent, status: 'success'})
          res.data.assistant_assessor_ids = [];
          this.survey = res.data
          this.populateAssistants();
        })
      },
      displayConfirmationAlert: function () {
        let vm = this
        swal({
          title: this.$t('dialog.are_you_sure'),
          text: `Mettre à jour le rendez-vous ?`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          confirmButtonText: this.$t('dialog.yes_i_want_to_proceed'),
          cancelButtonText: this.$t('dialog.cancel'),
          buttonsStyling: false
        }).then(function () {
          vm.submitSurvey()
          swal({
            title: 'Opération effectuée',
            text: 'Mise à jour du rendez-vous effectuée',
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          })
        })
      },
      displayError: function (text) {
        EventBus.$emit('notification-popup', {text: text, status: 'warning'})
      },
      populateAssistants: function () {
        if (Object.keys(this.survey.assistant_assessors).length) {
          let assessorIds = []

          for (let i = 0, n = this.survey.assistant_assessors.length; i < n; ++i) {

            assessorIds.push(this.survey.assistant_assessors[i].id)
          }
          return this.survey.assistant_assessor_ids = assessorIds
        }
        this.survey.assistant_assessor_ids = []
      },

    },
  }
</script>

<style>
    .ti-plus {
        margin-right: 8px;
    }
</style>
