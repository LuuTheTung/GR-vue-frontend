import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Vuelidate from 'vuelidate'
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.use(Vuesax)
Vue.use(Vuelidate)

require('../public/font-awesome-4.7.0/css/font-awesome.css');

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
