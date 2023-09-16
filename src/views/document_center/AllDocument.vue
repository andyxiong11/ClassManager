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
              <el-input
                style="width: 180px"
                size="small"
                v-model="searchInputValue"
                placeholder="关键字搜索"
              >
              </el-input>
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
            <el-form-item style="margin-bottom: 0;">
              <el-button 
                type="primary" 
                icon="el-icon-upload2" 
                size="small"
                @click="uploadFileDialogVisible = true"
              >
                上传课件
              </el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
              <el-button 
                type="primary" 
                size="small"
              >
                批量删除
              </el-button>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
              <el-button 
                type="primary" 
                size="small"
              >
                批量下载
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div>
      </div>
    </el-card>
    <!-- 上传课件对话框 -->
    <el-dialog title="上传课件" :visible.sync="uploadFileDialogVisible" width="40%">
      <span class="form-group-title">课程信息</span>
      <el-form :model="uploadFileForm" ref="classForm" label-width="100px">
        <!-- required 是否必填 -->
        <el-form-item label="课件名称" required>
          <el-input 
            v-model="uploadFileForm.fileName"
            placeholder="请输入课件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属学校" required>
          <el-select v-model="uploadFileForm.school" placeholder="请选择">
            <el-option
              v-for="item in schoolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属老师" required>
          <el-select v-model="uploadFileForm.teacher" placeholder="请选择">
            <el-option
              v-for="item in steacherOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用年级" required>
          <el-select v-model="uploadFileForm.school" placeholder="请选择">
            <el-option
              v-for="item in schoolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div style="display: flex;">
          <el-form-item label="应用年级" required>
            <el-select v-model="uploadFileForm.school" placeholder="请选择">
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用学科" required>
            <el-select v-model="uploadFileForm.classroom" placeholder="请选择">
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
        <el-form-item label="上传课件" required>
          <div style="display: flex;">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div style="color: #c0c4cc;">（仅支持上传PDF，Word，PPT格式文件）</div>
          </div>
          <!-- 进度条 -->
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="70"
          ></el-progress>
        </el-form-item>
        <el-form-item label="文件备注">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="uploadFileForm.remark"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- footer 对话框底部 -->
      <div slot="footer">
        <el-button @click="uploadFileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadFileDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:"AllDocument",
    data() {
      return {
        schoolSelectValue: "",//学校选择内容
        teacherSelectValue: "",//老师选择内容
        gradeSelectValue: "",//年级选择内容
        subjectSelectValue: "",//学科选择内容
        searchInputValue: "", //关键字搜索内容
        // 课件内容
        documentTableData: [
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
          {
            fileName: "高三语文专递课堂教案",
            school: "沈阳市第十一中学",
            teacher: "李欣",
            grade: "高三",
            subject: "语文",
            createDate: "2020-12-02",
            downloadCount: "78",
          },
        ],
        // 控制上传课件对话框
        uploadFileDialogVisible: false,
        // 上传课件对话框数据
        uploadFileForm: {
          fileName: "",
          school: "",
          teacher: "",
          grade: "",
          subject: "",
          remark: "",
        },
      };
    },
  }
</script>

<style scoped>
  /* 卡片 */
  .main-card-box{
    margin: 12px 20px 20px;
  }
</style>