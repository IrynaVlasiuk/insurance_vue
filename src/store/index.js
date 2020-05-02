import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./config/modules";
import state from "./config/state";
import plugins from "./config/plugins";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  state,
  plugins,
});


export default store
