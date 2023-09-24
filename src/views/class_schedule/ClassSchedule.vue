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
            <el-form-item label="教室" style="margin-bottom: 0;">
              <!-- size="small" 下拉框尺寸 -->
              <el-select 
                v-model="classroomSelectValue"
                placeholder="请选择" 
                size="small" 
                style="width: 128px"
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
            <el-form-item label="老师" style="margin-bottom: 0;">
              <!-- size="small" 下拉框尺寸 -->
              <el-select 
                v-model="teacherSelectValue" 
                placeholder="请选择" 
                size="small" 
                style="width: 128px"
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
      <!-- 课程表头部 -->
      <div style="display: flex; justify-content: space-between;">
        <span class="fixed-text">教学周：2020年9月2日-2021年1月17日</span>
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
          <span class="fixed-text" style="margin: auto 40px;">第45周</span>
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
      <div style="display: flex;margin-top: 29px">
        <!-- 第一列 -->
        <div class="flex-vertical-center">
          <div class="table-column"></div>
          <div 
            class="table-column fixed-text"
            style="line-height: 73px;"
            v-for="i in 8" 
            :key="i"
          >
            第{{ i }}节
          </div>
        </div>
        <!-- 后几列 -->
        <div
          class="flex-vertical-center"
          v-for="(item, index) in classTableData"
          :key="index"
        >
          <!-- 第一行星期 -->
          <div class="flex-vertical-center fixed-text table-column">
            <span>星期{{ num2week(index+1) }}</span>
            <span style="font-size: 12px ;color: #9f9f9f;font-weight: 400;">
              {{ item.date }}
            </span>
          </div>
          <!-- 下方课程数据 -->
          <div 
            class="flex-vertical-center table-column"
            v-for="(item, index) in classTableData[index].classes" 
            :key="index"
          >
            <!-- 弹框 
                 trigger触发方式
                 placement出现位置
                 visible-arrow	是否显示 Tooltip 箭头
                 popper-class	为 popper 添加类名
            -->
            <!-- v-if item.subject有内容时展示 -->
            <el-popover
              v-if="item.subject"
              trigger="hover"
              placement="right-end"
              :visible-arrow="false"
              popper-class="classcell-poper-box"
            >
              <!-- 弹框 -->
              <div class="flex-vertical-center">
                <!-- 标题 -->
                <div class="content-item" style="justify-content: center;">
                  英语（李老师）<i class="el-icon-close"></i>
                </div>
                <!-- 内容 -->
                <div class="content-item">
                  <span>主讲教室：</span>
                  <p>沈阳市第十一中学 综合教室1</p>
                </div>
                <div class="content-item">
                  <span>听课教室：</span>
                  <div>
                    <p>沈阳市第十一中学 综合教室1</p>
                    <p>沈阳市第十一中学 综合教室2</p>
                  </div>
                </div>
                <div class="content-item">
                  <span>课程码：</span>
                  <div>
                    <p>1303247874</p>
                  </div>
                </div>
                <div class="content-item">
                  <span>课程码：</span>
                  <div>
                    <img src="../../assets/class_code_img.png" alt="" />
                  </div>
                </div>
                <div style="width: 100%; border: 1px #fff solid;"></div>
                <!-- 鼠标 cursor: pointer; 
                     deleteMessageBox 弹框
                -->
                <div @click="deleteMessageBox" style="width: 100%;color: #fff;margin-top: 10px;cursor: pointer;">
                  <i class="el-icon-delete" style="float: right;margin-right: 8px;"></i>
                </div>
              </div>
              <!-- slot="reference" 触发弹框区域的内容 -->
              <div slot="reference" class="flex-vertical-center">
                <div>
                  <span style="font-size: 15px;font-weight: bold;color: #409eff;">{{ item.subject }}</span>
                  <span style="font-size: 12px;font-weight: 400;color: #9f9f9f;"> | {{ item.teacher }}</span>
                </div>
                <!-- effect主题 -->
                <el-tag 
                  :type="tagTypeFilter(item.status)"
                  size="mini"
                  effect="dark"
                >{{ item.status }}
                </el-tag>
              </div>
            </el-popover>
            <!-- TODO 鼠标移上去才显示添加按钮为实现 -->
            <!-- <div v-else 
              @mouseover="btnShowFlag = true"
              @mouseout="btnShowFlag = false">
              <el-button v-show="btnShowFlag">
                <i class="el-icon-circle-plus-outline"></i>
              </el-button>
            </div> -->
            <!-- v-else -->
            <!-- circle el-button圆角 -->
            <el-button v-else icon="el-icon-plus" circle @click="addDialogVisible = true">
            </el-button>
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
    <!-- 添加课程对话框 -->
    <el-dialog title="新增课程" :visible.sync="addDialogVisible" width="40%">
      <span class="form-group-title">课程信息</span>
      <el-form :model="classForm" :rules="classFormRules" ref="classForm" label-width="100px">
        <!-- required 是否必填 -->
        <el-form-item label="课程名称" prop="className" required>
          <el-input v-model="classForm.className"></el-input>
        </el-form-item>
        <div style="display: flex;">
          <el-form-item label="选择学校" prop="school" required>
            <el-select v-model="classForm.school" placeholder="请选择学校">
              <el-option
                v-for="item in schoolOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主讲教室" prop="classroom" required>
            <el-select v-model="classForm.classroom" placeholder="请选择教室">
              <el-option
                v-for="item in classroomOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="上课时间" required>
          <div style="margin-bottom: 20px;">
            <el-radio v-model="classForm.classPlan.type" label="1">周期排课</el-radio>
            <el-radio v-model="classForm.classPlan.type" label="2">临时排课</el-radio>
          </div>
          <div style="margin-bottom: 20px;">
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
          </div>
          <div style="margin-bottom: 20px;">
            <el-time-picker
              v-model="classForm.classPlan.startTime"
              placeholder="选择时间">
            </el-time-picker>
            <span style="margin: auto 20px">-</span>
            <el-time-picker
              v-model="classForm.classPlan.endTime"
              placeholder="选择时间">
            </el-time-picker>
          </div>
          <div style="margin-bottom: 20px;">
            <el-select v-model="classForm.classPlan.weekdays[index]" placeholder="请选择周几">
              <el-option
                v-for="item in weekOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span style="margin: auto 20px">-</span>
            <el-select v-model="classForm.classPlan.nums[index]" placeholder="请选择第几节课">
              <el-option
                v-for="item in classNumOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <span class="form-group-title">主讲信息</span>
      <el-form :model="speakInfoForm" :rules="speakInfoFormRules" ref="speakInfoForm" label-width="100px">
        <!-- required 是否必填 -->
        <div>
          <el-form-item label="主讲老师" prop="teacher" required>
            <el-select v-model="speakInfoForm.teacher" placeholder="请选择">
              <el-option
                v-for="item in teacherOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外聘老师" prop="externalTeacher" required>
              <el-input
                v-model="speakInfoForm.externalTeacher"
                placeholder="请填写外聘老师名字"
                style="width: 217px"
              ></el-input>
            </el-form-item>
        </div>
        <!-- 选择年级  学科 -->
        <div style="display: flex; ">
          <el-form-item label="选择年级" prop="grade" required>
            <el-select v-model="speakInfoForm.grade" placeholder="请选择">
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择学科" prop="subject" required>
            <el-select v-model="speakInfoForm.subject" placeholder="请选择">
              <el-option
                v-for="item in subjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display: flex; ">
          <el-form-item label="选择年级" prop="grade" required>
            <el-select v-model="speakInfoForm.grade" placeholder="请选择">
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择学科" prop="subject" required>
            <el-select v-model="speakInfoForm.subject" placeholder="请选择">
              <el-option
                v-for="item in subjectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span class="form-group-title">听课信息</span>
      <el-form :model="listenInfoForm" :rules="listenInfoFormRules" ref="listenInfoForm" label-width="100px">
        <!-- required 是否必填 -->
        <el-form-item label="听课教室" required>
          <div v-for="(item,index) in listenInfoForm.schools" :key="index">
            <el-select v-model="listenInfoForm.schools[index]" placeholder="请选择学校">
              <el-option
                v-for="item in schoolOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span style="margin: auto 20px">-</span>
            <el-select v-model="listenInfoForm.classrooms[index]" placeholder="请选择教室">
              <el-option
                v-for="item in classroomOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- 添加教室按钮 -->
            <el-button
              v-if="index === listenInfoForm.schools.length - 1"
              type="primary"
              icon="el-icon-plus"
              circle
              plain
              size="mini"
              @click="addSchoolSelector"
            >
            </el-button>
            <!-- 删除教室按钮 -->
            <el-button
              v-else
              type="danger"
              icon="el-icon-minus"
              circle
              plain
              size="mini"
              @click="deleteSchoolSelector"
            >

            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="课程码" style="color: #c0c4cc">
          <span>26535233325</span>
          <!-- el-icon-document-copy element图标 
               cursor: pointer 鼠标手
          -->
          <i class="el-icon-document-copy" style="cursor: pointer">复制</i>
        </el-form-item>
        <el-form-item label="分享码">
          <div style="display: flex;padding-top: 10px;">
            <el-switch v-model="shareSwitchFlag"> </el-switch>
            <!-- flex-vertical-center flex垂直布局居中 -->
            <div v-if="shareSwitchFlag" class="flex-vertical-center">
              <img src="../../assets/class_code_img.png" alt="">
              <!-- el-icon-document-copy element图标 
                cursor: pointer 鼠标手
              -->
              <i class="el-icon-document-copy" style="cursor: pointer; color: #c0c4cc">复制</i>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name:"ClassSchedule",
    data(){
      return{
        // 学校数据
        schoolSelectValue:"",
        // 教室选项数据
        classroomSelectValue:"",
        // 老师数据
        teacherSelectValue:"",
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
        //课程表星期
        num2week(input) {
          switch (input) {
            case 1:
              return "一";
            case 2:
              return "二";
            case 3:
              return "三";
            case 4:
              return "四";
            case 5:
              return "五";
            case 6:
              return "六";
            case 7:
              return "日";
          }
        },
        // 上课状态
        tagTypeFilter(input) {
          switch (input) {
            case "未上课":
              return "danger";
            case "已上课":
              return "info";
            case "开始上课":
              return "";
            case "未开课":
              return "warning";
          }
        },
        // 控制添加课程展示
        addDialogVisible:false,
        // 新增课程信息数据
        classForm: {
          className: "",//课程名称
          school: "",//学校
          classroom: "",//教室
          // 选项数据
          classPlan: {
            type: "1",//上课时间
            startDate: "",//开始时间
            endDate: "",//结束时间
            startTime: "",
            endTime: "",
            weekdays: [""],
            nums: [""],
          },
        },
        // 新增课程时间选择
        weekOptions: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        classNumOptions: [1, 2, 3, 4, 5, 6, 7, 8],
        // 新增课程信息规则数据
        classFormRules:"",
        // 新增课程主讲信息数据
        speakInfoForm: {
          teacher: "", //主讲老师
          externalTeacher: "", // 外聘老师
          grade: "",//年级
          subject: "", //课程
        },
        // 新增课程主讲信息规则
        speakInfoFormRules: {},
        // 新增课程听课信息数据
        listenInfoForm: {
          schools: [""],
          classrooms: [""],
        },
        // 新增课程听课信息规则
        listenInfoFormRules: {},
        // 控制新增课程分享码按钮
        shareSwitchFlag:false
      }
    },
    methods: {
      openHolidayPlanDialog(){

      },
      // 弹框删除课程
      deleteMessageBox(){
        this.$confirm('删除本节课还是删除该学科的所有课程?', '删除课程提示', {
          confirmButtonText: '删除本节课',
          cancelButtonText: '删除该学科所有课',
          // 消息类型 用于显示图标
          type: 'warning',
        })
        // 删除本节课
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
        // 删除该学科所有课
        .catch(()=>{
          this.$confirm('是否删除该学科的所有课程?', '删除课程提示', {
          confirmButtonText: '确认删除',
          cancelButtonText: '取消',
          // 消息类型 用于显示图标
          type: 'error',
          })
          // 确认
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          })
          // 删除
          .catch(()=>{
          })
        });
      },
      // 添加课程，添加教室
      addSchoolSelector(){
        this.listenInfoForm.schools.push("")
        this.listenInfoForm.classrooms.push("")
      },
      // 添加课程，删除教室
      deleteSchoolSelector(){
        this.listenInfoForm.schools.pop("")
        this.listenInfoForm.classrooms.pop("")
      },
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

<style scpoped>
   /* 卡片 */
   .main-card-box{
    margin: 12px 20px 20px;
  }

  /* 单元格 */
  .table-column {
    height: 73px;
    width: 205px;
    border: 1px solid #f1f1f1;
  }
  /* 单元格表头内容 */
  .fixed-text {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
  }
  /* flex垂直居中分布布局 */
  .flex-vertical-center{
    display: flex;
    /* 垂直排列 */
    flex-direction: column;
    align-items: center;
    /* 居中分布 */
    justify-content: center;
  }
  /* 弹框 */
  .classcell-poper-box {
    width: 300px;
    background: #90969f !important;
    opacity: 0.9;
    border-radius: 6px;
  }
  /* 课程表弹框内容 */
  .content-item {
    color: #fff;
    display: flex;
    width: 260px;
    margin-bottom: 15px;
  }
  .content-item >  span {
    width: 70px;
    text-align: right;
  }
  /* 新增课程弹窗标题 */
  .form-group-title {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20px;
  }
</style>