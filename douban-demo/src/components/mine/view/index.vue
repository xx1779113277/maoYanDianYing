<template>
    <div class="content">
        <header>
            <img :src="headerImg" alt="">
        </header>

        <div class="padding"></div>

        <div class="bodyer">
            <aside>我的订单</aside>
            <section>
                <div class="section-block">
                    <div class="icon"><span class="iconfont">&#xe69d;</span></div>
                    <div class="span">电影</div>
                </div>
                <div class="section-block">
                    <div class="icon red"><span class="iconfont">&#xe61f;</span></div>
                    <div class="span">商城</div>
                </div>
            </section>
        </div>

        <div class="padding"></div>

        <div class="discount">
            <a href="">优惠卷</a>
            <a href="">折扣卡</a>
            <a @click="toOff">退出登录</a>

            <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
            </mt-actionsheet>

        </div>
    </div>
</template>

<script>
import { Actionsheet } from 'mint-ui';

export default {
    data() {
        return {
            actions: [
                { name: '退出登录', method: this.off }
            ],
            sheetVisible: false,
            headerImg: require('../../../assets/9d89b1e45a5b7fd309b28b5f55269c3912416.png')
        }
    },
    methods: {
        // 去退出
        toOff() {
            this.sheetVisible = !this.sheetVisible
        },
        // 退出登录
        off() {
            window.localStorage.removeItem('islogin')
            this.$router.push('/empty')
        }
    },
}
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    background: #eee;

    header {
        width: 100%;
        height: 1.5rem;
        background: #42bd56;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            display: block;
            width: .7rem;
            height: .7rem;
            border-radius: 50%;
            background: #fff;
            border: .03rem solid #fff;
        }
    }

    .padding {
        padding: .05rem;
    }

    .bodyer {
        width: 100%;
        height: 1.5rem;
        background: #fff;

        aside {
            width: 100%;
            height: .5rem;
            font-size: 15px;
            text-align: center;
            line-height: .5rem;
        }

        section {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;

            .section-block {
                width: .5rem;
                height: 1rem;
                display: flex;
                flex-direction: column;

                .icon {
                    width: .5rem;
                    height: .5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    background: #42bd56;

                    span {
                        font-size: .2rem;
                        color: #fff;
                    }
                }
                
                .red {
                    background: #f03d31 !important;
                }

                .span {
                    font-size: 15px;
                    text-align: center;
                    padding-top: .1rem;
                }
            }
        }
    }

    .discount {
        width: 100%;

        a {
            display: block;
            width: 100%;
            height: .5rem;
            background: #fff;
            font-size: 15px;
            margin-bottom: .02rem;
            text-decoration: none;
            color: #000;
            line-height: .5rem;
            padding-left: .2rem;
        }
    }
}
</style>
