import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

// 导入element组件
import './plugins/element.js'

//关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
