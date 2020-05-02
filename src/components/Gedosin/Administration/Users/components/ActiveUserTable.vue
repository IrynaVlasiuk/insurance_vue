/* eslint-disable */
<template>
    <section class="user-table">
        <label>{{$t('labels.users')}}</label>
        <ag-grid-vue style="height: 400px;" class="ag-theme-balham" id="myGrid" v-if="users.data"
                     :gridOptions="gridOptions"
                     @grid-ready="onGridReady"
                     :columnDefs="columnDefs"
                     :rowSelection="rowSelection"
                     :rowData="users.data"
                     @row-selected="onRowSelected"
                     @rowDataChanged="onRowDataChanged"
                     @selection-changed="onSelectionChanged"
                     @row-double-clicked="onRowDoubleClicked"
                     pagination="false"></ag-grid-vue>

        <span>{{ users.from }} - {{ users.to }} / {{ users.total }} {{$t('labels.records')}}</span>

        <p-pagination class="pull-right"
                      v-model="users.current_page"
                      :per-page="users.per_page"
                      :total="users.total">
        </p-pagination>
    </section>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from 'ag-grid-vue'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import {EventBus} from '../../../../../bootstrap/event-bus'
  import UserResource from '../../../../../api/resources/UserResource'

  export default {
    name: 'UsersTable',
    components: {
      AgGridVue,
      PPagination
    },
    data () {
      return {
        users: [],
        gridOptions: null,
        columnApi: null,
        filters: {},
        filterResults: false,
        columnDefs: null,
        rowSelection: null,
        rowData: [],
        defaultColDef: null,
      }
    },
    beforeMount () {
      this.gridOptions = {
          enableSorting: true
      }

      this.columnDefs = [
        {headerName: 'User', field: 'full_name', sortable: true, filter: true, resizable: true},
        {headerName: 'Role', field: 'type.name', sortable: true, filter: true, resizable: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Area', field: 'area.name', sortable: true, filter: true},
        {headerName: 'Created', field: 'created_at', sortable: true, filter: true},
      ]
      this.defaultColDef = {resizable: true}

      this.rowSelection = 'single' // How rows are selected. If disabled - no click events!
    },
    created () {
      this.trackEvents()
      this.fetchUsers()
    },
    methods: {
      fetchInitialData: function () {
        this.fetchUsers()
        this.fetchAreas()
      },

      fetchUsers: function ($page = 1) {
        UserResource.getActiveUsers({page: $page}).then((response) => {
          this.filterResults = false
          this.users = response.data
        })
      },

      filterUsers: function () {
        UserResource.searchUsersByCriteria(this.filters).then(res => {
          this.filterResults = true
          this.users = res.data
        })
      },

      onGridReady: function () {

      },
      onRowSelected (event) {

      },
      onSelectionChanged (event) {
      },

      onRowDataChanged() {
        console.log('sizing?');
        Vue.nextTick(() => {
          console.log('sizing');
            this.gridOptions.api.sizeColumnsToFit();
          }
        );
      },

      onRowDoubleClicked () {
        var selectedRows = this.gridOptions.api.getSelectedRows()
        this.$router.push('/gedosin/administration/users/' + selectedRows[0].id)
      },

      trackEvents: function () {
        EventBus.$on('change-page', (pageNumber) => {
          this.filters.page = pageNumber;
          if (!this.filterResults) {
            this.fetchUsers(pageNumber)
          } else {
            this.filterUsers()
          }
        })

        EventBus.$on('user-filters.update', (filters) => {
          this.filters = filters;
          this.filterUsers()
        })
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
