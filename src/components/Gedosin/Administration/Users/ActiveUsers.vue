/* eslint-disable */
<template>
  <section id="Claims Page">
    <div class="card">
      <!-- AG grid row -->
      <div class="card-content">

        <div class="row">
          <div class="col-xs-12">
            <active-users-table :users="users"/>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
    import {AgGridVue} from 'ag-grid-vue'
    import PPagination from 'src/components/UIComponents/Pagination.vue'
    import ActiveUsersTable from './components/ActiveUserTable' // Event bus
    var moment = require('moment')
    export default {
        name: 'UsersListPage',
        components: {
            ActiveUsersTable,
            AgGridVue,
            PPagination
        },
        data() {
            return {
                users: [],
            }
        },
        mounted() {
        },
        created() {
            this.fetchInitialData()
        },
        methods: {
            fetchInitialData: function () {
                this.fetchAreas()
            },

            fetchAreas: function () {
            },


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
