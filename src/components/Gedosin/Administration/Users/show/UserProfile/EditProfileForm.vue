<template>
    <div class="card" v-if="$parent.user">
        <div class="card-header">
            <h4 class="title">{{ $t('labels.edit_profile') }}</h4>
        </div>
        <div class="card-content">
            <form :class="{disabledForm: !$store.getters.isAuthAdmin}">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn btn-success btn-sm"
                             v-if="user.isAreaManager">
                            #Area Manager
                        </div>

                        <div class="btn btn-success btn-sm"
                             v-if="user.isChiefAssessor">
                            #Chief Assessor
                        </div>

                        <div class="btn btn-success btn-sm"
                             v-if="user.isManagerAssessor">
                            #Manager Assessor
                        </div>
                        <br>
                        <br>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label>{{ $t('labels.scope') }}</label>
                        <div class="form-group">
                            <v-select class="select-default"
                                      v-model="user.scope"
                                      :label="'name'"
                                      @input="(val)=> {val ? user.scope_id = val.id : user.scope_id = null}"
                                      style="width: 100%"
                                      :options="scopes">
                            </v-select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label>{{ $t('labels.area') }}</label>
                        <div class="form-group">
                            <v-select class="select-default"
                                      v-model="user.area"
                                      :label="'name'"
                                      @input="(val)=> {val ? user.area_id = val.id : user.area_id = null}"
                                      style="width: 100%"
                                      :options="areas">
                            </v-select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label>{{ $t('labels.user_type') }}</label>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.type.$invalid }">
                            <v-select class="select-default"
                                      v-model="user.type"
                                      :label="'name'"
                                      @input="(val)=> {val ? user.type_id = val.id : user.type_id = 1}"
                                      style="width: 100%"
                                      :options="types"
                                      name="type">
                            </v-select>
                            <div class="error" v-if="!$v.user.type.required">{{ $t('labels.validation.required') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <label>{{ $t('labels.username') }}</label>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.login.$invalid }">
                            <input type="text"
                                   class="form-control"
                                   :placeholder="$t('labels.username')"
                                   name="login"
                                   v-model="user.login"
                                   @change="$v.user.login.$touch()">
                            </input>
                            <div class="error" v-if="!$v.user.login.required">{{ $t('labels.validation.required') }}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label class="label-passwd" l>{{ $t('labels.password') }}</label>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.passwd.$invalid }">
                            <input type="password"
                                   class="form-control"
                                   :placeholder="$t('labels.password')"
                                   name="passwd"
                                   v-if="$store.getters.isAuthAdmin"
                                   v-model="user.passwd"
                                   @change="$v.user.passwd.$touch()">
                            </input>
                            <div class="error" v-if="!$v.user.passwd.minLength || !$v.user.passwd.passwdRules">{{ errMsg.password_min_length + ' ' + $t('labels.validation.password_rules')}}</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label>{{ $t('labels.user_email') }}</label>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.email.$invalid }">
                            <input type="email"
                                   class="form-control"
                                   :placeholder="$t('labels.user_email')"
                                   name="email"
                                   v-model="user.email"
                                   @change="$v.user.email.$touch()">
                            </input>
                            <div class="error" v-if="!$v.user.email.required">{{ $t('labels.validation.required') }}</div>
                            <div class="error" v-if="!$v.user.email.email">{{ $t('labels.validation.validated_email') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <label>{{ $t('labels.user_firstname') }}</label>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.firstname.$invalid }">
                            <input type="text"
                                   class="form-control"
                                   :placeholder="$t('labels.user_firstname')"
                                   name="firstname"
                                   v-model="user.firstname"
                                   @change="$v.user.firstname.$touch()">
                            </input>
                            <div class="error" v-if="!$v.user.firstname.required">{{ $t('labels.validation.required') }}</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label>{{ $t('labels.user_lastname') }}</label>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.lastname.$invalid }">
                            <input type="text"
                                   class="form-control"
                                   :placeholder="$t('labels.user_lastname')"
                                   name="lastname"
                                   v-model="user.lastname"
                                   @change="$v.user.lastname.$touch()">
                            </input>
                            <div class="error" v-if="!$v.user.lastname.required">{{ $t('labels.validation.required') }}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <label>{{ $t('labels.address1') }}</label>
                        <fg-input type="text"
                                  :placeholder="$t('labels.address1')"
                               v-model="user.address1">
                        </fg-input>
                    </div>
                    <div class="col-md-6">
                        <label>{{ $t('labels.address2') }}</label>
                        <fg-input type="text"
                                  :placeholder="$t('labels.address2')"
                                  v-model="user.address2">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <label>{{ $t('labels.zipcode') }}</label>
                        <fg-input type="number"
                                  :placeholder="$t('labels.zipcode')"
                                  v-model="user.zipcode">
                        </fg-input>
                    </div>
                    <div class="col-md-6">
                        <label>{{ $t('labels.city') }}</label>
                        <fg-input type="text"
                                  :placeholder="$t('labels.city')"
                                  v-model="user.city">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label>{{ $t('labels.phone') }}</label>
                            <VuePhoneNumberInput
                                    v-model="user.phone"
                                    v-bind="bindProps"
                                    default-country-code="FR"
                                    ref="phone"
                                    class="phone-input"
                            />
                            <div class="error" style="text-align: left" v-if="$refs.phone && $refs.phone.phoneNumber && !$refs.phone.isValid">{{ $t('labels.validation.invalid_phone')}}</div>
                        </div>
                    </div>
                </div>

                <div class="text-center" v-if="$store.getters.isAuthAdmin">
                    <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateProfile">
                        {{$t('labels.update_profile')}}
                    </button>
                </div>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import UserResource from '../../../../../../api/resources/UserResource'
  import {EventBus} from '../../../../../../bootstrap/event-bus'
  import AreaResource from '../../../../../../api/resources/AreaResource'
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
        areas: [],
        scopes: [],
        types: [],
        user: {
          company: 'Paper Dashboard',
          login: 'michael23',
          email: '',
          firstname: 'Chet',
          lastname: 'Faker',
          address1: 'Melbourne, Australia',
          address2: 'Melbourne, Australia',
          city: 'melbourne',
          zipcode: '',
          area_id: null,
        },
        bindProps: {
          onlyCountries: ["FR"],
          placeholder: "",
          color:'red',
          disabledFetchingCountry: false,
          required: false,
          translations: {
            phoneNumberLabel:this.$t('labels.phone'),
          }
        },
        errMsg: {
          password_min_length: '',
        }
      }
    },
    validations: {
      user: {
        type:{required},
        login: { required },
        email: { required, email },
        passwd: { minLength:minLength(6), passwdRules },
        firstname: { required },
        lastname: { required },
      }
    },
    created () {
      this.user = this.$parent.user
        this.user.type.name = this.$t('user_types.' + this.user.type.name);
        if(this.user)
        this.errMsg = {
            password_min_length: (this.$i18n.locale == 'fr')
                ? 'Le mot de passe doit avoir au moins ' + this.$v.user.passwd.$params.minLength.min + ' lettres'
                : 'Password must have at least '+  this.$v.user.passwd.$params.minLength.min + ' letters',
        }

      if (this.$store.getters.isAuthAdmin) {
        AreaResource.getAreas().then(res => {
          this.areas = res.data
        })

        UserResource.getScopes().then(res => {
          this.scopes = res.data
        })

        UserResource.getTypes().then(res => {
          this.types = res.data
            this.types.forEach((user_type, index) => {
                this.types[index] = { name: this.$t('user_types.'+user_type.name.toLowerCase()) , id: index+1 }
                if(this.user.type_id == (index+1)){
                    this.user.type.name = this.$t('user_types.'+user_type.name.toLowerCase());
                }
            });
        })
      }
    },

    methods: {
      updateProfile () {
        if(this.$store.getters.isAuthAdmin) {
          if(!this.$v.user.$invalid) {
            if(this.$refs.phone.phoneNumber && this.$refs.phone.isValid) {
                this.updateProfileUser();
            } else if (!this.$refs.phone.phoneNumber) {
                this.updateProfileUser();
            }
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
          UserResource.updateUserProfile(this.user.id, this.user).then(res => {
              this.$parent.user = res.data
              if(res.data.error) {
                  if(res.data.error == 'email') {
                      this.displayError(this.$t('labels.validation.unique_email'))
                  } else if(res.data.error == 'login') {
                      this.displayError(this.$t('labels.validation.unique_login'))
                  }
              } else {
                  EventBus.$emit('notification-popup', {text: 'User Details Successfully updated', status: 'success'})
              }
          })
      }
    }
  }

</script>
<style lang="scss">

    .disabledForm {
        input, .dropdown, .phone-input {
            pointer-events: none !important;
            opacity: 0.7 !important;
        }
        .error, .label-passwd {
            display:none;
        }
        .vs__actions {
            display: none;
        }
    }

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
        width: 74%;
    }

    .field.vue-input-ui.has-value .field-input[data-v-4039a700] {
        padding-top: 0px;
    }
</style>
