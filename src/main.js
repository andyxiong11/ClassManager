import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

// 导入element组件
import './plugins/element.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
