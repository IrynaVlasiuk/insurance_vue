<template>
    <section class="contract-details" style="border: 0px solid blue; padding-top: 45px">
        <div v-if="claimExists">
            <div class="container-clear" style="border: 0px solid red">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card contract-header contract-navigation">
                            <button class="btn btn-default btn-fill" @click="detailsButtonClick">{{$t('labels.details')}}
                            </button>
                            <button class="btn btn-info btn-fill" @click="surveysButtonClick">{{$t('labels.surveys')}}
                            </button>
                            <button v-if="$store.getters.isAuthAdmin" class="btn btn-info btn-fill" @click="historyButtonClick">{{$t('labels.history')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <transition name="fade" mode="out-in">
                    <router-view :propClaim="claim"></router-view>
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
    import ClaimResource from '../../../../../api/resources/ClaimResource.js'

    export default {
    name: 'claims-details-layout',
    methods: {
      detailsButtonClick () {
        this.$router.push('/claims/' + this.$route.params.id)
      },
      surveysButtonClick () {
        this.$router.push('/claims/' + this.$route.params.id + '/surveys')
      },
      historyButtonClick () {
          this.$router.push('/claims/' + this.$route.params.id + '/history')
      },
      /** Fetch Claim **/
      fetchClaim: function () {
        ClaimResource.getClaim(this.$route.params.id).then(res => {
          this.claim = res.data;
          this.claimExists = true;
        }).catch((error) => {
          this.errorPage = true;
          if(error) console.log(error);

        })
      },
    },
    data: function () {
        return {
            claimExists: false,
            claim: null,
            errorPage: false
        }
    },
    mounted() {
        this.fetchClaim();
    },
    }
</script>

