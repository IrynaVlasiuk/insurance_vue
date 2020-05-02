/* eslint-disable */
<template>
    <section id="Claims Page">
        <div class="card">
            <div class="container-fluid">
                <div class="row">
                    <div class="card-content">

                        <!--Contract & Claim Search-->
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>{{$t('labels.user_firstname')}}</label>
                                        <div class="form-group">
                                            <input type="text" class="form-control"
                                                   v-model="searchForm.firstname">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>{{$t('labels.user_lastname')}}</label>
                                        <div class="form-group">
                                            <input type="text" class="form-control" v-model="searchForm.lastname">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>{{$t('labels.user_email')}}</label>
                                        <div class="form-group">
                                            <input type="text" class="form-control"
                                                   v-model="searchForm.email">
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="col-sm-12">-->
                                <!--<div class="form-group">-->
                                <!--<label>{{$t('labels.lastname')}}</label>-->
                                <!--<div class="form-group">-->
                                <!--<input type="text" class="form-control" v-model="searchForm.lastname">-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--</div>-->
                            </div>
                        </div>


                        <!--Damage type & Claim Search-->
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>{{$t('labels.user_type')}}</label>
                                        <el-select class="select-default"
                                                   size="large"
                                                   placeholder=""
                                                   v-model="searchForm.type_id"
                                                   style="width: 100%">
                                            <el-option v-for="option in user_types"
                                                       class="select-primary"
                                                       :value="option.value"
                                                       :label="option.label"
                                                       :key="option.label">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="col-sm-12">

                                </div>
                            </div>
                        </div>


                        <!--Manger & Submit-->
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label>{{$t('labels.area')}}</label>
                                        <div class="form-group">
                                            <el-select class="select-default"
                                                       size="large"
                                                       placeholder=""
                                                       v-model="searchForm.area_id"
                                                       style="width: 100%">
                                                <el-option v-for="area in areas"
                                                           class="select-primary"
                                                           :value="area.id"
                                                           :label="area.name"
                                                           :key="area.id">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <!--Manger & Submit-->
                    <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-12">
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
                    <i class="ti-search"></i></span>
                                                </button>
                                            </div>
                                        </div>
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
                            <users-table :users="users"/>
                        </div>
                    </div>

                    <div    v-if="$store.getters.isAuthAdmin"
                            class="btn btn-outline btn-success" @click="$router.push('/gedosin/administration/users/create')">Create User</div>
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
  import AreaResource from '../../../../api/resources/AreaResource'
  import UsersTable from './components/UserTable' // Event bus
  var moment = require('moment')
  export default {
    name: 'UsersListPage',
    components: {
      UsersTable,
      AgGridVue,
      [DatePicker.name]: DatePicker,
      [Select.name]: Select,
      [Option.name]: Option,
      PPagination
    },
    data () {
      return {
        users: [],
        managerAssessors: [],
        areas: [],
        searchForm: {
          firstname: null,
          lastname: null,
          email: null,
          area_id: null,
          type_id: null,
        },
        user_types: [
          {label: 'Expert', value: 1},
          {label: 'Backoffice', value: 2},
          {label: 'Administrateur', value: 3},
        ],
        pickerOptions1: DateTimePickerDefaultOptions,
        datePicker: '',
        damageTypes: null, // Damage type drop down
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
    mounted () {
        let that = this;
        window.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                that.searchButtonClick();
            }
        });
    },
    created () {
      this.fetchInitialData()
    },
    methods: {
      fetchInitialData: function () {
        this.fetchAreas()
      },

      fetchAreas: function () {
        AreaResource.getAreas().then(res => {
          this.areas = res.data
        })
      },
      searchButtonClick () {
        EventBus.$emit('user-filters.update', this.searchForm)
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
        }

        EventBus.$emit('user-filters.update', this.searchForm)
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
