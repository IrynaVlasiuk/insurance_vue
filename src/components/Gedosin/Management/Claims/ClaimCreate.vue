<template>
    <section id="Claims Page">
        <div class="card">
            <div class="container-fluid">
                <div class="row">
                    <div class="card-content">

                        <!--Contract & Claim Search-->
                        <div class="col-sm-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group" :class="{ 'form-group--error': $v.claim.contract_number.$invalid }">
                                        <label>{{$t('labels.contract#')}}</label>
                                            <input type="text"
                                                   class="form-control"
                                                   name="number_contract"
                                                   v-model.trim="$v.claim.contract_number.$model"
                                                   @change="$v.claim.contract_number.$touch()"
                                            >
                                            </input>
                                            <div class="error" v-if="!$v.claim.contract_number.required">{{ $t('labels.validation.required') }}</div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group" :class="{ 'form-group--error': $v.claim.external_id.$invalid }">
                                        <label>{{$t('labels.claim#')}}</label>
                                            <input type="text"
                                                   class="form-control"
                                                   name="claim"
                                                   v-model.trim="$v.claim.external_id.$model"
                                                   @change="$v.claim.external_id.$touch()"
                                            >
                                            </input>
                                        <div class="error" v-if="!$v.claim.external_id.required">{{ $t('labels.validation.required') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group" :class="{ 'form-group--error': $v.claim.happened_at.$invalid }">
                                        <label>{{$t('labels.happened_at')}}</label>
                                        <el-date-picker v-model="claim.happened_at"
                                                        class="date-picker"
                                                        type="date"
                                                        name="date"
                                                        format="dd/MM/yyyy"
                                                        value-format="yyyy-MM-dd"
                                                        placeholder=""
                                                        :picker-options="datePickerOptions" style="width: 100%"
                                        >
                                        </el-date-picker>
                                        <div class="error" v-if="!$v.claim.happened_at.required">{{ $t('labels.validation.required') }}</div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group" :class="{ 'form-group--error': $v.claim.damage_type.$invalid }">
                                        <label>{{$t('labels.damage_type')}}</label>
                                        <v-select class="select-default"
                                                  name="damage_type"
                                                  v-model="claim.damage_type"
                                                  style="width: 100%"
                                                  :options="Object.values(assessment_damage_types)"
                                        >
                                            <template slot="option" slot-scope="option">
                                                {{ $t('options.assessment_damage_type.'+option.label.toUpperCase()) }}
                                            </template>
                                        </v-select>
                                        <div class="error" v-if="!$v.claim.damage_type.required">{{ $t('labels.validation.required') }}.</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>{{$t('labels.area')}}</label>
                                        <div class="form-group" :class="{ 'form-group--error': $v.claim.area.$invalid }">
                                            <v-select class="select-default"
                                                      name="area"
                                                      :label="'name'"
                                                      v-model="claim.area"
                                                      @input="(val)=> {claim.area_id = val.id}"
                                                      style="width: 100%"
                                                      :options="areas"
                                            >
                                            </v-select>
                                            <div class="error" v-if="!$v.claim.area.required">{{ $t('labels.validation.required') }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>{{$t('labels.capital_sum_estimation')}}</label>
                                        <div class="form-group" :class="{ 'form-group--error': $v.claim.claim_plots.capital_sum_estimation.$invalid }">
                                            <input type="number"
                                                   class="form-control"
                                                   name="claim.claim_plots.capital_sum_estimation"
                                                   v-model.trim="$v.claim.claim_plots.capital_sum_estimation.$model"
                                                   @change="$v.claim.claim_plots.capital_sum_estimation.$touch()"
                                            >
                                            </input>
                                            <div class="error" v-if="!$v.claim.claim_plots.capital_sum_estimation.required">{{ $t('labels.validation.required') }}</div>
                                            <div class="error" v-if="!$v.claim.claim_plots.capital_sum_estimation.between">
                                                {{ $t('labels.validation.between') +
                                                $v.claim.claim_plots.capital_sum_estimation.$params.between.min +
                                                $t('labels.validation.and') +
                                                $v.claim.claim_plots.capital_sum_estimation.$params.between.max}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label>{{$t('labels.harvest_year')}}</label>
                                    <div class="form-group" :class="{ 'form-group--error': $v.claim.harvest_year.$invalid }">
                                        <v-select class="select-default"
                                                  name="harvest_year"
                                                  v-model="claim.harvest_year"
                                                  @input="(val)=> {claim.harvest_year = val}"
                                                  style="width: 100%"
                                                  :options="harvest_year"
                                        >
                                        </v-select>
                                        <div class="error" v-if="!$v.claim.harvest_year.required">{{ $t('labels.validation.required') }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <!-- Note -->
                    <div class="col-sm-12">
                        <div class="card-content">
                            <label>Note</label>
                            <textarea class="form-control"
                                      v-model="claim.note"
                                      placeholder=""
                                      rows="3">
                            </textarea>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="card-content">
                        <div class="btn btn-success" @click="initiateClaimSubmit">Créer le sinistre</div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>


<script>
  import DatepickerDefaultOptions from '../../../../helpers/datepicker/DatepickerDefaultOptions'
  import {DatePicker, Select, Option} from 'element-ui'
  import AreaResource from '../../../../api/resources/AreaResource'
  import ClaimResource from '../../../../api/resources/ClaimResource'
  import {EventBus} from '../../../../bootstrap/event-bus'
  import swal from 'sweetalert2'
  import { required, between } from 'vuelidate/lib/validators'
  var moment = require('moment')
  export default {
      name: 'ClaimCreate',
      components: {
          [DatePicker.name]: DatePicker,
          [Select.name]: Select,
          [Option.name]: Option,
      },
      data: function () {
          return {
              datePickerOptions: DatepickerDefaultOptions,
              assessment_damage_types: [],
              contracts: [],
              areas: [],
              harvest_year: [moment().year(), moment().year() + 1],
              claim: {
                  contract_number: '',
                  external_id: '',
                  harvest_year: '',
                  happened_at: '',
                  damage_type: '',
                  area_id: '',
                  claim_plots: {
                      capital_sum_estimation: ''
                  },
                  test: ''
              }
          }
      },
      validations: {
          claim: {
              contract_number: { required },
              external_id: { required },
              harvest_year: { required },
              claim_plots: {
                  capital_sum_estimation: { required, between:between(1, 10000000) }
              },
              area: { required },
              damage_type: { required },
              happened_at: { required },
          },
      },
      created: function () {
          this.fetchInitialData()
      },
      methods: {
          fetchInitialData: function () {
              this.fetchDamageTypes()
              this.fetchContracts()
              this.fetchAreas()
          },
          fetchDamageTypes: function () {

              ClaimResource.getClaimCreateDamageTypesDictionary().then(res => {
                  if (res.data.user_type == 2 || res.data.user_type == 3) {
                      this.isHidden = false;
                  }
                  delete res.data.user_type
                  this.assessment_damage_types = res.data

              })
          },
          fetchContracts: function () {

          },
          fetchAreas: function () {
              AreaResource.getAreas().then(res => {
                  this.areas = res.data
              })
          },
          initiateClaimSubmit: function () {
              if (!this.$v.claim.$invalid) {
                  this.displayConfirmationAlert()
              }
          },
          submitClaim: function () {
              ClaimResource.createClaim(this.claim).then(res => {
                  EventBus.$emit('notification-popup', {text: 'Sinistre créé', status: 'success'})
                  this.$router.push('/claims/' + res.data.id)
              })
          },
          displayConfirmationAlert: function () {
              let vm = this
              swal({
                  title: this.$t('dialog.are_you_sure'),
                  text: `Création de sinistre`,
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonClass: 'btn btn-success btn-fill',
                  cancelButtonClass: 'btn btn-danger btn-fill',
                  confirmButtonText: this.$t('dialog.proceed_to_create'),
                  cancelButtonText: this.$t('dialog.cancel'),
                  buttonsStyling: false
              }).then(function () {
                  vm.submitClaim()
                  swal({
                      title: 'Opération effectuée',
                      text: 'Sinistre créé',
                      type: 'success',
                      confirmButtonClass: 'btn btn-success btn-fill',
                      buttonsStyling: false
                  })
              })
          },
      }
  }
</script>
<style>
    .v-select[aria-invalid='true'] .dropdown-toggle{
        border: none;
        outline: none;
    }
    .form-group--error input, .form-group--error .dropdown-toggle, .form-group--error .date-picker {
        border-color: red;
    }
    .form-group .error {
        color:red;
    }
</style>
