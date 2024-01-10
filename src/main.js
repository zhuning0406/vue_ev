import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/global.less'

import axios from 'axios'

Vue.use(ElementUI)

axios.defaults.baseURL = 'https://big-event-vue-api-t.itheima.net/'

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
