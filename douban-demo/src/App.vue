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
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  .app-a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
  }
}
</style>
