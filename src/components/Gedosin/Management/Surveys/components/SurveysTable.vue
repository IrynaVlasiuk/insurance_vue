<template>
    <ag-grid-vue style="width: 100%; height: 250px; padding-bottom: 10px"
                 class="ag-theme-balham"
                 :gridOptions="gridOptions"
                 @grid-ready="onGridReady"
                 @first-data-rendered="onFirstDataRendered"
                 @row-double-clicked="onRowDoubleClicked"
                 :columnDefs="columnDefs"
                 :defaultColDef="defaultColDef"
                 :rowData="changedSurveys"
                 :rowSelection="rowSelection">
    </ag-grid-vue>
</template>


<script>
  import {AgGridVue} from 'ag-grid-vue'
  import moment from 'moment'

  export default {
    name: 'SurveysTable',
    data: function () {
      return {
        defaultColDef: '',
        gridColumnApi: null,
        gridApi: null,
        claim: null,
        status_finished: this.$t('survey_status.finished'),
        status_in_progress: this.$t('survey_status.in_progress'),
        rowColors: {
          orange: 'rgba(255,230,177,1)',
        },
      }
    },
    props: ['surveys'],
    components: {
      AgGridVue
    },
    beforeMount () {
      this.gridOptions = {
          enableSorting: true
      }
      let that = this
      this.gridOptions.getRowStyle = function (params) {
        if(params.node.data) {
          return that.getLineColor(params)
        }
      }
      this.columnDefs = [
        {headerName: 'ID', field: 'id', sortable: true, filter: true, resizeable: true, width: 100},
        {headerName: 'Date', field: 'datetime_scheduled', sortable: true, filter: true},
        {headerName: 'Sinistre', field: ('claim.external_id') ? 'claim.external_id' : 'external_id', sortable: true, filter: true},
        {headerName: 'Nom Du Client', field: ('claim.contract.customer.full_name') ? 'claim.contract.customer.full_name' : 'contract.customer.full_name', sortable: true, filter: true},
        {headerName: 'Gestionnaire', field: ('claim.manager_assessor.full_name') ? 'claim.manager_assessor.full_name' : 'manager_assessor.full_name', sortable: true, filter: true},
        {headerName: 'Statut', field: 'status', sortable: true, filter: true},
      ]
      this.defaultColDef = {resizable: true}
      this.rowSelection = 'single' // How rows are selected. If disabled - no click events!
    },
    mounted () {
      this.gridApi = this.gridOptions.api
      this.gridColumnApi = this.gridOptions.columnApi
      this.gridApi.sizeColumnsToFit()
    },
    computed: {
      changedSurveys: function() {
        var that = this;
        if(this.surveys){
            this.surveys.map(function (item) {
                item.datetime_scheduled = moment(item.datetime_scheduled).format('DD/MM/YYYY');

                if(item.status === 1) {
                    item.status = that.status_finished;
                } else {
                    item.status = that.status_in_progress;
                }
            });
        }
        
        return this.surveys;
      }
    },
    methods: {
      onFirstDataRendered (params) {
        // this.gridColumnApi.sizeColumnsToFit(); // It works
        params.api.sizeColumnsToFit() // Works good
      },
      onGridReady () {
        this.surveys.map(function (item) {
          item.datetime_scheduled = moment(item.datetime_scheduled).format('YYYY/MM/DD');
        });
        return this.surveys;
      },
      onRowDoubleClicked () {
        var selectedRows = this.gridApi.getSelectedRows()
        // ;router.push('/survey/'+survey_id); // Router by vitaliy
        this.$router.push('/surveys/' + selectedRows[0].id)
      },
      getLineColor: function (params) {
      {
        let rowColor = {
           background: ''
        }
        if(this.$store.getters.currentUser.type_id == 1) {
            if(params.data.claim.manager_assessor_id == this.$store.getters.currentUser.id) {
               rowColor.background = this.rowColors.orange;
            }
        }
           return rowColor
        }
      }
    }
  }
</script>
