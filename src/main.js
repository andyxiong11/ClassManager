import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

// 导入element组件
import './plugins/element.js'

// 导入vuescroll组件
import vuescroll from 'vuescroll';
Vue.use(vuescroll, {
  ops: {
    bar:{
      size:'6px',
      background:'#999',
      keepShow:true,
    }
  },
  name: 'myScroll' 
});
Vue.component('vue-scroll', vuescroll);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
