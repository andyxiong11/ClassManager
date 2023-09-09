<template>
  <div>
    <el-card class="main-card-box">
      <!-- 筛选条件 header表示是el-card组件头部 -->
      <div slot="header">
        <el-form :inline="true" style="display: flex; justify-content: space-between;">
          <div>
            <el-form-item label="学校">
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
            <el-form-item label="教室">
              <!-- size="small" 下拉框尺寸 -->
              <el-select 
                v-model="classroomSelectValue"
                placeholder="请选择" 
                size="small" 
                style="width: 200px"
              >
                <el-option
                  v-for="item in classroomSelectValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="老师">
              <!-- size="small" 下拉框尺寸 -->
              <el-select 
                v-model="teacherSelectValue" 
                placeholder="请选择" 
                size="small" 
                style="width: 200px"
              >
                <el-option
                  v-for="item in teacherSelectValue"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary" 
                icon="el-icon-search" 
                size="small"
              >
                查询
              </el-button>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <el-button 
                type="primary" 
                icon="el-icon-search" 
                size="small"
                @click="holidayPlanDialogVisible = true"
              >
                假期排课
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button 
                type="primary" 
                icon="el-icon-search" 
                size="small"
              >
                导出
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 课程表 -->
      <div style="display: flex; justify-content: space-between;">
        <span style="font-size: 15px;font-weight: bold;">教学周：2020年9月2日-2021年1月17日</span>
        <!-- size图标大小
             circle 圆形
             plain 朴素
        -->
        <div>
          <el-button
            size="mini"
            icon="el-icon-arrow-left"
            type="primary"
            circle
            plain
          ></el-button>
          <span style="margin: auto 40px;font-size: 15px;font-weight: bold;">第45周</span>
          <el-button
            size="mini"
            icon="el-icon-arrow-right"
            type="primary"
            circle
            plain
          ></el-button>
          <el-button
            size="small"
            type="primary"
          >回到当前周</el-button>
        </div>
        <div></div>
      </div>
      <!-- 课程表表格 -->
      <div style="display: flex;">
        <!-- 第一列 -->
        <div style="display: flex;flex-direction: column; ">
          <div style="height: 73px;width: 205px;border: 1px solid #f1f1f1;"></div>
          <div 
            style="height: 73px;width: 205px;border: 1px solid #f1f1f1;"
            v-for="i in 8" 
            :key="i"
          >
            第{{ i }}节
          </div>

          <div
            style="display: flex;flex-direction: column; "
            v-for="(item, index) in classTableData"
            :key="index"
          >
            <span>星期{{ index }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 假期排课对话框 
      dialogTableVisible 对话框显示状态
      rules 校验规则
    -->
    <el-dialog title="假期排课" :visible.sync="holidayPlanDialogVisible" width="40%">
      <el-form :model="holidayPlanForm" :rules="holidayPlanFormRules" ref="holidayPlanForm" label-width="100px">
        <!-- required 校验必选项 -->
        <el-form-item label="假期排课" required>
          <el-date-picker
            v-model="holidayPlanForm.startDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span style="margin: auto 20px">-</span>
          <el-date-picker
            v-model="holidayPlanForm.endDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 警告组件 -->
      <el-alert
        title="假期排课不计入教学周开课统计"
        type="warning"
        show-icon>
      </el-alert>
      <span slot="footer">
        <el-button @click="holidayPlanDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="holidayPlanDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:"ClassSchedule",
    data(){
      return{
        // 控制对话框打开关闭
        holidayPlanDialogVisible:false,
        // 假期排课对话框必选项校验
        holidayPlanFormRules:{

        },
        // 假期排课对话框表单的数据
        holidayPlanForm:{
          // 开始时间
          startDate:"",
          // 结束时间
          endDate:""
        },
        //课程表格数据
        classTableData: [
          {
            date: "2020年12月25日",
            classes: [
              {},
              {
                subject: "数学",
                teacher: "李老师",
                status: "未上课",
              },
              {
                subject: "数学",
                teacher: "李老师",
                status: "已上课",
              },
              {},
              {},
              {},
              {},
              {},
            ],
          },
          {
            date: "2020年12月26日",
            classes: [
              { subject: "英语", teacher: "北老师", status: "开始上课" },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          },
          {
            date: "2020年12月27日",
            classes: [{}, {}, {}, {}, {}, {}, {}, {}],
          },
          {
            date: "2020年12月28日",
            classes: [
              {},
              {
                subject: "数学",
                teacher: "李老师",
                status: "未上课",
              },
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          },
          {
            date: "2020年12月29日",
            classes: [
              {},
              {},
              {},
              { subject: "数学", teacher: "李老师", status: "未上课" },
              {},
              {},
              {},
              {},
            ],
          },
          {
            date: "2020年12月30日",
            classes: [{}, {}, {}, {}, {}, {}, {}, {}],
          },
          {
            date: "2020年12月31日",
            classes: [{}, {}, {}, {}, {}, {}, {}, {}],
          },
        ],
      }
    },
    methods: {
      openHolidayPlanDialog(){

      }
    },
  }
</script>

<style>
   /* 卡片 */
   .main-card-box{
    margin: 12px 20px 20px;
  }
</style>