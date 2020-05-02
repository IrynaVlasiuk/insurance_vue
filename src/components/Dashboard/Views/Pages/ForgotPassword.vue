/* eslint-disable */
<template>
    <div>
        <nav class="navbar navbar-transparent navbar-absolute">
            <div class="container">
                <div class="navbar-header">
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

                                <form @submit.prevent="recoverPassword">
                                    <div class="card" data-background="color" data-color="blue">
                                        <div class="card-header">
                                            <h3 class="card-title">Mot de passe oublié</h3>
                                        </div>
                                        <div class="card-content">
                                            <div class="form-group" :class="{ 'form-group--error': $v.form.email.$invalid }">
                                                <label>Adresse email</label>

                                                <input type="email"
                                                       name="email"
                                                       v-model="form.email"
                                                       placeholder="Entrez votre email"
                                                       class="form-control input-no-border"
                                                       @change="$v.form.email.$touch()">
                                                <small class="text-danger" v-if="!$v.form.email.required">
                                                    {{ $t('labels.validation.required') }}
                                                </small>
                                                <small class="text-danger" v-if="!$v.form.email.email">
                                                    The email field must be a valid email
                                                </small>
                                            </div>
                                            <small><a href="" @click="$router.push('/login')">Retour</a></small>
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
                                                Envoyer
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
          email: '',
        },
        authError: null,
        // errors: null
        // Validation. Taken from LoginForm.vue - paper dashboard
        model: {
          email: '',
          password: ''
        },
      }
    },
    validations: {
        form: {
            email: { required, email },
        }
    },
    methods: {
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      recoverPassword () {
        let that = this
          if(!this.$v.form.$invalid) {
            AuthResource.forgotPassword(this.form).then(res => {
              this.displayError({text: 'Lien de réinitialisation du mot de passe envoyé par email', status: 'success'});
                return that.$router.push('/login')
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
    },
  }
</script>
<style>
    .form-group--error .form-control {
      background: lightcoral;
      opacity: 0.7;
    }
</style>
