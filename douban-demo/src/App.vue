<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 当前进入的路由 meta里面 keepAlive为false时走这里 下面 if 判断进行了取反处理 -->

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push("/home");
  },
  // 处理导航栏无法直接访问路由
  mounted(){
    window.addEventListener('hashchange',()=>{
      var currentPath = window.location.hash.slice(1); // 获取输入的路由
      if(this.$router.path !== currentPath){
        this.$router.push(currentPath); // 动态跳转
      }
    },false);
}

};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
    background: #fff;

  .app-a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
