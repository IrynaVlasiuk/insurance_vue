/* eslint-disable */
<template>
    <section>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5>{{$t('labels.contract_claims')}}</h5>
                        <hr>
                        <el-collapse class="panel-group" v-for="claim in claims" :key="claim.id">
                            <div class="btn btn-info pull-right btn-goto" @click="$router.push('/claims/'+claim.id)">
                                {{$t('labels.claim_details')}}
                            </div>
                            <el-collapse-item :class="{empty: !claim.surveys.length}"
                                              :name="claim.id" :key="claim.id">
                                <template slot="title">
                                    <span class="label label-warning">{{$t('labels.harvest_year')+ ' : ' + claim.harvest_year}}</span>
                                    <span class="label label-info">{{$t('labels.claim') + ' ' +  claim.external_id}}</span>
                                    <span class="label label-primary">{{$options.filters.removeTime(claim.happened_at )}}</span>
                                    <span class="label label-danger">{{$t('options.claim_damage_type.' + claim.damage_type.toUpperCase())}}</span>
                                </template>
                                <div>
                                    <el-collapse class="panel-group" v-for="survey in claim.surveys" :key="survey.id">
                                        <div class="btn btn-warning pull-right btn-goto"
                                             @click="$router.push('/surveys/'+survey.id)">Détails de l'expertise
                                        </div>
                                        <el-collapse-item :title="'Expertise du '+ survey.datetime_scheduled" name="1">
                                            <label>Experts</label>
                                            <p v-for="assessor in survey.assistant_assessors">
                                                {{assessor.full_name}}
                                            </p>
                                            <div>
                                                <label>Note</label>
                                                <div>
                                                    <small>{{survey.note}}</small>
                                                </div>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import Vue from 'vue'
  import {Collapse, CollapseItem} from 'element-ui'
  import ContractResource from '../../../../../../api/resources/ContractResource'
  import moment from 'moment'

  Vue.use(Collapse)
  Vue.use(CollapseItem)
  export default {
    name: 'ContractClaims',
    data () {
      return {
        claims: []
      }
    },
    created () {
      this.fetchContractClaims()
    },
    methods: {
      /** Fetch Contract Claims **/
      fetchContractClaims: function () {
        ContractResource.getContractClaims(this.$route.params.id).then(res => {
          this.claims = res.data
        })
      },
    },
    filters: {
        removeTime: function (date) {
          return moment(date).format('YYYY-MM-DD');
      }
    }
  }
</script>

<style scoped>
    .empty {
        /*opacity: 0.4;*/
    }
    .btn-goto {
        position: absolute;
        right: 140px;
        top: 22px;
        z-index: 3333;
    }
    .el-collapse {
        position: relative;
    }
    .el-collapse-item {
        border-bottom: 2px solid #e8e7e3;
    }
</style>
