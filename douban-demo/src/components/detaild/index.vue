<template>
  <div class="index">
    <header>
      <p @click="goBack">←</p>
      <div>{{ data.nm }}</div>
    </header>

    <div class="content" :src="data.img">
      <div class="background">
        <img :src="data.img" alt="">
        <div class="intro">
          <span class="name nowrap">{{ data.nm }}</span>
          <span class="english nowrap">Love You Forever</span>
          <span class="time nowrap">{{ data.star }}</span>
          <span class="time nowrap">{{ data.rt }}大陆上映</span>
          <div class="btns">
            <button>
              <span>想看</span>
            </button>
            <button>
              <span>看过</span>
            </button>
          </div>
        </div>
      </div>
      <div class="number">
        <div>
          <span>{{ getWish(data.wish) }}</span>人想看
        </div>
      </div>
    </div>

    <footer></footer>
  </div>
</template>

<script>
import { getUrl } from "../../static/setData.js";
export default {
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    this.data = this.$route.params.data;
    this.data.img = getUrl(this.data.img);
  },
  methods: {
    // 返回
    goBack() {
      var sTop = this.$route.params.sTop;
      this.$router.push({ name: "home", params: { sTop } });
    },
    // 处理人物数量格式 1,111,111
    getWish(num) {
      if (num !== "" && num !== undefined && num !== null) {
        var arr = String(num).split("");
        arr.reverse();
        for (let i = 2; i < arr.length - 1; i += 3) {
          arr[i] = "," + arr[i];
        }
        return arr.reverse().join("");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 7.5rem;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 0.5rem;
    background: #42bd56;
    opacity: 0.8;
    font-size: 17px;
    color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    p {
      position: absolute;
      left: 0.2rem;
      font-size: 30px;
      font-weight: 700;
    }
    div {
      width: 2.5rem;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .content {
    width: 3.75rem;
    height: 3.6rem;
    background: rgba(100, 100, 100, 0.9);

    .background {
      width: 3.75rem;
      height: 2rem;
      display: flex;

      img {
        width: 1.2rem;
        height: 1.6rem;
        margin-top: 0.2rem;
        margin-left: 0.15rem;
        margin-right: 0.1rem;
        border-radius: 5px;
      }
      .intro {
        width: 2rem;
        height: 1.6rem;
        margin-top: 0.2rem;
        display: flex;
        flex-direction: column;
        color: #fff;
        .name {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 0.05rem;
        }
        .english {
          font-size: 12px;
          color: #eee;
          margin-bottom: 0.05rem;
        }
        .love {
          color: #faaf00;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 0.05rem;
        }
        .time {
          font-size: 14px;
          color: #eee;
          margin-bottom: 0.05rem;
        }
        .btns {
          display: flex;

          button {
            width: 1.1rem;
            height: 0.3rem;
            border: 1px solid #777;
            background: rgba(255, 255, 255, 0.35);

            border-radius: 0.05rem;
            margin-right: 0.05rem;

            span {
              color: #fff;
              font-size: 0.14rem;
            }
          }
          button:focus {
            outline: none;
          }
        }
      }
    }

    .number {
      width: 3.45rem;
      height: 1.45rem;
      background: rgba(0, 0, 0, 0.2);
      margin-left: 0.15rem;
      border-radius: 10px;
      font-size: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;

      span {
        color: #faaf00;
      }
    }
  }
  footer {
    flex: 1;
    background: rgba(100, 100, 100, 0.9);
    
  }
}
</style>


