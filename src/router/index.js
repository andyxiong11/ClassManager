import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Index from '../views/Index'

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
    },
    {
      path:'/index',
      name:'index',
      component:Index
    }
  ]
})

export default router