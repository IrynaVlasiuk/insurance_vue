/* eslint-disable */
<template>
  <section id="Claims Page">
    <div class="card" tabindex="0">
      <div class="container-fluid">
        <div class="row">
          <div class="card-content">

            <!--Contract & Claim Search-->
            <div class="col-sm-3">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.contract#')}}</label>
                    <div class="form-group">
                      <input type="text" class="form-control"
                             v-model="searchForm.contract_number">
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.claim#')}}</label>
                    <div class="form-group">
                      <input type="text" class="form-control" v-model="searchForm.claim_number">
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.client_company')}}</label>
                    <div class="form-group">
                      <input type="text" class="form-control" v-model="searchForm.client_company">
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <!--Dates Search-->

            <div class="col-sm-3">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.happened_from')}}</label>
                    <el-date-picker v-model="searchForm.date_from" type="date"
                                    placeholder=""
                                    format="dd/MM/yyyy"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions1" language="fr"
                                    style="width: 100%">
                    </el-date-picker>
                  </div>


                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.happened_to')}}</label>
                    <el-date-picker v-model="searchForm.date_to" type="date"
                                    format="dd/MM/yyyy"
                                    value-format="yyyy-MM-dd"
                                    placeholder=""
                                    :picker-options="pickerOptions1" style="width: 100%">
                    </el-date-picker>
                  </div>

                </div>
              </div>
            </div>


            <!--Damage type & Claim Search-->
            <div class="col-sm-3">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.damage_type')}}</label>
                    <v-select class="select-default"
                              v-model="searchForm.damage_type"
                              style="width: 100%"
                              :options="damageTypes">
                      <template slot="option" slot-scope="option">
                        {{ $t('options.claim_damage_type.'+option.label.toUpperCase()) }}
                      </template>
                    </v-select>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.area')}}</label>
                    <div class="form-group">
                      <v-select class="select-default"
                                v-model="searchForm.area"
                                :label="'name'"
                                @input="(val)=> {searchForm.area_id = val.id}"
                                style="width: 100%"
                                :options="areas">
                      </v-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <!--Manger & Submit-->
            <div class="col-sm-3">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.manager')}}</label>
                    <div class="form-group">
                      <v-select class="select-default"
                                v-model="searchForm.manager"
                                :label="'full_name'"
                                @input="(val)=> {searchForm.manager_id = val.id}"
                                style="width: 100%"
                                :options="managerAssessors">
                      </v-select>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>{{$t('labels.harvest_year')}}</label>
                    <div class="form-group">
                      <v-select class="select-default"
                                v-model="searchForm.harvest_year"
                                @input="(val)=> {searchForm.harvest_year = val}"
                                style="width: 100%"
                                :options="harvest_year">
                      </v-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-6">
              <div class="form-group">
                <label>{{$t('labels.claim_status')}}</label>
                <div class="form-group">
                  <el-select multiple
                             v-model="searchForm.claim_status"
                             style="width: 100%">
                    <el-option
                            v-for="(item, id) in statuses"
                            :key="id"
                            :label="item"
                            :value="id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="row">
                <div class="col-sm-8">
                  <div class="form-group">
                    <label>{{$t('labels.search')}}</label>
                    <div class="form-group">
                      <button @click.prevent="searchButtonClick" type="button"
                              class="btn btn-fill btn-outline-dark btn-success"
                              style="width: 100%">
                                                <span class="btn-label">
                                                    <i class="ti-search"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label>{{$t('labels.clear_search')}}</label>
                    <div class="form-group">
                      <button @click.prevent="clearForm" type="button"
                              class="btn btn-outline-dark btn-warning"
                              style="width: 100%">
                                                <span class="btn-label">
                                                    <i class="ti-reload"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- AG grid row -->
        <div class="card-content">

          <div class="row">
            <div class="col-xs-12">
              <label>{{$t('labels.claims')}}</label>
              <ag-grid-vue style="height: 400px;" class="ag-theme-balham" id="myGrid"
                           :gridOptions="gridOptions"
                           @grid-ready="onGridReady"
                           :columnDefs="columnDefs"
                           :defaultColDef="defaultColDef"
                           :rowSelection="rowSelection"
                           :rowData="claims.data"
                           @row-selected="onRowSelected"
                           @sort-changed="onSortChanged"
                           @selection-changed="onSelectionChanged"
                           @row-double-clicked="onRowDoubleClicked"
                           pagination="false"></ag-grid-vue>
              <span>{{ claims.from }} - {{ claims.to }} / {{ claims.total }} {{$t('labels.records')}}</span>

              <p-pagination class="pull-right"
                            v-model="claims.current_page"
                            :per-page="claims.per_page"
                            :total="claims.total">
              </p-pagination>
            </div>
          </div>


          <div v-if="$store.getters.isAuthAdmin" class="btn btn-success" @click="$router.push('/claim/create')">Créer un sinitre</div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
    import {DatePicker, Select, Option} from 'element-ui'
    import {AgGridVue} from 'ag-grid-vue'
    import PPagination from 'src/components/UIComponents/Pagination.vue'
    import {bus} from '../../../../main.js'
    import {EventBus} from '../../../../bootstrap/event-bus'
    import DateTimePickerDefaultOptions from '../../../../helpers/datepicker/DateTimePickerDefaultOptions'
    import AssessorResource from '../../../../api/resources/AssessorResource'
    import AreaResource from '../../../../api/resources/AreaResource'
    import ClaimResource from '../../../../api/resources/ClaimResource' // Event bus
    var moment = require('moment')
    export default {
        name: 'Claims',
        components: {
            AgGridVue,
            [DatePicker.name]: DatePicker,
            [Select.name]: Select,
            [Option.name]: Option,
            PPagination
        },
        data() {
            return {
                canCreateClaim: true,
                managerAssessors: [],
                areas: [],
                statuses: [],
                claims: {
                    data: []
                },
                harvest_year: [moment().year(), moment().year() + 1],
                searchForm: {
                    claim_number: null,
                    contract_number: null,
                    date_from: null,
                    date_to: null,
                    damage_type: null,
                    area_id: null,
                    manager_id: null,
                    claim_status: [],
                    harvest_year: null,
                    orderBy: null,
                    page: 1
                },
                gridOptions: null,
                gridApi: null,
                columnApi: null,
                columnDefs: null,
                rowSelection: null,
                defaultColDef: null,
                rowData: null,
                pickerOptions1: DateTimePickerDefaultOptions,
                datePicker: '',
                damageTypes: [], // Damage type drop down
                selects: { // Drop down DELETE
                    countries: [{value: 'Bahasa Indonesia', label: 'Bahasa Indonesia'},
                        {value: 'storm', label: 'Storm'},
                        {value: 'hail', label: 'Hail'},
                        {value: 'sand', label: 'Sand'}
                    ],
                    multiple: 'ARS'
                },
            }
        },
        beforeMount () {
            this.gridOptions = {
                enableSorting: true,
                localeText: {noRowsToShow: 'Aucun résultat'}
            }
            this.columnDefs = [
                // {headerName: 'ID', field: 'id', sortable: true, filter: true, resizeable: true, supressSizeToFit: true, width: 150},
                {
                    headerName: '№ de sinistre',
                    field: 'external_id',
                    sortable: true,
                    filter: true,
                    resizeable: true,
                    width: this.calculateWidth(4),
                    comparator: (value_a, value_b) => {
                        if (!isNaN(value_a) && !isNaN(value_b)) {
                            return parseInt(value_a) - parseInt(value_b)
                        }
                        return value_a.toLowerCase().localeCompare(value_b.toLowerCase())
                    }
                },
                {
                    headerName: 'Date',
                    field: 'happened_at',
                    sortable: true,
                    filter: true,
                    resizeable: true,
                    width: this.calculateWidth(8),
                    comparator: (a, b) => {
                        return a - b;
                    }
                },
                {
                    headerName: 'Type de dommage',
                    field: 'damage_type',
                    sortable: true,
                    filter: true,
                    width: this.calculateWidth(8),
                    cellRenderer: (params) => {
                        return this.$t('options.claim_damage_type.' + params.value)
                    }
                },
                {headerName: '№ de contrat', field: 'contract_number', sortable: true, filter: true, width: this.calculateWidth(8)},
                {headerName: 'Zone', field: 'area.name', sortable: true, filter: true, width: this.calculateWidth(8)},
                {headerName: 'Client', field: 'contract.customer.company', sortable: true, filter: true, width: this.calculateWidth(17)},
                {headerName: 'Commune', field: 'insee_code.name', sortable: true, filter: true, width: this.calculateWidth(13)},
                {headerName: 'Departement', field: 'insee_code.departement', sortable: true, filter: true, width: this.calculateWidth(4)},
                {headerName: 'Produit', field: 'contract.product', sortable: true, filter: true, width: this.calculateWidth(13)},
                {
                    headerName: 'Gestionnaire',
                    field: 'manager_assessor.full_name',
                    sortable: true,
                    filter: true,
                    width: this.calculateWidth(17),
                    resizeable: true
                },
            ]
            this.rowData = [
                // {id: '1', contract_number: 123, damage_type: 'full', contract_id: '76255', chief_assessor_id: '3422', manager_assessor_id: '665', area_id: '222', status_id: '2', happened_at: '12.02.2019'},
                // {id: '2', contract_number: 123, damage_type: 'full', contract_id: '76255', chief_assessor_id: '3422', manager_assessor_id: '665', area_id: '222', status_id: '2', happened_at: '12.02.2019'},
                // {id: '3', contract_number: 123, damage_type: 'full', contract_id: '76255', chief_assessor_id: '3422', manager_assessor_id: '665', area_id: '222', status_id: '2', happened_at: '12.02.2019'}
            ]
            this.defaultColDef = {resizable: true}
            this.rowSelection = 'single' // How rows are selected. If disabled - no click events!
        },
        mounted() {
            this.gridApi = this.gridOptions.api
            this.gridColumnApi = this.gridOptions.columnApi
            this.gridApi.sizeColumnsToFit()
            //this.gridColumnApi.autoSizeColumns()
            let that = this
            window.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    that.searchButtonClick()
                }
            })
        },
        created() {
            this.trackEvents()
            this.fetchInitialData()
        },
        methods: {
            /**
             * Fetch Initial Data
             */
            fetchInitialData: function () {
                this.fetchManagerAssessors()
                this.fetchAreas()
                ClaimResource.getClaimStatusesDictionary()
                    .then((res) => {
                        this.statuses = res.data
                        for(let item in this.statuses){
                            this.statuses[item] = this.$t('claim_status.' + this.statuses[item].toLowerCase())
                            if(this.$store.getters.isBackoffice){
                                if (item != 13) {
                                    this.searchForm.claim_status.push(item)
                                }
                            } else {
                                if (item < 12) {
                                    this.searchForm.claim_status.push(item)
                                }
                            }
                        }
                        this.searchButtonClick()
                    })
            },
            fetchManagerAssessors: function () {
                AssessorResource.getManagerAssessors().then(res => {
                    this.managerAssessors = res.data
                })
            },
            fetchAreas: function () {
                AreaResource.getAreas().then(res => {
                    this.areas = res.data
                })
            },
            fetch: function () {
              AreaResource.getAreas().then(res => {
                this.areas = res.data
              })
            },
            searchButtonClick() {
                ClaimResource.searchUserClaimsByCriteria(this.searchForm)
                    .then((res) => {
                        this.claims = res.data
                        this.claims.data.map(function (item) {
                            item.happened_at = moment(item.happened_at).format('DD/MM/YYYY')
                        })
                    })
            },
            onGridReady() {
                // Load claims to the grid
                // ClaimResource.getUserClaims({page: 1})
                //     .then((res) => {
                //         this.claims = res.data
                //         this.claims.data.map(function (item) {
                //             item.happened_at = moment(item.happened_at).format('DD/MM/YYYY')
                //         })
                //     })
                // Load values to the damage type drop down
                ClaimResource.getClaimDamageTypesDictionary()
                    .then((res) => {
                        if (res.data.user_type == 1 || this.$store.getters.isAgent) {
                            this.canCreateClaim = false
                        }
                        delete res.data.user_type
                        this.damageTypes = Object.values(res.data)
                    })
            },
            onRowSelected(event) {
                // Single click
                // alert("row " + event.node.data.athlete + " selected = " + event.node.selected);
            },
            onSortChanged: function () {
                this.searchForm.orderBy = this.gridOptions.api.getSortModel()
                this.gridOptions.api.showLoadingOverlay()
                this.searchForm.page = 1;
                ClaimResource.searchUserClaimsByCriteria(this.searchForm)
                    .then((res) => {
                        this.claims = res.data
                        this.claims.data.map(function (item) {
                            item.happened_at = moment(item.happened_at).format('DD/MM/YYYY')
                        })
                        this.gridOptions.api.hideOverlay()
                    })
            },
            clearForm: function () {
                this.searchForm = {
                    claim_number: null,
                    contract_number: null,
                    date_from: null,
                    date_to: null,
                    damage_type: null,
                    area_id: null,
                    manager_id: null,
                    claim_status: [],
                    page: 1,
                    orderBy: null
                }
                for(let item in this.statuses){

                    if(this.$store.getters.isBackoffice){
                        if (item != 13) {
                            this.searchForm.claim_status.push(item)
                        }
                    } else {
                        if (item < 12) {
                            this.searchForm.claim_status.push(item)
                        }
                    }
                }
                this.searchButtonClick()
                this.onGridReady()
            },
            onSelectionChanged(event) {
            },
            onRowDoubleClicked() {
                var selectedRows = this.gridApi.getSelectedRows()
                // this.$router.push({path: '/claims/' + selectedRows[0].id})
                this.$router.push('/claims/' + selectedRows[0].id)
            },
            trackEvents: function () {
                EventBus.$on('input', (pageNumber) => {
                    console.log('change page to ' + pageNumber)
                    this.searchForm.page = pageNumber
                    ClaimResource.searchUserClaimsByCriteria(this.searchForm)
                        .then((res) => {
                            this.claims = res.data
                            this.claims.data.map(function (item) {
                                item.happened_at = moment(item.happened_at).format('DD/MM/YYYY')
                            })
                        })
                })
                EventBus.$on('nextPage', (pageNumber) => {
                    this.searchForm.page = pageNumber
                    ClaimResource.searchUserClaimsByCriteria(this.searchForm)
                        .then((res) => {
                            this.rowData = res.data.data // Fill data grid
                        })
                })
                EventBus.$on('prevPage', (pageNumber) => {
                    this.searchForm.page = pageNumber
                    ClaimResource.searchUserClaimsByCriteria(this.searchForm)
                        .then((res) => {
                            this.rowData = res.data.data // Fill data grid
                        })
                })
            },
            calculateWidth: function (percent) {
              return (percent * (window.innerWidth - 380)) / 100;
            }
        }
    }
</script>

// Disable arrows in number field
<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
  input[type=number] {
    -moz-appearance: textfield; /* Firefox */
  }
  input, .el-select {
    width: 100%;
  }
</style>

<style>
  .v-select .selected-tag {
    height: 30px;
    margin: 4px 13px 2px 0 !important;
  }
  .v-select .vs__selected-options{
    flex-wrap: nowrap;
    overflow: hidden;
  }
  .el-select .el-select__tags-text{
    color: #fff;
  }
</style>