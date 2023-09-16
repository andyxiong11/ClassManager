import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Index from '../views/Index'
import Home from '../views/Home.vue'

import ClassStatistic from '../views/class_statistic/ClassStatistic.vue'
import ClassSchedule from '../views/class_schedule/ClassSchedule.vue'
import AllDocument from '../views/document_center/AllDocument.vue'
import OwnDocument from '../views/document_center/OwnDocument.vue'
import LiveClassList from '../views/class_monitor/LiveClassList.vue'
import LiveClassDetail from '../views/class_monitor/LiveClassDetail.vue'
import VideoList from '../views/video_class/VideoList.vue'

Vue.use(VueRouter)

//创建路由对象
const router = new VueRouter({
  routes:[
    {
      path: '/',
      redirect: '/login'
    },
    {
      // 登录页面
      path:'/login',
      name:'login',
      component:Login
    },
    {
      // 数据中心
      path:'/index',
      name:'index',
      component:Index
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      children: [{
        // 上课统计
        path: 'class-statistic',
        component: ClassStatistic
      }, {
        // 课表管理
        path: 'class-schedule',
        component: ClassSchedule
      }, {
        // 全部课件
        path: 'all-document',
        component: AllDocument,
      }, {
        // 个人课件
        path: 'own-document',
        component: OwnDocument,
      }, {
        // 巡课管理
        path: 'live-classes',
        component: LiveClassList,
      }, {
        // 录播课堂详情
        path: 'live-classes-detail',
        component: LiveClassDetail,
      }, {
        // 录播课堂
        path: 'video-list',
        component: VideoList,
      }]
    }
  ]
})

export default router