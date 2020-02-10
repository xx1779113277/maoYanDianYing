<template>
    <div class="app-a">
        <Header :isPage="isPage" />

        <div class="home">
            
            <!-- 小导航栏 -->
            <div class="home-nav">
                <span>北京</span>
                <div class="nav-tabbar">
                    <div class="nav-tabar-a"
                        v-for="item in navTabList"
                        :key="item.id"
                        :class="isNavTab === item.id ? 'active' : ''"
                        @click="toTem(item.id)"
                    >{{ item.name }}</div>
                </div>
                <span class="iconfont">&#xe637;</span>
            </div>
            <!-- end -->

            <HomeCon :data="data" :updata="updata" @changePage='changePage' />
        </div>

        <Tabbar :isPage="isPage" />
    </div>
</template>

<script>
import Header from '../header/index'
import HomeCon from './homeCon'
import Tabbar from '../tabbar/index'

export default {
    data() {
        return {
            isPage: { icon: '&#xe69c;', name: '豆瓣电影', mark: 'home' },
            navTabList: [
                { 
                    name: '正在热映', id: 0, page: 0, api: 'one', 
                    swpApi: 'oneSwiper', p: '最受好评电影' },
                { 
                    name: '即将上映', id: 1, page: 0, api: 'two', 
                    swpApi: 'twoSwiper', p: '近期最受期待' }
            ],
            isNavTab: 0,    //控制当前是 热映|上映
            data: {     //存储数据
                swiper: [],
                li: []
            },    
            updata: {   //控制请求数据的参数
                api: 'one',
                page: 0,
                swpApi: 'oneSwiper',
                p: '最受好评电影'
            }
        }
    },
    components: {
        HomeCon,
        Header,
        Tabbar
    },
    methods: {
        // 导航栏事件
        toTem(id) {
            this.isNavTab = id
            this.updata.api = this.navTabList[id].api
            this.updata.page = this.navTabList[id].page     
            this.updata.swpApi = this.navTabList[id].swpApi     
            this.updata.p = this.navTabList[id].p
            this.getData(this.updata.api, this.updata.page)     
            this.getSwpData(this.updata.swpApi)
        },
        // 获取li数据
        getData(api, page) {
            this.$axios.get(`/${api}/${page}`)
            .then( res => {
                this.data.li = res.data.data
            })
            .catch( err => {
                window.console.log(err)
            })
        },
        // 获取swiper数据
        getSwpData(swpApi) {
            this.$axios.get(`/${swpApi}`)
            .then( res => {
                this.data.swiper = res.data.data
            })
            .catch( err => {
                window.console.log(err)
            })
        },
        // 获取更多li数据
        changePage(page) {
            this.$axios.get(`/${this.updata.api}/${page}`)
            .then( res => {
                this.data.li = [...this.data.li, ...res.data.data]
            })
            .catch( err => {
                window.console.log(err)
            })
        }
    },
    // 初始化渲染
    created() {
        this.getData(this.updata.api, this.updata.page)
        this.getSwpData(this.updata.swpApi)
    },
}
</script>

<style lang="scss" scoped>
.home {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: auto;
}
.home-nav {
    width: 3.75rem;
    height: 0.45rem;
    padding: 0 0.15rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
        font-size: 14px;
    }
    .nav-tabbar {
        display: flex;
        font-size: 15px;
        font-weight: bold;
        .nav-tabar-a {
            padding: 0 0.12rem;
            height: 0.45rem;
            line-height: 0.45rem;
        }
    }

    .iconfont {
        font-size: 16px;
        color: #42bd56;
        font-weight: bold;
    }

    .active{
        color: #42bd56;
        position: relative;
        transition: .3s;
        box-sizing: border-box;
        border-bottom: 1px solid #42bd56;
    }
    // .active:after {
    //     content: '';
    //     width: 0.8rem;
    //     padding: 0.01rem;
    //     background: #42bd56;
    //     position: absolute;
    //     bottom: 0;
    //     margin-left: -85%;

    // }
}
</style>


