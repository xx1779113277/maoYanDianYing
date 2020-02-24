import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import Mint from 'mint-ui';
import "mint-ui/lib/style.css"
import './styles/main.scss'

import axios from './axios/index'
Vue.prototype.$axios = axios

Vue.use(Mint);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
