<template>
    <div class="app-a">
        <Header :isPage="isPage" />
        
        <router-view></router-view>

        <Tabbar :isPage="isPage" />
    </div>
</template>

<script>
import Header from '../view/header'
import Tabbar from '../view/tabbar'

export default {
    data() {
        return {
            isPage: { name: '豆瓣我的', mark: 'mine' },
        }
    },
    components: {
        Header,
        Tabbar
    },
    created() {
        this.$router.push('/minelogin')
        this.isPage.name = '登录'
    },
}
</script>

<style lang="scss" scoped>
.content {
    flex: 1;
}
</style>


