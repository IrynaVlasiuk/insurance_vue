<template>
    <section class="assessment-create">
        <hr>

        <div class="card-content">
            <label>{{$t('labels.assessment_details')}}</label>
            <!--Plot Information Row Start-->
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>{{$t('labels.plot#')}}</label>
                        <input type="text" class="form-control" v-model="plot.plot_number" disabled></input>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label>{{$t('labels.plot_name')}}</label>
                        <input type="text" class="form-control" v-model="plot.plot_name" disabled></input>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label>{{$t('labels.culture')}}</label>
                        <input type="text" class="form-control" v-model="plot.crop_name" disabled></input>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="form-group">
                        <label>{{$t('labels.variety')}}</label>
                        <input type="text" class="form-control" v-model="plot.crop_variety" disabled></input>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>{{$t('labels.surface')}}</label>
                        <input type="text" class="form-control" v-model="plot.plot_surface" disabled></input>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>{{$t('labels.capital_sum_estimation')}}</label>
                        <input type="text" class="form-control" v-model="plot.capital_sum_estimation" :disabled="isDisabled"></input>
                    </div>
                </div>
            </div>







            <!--Plot Information Row End-->

            <!-- Assessment form rows Start-->
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <div class="form-group" :class="{ 'form-group--error': $v.assessment.assessment_damage_type_id.$invalid }">
                        <label>{{$t('labels.damage_type')}}</label>
                        <el-select class="select-primary"
                                   size="large"
                                   filterable
                                   v-model="assessment.assessment_damage_type_id"
                                   style="width: 100%"
                                    name="assessment_damage_type_id">
                            <el-option v-for="damage_type in assessment_damage_types"
                                       :key="damage_type.id"
                                       :label="$t('options.assessment_damage_type.'+damage_type.name.split(' ').join('_'))"
                                       :value="damage_type.id">
                            </el-option>
                        </el-select>
                        <div class="error" v-if="!$v.assessment.assessment_damage_type_id.required">{{ $t('labels.validation.required') }}</div>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12">
                    <label>{{$t('labels.estimation')}}</label>
                    <div class="form-group" :class="{ 'form-group--error': $v.assessment.cost_estimation.$error }">
                        <input type="text" class="form-control"
                               v-model="assessment.cost_estimation"
                               name="cost_estimation"
                               @change="$v.assessment.cost_estimation.$touch()"
                        ></input>
                        <div class="error" v-if="!$v.assessment.cost_estimation.required">{{ $t('labels.validation.required') }}</div>
                        <div class="error" v-if="!$v.assessment.cost_estimation.between">{{$t('labels.validation.between') + $v.assessment.cost_estimation.$params.between.min + $t('labels.validation.and') + $v.assessment.cost_estimation.$params.between.max}}</div>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12">
                    <div class="form-group" :class="{ 'form-group--error': $v.assessment.assessment_status_id.$invalid }">
                        <label>{{$t('labels.assessment_status')}}</label>
                        <el-select class="select-primary"
                                   size="large"
                                   filterable
                                   v-model="assessment.assessment_status_id"
                                   style="width: 100%"
                                   name="assessment_status_id"
                        >
                            <el-option v-for="status in assessment_statuses"
                                       :key="status.id"
                                       :label="$t('options.'+status.name.split(' ').join('_'))"
                                       :value="status.id">
                            </el-option>
                        </el-select>
                        <div class="error" v-if="!$v.assessment.assessment_status_id.required">{{ $t('labels.validation.required') }}</div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-sm-4 col-xs-12 pull-right">
                    <div class="form-group text-right" >
                        <div class="btn btn-fill btn-success" v-if="!assessment.id"
                             @click="initiateSubmit">
                            <label>{{$t('labels.submit')}}</label>
                        </div>

                        <div class="btn btn-fill btn-warning" v-if="assessment.id"
                             @click="initiateUpdate">
                            <label>{{$t('labels.update')}}</label>
                        </div>
                        <div class="btn btn-fill btn-danger" v-if="assessment.id"
                             @click="displayConfirmationAlert('Supprimer la provision d\'expertise ?', 'delete', 'warning')">
                            <label>{{$t('labels.delete')}}</label>
                        </div>
                        <div class="btn btn-fill btn-default" @click="cancelForm">
                            <label>{{$t('labels.cancel')}}</label>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Assessment form rows End-->

        </div>
        <hr>


    </section>
</template>

