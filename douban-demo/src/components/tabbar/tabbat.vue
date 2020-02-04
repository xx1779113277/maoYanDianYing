<template>
    <div class="tabbar">

      <div class="tabitem" 
        v-for="item in tabList" 
        :key="item.id"
        @click="toPage(item.mark)"
        :class="isPage == item.mark ? 'active' : ''"
      >
        <img :src="isPage == item.mark ? item.activeImg : item.normalImg ">
        {{ item.txt }}
      </div>
      
    </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        {id: 1,txt: "电影",mark: "home",normalImg: require("../../assets/ic_tab_home_normal.png"),activeImg: require("../../assets/ic_tab_home_active.png")},
        {id: 2,txt: "影院",mark: "audio",normalImg: require("../../assets/ic_tab_audio_normal.png"),activeImg: require("../../assets/ic_tab_audio_active.png")},
        {id: 3,txt: "我的",mark: "mine",normalImg: require("../../assets/ic_tab_mine_normal.png"),activeImg: require("../../assets/ic_tab_mine_active.png")}
      ],
      // 获取当前页面的mark
      isPage: this.$router.currentRoute.fullPath.slice(1)
    };
  },
  methods: {
    // 跳转路由页面
    toPage(mark) {
      (this.isPage != mark) && (this.$router.push(`/${mark}`)) && this.$emit('changePage', mark) && (this.isPage = mark)
    }
  },
};
</script>

<style lang="scss" scoped>
.tabbar {
  width: 3.75rem;
  height: 0.6rem;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;

  .tabitem {
    font-size: 12px;
    color: #aaa;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .active {
      color: #42bd56 !important;
    }
}
</style>
