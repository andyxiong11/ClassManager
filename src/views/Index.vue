<template>
  <!-- el-container外层容器 -->
  <el-container class="container">
    <!-- 侧边栏容器 -->
    <el-aside width="174px">
      <img src="../assets/logo.png" alt="加载中" width="174px">
      <!-- active-text-color激活菜单时的颜色 -->
      <el-menu
        default-active="2"
        background-color="rgba(1, 28, 47, 0.5)"
        text-color="#dfdede"
        active-text-color="#01D4F9">
        <!-- navMenuList侧边导航列表 -->
        <div v-for="(item,index) in navMenuList" :key="index">
          <!-- 有二级菜单 -->
          <el-submenu v-if="item.children">
            <template slot="title">
              <!-- 绑定自定义icon -->
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(item,index) in item.children" :key="index"
            >
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-submenu>
          <!-- 只有一级菜单 -->
          <el-menu-item v-if="!item.children">
            <!-- 绑定自定义icon -->
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name:'Index',
  data() {
    return {
      navMenuList: [
        {
          path: '/index',
          title: '数据中心',
          icon: 'el-icon-pie-chart'
        },
        {
          path: '/home/class-statistic',
          title: '上课统计',
          icon: 'el-icon-data-line'
        },
        {
          path: '/home/class-schedule',
          title: '课表管理',
          icon: 'el-icon-date'
        },
        {
          path: '/home/document-center',
          title: '课件中心',
          icon: 'el-icon-folder',
          children: [{
              path: '/home/all-document',
              title: '全部课件',
          }, {
              path: '/home/own-document',
              title: '个人课件',
          }]
        },
        {
          path: '/home/live-classes',
          title: '巡课管理',
          icon: 'el-icon-monitor'
        },
        {
          path: '/home/video-list',
          title: '录播课堂',
          icon: 'el-icon-video-camera'
        },
        {
          path: '/home/setting',
          title: '系统管理',
          icon: 'el-icon-setting'
        }
      ]
    };
  },
  methods: {
  },

}
</script>

<!-- scoped只在此组件生效 -->
<style scoped>
  /* 背景 */
  .container {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.png");
    /* 图片大小 */
    background-size: cover;
  }
</style>