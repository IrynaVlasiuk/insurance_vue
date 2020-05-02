<template>
    <section class="surveys-list-page">
        <div class="card">
            <div class="card-content">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>{{$t('labels.claim#')}}</label>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="filters.claim_external_id"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>{{$t('labels.client_company')}}</label>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="filters.client_company">
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>{{$t('labels.scheduled_at_from')}}</label>
                                    <el-date-picker v-model="filters.date_from" type="date"
                                                    placeholder=""
                                                    format="dd/MM/yyyy"
                                                    value-format="yyyy-MM-dd"
                                                    :picker-options="datePickerOptions" language="fr"
                                                    style="width: 100%">
                                    </el-date-picker>
                                </div>


                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>{{$t('labels.scheduled_at_to')}}</label>
                                    <el-date-picker v-model="filters.date_to" type="date"
                                                    format="dd/MM/yyyy"
                                                    value-format="yyyy-MM-dd"
                                                    placeholder=""
                                                    :picker-options="datePickerOptions" style="width: 100%">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label>{{$t('labels.search')}}</label>
                            <div @click="search">
                                <div class="btn btn-success btn-search"><i class="ti-search"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="card-content">
                        <surveys-table :surveys="surveys.data"/>
                        <span>{{ surveys.from }} - {{ surveys.to }} / {{ surveys.total }} {{$t('labels.records')}}</span>

                        <p-pagination class="pull-right"
                                      v-model="surveys.current_page"
                                      :per-page="surveys.per_page"
                                      :total="surveys.total">
                        </p-pagination>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
  import SurveyResource from '../../../../api/resources/SurveyResource'
  import SurveysTable from './components/SurveysTable'
  import {DatePicker, Select, Option} from 'element-ui'
  import DatepickerDefaultOptions from '../../../../helpers/datepicker/DatepickerDefaultOptions'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import {bus} from '../../../../main.js'
  import {EventBus} from '../../../../bootstrap/event-bus'
  // Vue.use
  export default {
    name: 'SurveysListPage',
    components: {
      SurveysTable,
      [DatePicker.name]: DatePicker,
      PPagination
    },
    data: function () {
      return {
        surveys: {
            data: []
        },
        filters: {
          claim_external_id: null,
          datetime_scheduled: null,
          client_company: null,
        },
        datePickerOptions: DatepickerDefaultOptions
      }
    },
    mounted: function() {
      let that = this;
      window.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
          that.search();
        }
      });
    },
    created () {
      SurveyResource.getRoleSpecificSurveys().then(res => {
        this.surveys = res.data
      })
      this.trackEvents()
    },
    methods: {
      search: function () {
        SurveyResource.search(this.filters).then(res => {
          this.surveys = res.data
        })
      },
      trackEvents: function () {

          EventBus.$on('input', (pageNumber) => {
              console.log('change page to ' + pageNumber)
              SurveyResource.search({page: pageNumber})
                  .then((res) => {
                      this.surveys = res.data
                  })
          })

          EventBus.$on('nextPage', (pageNumber) => {
              SurveyResource.search({page: pageNumber})
                  .then((res) => {
                      this.surveys = res.data.data // Fill data grid
                  })
          })

          EventBus.$on('prevPage', (pageNumber) => {
              SurveyResource.search({page: pageNumber})
                  .then((res) => {
                      this.surveys = res.data.data // Fill data grid
                  })
          })
      }
    }
  }
</script>

<style scoped>
    .btn-search {
        min-width: 110px;
    }
</style>
