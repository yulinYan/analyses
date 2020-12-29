import Vue from 'vue'
import App from './App'
import api from "./common/api.js" //引入接口
import axios from './common/axios';//http 请求拦截
import router from './router'
import echarts from 'echarts'
import element_ui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(element_ui)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.API = api;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
