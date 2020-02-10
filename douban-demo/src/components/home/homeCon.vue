<template>
  <div
    class="home-con"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
  >
    <!-- --------------------滑块区域------------------------->
    <div class="swp">
      <p>{{ updata.p }}</p>
      <div class="con">
        <div class="conSwp">
          <section v-for="item in data.swiper" :key="item.id" @click="toDetails(item)">
            <img :src="getUrl(item.img)" alt="">
            <div class="name">{{ item.nm }}</div>
            <div class="time">{{ getTime(item.comingTitle) }}</div>
          </section>
        </div>
      </div>
    </div>
    <!-- ----------------------- end ------------------------->
    <!-- --------------------- 边距 --------------------------->
    <div class="margin"></div>
    <!-- ----------------------- end ------------------------->
    <!-- -----------------------列表内容------------------------>
    <div class="con-ul">
      <div class="con-li" v-for="item in data.li" :key="item.id" @click="toDetails(item)">
        <img :src="getUrl(item.img)" alt="">
        <div class="con-li-state">
          <div class="li-state-con">
            <div class="title ys-slh">{{ item.nm }}</div>
            <div class="span">
              <div v-if="!item.sc == 0">
                观众评
                <span>{{ item.sc }}</span>
              </div>
              <div v-if="item.sc == 0">暂无评分</div>
            </div>
            <div class="state ys-slh">主演:{{ item.star }}</div>
            <div class="aside ys-slh">{{ item.showInfo }}</div>
          </div>
          <div class="button">
            <button>购票</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------- end ----------------------- -->
    <!-- ----------------------加载提示------------------------->
    <div class="loading" v-if="loading">
      <img src="../../assets/loading.gif" alt="">
      正在加载...
    </div>
    <!-- ----------------------- end ----------------------- -->
  </div>
</template>

<script>
import { getUrl, getTime } from "../../static/setData.js";
export default {
  props: ["data", "updata"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    // 处理图片路径
    getUrl(img) {
      var re = /(w.h)/g;
      var str = "170.230";
      var res = img.replace(re, () => {
        return str;
      });
      return res;
    },
    // 处理时间
    getTime(time) {
      var res = time.split(" ");
      return res[0];
    },
    // 加载更多
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.updata.page += 1;
        this.$emit("changePage", this.updata.page);
        this.loading = false;
      }, 1500);
    },
    // 跳转详情页
    toDetails(data) {
      let sTop = document.getElementsByClassName("home-con")[0].scrollTop;
      window.console.log(data);
      this.$router.push({ name: "details", params: { data, sTop } });
    },
    // 调整滚动条位置
    changeScroll() {
      if (this.$route.name === "home") {
        let homeCon = document.getElementsByClassName("home-con")[0];
        let sTop = this.$route.params.sTop;
        homeCon.scrollTop = sTop;
      }
    }
  },
  watch: {
    $route: "changeScroll"
  }
};
</script>

<style lang="scss" scoped>
.home-con {
  margin-top: 0.12rem;
  height: 100%;
  width: 3.75rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .swp {
    width: 3.4rem;
    height: 2.16rem;
    // overflow-y: hidden;
    p {
      font-size: 14px;
      color: black;
      margin-bottom: 0.12rem;
    }
    .con {
      width: 3.4rem;
      height: 1.75rem;
      overflow: scroll;
      overflow-y: hidden;
      .conSwp {
        background: white;
        display: inline;
        white-space: nowrap;
        section {
          display: inline-block;
          width: 0.85rem;
          height: 100%;
          margin-right: 0.1rem;
          img {
            width: 100%;
            height: 1.15rem;
            display: block;
          }
          .name {
            font-size: 13px;
            color: #000;
            margin: 0.03rem 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .time {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
  .margin {
    width: 3.55rem;
    padding: 0.05rem 0rem;
    background: #eee;
  }
  .con-ul {
    width: 3.4rem;
    display: flex;
    flex-direction: column;
    .con-li {
      width: 3.4rem;
      height: 1.24rem;
      display: flex;
      box-sizing: border-box;
      padding-top: 0.12rem;
      padding-bottom: 0.12rem;
      img {
        width: 0.7rem;
        height: 1rem;
        display: block;
        margin-right: 0.1rem;
      }
      .con-li-state {
        width: 2.6rem;
        height: 1rem;
        box-sizing: border-box;
        border: 1px solid #eee;
        border-left: 0px;
        display: flex;
        .li-state-con {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .title {
            font-size: 17px;
            font-weight: 700;
          }
          .span {
            font-size: 13px;
            color: #666;
            div {
              span {
                font-size: 15px;
                color: #faaf00;
              }
            }
          }
          .state {
            font-size: 13px;
            color: #666;
          }
          .aside {
            font-size: 14px;
            color: #777;
          }
          .ys-slh {
            width: 2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .button {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          button {
            background: #f03d37;
            width: 0.5rem;
            height: 0.3rem;
            border: 0px;
            border-radius: 0.05rem;
            color: white;
          }
        }
      }
    }
  }
  .loading {
    width: 3.75rem;
    height: 0.3rem;
    font-size: 12px;
    display: flex;
    justify-content: center;
    color: #999;
    img {
      width: 0.15rem;
      height: 0.15rem;
      margin-right: 0.01rem;
    }
  }
}
</style>
