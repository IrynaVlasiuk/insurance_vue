/* eslint-disable */
<template>
    <section class="contract-details">
        <div v-if="contractExists">
            <div class="container-clear">
                <div class="row">
                    <div class="col-lg-12 contract-header-bg">
                        <div class="card contract-header">
                            <div class="row contract-header-content">
                                <div class="image-container">
                                    <img class="contract-image" src="@/assets/images/mrc.jpg"/>
                                </div>
                                <div class="contract-name">
                                    <h3>{{$t('labels.contract')}} {{contract.contract_number}}
                                        <small>MRC - {{contract.product}}</small>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row contract-print">
                    <div class="col-lg-12">
                        <div class="card contract-header contract-navigation">
                            <button class="btn btn-default btn-fill pull-left" @click="$router.push('/contract/' + contract.id)">
                                {{$t('labels.details')}}
                            </button>
                            <button class="btn btn-info btn-fill pull-left" @click="$router.push('/contract/' + contract.id + '/contract-claims')">
                                {{$t('labels.claims')}}
                            </button>
                            <!--<button class="btn btn-info btn-fill pull-right">Print</button>-->
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <div class="row" v-if="errorPage">
            <div class="col-md-12 text-center">
                <div class="alert alert-danger">
                    <span>Erreur 403</span>
                </div>
                <h2 class="title">Accès refusé</h2>
                <h2>
                    <small>La ressource demandée n'existe pas ou vous n'y avez pas accès.</small>
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
  import ContractResource from '../../../../../api/resources/ContractResource'

  export default {
    name: 'ContractDetailsLayout',
    data () {
      return {
        contract: {
          claims: []
        },
        contractExists:false,
        errorPage:false
      }
    },
    created () {
      this.fetchContract()
    },
    methods: {
      /** Fetch Contract **/
      fetchContract: function () {
        ContractResource.getContract(this.$route.params.id).then(res => {
          this.contractExists = true;
          this.contract = res.data;
        }).catch((error) => {
            this.errorPage = true;
            console.log(error);
        })
      }
    }
  }
</script>
