<template>
  <!-- el-container外层容器 -->
  <el-container>
    <!-- 顶部 -->
    <el-header>
      <img src="../assets/logo.png" alt="加载中" width="174px">
      <!-- 顶部 -->
      <div class="title-user">
        超级管理员
        <i class="el-icon-caret-bottom"></i>
      </div>
    </el-header>
    <el-container class="container">
      <!-- 侧边栏容器 -->
      <el-aside width="174px">
        <!-- active-text-color激活菜单时的颜色 
            router 在激活导航时以 index 作为 path 进行路由跳转
            transparent 透明色
        -->
        <el-menu
          default-active="/index"
          background-color="transparent"
          text-color="#dfdede"
          active-text-color="#01D4F9"
          router
        >
          <!-- navMenuList侧边导航列表 -->
          <div v-for="(item,index) in navMenuList" :key="index">
            <!-- 有二级菜单 -->
            <el-submenu v-if="item.children">
              <!-- 一级菜单文案样式 -->
              <template slot="title">
                <!-- 绑定自定义icon -->
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <!-- 二级菜单文案样式 -->
              <el-menu-item
                v-for="(item,index) in item.children" 
                :key="index"
                :index="item.path"
              >
                <span>{{ item.title }}</span>
              </el-menu-item>
            </el-submenu>
            <!-- 只有一级菜单 -->
            <el-menu-item 
              v-if="!item.children"
              :index="item.path"
            >
              <!-- 绑定自定义icon -->
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <!-- 右边主要内容 -->
      <el-main>
        <!-- 标签栏 -->
        <div class="navTab">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
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
      ],
      dynamicTags: ['标签一', '标签二', '标签三'],
    }
  },
  methods: {
  },
  // 页面加载完调用
  mounted() {
  },
}
</script>

<!-- scoped只在此组件生效 -->
<style scoped>
  /* .container {
    height: 100%;
  } */
  /* 顶部start */
  .el-header{
    background-color: rgba(1, 28, 47);
    padding: 0;
    display: flex;
    /* 两端对齐 */
    justify-content: space-between;
  }
  .el-header>img{
    left: 0;
  }
  .title-user{
    font-size: 14px;
    color: #01d4f9;
    line-height: 60px;
    margin-right: 42px;
  }
  /* 顶部end */
  /* 侧边栏start */
  .el-aside {
    background-color: rgba(1, 28, 47);
  }
  .el-menu {
    height:100vh;
    border-right: none;
  }
  .el-menu-item {
    height: 72px;
  }
  li.el-menu-item:hover {
    /* transparent 透明色 */
    background-color: transparent !important;
    background-image: url("../assets/gensui.png");
    background-size: 174px 72px;
  }
  /* TODO给el-submenu__title加样式 */
  /* https://blog.csdn.net/Laputa219/article/details/115658445 */
  .el-submenu /deep/ .el-submenu__title {
    height: 72px;
  }
  li.el-submenu:hover /deep/.el-submenu__title {
    background-color: transparent !important;
    background-image: url("../assets/gensui.png");
    background-size: 174px 72px;
  }
  /* 侧边栏end */
  .el-main{
    background-color: #f5f5f5;
    padding: 0;
  }
  .navTab{
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    position: relative;
    padding-left: 24px;
  }
</style>