<template>
  <el-card class="main-card-box">
    <!-- 筛选条件 -->
    <div slot="header" class="clearfix">
      <el-form :inline="true" style="display: flex; justify-content: space-between;">
        <div>
          <el-form-item label="学校">
            <!-- size="small" 下拉框尺寸 -->
            <el-select v-model="schoolSelectValue" placeholder="请选择" size="small" style="width: 200px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="老师">
            <!-- size="small" 下拉框尺寸 -->
            <el-select v-model="schoolSelectValue" placeholder="请选择" size="small" style="width: 200px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学期">
            <el-date-picker
              v-model="dateTimeRangeValue"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="月份">
            <el-date-picker
              v-model="dataMounth"
              type="month"
              placeholder="选择月份"
              style="width: 200px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button type="primary" icon="el-icon-document">导出</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 人次数据 -->
    <div class="summary-item">
      <div style="display: flex;" v-for="(item,index) in summaryList" :key="index">
        <img :src="item.imgPath" width="60px" height="60px">
          <!-- flex布局 column垂直方向 从上向下 -->
          <div style="display: flex;flex-direction: column;margin-left: 14px;">
            <div>
              <span style="font-size: 29px;">{{ item.countNum }}</span>/人
            </div>
            <div style="font-size: 12px;">
              {{ item.type }}
            </div>
          </div>
      </div>
    </div>
    <!-- 表格 -->
    <!-- header-cell-class-name 为所有表头单元格设置一个固定的className
         cell-class-name 为所有单元格设置一个固定的className 
         type="index" 即可显示从 1 开始的索引号 
    -->
    <el-table
      :data="tableData"
      stripe
      header-cell-class-name="table-cell-classname"
      cell-class-name="table-cell-style"
      style="width: 100%;margin: 40px auto;">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="老师"
        width="180">
      </el-table-column>
      <el-table-column
        prop="subject"
        label="学科">
      </el-table-column>
      <el-table-column
        prop="speakNum"
        label="主讲/次"
        width="180">
      </el-table-column>
      <el-table-column
        prop="video"
        label="录课/次"
        width="180">
      </el-table-column>
      <el-table-column
        prop="video"
        label="操作">
        <template>
          <el-button @click="handleClick(scope.row)" icon="el-icon-document-add" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- total总条目数,sizes每页显示的页码数量,jumper表示跳页元素 
         page-size每页显示条目个数 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      :page-size="10"
      style="text-align: center;"
    >
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    name:"ClassStatistic",
    data(){
      return{
        // 下拉框
        schoolSelectValue:"",
        // 日期
        dateTimeRangeValue:"",
        //月份
        dataMounth:"",
        // 人次数据
        summaryList: [
          {
            imgPath: require("../../assets/class/t.png"),
            countNum: 25,
            unit: "人",
            type: "老师",
          },
          {
            imgPath: require("../../assets/class/zhujiang.png"),
            countNum: 36,
            unit: "次",
            type: "主讲",
          },
          {
            imgPath: require("../../assets/class/tingke.png"),
            countNum: 62,
            unit: "次",
            type: "听课",
          },
          {
            imgPath: require("../../assets/class/luke.png"),
            countNum: 52,
            unit: "次",
            type: "录课",
          },
        ],
        //表格数据
        tableData: [
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
          {
            teacherName: "李丹",
            subject: "语文",
            speakNum: 6,
            video: 3,
          },
        ],
      }
    }
  }
</script>

<style>
  /* 卡片 */
  .main-card-box{
    margin: 12px 20px 20px;
  }
  /* 人次数据 */
  .summary-item{
    display: flex;
    justify-content:space-around;
    margin: 20px auto;
  }
  /* 表头单元格 */
  .table-cell-classname{
    background-color: #f4f6f9 !important;
    text-align: center !important;
  }
  /* 所有单元格 */
  .table-cell-style{
    text-align: center !important;
  }
</style>