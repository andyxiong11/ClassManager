<template>
  <div>
    <el-card class="main-card-box">
      <!-- 筛选条件 header表示是el-card组件头部 -->
      <div slot="header">
        <el-form :inline="true" style="display: flex; justify-content: space-between;align-items: center;">
          <div>
            <el-form-item label="学校" style="margin-bottom: 0;">
              <!-- size="small" 下拉框尺寸 -->
              <el-select 
                v-model="schoolSelectValue" 
                placeholder="请选择" 
                size="small" 
                style="width: 200px"
              >
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年级" style="margin-bottom: 0;">
              <!-- size="small" 下拉框尺寸 -->
              <el-select 
                v-model="gradeSelectValue" 
                placeholder="请选择" 
                size="small" 
                style="width: 128px"
              >
                <el-option
                  v-for="item in gradeSelectValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学科" style="margin-bottom: 0;">
              <!-- size="small" 下拉框尺寸 -->
              <el-select 
                v-model="subjectSelectValue" 
                placeholder="请选择" 
                size="small" 
                style="width: 128px"
              >
                <el-option
                  v-for="item in subjectSelectValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
              <el-button 
                type="primary" 
                icon="el-icon-search" 
                size="small"
              >
                查询
              </el-button>
            </el-form-item>
          </div>
          <!-- 试图展示按钮 -->
          <div>
            <el-form-item style="margin-bottom: 0;">
              <!-- {iconBlue : gridActiveFlag} 根据gridActiveFlag决定样式是否展示 -->
              <i
                :class="['el-icon-menu',{'iconBlue' : gridActiveFlag}]" 
                style="font-size: 24px;cursor: pointer;"
                @click="changeView(true)"
              ></i>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
              <!-- {iconBlue : gridActiveFlag} 根据gridActiveFlag决定样式是否展示 -->
              <i
                :class="['el-icon-s-grid',{'iconBlue' : !gridActiveFlag}]" 
                style="font-size: 24px;cursor: pointer;"
                @click="changeView(false)"
              ></i>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 大内容 -->
      <!-- row 布局 gutter 每一栏的间隔 -->
      <el-row :gutter="10" v-for="i in 2" :key="i" v-show="gridActiveFlag">
        <el-col :span="8" v-for="j in 3" :key="j">
          <div style="position: relative;height: 320px;" @click="gotoLiveClassesDetail">
            <!-- TODO图片需要给高度和宽，否则容易溢出div -->
            <img style="width: 100%;height: 100%;" src="../../assets/class_img.png" alt="" />
            <!-- TODO绝对定位需要写在类中或span标签 -->
            <!-- <div 
              style="
                position: absolute;
                left: 50%;
                ransform: translateX(-50%);
                background-color: #012f4f;"
            > -->
            <div class="text-box">
              沈阳市第十一中学-综合管理教室1
              <span><i class="el-icon-user"></i> 美术-李杰</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 小内容 -->
      <!-- row 布局 gutter 每一栏的间隔 -->
      <el-row :gutter="10" v-for="i in 2" :key="i" v-show="!gridActiveFlag">
        <el-col :span="4" v-for="j in 6" :key="j">
          <div style="height: 270px;cursor: pointer;" @click="gotoLiveClassesDetail">
            <!-- TODO图片需要给高度和宽，否则容易溢出div -->
            <img style="width: 100%;height: 184px;" src="../../assets/class_img.png" alt="" />
            <div 
              style="
                height: 86px;
                color: #c1d9e9;
                background-color: #011c2f;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 10px;
              ">
              <p>这里是视频名称</p>
              <div>
                <i class="el-icon-user"></i> 美术-李杰
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div style="text-align: center;margin-top: 20px;">
          <!-- 分页 
             current-page	当前页数
             page-sizes	每页显示个数
             total	总条目数
          -->
          <el-pagination
            :current-page="1"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
    </el-card>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name:"LiveClasses",
    data(){
      return{
        //控制视图切换
        gridActiveFlag:"true",
        schoolSelectValue:"",// 学校选择内容
        gradeSelectValue: "",//年级选择内容
        subjectSelectValue: "",//学科选择内容
      }
    },
    methods: {
      // 视图切换
      changeView(boo){
        this.gridActiveFlag = boo
      },
      //跳转 巡课课堂详情页
      gotoLiveClassesDetail(){
        this.$router.push('/home/live-classes-detail')
      }
    },
    computed: {
      // TODO 为什么要使用mapState
      ...mapState([
        "schoolOptions",
        "classroomOptions",
        "teacherOptions",
        "gradeOptions",
        "subjectOptions",
      ]),
    },
  }
</script>

<style scoped>

  .iconBlue {
    color: #0c84ff;
  }
  .el-row{
    margin-bottom: 12px;;
  }
  .text-box {
    width: 325px;
    height: 30px;
    line-height: 30px;
    color: #fffefe;
    font-size: 14px;
    text-align: center;
    bottom: 10px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #012f4f;
    /* 透明度 */
    opacity: 0.6; 
    /* 圆角 */
    border-radius: 15px;
  }
</style>