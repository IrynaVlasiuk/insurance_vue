<template>
    <div class="claim-show-page g">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5>{{$t('labels.history')}}</h5>
                        <hr>
                        <ag-grid-vue style="width: 100%; height: 250px; padding-bottom: 10px"
                                     class="ag-theme-balham"
                                     :gridOptions="gridOptions"
                                     @grid-ready="onGridReady"
                                     @first-data-rendered="onFirstDataRendered"
                                     :columnDefs="columnDefs"
                                     :defaultColDef="defaultColDef"
                                     :rowData="history.data"
                                     :rowSelection="rowSelection">
                        </ag-grid-vue>
                        <span>{{ history.from }} - {{ history.to }} / {{ history.total }} {{$t('labels.records')}}</span>

                        <p-pagination class="pull-right"
                                      v-model="history.current_page"
                                      :per-page="history.per_page"
                                      :total="history.total">
                        </p-pagination>
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
  import ClaimResource from '../../../../../api/resources/ClaimResource'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import {bus} from '../../../../../main.js'
  import {EventBus} from '../../../../../bootstrap/event-bus'

  Vue.use(VueTabs)
  Vue.use(Collapse)
  Vue.use(CollapseItem)

  export default {
    name: 'ClaimHistory',
    components: {
      AgGridVue,
      PPagination
    },
    props:['propClaim'],
    data: function () {
      return {
          rowData: null,
          defaultColDef: '',
          gridColumnApi: null,
          gridApi: null,
          claim: null,
          history: {
              data: []
          }
      }
    },
    created () {
        this.trackEvents()
    },
    computed: {

    },
    beforeMount () {
        this.gridOptions = {
            enableSorting: true
        }
        let that = this
        this.gridOptions.getRowStyle = function (params) {
            if (params.node.data) {
                return that.getLineColor(params)
            }
        }
        this.columnDefs = [
            {headerName: 'ID', field: 'id', sortable: true, filter: true, resizeable: true, width: 100},
            {headerName: 'Date', field: 'created_at', sortable: true, filter: true},
            {headerName: 'Event name', field: 'event_name', sortable: true, filter: true},
            {headerName: 'Source entity name', field: 'source_entity_name', sortable: true, filter: true},
            {headerName: 'Source entity id', field: 'source_entity_id', sortable: true, filter: true},
            {headerName: 'Destination entity name', field: 'destination_entity_name', sortable: true, filter: true},
            {headerName: 'Destination entity id', field: 'destination_entity_id', sortable: true, filter: true},
            {headerName: 'Details', field: 'details', sortable: true, filter: true},
            {headerName: 'User', field: 'user.full_name', sortable: true, filter: true}
        ]
        this.defaultColDef = {resizable: true}
        this.rowSelection = 'single' // How rows are selected. If disabled - no click events!
    },
    mounted () {
        this.gridApi = this.gridOptions.api
        this.gridColumnApi = this.gridOptions.columnApi
        this.gridApi.sizeColumnsToFit()
    },
    methods: {
        getLineColor: function (params) {
            {
                let rowColor = {
                    background: ''
                }
                if (params.data.success == 1) {
                    rowColor.background = 'rgba(185,239,144,0.65)' // green
                } else {
                    rowColor.background = 'rgba(255,0,0,0.35)' // red
                }

                return rowColor
            }
        },
        onFirstDataRendered (params) {
            // this.gridColumnApi.sizeColumnsToFit(); // It works
            params.api.sizeColumnsToFit() // Works good
        },
        onGridReady () {
            ClaimResource.getClaimHistory(this.$route.params.id)
                    .then((response) => {
                        this.history = response.data
                    })

            this.claim = this.propClaim;
        },
        trackEvents: function () {

            EventBus.$on('input', (pageNumber) => {
                console.log('change page to ' + pageNumber)
                ClaimResource.getClaimHistory(this.$route.params.id, {page: pageNumber})
                    .then((res) => {
                        this.history = res.data
                    })
            })

            EventBus.$on('nextPage', (pageNumber) => {
                ClaimResource.getClaimHistory(this.$route.params.id, {page: pageNumber})
                    .then((res) => {
                        this.rowData = res.data.data // Fill data grid
                    })
            })

            EventBus.$on('prevPage', (pageNumber) => {
                ClaimResource.getClaimHistory(this.$route.params.id, {page: pageNumber})
                    .then((res) => {
                        this.rowData = res.data.data // Fill data grid
                    })
            })
        }
    },
  }
</script>
