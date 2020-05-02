/* eslint-disable */
<template>
    <div class="claim-show-page">
        <!--<h2>ClaimDetails.vue</h2>-->
        <div class="card">
            <div class="container-fluid">
                <div class="row" style="border: 0px solid red; padding-top: 10px">
                    <div class="col-sm-3">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group"
                                     @click="redirectToContractPage">
                                    <label>{{$t('labels.contract#')}} &nbsp;<a :href="'/contract/' + claim.contract_id"
                                                                               v-if="claim.contract_id!=null">{{$t('labels.contract_details')}}</a></label>
                                    <div class="form-control" disabled>
                                        {{claim.contract_number}}
                                    </div>


                                </div>
                                <div class="form-group">
                                    <label>{{$t('labels.claim#')}}</label>
                                    <div class="form-control" disabled>
                                        {{claim.external_id}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>{{$t('labels.happened_at')}}</label>
                                    <div class="form-control" disabled>
                                        {{claim.happened_at}}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>{{$t('labels.damage_type')}}</label>
                                    <div class="form-control" disabled>
                                        {{ $t('options.claim_damage_type.'+claim.damage_type.toUpperCase()) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>{{$t('labels.chief_assessor')}}</label>
                                    <div class="form-control" disabled>
                                        {{chief_assessor.full_name}}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>{{$t('labels.manager_assessor')}}</label>
                                    <div class="form-control" disabled>
                                        {{manager_assessor.full_name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>{{$t('labels.area')}}</label>
                                    <div class="form-control" disabled>
                                        {{ claim.area.name }}
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>{{$t('labels.claim_status')}}</label>
                                    <div class="form-control" disabled>
                                        {{$t('claim_status.'+claim.status.name)}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="border: 0px solid red">
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label>{{$t('labels.harvest_year')}}</label>
                            <div class="form-control" disabled>
                                {{claim.harvest_year}}
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="form-group">
                            <label>Note</label>
                            <div class="form-control" disabled>
                                {{claim.note}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-xs-12">
                        <br>
                        <claim-plot-table :claimPlots="sortedClaimPlotsArray"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 col-xs-12 form-group">
                        <label>{{$t('labels.comment')}}</label>
                        <textarea class="el-textarea el-select form-control"
                                  v-model="claim.comment"
                                  placeholder=""
                                  rows="2">
                        </textarea>
                        <button @click="storeClaimComment"
                                class="btn btn-fill btn-success float-right"
                                :class="{'btn-success': ''}">
                            <i class="ti-arrow-circle-right"></i>{{$t('labels.save')}}
                        </button>
                    </div>
                </div>
                <!-- Buttons under the table. Footer -->
                <div class="row assessors">
                    <div class="col-sm-6 col-xs-12 text-left" v-if="authUserCanDelegate">
                        <!-- Delegate drop-down and button -->
                        <label>{{$t('labels.delegate_to_chief')}}</label>
                        <el-select class="select-primary"
                                   size="large"
                                   filterable
                                   v-bind:placeholder="chief_assessor.full_name"
                                   v-model="assigned.chief_assessor_id"
                                   style="width: 13em">
                            <el-option-group v-for="area in areaAssessors" :key="area.label"
                                             :label="area.label">
                                <el-option v-for="assessor in area.options" :key="assessor.value"
                                           :label="assessor.label" :value="assessor.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                        <button @click="delegateChiefAssessor"
                                class="btn btn-fill btn-assign"
                                :class="{'btn-success': assigned.chief_assessor_id}">
                            <i class="ti-arrow-circle-right"></i>{{$t('labels.delegate')}}
                        </button>
                    </div>

                    <div class="col-sm-6 col-xs-12 text-left" v-if="authUserCanAssignManager">
                        <!-- Assign drop-down and button -->
                        <label>{{$t('labels.assign_manager')}}</label>
                        <el-select class="select-primary"
                                   size="large"
                                   filterable
                                   v-bind:placeholder="manager_assessor.full_name"
                                   v-model="assigned.manager_assessor_id"
                                   style="width: 13em">
                            <el-option-group v-for="area in areaAssessors"
                                             :key="area.label"
                                             :label="area.label">
                                <el-option v-for="assessor in area.options" :key="assessor.value"
                                           :label="assessor.label + (assessor.count ? ' (' + assessor.count + ')' : '')" :value="assessor.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                        <button @click="assignManagerAssessor" type="submit"
                                class="btn btn-fill btn-assign"
                                :disabled="$store.getters.isAgent"
                                :class="{'btn-success': assigned.manager_assessor_id}"
                                style="width: 105px">
                            <i class="ti-angle-double-up"></i>{{$t('labels.assign')}}
                        </button>
                    </div>
                    <div class="col-sm-6 col-xs-12 text-left" v-if="authUserCanAssignAssistants">
                        <!-- Assist drop-down multi and button -->
                        <label>{{$t('labels.assign_assistants')}}</label>
                        <el-select multiple class="select-primary"
                                   size="large"
                                   placeholder=""
                                   filterable
                                   v-model="assigned.assistant_assessor_ids"
                                   style="width: 200px">
                            <el-option-group v-for="area in areaAssessors" :key="area.label"
                                             :label="area.label">
                                <el-option v-for="assessor in area.options"
                                           :key="assessor.value"
                                           :label="assessor.label"
                                           :value="assessor.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                        <button @click="assignAssistantAssessors" type="submit"
                                class="btn btn-fill btn-assign"
                                :disabled="$store.getters.isAgent"
                                :class="{'btn-success': assigned.assistant_assessor_ids.length}">
                            <i class="ti-angle-double-up"></i>{{$t('labels.assist')}}
                        </button>
                    </div>
                </div>
                <div class="row text-left button-row" style="border: 0px solid green; padding-top: 12px">
                    <div class="col-sm-12">
                            <claim-details-validation-buttons />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import {DatePicker, Select, Option, Collapse, CollapseItem, OptionGroup} from 'element-ui'
  import {AgGridVue} from 'ag-grid-vue'
  // import ElOptionGroup from '../../../../../../node_modules/element-ui/packages/select/src/option-group.vue'
  // import VueTabs from 'vue-nav-tabs'
  import Surveys from '../../Surveys/Surveys.vue'
  import ClaimResource from '../../../../../api/resources/ClaimResource.js'
  import ClaimPlotTable from '../../ClaimPlots/components/ClaimPlotTable.vue'
  import AssessorResource from '../../../../../api/resources/AssessorResource.js'
  import {EventBus} from '../../../../../bootstrap/event-bus.js'
  import ClaimDetailsValidationButtons from './components/ClaimDetailsValidationButtons'
  import moment from 'moment'

  // Vue.use(VueTabs)
  Vue.use(Collapse)
  Vue.use(CollapseItem)

  export default {
    name: 'claim-details',
    components: {
      ClaimDetailsValidationButtons,
      ClaimPlotTable,
      // ElOptionGroup,
      AgGridVue,
      [OptionGroup.name]: OptionGroup,
      [DatePicker.name]: DatePicker,
      [Select.name]: Select,
      [Option.name]: Option,
      Surveys
    },
    props: ['propClaim'],
    data: function () {
      return {
        claim: {
          chief_assessor: null,
          manager_assessor: null,
          surveys: [],
          contract: {},
          assistant_assessors: [],
          claim_plots: [],
          damage_type: '',
          status: {
            name: null
          },
          area: {
            name: ''
          },
          comment:null
        },
        assigned: {
          chief_assessor_id: null,
          manager_assessor_id: null,
          assistant_assessor_ids: [],
        },
        areaAssessors: [],
      }
    },
    created () {
      this.claim = this.propClaim;
      this.fetchAvailableAssessors()
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

            return this.claim.claim_plots.sort(compare);
        },
      chief_assessor: function () {
        return this.claim.chief_assessor ? this.claim.chief_assessor : {}
      },
      manager_assessor: function () {
        return this.claim.manager_assessor ? this.claim.manager_assessor : {}
      },
      authUserCanDelegate: function () {
        if (this.$store.getters.isAuthAdmin) {
          console.log('Admin can delegate')
          return true
        }

        if (this.$store.getters.currentUser.id === this.claim.area.area_manager_id) {
          console.log('Area manager can delegate')
          return true
        }

        return false
      },
      authUserCanAssignManager: function () {
        if (this.$store.getters.isAuthAdmin) {
          console.log('Admin can assign manager')
          return true
        }

        if (this.$store.getters.currentUser.id === this.claim.area.area_manager_id) {
          console.log('Area manager can assign manager')
          return true
        }

        if (this.$store.getters.currentUser.id === this.claim.chief_assessor_id) {
          console.log('Chief Can assign manager')
          return true
        }

        return false
      },
      authUserCanAssignAssistants: function () {
        if (this.$store.getters.isAuthAdmin) {
          console.log('Admin can assign manager')
          return true
        }

        if (this.$store.getters.currentUser.id === this.claim.area.area_manager_id) {
          console.log('Area manager can assign assistants')
          return true
        }

        if (this.$store.getters.currentUser.id === this.claim.chief_assessor_id) {
          console.log('Chief Can assign assistants')
          return true
        }

        return false
      },
    },
    methods: {
      /** Fetch Claim **/
      fetchClaim: function () {
        ClaimResource.getClaim(this.$route.params.id).then(res => {
          this.claim = res.data
          this.claim.happened_at = moment(this.claim.happened_at).format("DD/MM/YYYY")
          this.populateAssistants()
        })
      },
      /** Fetch Assessors for dropdown **/
      fetchAvailableAssessors: function () {
        AssessorResource.getAvailableAssessors(this.$route.params.id).then(res => {
          this.areaAssessors = res.data
        })
      },
      /** Delegate to Chief **/
      delegateChiefAssessor () {
        ClaimResource.delegate(this.claim.id, {chief_assessor_id: this.assigned.chief_assessor_id}).then((res) => {
          this.assigned.chief_assessor_id = null
          this.fetchClaim()
          EventBus.$emit('notification-popup', {text: 'Sinistre délégué au chef expert', status: 'success'})
        })
      },
      /** Assign Manager **/
      assignManagerAssessor () {
        ClaimResource.assignManager(this.claim.id, {manager_assessor_id: this.assigned.manager_assessor_id}).then((res) => {
          this.assigned.manager_assessor_id = null
          //this.fetchClaim()
          EventBus.$emit('notification-popup', {text: 'Sinistre affecté au gestionnaire', status: 'success'})
        })
      },
      /** Assign Assistors **/
      assignAssistantAssessors () {
        ClaimResource.assignAssistants(this.claim.id, {assistant_assessor_ids: this.assigned.assistant_assessor_ids}).then((res) => {
          this.assigned.assistant_assessor_ids = []
          this.fetchClaim()
          EventBus.$emit('notification-popup', {text: 'Assistant(s) assignés sur le sinistre', status: 'success'})
        })
      },

      redirectToContractPage: function () {
        if (this.claim.contract) {
          this.$router.push('/contract/' + claim.contract_id)
        }
      },
      populateAssistants: function () {
        if (this.claim.assistant_assessors.length) {
          let assessorIds = []
          for (let i = 0, n = this.claim.assistant_assessors.length; i < n; ++i) {
            assessorIds.push(this.claim.assistant_assessors[i].id)
          }
          this.assigned.assistant_assessor_ids = assessorIds
        }
      },
      storeClaimComment: function () {
          ClaimResource.storeClaimComment(this.claim.id, {comment: this.claim.comment}).then((res) => {
              this.fetchClaim();
              EventBus.$emit('notification-popup', {text: 'Commentaire enregistré avec succès', status: 'success'})
          });
      }
    },
  }
</script>

<style scoped>
    .button-row {
        margin-bottom: 21px;
    }
</style>
