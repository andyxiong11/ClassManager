<template>
  <div>
    <el-card class="main-card-box">
      <!-- 筛选条件 header表示是el-card组件头部 -->
      <div slot="header">
        <el-form :inline="true" style="display: flex; justify-content: space-between;">
          <div>
            <el-form-item label="学校">
              <!-- size="small" 下拉框尺寸 -->
              <el-select v-model="schoolSelectValue" placeholder="请选择" size="small" style="width: 200px">
                <el-option
                  v-for="item in schoolSelectValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="老师">
              <!-- size="small" 下拉框尺寸 -->
              <el-select v-model="teacherSelectValue" placeholder="请选择" size="small" style="width: 200px">
                <el-option
                  v-for="item in teacherSelectValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
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
            <!-- dialogTableVisible打开对话框 -->
            <el-button @click="dialogTableVisible = true" icon="el-icon-document-add" type="text" size="small">查看详情</el-button>
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
    <!-- 对话框 
         dialogTableVisible 对话框显示状态
    -->
    <el-dialog title="查看详情" :visible.sync="dialogTableVisible">
      <el-form :inline="true" style="display: flex; justify-content: space-between;">
        <div>
          <el-form-item label="状态">
            <!-- size="small" 下拉框尺寸 -->
            <el-select v-model="statusSelectValue" placeholder="请选择" size="small" style="width: 200px">
              <el-option label="全部" value="quanbu"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作时间">
            <el-date-picker
              v-model="operationTime"
              type="date"
              placeholder="选择日期">
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
      <el-table
        :data="dialogTableData"
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
          prop="status"
          label="状态"
          width="180">
          <!-- 自定义列的显示内容 -->
          <template slot-scope="scope">
            <div>
              <!-- scope.row获取dialogTableData数据 -->
              <!-- 判断item内容改变标签样式 -->
              <el-tag 
                v-for="(item,index) in scope.row.status" 
                :key="index"
                :type="item === '录制' ? 'warning' : ''"
                style="margin: auto 5px;"
              >
                {{ item }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="操作时长（主讲/录制）"
          width="180">
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:"ClassStatistic",
    data(){
      return{
        // 筛选条件学校选项
        schoolSelectValue:"",
        // 下拉框老师选项
        teacherSelectValue:"",
        // 筛选条件日期
        dateTimeRangeValue:"",
        // 筛选条件月份
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
        //对话框
        dialogTableVisible:false,
        //对话框的状态
        statusSelectValue:"",
        //对话框日期
        operationTime:"",
        // 对话框数据
        dialogTableData: [
          {
            teacherName: "李丹",
            subject: "语文",
            status: ["主讲"],
            date: "2020-11-22",
            duration: "42分钟",
          },
          {
            teacherName: "李丹",
            subject: "语文",
            status: ["主讲", "录制"],
            date: "2020-11-22",
            duration: "42分钟",
          },
        ],
      }
    }
  }
</script>

<style scoped>
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