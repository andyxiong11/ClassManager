<template>
  <div class="container">
    <div class="circle-wrapper circle-1"></div>
    <div class="circle-wrapper circle-2"></div>
    <div class="circle-wrapper circle-3">
      <p class="horizental-center">- 同步课程，同步教学 -</p>
      <!-- 登录表单 -->
      <!-- rules 规则 -->
      <el-form
        class="login-form horizental-center"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginForm"
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <!-- autofocus自动聚焦 -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            autofocus
          ></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <!-- 绑定一个自定义事件，按下回车调用login方法 -->
          <!-- type="password"输入内容加密 -->
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
            v-on:keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="btn" @click="login('loginForm')">登 录</el-button>
          <el-button class="btn" @click="resetLoginForm('loginForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'Login',
  data() {
    return {
      // 登录表单绑定的数据
      loginForm: {
        username: "",
        password: "",
      },
      // 表单的验证规则
      loginFormRules: {
        // 用户名规则
        username: [
          {
            // 必填
            required: true,
            // 提示语
            message: "请输入用户名",
            //TODOtrigger: "blur" 不知道是什么属性
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            // 提示语
            message: "长度在 3 到 5 个字符",
            //TODOtrigger: "blur" 不知道是什么属性
            trigger: "blur",
          },
        ],
        // 密码规则
        password: [
          {
            // 必填
            required: true,
            // 提示语
            message: "请输入登陆密码",
            //TODOtrigger: "blur" 不知道是什么属性
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            // 提示语
            message: "长度在 6 到 15 个字符",
            //TODOtrigger: "blur" 不知道是什么属性
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置表单
    resetLoginForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 登录
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('登录成功!');
          this.$router.push("/index");
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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
  /* 圆圈通用样式 */
  .circle-wrapper {
    left: 50%;
    top: 50%;
    /* 水平垂直位移，加上上面实现页面居中显示 */
    transform: translate(-50%, -50%);
    border:1px solid;
    /* 圆角 */
    border-radius: 50%;
    position: absolute;
  }
  /* 圆圈1 */
  .circle-1 {
    width: 487px;
    height: 487px;
    background-color: #0c729c;
    /* 透明度 */
    opacity: 0.2;
  }
  /* 圆圈2 */
  .circle-2 {
    width: 420px;
    height: 420px;
    background-color: #008cc0;
    /* 透明度 */
    opacity: 0.2;
  }
  /* 圆圈3 */
  .circle-3 {
    width: 359px;
    height: 359px;
    background-color: #41a1cd;
  }
  /* 居中显示 */
  .horizental-center{
    left: 50%;
    /* 水平位移，加上上面实现页面居中显示 */
    transform: translateX(-50%);
    position: absolute;
  }
  /* 登录表单 */
  .login-form {
    /* top: 50%;
    transform: translate(-50%,-50%); */
    width: 246px;
    bottom: 52px;
  }
  /* 按钮 */
  .btn{
    width: 111px;
    height: 37px;
    background-color: #f4c41e;
  }
  .btn:first-child{
    float: left;
  }
  .btn:last-child{
    float: right;
  }
  p {
    top: 61px;
    width: 325px;
    font-size: 24px;
    color: #fff;
    text-align: center;
  }
</style>