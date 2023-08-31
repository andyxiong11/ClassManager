import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'

Vue.use(VueRouter)

//创建路由对象
const router = new VueRouter({
  routes:[
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})

export default router