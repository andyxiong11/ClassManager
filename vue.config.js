const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭组件name驼峰检查
  lintOnSave:false
})
