<template>
    <div class="card" v-if="$parent.user">
        <div class="card-header">
            <h4 class="title">{{ $t('labels.title_edit_profile') }}</h4>
        </div>
        <div class="card-content">
            <form>

                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group" :class="{ 'form-group--error': $v.user.login.$invalid }">
                            <label>{{ $t('labels.username') }}</label>
                            <input type="text"
                                   class="form-control"
                                   :placeholder="$t('labels.username')"
                                   name="login"
                                   v-model="user.login"
                                   @change="$v.user.login.$touch()"
                                   :disabled="true">
                            </input>
                            <div class="error" v-if="!$v.user.login.required">{{ $t('labels.validation.required') }}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" :class="{ 'form-group--error': $v.user.email.$invalid }">
                            <label>{{ $t('labels.user_email') }}</label>
                            <input type="email"
                                   class="form-control"
                                   :placeholder="$t('labels.user_email')"
                                   name="email"
                                   v-model="user.email"
                                   :disabled="$store.getters.isAgent"
                                   @change="$v.user.email.$touch()">
                            </input>
                            <div class="error" v-if="!$v.user.email.required">{{ $t('labels.validation.required') }}</div>
                            <div class="error" v-if="!$v.user.email.email">{{ $t('labels.validation.validated_email')}}</div>
                        </div>
                    </div>
                    <div class="col-md-4" v-if="!$store.getters.isAgent">
                        <div class="form-group" :class="{ 'form-group--error': $v.user.passwd.$invalid }">
                            <label>{{ $t('labels.password') }}</label>
                            <input type="password"
                                   class="form-control"
                                   :placeholder="$t('labels.password')"
                                   name="passwd"
                                   v-model="user.passwd"
                                   autocomplete="new-password"
                                   @change="$v.user.passwd.$touch()">
                            </input>
                          <div class="error" v-if="!$v.user.passwd.minLength || !$v.user.passwd.passwdRules">
                            {{$t('labels.validation.invalid_password') + ' ' + $v.user.passwd.$params.minLength.min + ' ' + $t('labels.validation.letters') + ' ' + $t('labels.validation.password_rules')}}
                          </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group" :class="{ 'form-group--error': $v.user.firstname.$invalid }">
                            <label>{{ $t('labels.user_firstname') }}</label>
                            <input type="text"
                                   class="form-control"
                                   :placeholder="$t('labels.user_firstname')"
                                   v-model="user.firstname"
                                   name="firstname"
                                   :disabled="$store.getters.isAgent"
                                   @change="$v.user.firstname.$touch()">
                            </input>
                            <div class="error" v-if="!$v.user.firstname.required">{{ $t('labels.validation.required') }}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group" :class="{ 'form-group--error': $v.user.lastname.$invalid }">
                            <label>{{ $t('labels.user_lastname') }}</label>
                            <input type="text"
                                   class="form-control"
                                   :placeholder="$t('labels.user_lastname')"
                                   name="lastname"
                                   :disabled="$store.getters.isAgent"
                                   v-model="user.lastname">
                            </input>
                            <div class="error" v-if="!$v.user.lastname.required">{{ $t('labels.validation.required') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <label>{{ $t('labels.address1') }}</label>
                        <fg-input type="text"
                                  :placeholder="$t('labels.address1')"
                                  :disabled="$store.getters.isAgent"
                                  v-model="user.address1">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <label>{{ $t('labels.address2') }}</label>
                        <fg-input type="text"
                                  :placeholder="$t('labels.address2')"
                                  :disabled="$store.getters.isAgent"
                                  v-model="user.address2">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <label>{{ $t('labels.zipcode') }}</label>
                        <fg-input type="text"
                                  :placeholder="$t('labels.zipcode')"
                                  :disabled="$store.getters.isAgent"
                                  v-model="user.zipcode">
                        </fg-input>
                    </div>
                    <div class="col-md-6">
                        <label>{{ $t('labels.city') }}</label>
                        <fg-input type="text"
                                  :placeholder="$t('labels.city')"
                                  :disabled="$store.getters.isAgent"
                                  v-model="user.city">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>{{ $t('labels.phone') }}</label>
                            <VuePhoneNumberInput
                                    v-model="user.phone"
                                    v-bind="bindProps"
                                    default-country-code="FR"
                                    :disabled="$store.getters.isAgent"
                                    aria-placeholder=""
                                    ref="phone"
                                    class="phone-input"
                            />
                            <div class="error" style="text-align: left" v-if="$refs.phone && $refs.phone.phoneNumber && !$refs.phone.isValid">{{ $t('labels.validation.invalid_phone')}}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 col-md-offset-5">
                        <button type="submit" class="btn btn-info btn-fill btn-wd pull-left" @click.prevent="updateProfile">
                            Mettre à jour
                        </button>
                    </div>
                </div>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import UserResource from '../../../../../api/resources/UserResource'
  import AreaResource from '../../../../../api/resources/AreaResource'
  import {EventBus} from '../../../../../bootstrap/event-bus'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import VuePhoneNumberInput from 'vue-phone-number-input'
  import 'vue-phone-number-input/dist/vue-phone-number-input.css'

  Vue.component('vue-phone-number-input', VuePhoneNumberInput);

  const passwdRules= value => {
      if (typeof value === 'undefined' || value === null || value === '') {
          return true
      }
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(value)
  }

  export default {
    components: { VuePhoneNumberInput },
    data () {
      return {
        user: {
          company: 'Paper4Dashboard',
          login: 'michael23',
          email: '',
          firstname: 'Chet',
          lastname: 'Faker',
          address1: 'Melbourne, Australia',
          address2: 'Melbourne, Australia',
          city: 'melbourne',
          zipcode: '',
          phone:'',
        },
        bindProps: {
          onlyCountries: ["FR"],
          placeholder: null,
          color:'red',
          disabledFetchingCountry: false,
          required: false,
          translations: {
            phoneNumberLabel:this.$t('labels.phone'),
          }
        },
      }
    },
    validations: {
      user: {
        login: { required },
        email: { required, email },
        firstname: { required },
        lastname: { required },
        passwd: { minLength: minLength(6), passwdRules },
      }
    },
    created () {
      this.user = this.$parent.user
      if(this.$store.getters.isAgent){
          this.user.login = this.user.code;
      }
    },
    methods: {
      updateProfile () {
        if(!this.$v.user.$invalid) {
            if(this.$refs.phone.phoneNumber && this.$refs.phone.isValid) {
                this.updateProfileUser();
            } else if (!this.$refs.phone.phoneNumber) {
                this.updateProfileUser();
            }
        }
      },
      displayError: function (text) {
        EventBus.$emit('notification-popup', {text: text, status: 'warning'})
      },
      updateProfileUser: function () {
        if(this.user.phone) {
            this.user.phone = this.$refs.phone.phoneFormatted;
        }
        UserResource.updateAuthUserProfile(this.user).then(res => {
          this.$store.dispatch('setUserDetails', res.data)
          if(res.data.error) {
            if(res.data.error == 'email') {
              this.$store.dispatch('setUserDetails', this.$parent.user)
              this.displayError(this.$t('labels.validation.unique_email'))
              this.user = this.$parent.user
            }
            if(res.data.error == 'area') {
                this.$store.dispatch('setUserDetails', this.$parent.user)
                this.user = this.$parent.user
            }
          } else {
             EventBus.$emit('notification-popup', {text: 'User Profile Successfully updated', status: 'success'})
          }
      })
     },
    }
  }

</script>
<style>
    .vue-phone-number-input .country-selector {
        display: none;
    }

    .vue-phone-number-input .input-phone-number input {
        border-radius: 4px!important;
        border-color: #e8e7e3!important;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: Gainsboro;
        font-family: 'Muli', Arial, sans-serif;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #e8e7e3;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #e8e7e3;
    }

    .field.vue-input-ui.has-value .field-label[data-v-4039a700] {
        color: red;
        display:none;
    }

    .vue-phone-number-input .select-country-container {
        max-width: 4px!important;
        min-width: 4px!important;
    }

    .field.vue-input-ui .field-input[data-v-4039a700] {
        width: 64%;
    }

    .field.vue-input-ui.has-value .field-input[data-v-4039a700] {
        padding-top: 0px;
    }

    .field.vue-input-ui.input-phone-number.has-value .field-input{
        border: 1px solid red!important;
    }

    .input-phone-number input#VuePhoneNumberInput_phone_number.field-input {
        border: 1px solid Gainsboro!important;
    }

    .disabledSelect {
        pointer-events: none !important;
        opacity: 0.35 !important;
        background-color: #9A9A9A;
        border-radius: 5px;
    }
</style>
