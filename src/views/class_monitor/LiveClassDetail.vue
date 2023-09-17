<template>
  <div style="display:flex;padding: 20px;">
    <div>
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        size="small"
        @click="gotoLiveClasses"
      >
        返回列表
      </el-button>
    </div>
    <div style="margin-left: 20px;">
      <div style="position: relative;width: 1310px;height: 564px;">
        <img src="../../assets/class_img.png" alt="" style="width: 100%;height: 100%;"/>
        <div class="text-box" style="bgc">
          <div class="desc-box">
            鞍山市第十一中学听课教室
            <i class="el-icon-microphone"></i>
          </div>
          <div class="btn-box">
            <!-- TODO怎么在不影响按钮点击变色的情况下实现按钮透明度样式 -->
            <el-button size="small" autofocus>看老师</el-button>
            <el-button style="background-color: #012f4f;opacity: 0.6; border-radius: 15px;" size="small">看学生</el-button>
            <el-button style="background-color: #012f4f;opacity: 0.6; border-radius: 15px;" size="small">看视频</el-button>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px;">
        <el-row :gutter="10">
          <el-col :span="8" v-for="j in 3" :key="j">
            <div style="position: relative;width: 430px;height: 204px">
              <img src="../../assets/class_img.png" alt="" style="width: 100%;height: 100%;"/>
              <div class="text-box desc-box">
                鞍山市第十一中学听课教室
                <i class="el-icon-microphone"></i>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"LiveClassDetail",
    methods: {
      gotoLiveClasses(){
        this.$router.push('/home/live-classes')
      }
    },
  }
</script>

<style scoped>
  .text-box {
    bottom: 10px;
    position: absolute;
    display:flex;
    left: 50%;
    transform: translateX(-50%);
  }
  .desc-box{
    width: 230px;
    height: 30px;
    line-height: 30px;
    color: #fffefe;
    background-color: #012f4f;
    /* 透明度 */
    opacity: 0.6; 
    /* 圆角 */
    border-radius: 15px;
    font-size: 14px;
    text-align: center;
  }
  .btn-box{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-left: 20px;
  }
</style>