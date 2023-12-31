//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
	state:{
    // 选择器选项
    // 学校
    schoolOptions: [],
    // 教室
    classroomOptions: [],
    // 老师
    teacherOptions: [],
    // 年级
    gradeOptions: [],
    // 学科
    subjectOptions: [],
  }
})