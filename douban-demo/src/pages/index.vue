<template>
    <div class="index">
        <!-- 标题栏 -->
        <Header :isPage="isPage" />

            <!-- 页面主要内容 -->
        <router-view></router-view>
            <!-- tabbar选项卡 -->
        <Tabbar @changePage="changePage" />

    </div>
</template>

<script>
import Header from '../components/header/header'
import Tabbar from '../components/tabbar/tabbat'
export default {
    data() {
        return {
        // 控制header当前是页面
        isPage: 'home'
        }
    },
    components: {
        Header, Tabbar
    },
    created() {
        this.$router.push('/home')
    },
    methods: {
        // 跳转路由响应
        changePage(mark) {
            this.isPage = mark
        }
    },
}
</script>

<style lang="scss" scoped>
.index {
    display: flex;
    flex-direction: column;
}
</style>

