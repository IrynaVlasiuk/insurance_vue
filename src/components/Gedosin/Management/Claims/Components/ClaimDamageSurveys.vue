<template>
    <div class="claim-show-page g">
        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label>{{$t('labels.contract#')}} &nbsp;</label>
                    <div class="form-control" disabled>
                        {{this.claim.contract_number}}
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label>{{$t('labels.claim#')}}</label>
                    <div class="form-control" disabled>
                        {{this.claim.external_id}}
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label>{{$t('labels.harvest_year')}} &nbsp;</label>
                    <div class="form-control" disabled>
                        {{this.claim.harvest_year}}
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    <label>{{$t('labels.client_company')}} &nbsp;</label>
                    <div class="form-control" disabled>
                        <div v-if="this.claim.contract && this.claim.contract.length!=0">{{this.claim.contract.customer.company}}</div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <label>{{$t('labels.manager_assessor')}}</label>
                    <div class="form-control" disabled>
                        {{this.manager_assessor.full_name}}
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5>{{$t('labels.damage_surveys')}}</h5>
                        <hr>
                        <surveys :claimId="$route.params.id"></surveys>
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
  import VueTabs from 'vue-nav-tabs'
  import Surveys from '../../Surveys/Surveys.vue'
  import ClaimResource from '../../../../../api/resources/ClaimResource'
  import ClaimPlotTable from '../../ClaimPlots/components/ClaimPlotTable'
  import AssessorResource from '../../../../../api/resources/AssessorResource'
  import {EventBus} from '../../../../../bootstrap/event-bus'

  Vue.use(VueTabs)
  Vue.use(Collapse)
  Vue.use(CollapseItem)

  export default {
    name: 'ClaimShow2',
    components: {
      ClaimPlotTable,
      AgGridVue,
      [DatePicker.name]: DatePicker,
      [OptionGroup.name]: OptionGroup,
      [Select.name]: Select,
      [Option.name]: Option,
      Surveys
    },
    props:['propClaim'],
    data: function () {
      return {
        claim: {
          chief_assessor: null,
          manager_assessor: null,
          surveys: [],
          contract: {},
          assistant_assessors: [],
          claim_plots: []
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
      chief_assessor: function () {
        return this.claim.chief_assessor ? this.claim.chief_assessor : {}
      },
      manager_assessor: function () {
        return this.claim.manager_assessor ? this.claim.manager_assessor : {}
      },
    },
    methods: {
      /** Fetch Claim **/
      fetchClaim: function () {
        ClaimResource.getClaim(this.$route.params.id).then(res => {
          this.claim = res.data
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
          EventBus.$emit('notification-popup', {text: 'Claim Chief successfully delegated', status: 'success'})
        })
      },
      /** Assign Manager **/
      assignManagerAssessor () {
        ClaimResource.assignManager(this.claim.id, {manager_assessor_id: this.assigned.manager_assessor_id}).then((res) => {
          this.assigned.manager_assessor_id = null
          this.fetchClaim()
          EventBus.$emit('notification-popup', {text: 'Claim Manager successfully assigned', status: 'success'})
        })
      },
      /** Assign Assistors **/
      assignAssistantAssessors () {
        ClaimResource.assignAssistants(this.claim.id, {assistant_assessor_ids: this.assigned.assistant_assessor_ids}).then((res) => {
          this.assigned.assistant_assessor_ids = []
          this.fetchClaim()
          EventBus.$emit('notification-popup', {text: 'Claim Assistants successfully assigned', status: 'success'})
        })
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
    },
  }
</script>
