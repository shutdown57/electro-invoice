import Vue from 'vue'
import Buefy from 'buefy'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

import App from './App.vue'
import router from './router'
import store from './store/store'
import './assets/scss/app.scss'

Vue.use(Buefy)
Vue.use(VuePersianDatetimePicker, {
  name: 'VuePersianDatetimePicker',
  props: {
    inputFormat: 'YYYY-MM-DD',
    format: 'jYYYY-jMM-jDD',
    editable: false,
    placeholder: 'انتخاب تاریخ',
    autoSubmit: false
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