<script>
  import AssessmentResource from '../../../../../api/resources/AssessmentResource'
  import ClaimPlotResource from '../../../../../api/resources/ClaimPlotResource'
  import {Select, Option} from 'element-ui'
  import swal from 'sweetalert2'
  import {EventBus} from '../../../../../bootstrap/event-bus'
  import {required, between} from 'vuelidate/lib/validators'

  export default {
    name: 'AssessmentCreateBlock',
    components: {
      [Select.name]: Select,
      [Option.name]: Option
    },
    props: ['claim_plot_id', 'survey_id'],
    data: function () {
      return {
        isDisabled: true,
        plot: {},
        assessment: {
          assessment_status_id: null,
          assessment_damage_type_id: null,
          claim_plot_id: null,
          cost_estimation: null,
          survey_id: this.$route.params.survey_id
        },
        assessment_statuses: [],
        assessment_compensation_types: [],
        assessment_damage_types: [],
      }
    },
    validations: {
      assessment: {
        assessment_damage_type_id: {
          required,
        },
        cost_estimation: {
          required,
          between:between(0, 10000000)
        },
        assessment_status_id: {
          required,
        },
      },
    },
    created: function () {
      this.assessment.claim_plot_id = this.claim_plot_id
      this.fetchInitialData()
    },
    methods: {
      fetchInitialData: function () {
        this.fetchClaimPlotData()
        this.fetchCompensationTypes()
        this.fetchStatuses()
        this.fetchDamageTypes()
      },
      fetchClaimPlotData: function () {
        ClaimPlotResource.getClaimPlot(this.claim_plot_id).then(res => {
          this.plot = res.data
            if(this.plot.user.type_id == 2 || this.plot.user.type_id == 3) {
                if(!this.plot.claim.contract_id) {
                    this.isDisabled = false;
                }
            }
        })

        AssessmentResource.getClaimPlotSurveyAssessmsents(this.claim_plot_id, this.survey_id).then(res => {
          if (res.data.id) {
            this.assessment = res.data
          }
        })
      },
      fetchDamageTypes: function () {
        AssessmentResource.getDamageTypes().then(res => {
          this.assessment_damage_types = res.data
        })
      },
      fetchStatuses: function () {
        AssessmentResource.getStatuses().then(res => {
          this.assessment_statuses = res.data
        })
      },
      fetchCompensationTypes: function () {
        AssessmentResource.getCompensationTypes().then(res => {
          this.assessment_compensation_types = res.data
        })
      },
      initiateSubmit: function () {
        // if (!this.isValidAssessment()) {
        //   return this.displayError('Please enter Assessment details')
        // }
        if(!this.$v.assessment.$invalid) {
          this.displayConfirmationAlert('Créér la provision d\'expertise ?', 'submit', 'warning')
        }
      },
      initiateUpdate: function () {
        // if (!this.isValidAssessment()) {
        //   return this.displayError('Please enter Assessment details')
        // }
        if(!this.$v.assessment.$invalid) {
          this.displayConfirmationAlert('Mettre à jour la provision d\'expertise ?', 'update', 'warning')
        }
      },
      submitAssessment: function () {
        this.$set(this.assessment, 'capital_sum_estimation', this.plot.capital_sum_estimation)
        AssessmentResource.storeAssessment(this.assessment).then(res => {
            if(res.data.error){
                EventBus.$emit('notification-popup', {text: res.data.text, status: 'warning'})
            } else {
                this.assessment = res.data
                this.$parent.deselectClaimPlot()
            }
        })
      },
      updateAssessment: function () {
        this.$set(this.assessment, 'capital_sum_estimation', this.plot.capital_sum_estimation)
        AssessmentResource.updateAssessment(this.assessment.id, this.assessment).then(res => {
          if(res.data.error){
              EventBus.$emit('notification-popup', {text: res.data.text, status: 'warning'})
          } else {
              this.assessment = res.data
              this.$parent.deselectClaimPlot()
          }
        })
      },
      deleteAssessment: function () {
        AssessmentResource.deleteAssessment(this.assessment.id, this.assessment).then(res => {
          this.$parent.deselectClaimPlot()
        })
      },
      cancelForm: function () {
        this.$parent.deselectClaimPlot()
      },
      isValidAssessment: function () {
        return (!!this.assessment.assessment_damage_type_id &&
          !!this.assessment.claim_plot_id
          && !!this.assessment.assessment_status_id)
      },
      displayConfirmationAlert: function (text, action, type = 'warning') {
        let vm = this
        swal({
          title: this.$t('dialog.are_you_sure'),
          text: text,
          type: type,
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          confirmButtonText: this.$t('dialog.proceed_to_create'),
            cancelButtonText: this.$t('dialog.cancel'),
          buttonsStyling: false
        }).then(function () {
          if (action === 'submit') {
            vm.submitAssessment()
          } else if (action === 'update') {
            vm.updateAssessment()
            vm.displaySwal()
          }
          else if (action === 'delete') {
            vm.deleteAssessment()
            swal({
                title: 'Opération effectuée',
                text: 'Expertise de la position enregistrée',
                type: 'success',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
            })
          }
        })
      },
      displayError: function (text) {
        EventBus.$emit('notification-popup', {text: text, status: 'warning'})
      },
      displaySwal: function() {
        swal({
          title: 'Opération effectuée',
          text: 'Expertise de la position enregistrée',
          type: 'success',
          confirmButtonClass: 'btn btn-success btn-fill',
          buttonsStyling: false
        })
      }
    },
    watch: {
      claim_plot_id: function () {
        this.assessment = {
          assessment_status_id: null,
          assessment_damage_type_id: null,
          claim_plot_id: this.claim_plot_id,
          cost_estimation: null,
          survey_id: this.$route.params.survey_id
        }
        this.fetchClaimPlotData()
      }
    }

  }
</script>
