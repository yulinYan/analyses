import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import element_ui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(element_ui)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
