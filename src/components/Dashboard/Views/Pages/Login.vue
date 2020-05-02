/* eslint-disable */
<template>
    <div>
        <nav class="navbar navbar-transparent navbar-absolute">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle"
                            data-toggle="collapse"
                            data-target="#navigation-example-2"
                            @click="toggleNavbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <span class="navbar-brand">GEDOSIN</span>
                </div>

                <!--<div class="collapse navbar-collapse">
                  <ul class="nav navbar-nav navbar-right">
                    <router-link to="/register" tag="li">
                      <a>Register</a>
                    </router-link>
                    <router-link to="/admin/overview" tag="li">
                      <a>Dashboard</a>
                    </router-link>
                  </ul>
                </div>-->

            </div>
        </nav>

        <div class="wrapper wrapper-full-page">
            <div class="full-page login-page" data-color=""
                 data-image="static/img/background/background-2.jpg">
                <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
                <div class="content">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">

                                <form @submit.prevent="authenticate">
                                    <div class="card" data-background="color" data-color="blue">
                                        <div class="card-header">
                                            <h3 class="card-title">Connexion</h3>
                                        </div>
                                        <div class="card-content">
                                            <div class="form-group" :class="{ 'form-group--error': $v.form.username.$invalid }">
                                                <label>Email</label>

                                                <input type="text"
                                                       name="username"
                                                       v-model="form.username"
                                                       placeholder="Enter email"
                                                       class="form-control input-no-border"
                                                       @change="$v.form.username.$touch()">
                                                <small class="text-danger" v-if="!$v.form.username.required">
                                                    {{ $t('labels.validation.required') }}
                                                </small>
                                                <!--<small class="text-danger" v-if="!$v.form.username.email">-->
                                                    <!--The email field must be a valid email-->
                                                <!--</small>-->
                                            </div>
                                            <div class="form-group" :class="{ 'form-group--error': $v.form.password.$invalid }">
                                                <label>Mot de passe</label>
                                                <input type="password"
                                                       name="password"
                                                       v-model="form.password"
                                                       placeholder="Password"
                                                       class="form-control input-no-border">
                                                <small class="text-danger" v-if="!$v.form.password.required">
                                                    {{ $t('labels.validation.required') }}
                                                </small>
                                            </div>

                                            <div @click="$router.push('/forgot-password')">
                                                <small ><a>{{$t('labels.login.forgot_password')}}</a></small>
                                            </div>
                                        </div>
                                        <div class="card-footer text-center">

                                            <div class="row" v-if="authError">
                                                <p>
                                                    <small class="text-danger">
                                                        Error: {{ authError }}
                                                    </small>
                                                </p>
                                            </div>

                                            <button type="submit" class="btn btn-fill btn-wd" @click="validate">
                                                Connect
                                            </button>


                                            <!--<div class="forgot">
                                              <router-link to="/register">
                                                Forgot your password?
                                              </router-link>
                                            </div>-->
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

                <!--<footer class="footer footer-transparent">
                  <div class="container">
                    <div class="copyright">
                      &copy; Coded with
                      <i class="fa fa-heart heart"></i> by
                      <a href="https://github.com/cristijora" target="_blank">Cristi Jora</a>.
                      Designed by <a href="https://www.creative-tim.com/?ref=pdf-vuejs" target="_blank">Creative Tim</a>.
                    </div>
                  </div>
                </footer>-->
                <div class="full-page-background"
                     style="background-image: url(static/img/background/background-5.jpg) "></div>
            </div>
        </div>
        <!--<div class="collapse navbar-collapse off-canvas-sidebar">
          <ul class="nav nav-mobile-menu">
            <router-link to="/register" tag="li">
              <a>Register</a>
            </router-link>
            <router-link to="/admin/overview" tag="li">
              <a>Dashboard</a>
            </router-link>
          </ul>
        </div>-->
    </div>
</template>

<script>
  import {login} from '../../../../helpers/auth.js'
  import {mapFields} from 'vee-validate'
  import AuthResource from '../../../../api/resources/AuthResource'
  import {EventBus} from '../../../../bootstrap/event-bus'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: 'login',
    data () {
      return {
        form: {
          // email: 'djslinger77@gmail.com', // For JWT
          username: '', // For OAUTH
          password: '',
          grant_type: 'password',
          client_secret: this.$store.getters.config.OAUTH_CLIENT_SECRET, // Pulled from config/dev.env.js / prod.env.js
          client_id: this.$store.getters.config.OAUTH_CLIENT_ID
        },
        authError: null,
        // errors: null
        // Validation. Taken from LoginForm.vue - paper dashboard
          model: {
              email: '',
              password: ''
          },
          modelValidations: {
              email: {
                  required: true,
                  email: true
              },
              password: {
                  required: true,
              }
          }
      }
    },
      validations: {
          form: {
              username: { required, /*email*/ },
              password: { required }
          }
      },
    methods: {
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      authenticate () {
          if(!this.$v.form.$invalid) {
              let that = this
              AuthResource.login(this.form).then(res => {
                  this.$store.dispatch('setAuthUser', res.data).then(res => {
                      console.log('push to dashboard')
                      that.$router.push('/dashboard')
                  })
              }).catch((error) => {
                  if (error.response) {
                      if (error.response.data) {
                          return this.displayError({text: error.response.data.message, status: 'danger'})
                      }
                  }
                  console.log(error)
              })
          }
      },
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      displayError: function (data) {
        let icons = {
          'success': 'ti-check',
          'warning': 'ti-alert'
        }

        this.$notify(
          {
            component: {
              template: `<span> ` + data.text + `</span>`
            },
            icon: icons[data.status],
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: data.status
          })
      },
      validate () {
        if(!this.$v.form.$invalid) {
          return true;
        }
      }
    },
    beforeDestroy () {
      this.closeMenu()
    },
    computed: {
      ...mapFields(['email', 'password'])
    },
    mounted () {
      // alert('jojo: ' + process.env.OAUTH_CLIENT_SECRET);
    }
  }
</script>
<style>
    .full-page.login-page .form-group--error .form-control {
      background: lightcoral;
      opacity: 0.7;
    }
</style>
