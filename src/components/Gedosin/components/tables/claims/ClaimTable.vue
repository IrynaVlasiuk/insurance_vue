<template>
    <section class="claim-table">
        <label>{{$t('labels.claims')}}</label>
        <ag-grid-vue style="height: 400px;" class="ag-theme-balham" id="myGrid"
                     :gridOptions="gridOptions"
                     :columnDefs="columnDefs"
                     :defaultColDef="defaultColDef"
                     :rowSelection="rowSelection"
                     :rowData="this.claims"
                     @row-selected="onRowSelected"
                     @selection-changed="onSelectionChanged"
                     @row-double-clicked="onRowDoubleClicked"
                     pagination="false">
        </ag-grid-vue>
        <!--<span>{{ recordFrom }} - {{ recordTo }} / {{ recordsQuantity }} {{$t('labels.records')}}</span>-->

        <!--<p-pagination class="pull-right"
                      v-model="pagination.currentPage"
                      :per-page="pagination.perPage"
                      :total="pagination.total">
        </p-pagination>-->
    </section>
</template>


<script>
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import {AgGridVue} from 'ag-grid-vue'
  import DateTimePickerDefaultOptions from '../../../../../helpers/datepicker/DateTimePickerDefaultOptions'
  import {EventBus} from '../../../../../bootstrap/event-bus'
  import ClaimResource from '../../../../../api/resources/ClaimResource'
  import AssessorResource from '../../../../../api/resources/AssessorResource'
  import AreaResource from '../../../../../api/resources/AreaResource'
  import moment from 'moment'

  export default {
    name: 'ClaimTable',
    components: {
      AgGridVue,
      PPagination
    },
    props: ['claims','redirectToSurvey'],
    data () {
      return {
        managerAssessors: [],
        areas: [],
        searchForm: {
          claim_number: null,
          contract_number: null,
          date_from: null,
          date_to: null,
          damage_type: null,
          area_id: null,
          manager_id: null,
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
        damageTypes: null, // Damage type drop down
        recordsQuantity: 0,
        recordFrom: 0,
        recordTo: 0,
        last_page: 0,
        selects: { // Drop down DELETE
          countries: [{value: 'Bahasa Indonesia', label: 'Bahasa Indonesia'},
            {value: 'storm', label: 'Storm'},
            {value: 'hail', label: 'Hail'},
            {value: 'sand', label: 'Sand'}
          ],
          multiple: 'ARS'
        },
        // pagination: {
        //   perPage: 5,
        //   currentPage: 2,
        //   perPageOptions: [5, 10, 25, 50],
        //   total: 20
        // }
      }
    },
    beforeMount () {
      this.gridOptions = {
          enableSorting: true
      }
      this.columnDefs = [
        // {headerName: 'ID', field: 'id', sortable: true, filter: true, resizeable: true, supressSizeToFit: true, width: 150},
        {
            headerName: '№ de sinistre',
            field: 'external_id',
            sortable: true,
            filter: true,
            resizeable: true,
            comparator: (value_a, value_b) => {
                if (!isNaN(value_a) && !isNaN(value_b)) {
                    return parseInt(value_a) - parseInt(value_b)
                }
                return value_a.toLowerCase().localeCompare(value_b.toLowerCase())
            },
        },
        {
          headerName: 'Date',
          field: 'happened_at',
          sortable: true,
          filter: true,
          resizeable: true,
          cellRenderer: (data) => {
            return moment(data.value).format('DD/MM/YYYY');
          }
        },
        {
          headerName: 'Type de dommage',
          field: 'damage_type',
          sortable: true,
          filter: true,
          cellRenderer: (params) => {
            return this.$t('options.claim_damage_type.'+params.value)
          }
        },
        {headerName: '№ de contrat', field: 'contract_number', sortable: true, filter: true},
        {headerName: 'Zone', field: 'area.name', sortable: true, filter: true},
        {headerName: 'Client', field: 'contract.customer.company', sortable: true, filter: true},
        {headerName: 'Commune', field: 'insee_code.name', sortable: true, filter: true},
        {headerName: 'Departement', field: 'insee_code.departement', sortable: true, filter: true},
        {headerName: 'Produit', field: 'contract.product', sortable: true, filter: true},
        {
          headerName: 'Gestionnaire',
          field: 'manager_assessor.full_name',
          sortable: true,
          filter: true,
          resizeable: true
        },

      ]
      this.defaultColDef = {resizable: true}
      this.rowSelection = 'single'
    },
    mounted () {
      this.gridApi = this.gridOptions.api
      this.gridColumnApi = this.gridOptions.columnApi
      this.gridApi.sizeColumnsToFit()
    },
    created () {
      this.trackEvents()
      this.setInitialData()
    },
     computed: {
       /*changedClaims: function() {
         this.claims.map(function (item) {
            item.happened_at = moment(item.happened_at).format('DD/MM/YYYY')
         });
         return this.claims;
      }*/
     },
    methods: {
      /**
       * Fetch Initial Data
       */

      setInitialData: function () {
        //this.pagination.perPage = 1// Assign pagination values
        //this.pagination.total = this.claims.length
        //this.recordsQuantity = this.claims.length
        //this.lastPage = 1
      },
      /*onGridReady () {
          this.claims.map(function (item) {
              item.happened_at = moment(item.happened_at).format('DD/MM/YYYY')
          });
          return this.claims;
      },*/
      onRowSelected (event) {
        // Single click
        // alert("row " + event.node.data.athlete + " selected = " + event.node.selected);
      },
      onSelectionChanged (event) {
      },
      onRowDoubleClicked () {
        var selectedRows = this.gridApi.getSelectedRows()
        // this.$router.push({path: '/claims/' + selectedRows[0].id})
        if(this.redirectToSurvey) {
          console.log('redirect to surveys')
          return this.$router.push('/claims/' + selectedRows[0].id + '/surveys')
        }
        return this.$router.push('/claims/' + selectedRows[0].id)
      },
      trackEvents: function () {
        EventBus.$on('input', (pageNumber) => {
          console.log('change page to ' + pageNumber)
          ClaimResource.getUserClaims({page: pageNumber})
            .then((response) => {
              this.rowData = response.data.data
              // this.recordFrom = (pageNumber * 30) - 30
              // this.recordTo = pageNumber * 30
              // this.pagination.currentPage = pageNumber
            })
        })

        EventBus.$on('nextPage', (pageNumber) => {
          ClaimResource.getUserClaims({page: pageNumber})
            .then((response) => {
              this.rowData = response.data.data // Fill data grid
            })
        })

        EventBus.$on('prevPage', (pageNumber) => {
          ClaimResource.getUserClaims({page: pageNumber})
            .then((response) => {
              this.rowData = response.data.data // Fill data grid
            })
        })
      },
    }
  }
</script>

<style scoped>
    section {
        margin-bottom:50px;
    }
</style>
