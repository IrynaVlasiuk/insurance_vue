/* eslint-disable */
<template>
    <div>
        <div class="row" v-if="$store.getters.isBackoffice">
            <div class="col-lg-3 col-sm-6 pull-right">
                <div class="form-group">
                    <label>{{$t('labels.area')}}</label>
                    <div class="form-group">
                        <v-select class="select-default"
                                  v-model="area"
                                  :label="'name'"
                                  style="width: 100%"
                                  :options="areas"
                                  @input="areaChange"
                                  :clearable="false"
                                  >
                        </v-select>
                    </div>
                </div>
            </div>
        </div>
        <!--Stats cards-->
        <div class="row">
            <div class="col-lg-3 col-sm-6 stats-card" v-for="stats in statsCards" v-if="visibilityPassed(stats)"
                 @click="changeTableContent(stats)">
                <stats-card>
                    <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
                        <i :class="stats.icon"></i>
                    </div>
                    <div class="numbers" slot="content">
                        <p>{{stats.title}}</p>
                        {{stats.value}}
                    </div>
                    <div class="stats text-limit" slot="footer">
                        <el-tooltip :content="stats.footerText"
                                    effect="light"
                                    :open-delay="300"
                                    placement="top">
                            <i :class="stats.footerIcon"></i>
                        </el-tooltip>
                        {{stats.footerText}}
                    </div>

                </stats-card>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-content" v-loading="loading">
                        <claim-table v-if="claimsTableData" :claims="claimsTableData"
                                     :redirectToSurvey="redirectToSurvey"/>
                        <surveys-table v-if="surveysTableData" :surveys="surveysTableData"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ClaimTable from '../components/tables/claims/ClaimTable'
  import ClaimResource from '../../../api/resources/ClaimResource'
  import SurveyResource from '../../../api/resources/SurveyResource'
  import SurveysTable from '../Management/Surveys/components/SurveysTable'
  import AreaResource from '../../../api/resources/AreaResource'
  import {Loading} from 'element-ui'
  //import { i18n } from '../../../../node_modules/vue-i18n/dist/vue-i18n.min'
  import {Tooltip} from 'element-ui'

  Vue.use(Loading.directive)

  export default {
    name: 'Dashboard',
    components: {
      SurveysTable,
      ClaimTable,
      StatsCard,
      [Tooltip.name]: Tooltip
    },
    data: function () {
      return {
        claimsTableData: [],
        surveysTableData: null,
        loading: false,
        statsCards: [
          {
            id: 'assignment',
            type: 'warning',
            icon: 'ti-user',
            title: this.$t('dashboard.cards.awaiting_assignment'),
            value: '-',
            footerText: this.$t('dashboard.cards.awaiting_assignment_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/claim/filter/awaiting-assignment',
            claims: [],
            visibility: 'advanced'
          },
          {
            id: 'processing',
            type: 'success',
            icon: 'ti-calendar',
            title: this.$t('dashboard.cards.awaiting_processing'),
            value: '-',
            footerText: this.$t('dashboard.cards.awaiting_processing_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/claim/filter/awaiting-processing',
            claims: []
          },
          {
            id: 'scheduled',
            type: 'danger',
            icon: 'ti-timer',
            title: this.$t('dashboard.cards.scheduled_surveys'),
            value: '-',
            footerText: this.$t('dashboard.cards.scheduled_surveys_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/survey/filter/scheduled-surveys',
            surveys: [],
            redirectToSurvey: true,
            display: 'surveys'
          },
          {
            id: 'past',
            type: 'info',
            icon: 'ti-check',
            title: this.$t('dashboard.cards.past_surveys'),
            value: '-',
            footerText: this.$t('dashboard.cards.past_surveys_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/survey/filter/past-surveys',
            surveys: [],
            redirectToSurvey: true,
            //visibility: 'manager-assessor-only',
            display: 'surveys'
          },
          {
            id: 'validation',
            type: 'info',
            icon: 'ti-check-box',
            title: this.$t('dashboard.cards.awaiting_validation'),
            value: '-',
            footerText: this.$t('dashboard.cards.awaiting_validation_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/claim/filter/awaiting-validation',
            claims: []
          },
          {
            id: 'areaManager_validation',
            type: 'success',
            icon: 'ti-anchor',
            title: this.$t('dashboard.cards.awaiting_area_manager_validation'),
            value: '-',
            footerText: this.$t('dashboard.cards.awaiting_area_manager_validation_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/claim/filter/awaiting-area-manager-validation',
            claims: [],
            visibility: 'backoffice-areaManager'
          },
          {
            id: 'areaManager_validated',
            type: 'success',
            icon: 'ti-stamp',
            title: this.$t('dashboard.cards.validated_by_area_manager'),
            value: '-',
            footerText: this.$t('dashboard.cards.validated_by_area_manager_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/claim/filter/area-manager-validated',
            claims: [],
            visibility: 'backoffice-not-areaManager'
          },
          {
            id: 'received',
            type: 'success',
            icon: 'ti-import',
            title: this.$t('dashboard.cards.received'),
            value: '-',
            footerText: this.$t('dashboard.cards.received_label'),
            footerIcon: 'ti-info-alt',
            path: 'dashboard/claim/filter/received',
            claims: [],
            visibility: 'backoffice-not-areaManager'
          }
        ],
        redirectToSurvey: false,
        search: {
            area: null
        },
        areas: [],
        area: null,
      }
    },
    computed: {
      isAdvancedAssessor: function () {
        return this.$store.getters.currentUser.isAreaManager || this.$store.getters.currentUser.isChiefAssessor
      }
    },
    created: function () {
      console.log('user', this.$store.getters.currentUser);
      this.fetchInitialData();
    },
    methods: {
      fetchInitialData: function () {
        this.fetchAreas();
      },
      visibilityPassed: function (stat) {

        if (stat.visibility === 'advanced') {
          return (this.isAdvancedAssessor || this.$store.getters.isAuthAdmin)
        }

        if (stat.visibility === 'manager-assessor-only') {
          return this.$store.getters.currentUser.isManagerAssessor
        }

        if (stat.visibility === 'backoffice-not-areaManager') {
          return this.$store.getters.isBackoffice && !this.$store.getters.currentUser.isAreaManager;
        }

        if (stat.visibility === 'backoffice-areaManager') {
          return this.$store.getters.isBackoffice || this.$store.getters.currentUser.isAreaManager;
        }

        return true
      },
      changeTableContent: function (statsCard) {
          let area = false;
          let that = this;

          if (this.area != null) {
              area = this.area.val;
          } else {
              area = 'all';
          }

        this.loading = true
        if (statsCard.display === 'surveys') {
          this.surveysTableData = []
          SurveyResource.surveyRoleCustomRequest(statsCard.path + '?area=' + area).then(res => {
            // statCard.surveys = res.data
            this.claimsTableData = null
            this.surveysTableData = res.data
            this.loading = false
          })
        }
        else {
          this.claimsTableData = []
          ClaimResource.claimRoleCustomRequest(statsCard.path + '?area=' + area).then(res => {
            this.surveysTableData = null
            this.claimsTableData = res.data
            this.loading = false
          })
        }
        this.redirectToSurvey = statsCard.redirectToSurvey
      },
      fetchStatCards: function () {

        let area = false;
        let that = this;

        if (this.area != null) {
            area = this.area.val;
        } else {
            area = 'all';
        }

        ClaimResource.claimRoleCustomRequest('dashboard/claim/filter/cards?area' + '=' + area).then(res => {
          this.statsCards.forEach(statCard => {
            if (statCard.display !== 'surveys') {
                statCard.value = res.data[statCard.id];
            }
          })
        });

        SurveyResource.surveyRoleCustomRequest('dashboard/survey/filter/cards?area' + '=' + area).then(res => {
          this.statsCards.forEach(statCard => {
              if (statCard.display === 'surveys') {
                  if (statCard.visibility === 'manager-assessor-only' && !that.$store.getters.currentUser.isManagerAssessor) {

                  } else {
                    statCard.value = res.data[statCard.id];
                  }
              }
          })
        })

        // this.statsCards.forEach(statCard => {
        //   if (statCard.display === 'surveys') {
        //     if (statCard.visibility === 'manager-assessor-only' && !that.$store.getters.currentUser.isManagerAssessor) {
        //
        //     } else {
        //       SurveyResource.surveyRoleCustomRequest(statCard.path + '?count=1&area=' + area).then(res => {
        //         // statCard.surveys = res.data
        //         statCard.value = res.data.total
        //       })
        //     }
        //   } else {
        //     ClaimResource.claimRoleCustomRequest(statCard.path + '?count=1&area=' + area).then(res => {
        //       // statCard.claims = res.data
        //       statCard.value = res.data.total
        //     })
        //   }
        // })
      },
    fetchAreas: function () {

        AreaResource.getAreas().then(res => {

            this.areas[0] = {
                name: this.$t('labels.all_areas'),
                val: 'all'
            };
            res.data.forEach(d => { this.areas.push({name:d.name, val:d.id}) })
            this.area = this.areas[this.$store.getters.defaultArea];
            this.fetchStatCards();
        })
    },
    areaChange: function () {

        if (this.surveysTableData != null) {
            this.surveysTableData = [];
        }

        if (this.claimsTableData != null) {
            this.claimsTableData = [];
        }

        this.fetchStatCards();
    }
    }
  }
</script>

<style lang="scss" scoped>

    .stats-card > .card {
        cursor: pointer;
        transition: all 0.07s ease;
        &:hover {
            box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.45);
        }
    }

    .text-limit {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 347px;
    }

</style>
