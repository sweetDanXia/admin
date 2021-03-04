import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'
// 加载到Vue原型属性上，我们可在任意页面用this.$http访问接口
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
