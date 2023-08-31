import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入element组件
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
