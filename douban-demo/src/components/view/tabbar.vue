<template>
    <div class="tabbar">

      <div class="tabitem" 
        v-for="item in tabList" 
        :key="item.id"
        @click="toPage(item.mark)"
        :class="isPage.mark == item.mark ? 'active' : ''"
      >
        <img :src="isPage.mark == item.mark ? item.activeImg : item.normalImg ">
        {{ item.txt }}
      </div>
      
    </div>
</template>

<script>
export default {
  props: [
    'isPage'
  ],
  data() {
    return {
      tabList: [
        { 
          id: 1,txt: "电影",mark: "home",normalImg: require("../../assets/ic_tab_home_normal.png"),
          activeImg: require("../../assets/ic_tab_home_active.png")
        },
        { 
          id: 2,txt: "影院",mark: "audio",normalImg: require("../../assets/ic_tab_audio_normal.png"),
          activeImg: require("../../assets/ic_tab_audio_active.png")
        },
        { id: 3,txt: "我的",mark: "mine",normalImg: require("../../assets/ic_tab_mine_normal.png"),
          activeImg: require("../../assets/ic_tab_mine_active.png")
        }
      ]
    };
  },
  methods: {
    // 跳转路由页面
    toPage(mark) {
      // 判断是不是在当前页, 是就不执行跳转
      if(this.$route.name !== mark) {
        // 判断是不是跳转到mine页面
        if(mark === 'mine') {
          // 验证是否处于登录状态
          var islogin = window.localStorage.islogin
          window.console.log(islogin)
          if(islogin !== '' && islogin !== null && islogin !== undefined)  {
            this.$router.push(`/mineindex`)
          }else {
            // 否则跳转到登录页
            this.$router.push(`/minelogin`)
          }
          
        }else {
          this.$router.push(`/${mark}`)
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 0.6rem;
  background: #fff;
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
