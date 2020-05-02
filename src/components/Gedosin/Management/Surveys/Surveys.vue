<template>
    <div class="text-left">
        <ag-grid-vue style="width: 100%; height: 250px; padding-bottom: 10px"
                     class="ag-theme-balham"
                     :gridOptions="gridOptions"
                     @grid-ready="onGridReady"
                     @first-data-rendered="onFirstDataRendered"
                     @row-double-clicked="onRowDoubleClicked"
                     :columnDefs="columnDefs"
                     :defaultColDef="defaultColDef"
                     :rowData="rowData"
                     :rowSelection="rowSelection">
        </ag-grid-vue>
        <div class="card-content">
            <div v-if="authUserCanCreateClaim">
                <div class="btn btn-success btn-fill" v-if="claim.manager_assessor === null"
                     disabled
                     :title=" $t('labels.survey_set_manager') ">
                    <i class="ti-plus"></i>&nbsp; {{$t('labels.survey_new')}}
                </div>
                <div class="btn btn-success btn-fill" v-else
                     @click="$router.push('/claim/'+claimId+'/survey/create')">
                    <i class="ti-plus"></i>&nbsp; {{$t('labels.survey_new')}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {AgGridVue} from 'ag-grid-vue'
    import ClaimResource from '../../../../api/resources/ClaimResource'
    // Vue.use
    export default {
        name: 'Surveys',
        props: ['claimId'],
        data: function () {
            return {
                rowData: null,
                defaultColDef: '',
                gridColumnApi: null,
                gridApi: null,
                claim: null
            }
        },
        components: {
            AgGridVue
        },
        beforeMount () {
            this.gridOptions = {
                enableSorting: true
            }
            this.columnDefs = [
                {headerName: 'ID', field: 'id', sortable: true, filter: true, resizeable: true, width: 100},
                {headerName: 'Date', field: 'datetime_scheduled', sortable: true, filter: true},
                {headerName: 'Status', field: 'status', sortable: true, filter: true}
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
            authUserCanCreateClaim: function () {
                if (!this.claim) {
                    console.log('no claim')
                    return false
                }
                if(this.$store.getters.isAgent){
                    return false;
                }
                if (this.$store.getters.isAuthAdmin) {
                    console.log('Admin can create claim')
                    return true
                }
                if (this.$store.getters.currentUser.id === this.claim.area.area_manager_id) {
                    console.log('Area manager can create claim')
                    return true
                }
                if (this.$store.getters.currentUser.id === this.claim.manager_assessor_id) {
                    console.log('Manager assessor Can create claim')
                    return true
                }
                if (this.$store.getters.currentUser.id === this.claim.chief_assessor_id) {
                    console.log('Chief Can create claim')
                    return true
                }
                return false
            },
        },
        methods: {
            onFirstDataRendered (params) {
                // this.gridColumnApi.sizeColumnsToFit(); // It works
                params.api.sizeColumnsToFit() // Works good
            },
            onGridReady () {
                ClaimResource.getClaimDamageSurveys(this.claimId)
                    .then((response) => {
                        this.rowData = response.data
                    })
                ClaimResource.getClaim(this.claimId).then(res => {
                    this.claim = res.data
                })
            },
            onRowDoubleClicked () {
                var selectedRows = this.gridApi.getSelectedRows()
                console.log(selectedRows)
                // ;router.push('/survey/'+survey_id); // Router by vitaliy
                this.$router.push('/surveys/' + selectedRows[0].id)
            }
        }
    }
</script>
