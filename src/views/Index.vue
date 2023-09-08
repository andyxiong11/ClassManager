<template>
  <!-- el-container外层容器 -->
  <el-container class="container">
    <!-- 侧边栏容器 -->
    <el-aside width="174px">
      <img src="../assets/logo.png" alt="加载中" width="174px">
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
          <el-submenu v-if="item.children" index="1">
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
    <!-- 主要区域容器 -->
    <el-main>
      <!-- 顶部 -->
      <div class="title-wrapper">
        <div class="title-main">
          <img class="title-img" src="../assets/tbbg.png" alt="加载中">
          <p class="title-text">天弘同步课堂系统建设平台</p>
        </div>
        <div class="title-user">
          超级管理员
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <!-- 数据展示 -->
      <div class="count-wapper">
        <!-- <ul>
          <li>
            <span>用户总数</span>
            <span>2456</span>
          </li>
          <li>
            <span>入住学校</span>
            <span>2456</span>
          </li>
          <li>
            <span>用户总数</span>
            <span>2456</span>
          </li>
          <li>
            <span>用户总数</span>
            <span>2456</span>
          </li>
          <li>
            <span>用户总数</span>
            <span>2456</span>
          </li>
        </ul> -->
        <div class="count-box">
          <span>用户总数</span>
          <span>25693</span>
        </div>
        <div class="count-box">
          <span>入驻学校数</span>
          <span>624</span>
        </div>
        <div class="count-box">
          <span>用户总数</span>
          <span>25693</span>
        </div>
        <div class="count-box">
          <span>用户总数</span>
          <span>25693</span>
        </div>
        <div class="count-box">
          <span>用户总数</span>
          <span>25693</span>
        </div>
      </div>
      <!-- 图表 -->
      <div class="main-box">
        <!-- 左侧图表 -->
        <div class="main-left">
          <!-- 上面图表 -->
          <div class="left-top">
            <div class="left-top-title">
              <img src="../assets/1.png" alt="" />
              <span style="margin-left: 33px">学校开课次数统计</span>
              <span>学期</span>
              <!-- 日期选择器组件
                   type 显示类型
                   range-separator 页面上开始日期与结束日期的分隔符
                   start-placeholder 范围选择时开始日期的占位内容
                   end-placeholder 范围选择时结束日期的占位内容
                   size 输入框尺寸
              -->
              <el-date-picker
                v-model="dateRangeValue"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                style="width: 200px;border-radius: 0;"
                class="date-picker"
              >
              </el-date-picker>
              <span>月份</span>
              <!--  月份选择器组件
                   type 显示类型
                   placeholder	非范围选择时的占位内容
                   size 输入框尺寸
              -->
              <el-date-picker
                v-model="monthValue"
                type="month"
                placeholder="选择月份"
                size="small"
                style="width: 128px"
                class="date-picker"
              >
              </el-date-picker>
              <!-- id="left-echarts" ECharts专用 -->
              <div id="left-echarts1" class="left-main"></div>
            </div>
          </div>
          <!-- 下面图表 -->
          <div class="left-bottom">
            <div class="left-top-title">
              <img src="../assets/1.png" alt="" />
              <span style="margin-left: 33px">学校开课次数统计</span>
              <span>学期</span>
              <!-- 日期选择器组件
                   type 显示类型
                   range-separator 页面上开始日期与结束日期的分隔符
                   start-placeholder 范围选择时开始日期的占位内容
                   end-placeholder 范围选择时结束日期的占位内容
                   size 输入框尺寸
              -->
              <el-date-picker
                v-model="dateRangeValue"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                style="width: 200px;border-radius: 0;"
                class="date-picker"
              >
              </el-date-picker>
              <span>月份</span>
              <!--  月份选择器组件
                   type 显示类型
                   placeholder	非范围选择时的占位内容
                   size 输入框尺寸
              -->
              <el-date-picker
                v-model="monthValue"
                type="month"
                placeholder="选择月份"
                size="small"
                style="width: 128px"
                class="date-picker"
              >
              </el-date-picker>
              <div id="left-echarts2" class="left-main"></div>
            </div>
          </div>
        </div>
        <!-- 右侧图表 -->
        <div class="main-right">
          <!-- 右左侧图表 -->
          <div class="right-left">
            <div class="right-left-title">
              <img src="../assets/1.png" alt="" />
              <span>学校开课次数排行（本学期）</span>
            </div>
            <div class="right-left-main">
              <vuescroll :ops="ops">
                <div v-for="(item,index) in schoolList" :key="index">
                  <div :class="itemClass[index]" style="height: 50px;line-height: 50px;text-align: center;display:flex;">
                    <img 
                      src="../assets/no1.png" 
                      alt="" 
                      style="padding: 0 10px;"
                      v-if="index === 0" 
                    />
                    <img
                      src="../assets/no2.png"
                      alt=""
                      style="padding: 0 10px;"
                      v-else-if="index === 1"
                    />
                    <img
                      src="../assets/no3.png"
                      alt=""
                      style="padding: 0 10px;"
                      v-else-if="index === 2"
                    />
                    <p style="width: 70px;text-align: center;" v-else>{{ index+1 }}</p>
                    <p style="width: 268px">{{ item.name }}</p>
                    <p>{{ item.count }}</p>
                  </div>
                </div>
              </vuescroll>
            </div>
          </div>
          <!-- 右右侧图表 -->
          <div class="right-right">
            <div class="right-right-title">
              <img src="../assets/2.png" alt="" />
              <span>老师开课次数排行（本学期）</span>
            </div>
            <div class="right-left-main">
              <vuescroll :ops="ops">
                <div v-for="(item,index) in teacherList" :key="index">
                  <div style="display:flex;height: 50px;line-height: 50px;">
                    <p style="width: 100px;text-align: center;">{{ index+1 }}</p>
                    <p style="width: 268px">{{ item.name }}</p>
                    <p>{{ item.count }}</p>
                  </div>
                </div>
              </vuescroll>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// 引入 vueScroll
