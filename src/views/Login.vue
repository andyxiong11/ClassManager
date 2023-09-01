<template>
  <div class="container">
    <div class="circle-wrapper circle-1"></div>
    <div class="circle-wrapper circle-2"></div>
    <div class="circle-wrapper circle-3"></div>
  </div>
</template>

<script>
export default {
  name:'Login'
}
</script>

<style>
  .container {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.png");
    background-size: cover;
  }
  .circle-wrapper {
    left: 50%;
    top: 50%;
    /* 水平垂直位移，加上上面实现页面居中显示 */
    transform: translate(-50%, -50%);

    border:1px solid;
    /* 圆角 */
    border-radius: 50%;
    opacity: 0.2;
    position: absolute;
  }
  .circle-1 {
    width: 487px;
    height: 487px;
    background-color: #0c729c;
  }
  .circle-2 {
    width: 420px;
    height: 420px;
    background-color: #008cc0;
  }
  .circle-3 {
    width: 359px;
    height: 359px;
    background-color: #41a1cd;
  }
</style>