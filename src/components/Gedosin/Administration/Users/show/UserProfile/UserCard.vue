<template>
    <div class="card card-user">
        <div class="image">
            <img src="static/img/background/background-5.jpg" alt="...">
        </div>
        <div class="card-content">
            <div class="author">
                <img class="avatar border-white" src="static/img/userpic.png" alt="...">
                <h4 class="title">{{$parent.user.full_name}}
                    <br>
                    <a href="#">
                        <small>{{ $t('user_type.' + $parent.user.type.name)}}</small>
                    </a>
                </h4>
                <div class="btn btn-info btn-sm" v-if="$store.getters.isAuthAdmin && $store.getters.currentUser.id != $parent.user.id"
                     @click="authenticateWithUser()"
                     >Se connecter<!--v-if="$store.getters.isAuthAdmin"-->
                </div>
            </div>
        </div>
        <hr>
        <div class="text-center">
            <div class="row">
                <div class="col-md-3" v-for="detail in details">
                    <div :class="getClasses(index)">
                        <h5>{{detail.count}}
                            <br>
                            <small>{{detail.title}}</small>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import AuthResource from '../../../../../../api/resources/AuthResource'
  import UserResource from '../../../../../../api/resources/UserResource'

  export default {
    data () {
      return {
        details: [
          {
            title: '',
              count: ''
          },
          {
            title: '',
              count: ''
          },
          {
            title: '',
              count: ''
          },
          {
            title: '',
              count: ''
          }
        ]
      }
    },
    created: function() {
      this.getUserDetails()
    },
    methods: {
      getUserDetails() {
          UserResource.getUserDetails(this.$parent.user.id).then(res => {
              this.details = res.data
          })

      },
      getClasses (index) {
        const remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      },
      authenticateWithUser: function () {
        AuthResource.authWithUser(this.$parent.user.id).then(res => {
          this.$store.dispatch('setAuthUser', res.data).then(res => {
            console.log('push to dashboard')
            that.$router.push('/dashboard')
          })
        })
      }
    }
  }

</script>
<style>

</style>
