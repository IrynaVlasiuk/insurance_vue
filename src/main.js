/* eslint-disable */
import Vue from 'vue'
import './bootstrap/pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/fr'
import locale from 'element-ui/lib/locale'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import Vuex from 'vuex' // Vue store plugin link

// Plugins
import GlobalComponents from './bootstrap/gloablComponents'
import GlobalDirectives from './bootstrap/globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'

import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'

import sidebarLinks from './configuration/sidebarLinks'

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
Vue.use(Vuex)
Vue.use(Vuelidate)


import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

locale.use(lang)


Vue.use(require('vue-pusher'), {
  api_key: 'b18d8449b6c8c9641f55',
  options: {
    cluster: 'eu',
    encrypted: true,
  }
});

// Axios
window.axios = require('axios');
window.axios.defaults.headers.common = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest',}

import router from "./router/index";
import store from "./store";
import i18n from "./lang"
import env from '../env'

store.dispatch('setConfig');

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')


