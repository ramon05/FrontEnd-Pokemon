import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'





// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'https://localhost:44316/api/';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