import vuescroll from "vuescroll/dist/vuescroll-native";
export default {
  name:'Index',
  components: {
    vuescroll,
  },
  data() {
    return {
      dateRangeValue:"",
      monthValue:"",
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
      echartsValue:{
        // 配置语法详见 https://www.runoob.com/echarts/echarts-setup.html
        title: {
            // text: '学校开课次数统计'
        },
        tooltip: {},
        // X轴数据
        xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        // Y轴数据
        yAxis: {},
        series: [{
            name: '销量',
            //  bar 柱状/条形图
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130]
        }]
      },
      schoolList: [
        {
          name: "沈阳市第十一中学",
          count: 55,
        },
        {
          name: "沈阳市第十一中学",
          count: 54,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
        {
          name: "沈阳市第十一中学",
          count: 52,
        },
      ],
      teacherList: [
        { name: "李丹-沈阳市第一二零中学", count: 54 },
        { name: "张三-沈阳市第一二零中学", count: 53 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
        { name: "李丹-沈阳市第一二零中学", count: 52 },
      ],
      itemClass:["item0","item1","item2"],
      ops: {
        bar: {
          background: "#0C4787",
          size: "8px",
        },
      },
      dynamicTags: [],
    }
  },
  methods: {
  },
  // 页面加载完调用
  mounted() {
    //Echarts start
    var echarts = require('echarts');
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('left-echarts1'),'customed');
    var myChart2 = echarts.init(document.getElementById('left-echarts2'),'customed');
    // 绘制图表 数据放在date
    myChart1.setOption(this.echartsValue);
    myChart2.setOption(this.echartsValue);
    //Echarts end
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
  /* 侧边栏start */
  .el-aside {
    background-color: rgba(1, 28, 47, 0.5);
  }
  .el-menu {
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
    padding: 0;
  }
  /* 顶部strat */
  .title-wrapper{
    height: auto;
    /* 防止下方数据展示遮盖顶部 */
    position: relative;
    /* 让超级管理员浮动到右侧 */
    display: flex;
  }
  /* 顶部左侧start */
  .title-main{
    width: 1572px;
  }
  /* 顶部图片 */
  .title-img{
    top: 0;
    /* 让文字展示在图片上 */
    position: absolute;
  }
  /* 顶部文字 */
  .title-text{
    padding-top: 20px;
    color: #01d4f9;
    font-size: 30px;
    text-align: center;
    /* 文字间距 */
    letter-spacing: 5px;
  }
  /* 顶部左侧end */
  .title-user{
    font-size: 14px;
    color: #01d4f9;
    margin: 45px 0 0 42px;
  }
  /* 顶部end */
  /* 数据展示start */
  .count-wapper{
    margin-top: 46px;
    /* flex布局 居中 */
    display: flex;
    justify-content: space-around;
  }
  /* ul>li{
    width: 316px;
    height: 72px;
    font-weight: 400;
    text-align: center;
    color: #01d4f9;
    background: url("../assets/main_middle.png");
    float: left;
    list-style-type:none;
  }
  ul>li>span:first-child{
    height: 72px;
    line-height: 72px;
    margin-right: 18px;
  }
  ul>li>span:last-child{
    font-size: 36px;
    font-weight: 400;
  } */
  .count-box{
    width: 316px;
    height: 72px;
    /* line-height: 72px; */
    font-weight: 400;
    color: #01d4f9;
    background: url("../assets/main_middle.png");
    float: left;
    list-style-type:none;
    /* flex布局居中 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .count-box>span:first-child{
    margin-right: 18px;
  }
  .count-box>span:last-child{
    font-size: 36px;
    font-weight: 400;
  }
  /* 数据展示end */
  /* 图表start */
  .main-box{
    margin: 31px 0 41px 0;
    display: flex;
    justify-content: space-around;
  }
  /* 左侧图表start */
  .left-top{
    width: 750px;
    height: 450px;
    /* 线性渐变背景 */
    background: linear-gradient(
      135deg,
      transparent 35px,
      rgba(0, 168, 255, 0.2) 0
    );
  }
  .left-top-title{
    height: 80px;
    line-height: 80px;
    color: #fff;
    font-size: 18px;
    position: relative;
  }
  .left-top-title>img{
    position:absolute;
  }
  /* nth-of-type 同级元素选择 */
  .left-top-title>span:nth-of-type(2){
    font-size: 14px;
    color: #dfdede;
    margin-left: 70px; 
    margin-right: 12px
  }
  /* nth-of-type 同级元素选择 */
  .left-top-title>span:nth-of-type(3){
    font-size: 14px;
    color: #dfdede;
    margin-left: 30px; 
    margin-right: 12px
  }
  /* 日期月份选择器 */
  .date-picker{
    line-height: 0;
    background-color: rgba(12, 71, 135, 0.8);
    border: 1px solid #0084c8;
  }
  /* TODO给el-range-input el-range-separator el-input__inner加样式 */
  .date-picker /deep/.el-range-input {
    background-color: rgba(12, 71, 135, 0.8);
    color: #dfdede;
  }
  .date-picker /deep/.el-range-separator {
    color: #dfdede;
  }
  .date-picker /deep/.el-input__inner {
    background: transparent;
    border: none;
  }

  /* 柱状图 */
  .left-main{
    width: 734px;
    height: 361px;
    background: rgba(1, 28, 47, 0.4);
    /* div水平居中 */
    margin: 0 auto;
  }

  .left-bottom{
    width: 750px;
    height: 450px;
    /* 线性渐变背景 */
    background: linear-gradient(
      135deg,
      transparent 35px,
      rgba(0, 168, 255, 0.2) 0
    );
    margin-top: 25px;
  }
  .left-bottom>img{
    position:absolute;
  }
  /* 左侧图表end */
  /* 右侧图表start */
  .main-right{
    width: 940px;
    display: flex;
    justify-content: space-around;
  }
  /* 右侧左边 */
  .right-left{
    width: 450px;
    height: 925px;
    /* 线性渐变背景 */
    background: linear-gradient(
      135deg,
      transparent 35px,
      rgba(0, 168, 255, 0.2) 0
    );
  }
  .right-left-title>img{
    position:absolute;
  }
  .right-left-title{
    height: 80px;
    line-height: 80px;
    color: #fff;
    font-size: 18px;
    position: relative;
  }
  .right-left-title>span{
    margin-left: 70px; 
    margin-right: 12px
  }
  /* 列表 */
  .right-left-main{
    width: 434px;
    height: 837px;
    margin: 0 auto;
    background: rgba(1, 28, 47, 0.4);
  }
  /* 孙代选择器 空格 */
  .right-left-main p{
    color: #dfdede;
    font-size: 16px;
  }
  /* 右侧右边 */
  .right-right{
    width: 450px;
    height: 925px;
    /* 线性渐变背景 */
    background: linear-gradient(
      225deg,
      transparent 35px,
      rgba(0, 168, 255, 0.2) 0
    );
  }
  .right-right-title>img{
    position:absolute;
    right: -3px;
  }
  .right-right-title{
    height: 80px;
    line-height: 80px;
    color: #fff;
    font-size: 18px;
    position: relative;
  }
  .right-right-title>span{
    margin-left: 70px; 
    margin-right: 12px
  }

  .item0{
    height: 50px;
    line-height: 50px;
    background-color: rgba(249, 79, 70, 0.1);
    display:flex;
  }
  .item1{
    height: 50px;
    line-height: 50px;
    background-color: rgba(53, 171, 249, 0.1);
    display:flex;
  }
  .item2{
    height: 50px;
    line-height: 50px;
    background-color: rgba(76, 200, 117, 0.1);
    display:flex;
  }
  /* 右侧图表end */
  /* 图表end */
</style>