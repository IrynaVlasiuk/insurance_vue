<template>
    <section class="claim-plot-table">
        <label>{{$t('labels.claim_plots')}}</label>
        <ag-grid-vue style="width: 100%; height: 250px; padding-bottom: 10px" class="ag-theme-balham"
                     id="myGrid"
                     :gridOptions="gridOptions"
                     :defaultColDef="defaultColDef"
                     :columnDefs="columnDefs"
                     @row-selected="onRowSelected"
                     @selection-changed="onSelectionChanged"
                     @row-double-clicked="onPlotSelect"
                     :rowSelection="rowSelection"
                     :rowData="claimPlots">
        </ag-grid-vue>
    </section>
</template>

<script>
  import {AgGridVue} from 'ag-grid-vue'

  export default {
    name: 'ClaimPlotTable',
    components: {
      AgGridVue,
    },
    props: ['claimPlots'],
    data () {
      return {
        gridApi: null,
        columnApi: null,
        columnDefs: null,
        defaultColDef: null,
        selects: {},
        dateFrom: '',
        rowSelection: 'single',
        rowColors: {
          grey: 'rgba(197,197,197,0.35)',
          red: 'rgba(255,0,0,0.35)',
          orange: 'rgba(255,230,177,1)',
          green: 'rgba(185,239,144,0.65)',
        }
      }
    },
    beforeMount () {
      this.gridOptions = {
        suppressPropertyNamesCheck: true,
          enableSorting: true
      }
      let that = this
      this.gridOptions.getRowStyle = function (params) {
        if (params.node.data) {
          return that.getLineColor(params)
        }
      }
      this.defaultColDef = {resizable: true}
      this.columnDefs = [
        {headerName: 'N° de position', field: 'plot_number', sortable: true, filter: true},
        {headerName: 'Nom de la parcelle', field: 'plot_name', sortable: true, filter: true},
        {headerName: 'Culture', field: 'crop_name', sortable: true, filter: true},
        {headerName: 'Variété', field: 'crop_variety', sortable: true, filter: true},
        {headerName: 'Superficie', field: 'plot_surface', sortable: true, filter: true},
        {headerName: 'Rendement', field: 'yield', sortable: true, filter: true},
        {headerName: 'Sinistrée', field: 'damaged', cellRenderer: this.booleanRenderer, sortable: true, filter: true},
        {headerName: 'Récolte', field: 'harvest_in', cellRenderer: this.harvestInRenderer, sortable: false, filter: false},
        {headerName: 'Expertise définitive', field: 'isFinal', cellRenderer: this.booleanRenderer, sortable: true, filter: true}
      ]
    },
    mounted () {
      this.gridApi = this.gridOptions.api
      this.gridColumnApi = this.gridOptions.columnApi
      this.gridApi.sizeColumnsToFit()
    },
    methods: {
      /** OnPlot Doubleclick **/
      onPlotSelect (event) {
        this.highlightSelectedRow()
        this.$parent.selectedClaimPlot = event.data
      },
      getLineColor: function (params) {
        {
          let rowColor = {
            background: ''
          }

          if (params.data.isFinal) {
            rowColor.background = this.rowColors.green;
          } else if (params.data.isProvisory) {
            rowColor.background = this.rowColors.orange;
          } else if (params.data.damaged) {
            rowColor.background = this.rowColors.red;
          } else if(!params.data.damaged) {
            rowColor.background = this.rowColors.grey;
          }

          return rowColor
        }
      },
        booleanRenderer: function (params) {
            return (params.value ? "OUI" : "NON")
        },
        harvestInRenderer: function (params) {
            return (params.value ? this.$t('options.harvest_in.'+params.value) : "")
        },
      highlightSelectedRow: function () {
      },
      onRowSelected (event) {
        // Single click
        // alert("row " + event.node.data.athlete + " selected = " + event.node.selected);
      },
      onSelectionChanged (event) {
      },
    },
  }
</script>

<style>
    .hidden {
        display: none !important;
    }
</style>
