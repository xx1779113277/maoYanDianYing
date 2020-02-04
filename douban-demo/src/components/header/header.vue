<template>
    <div class="app_header">
        <div class="app_header_left"
            v-for="item in headList" :key="item.mark"
            v-show="isPage === item.mark"
        >
            <span class="iconfont" v-html="item.icon"></span>{{ item.name }}
        </div>
        <div class="app_header_right">城市</div>
    </div>
</template>

<script>
export default {
    props: [
        'isPage'
    ],
    data() {
        return {
            headList: [
                { icon: '&#xe69c;', name: '豆瓣电影', mark: 'home' },
                { icon: '&#xe631;', name: '豆瓣影院', mark: 'audio' },
                { icon: '&#xe66e;', name: '豆瓣我的', mark: 'mine' }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.app_header {
    width: 100%;
    height: 0.5rem;
    background: #42bd56;
    line-height: 0.5rem;
    opacity: 0.8;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 14px;
    .iconfont {
        margin-right: 0.05rem;
        color: #fff;
    }
}
</style>
