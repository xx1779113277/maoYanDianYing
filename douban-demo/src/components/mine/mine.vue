<template>
    <div class="app-a">
        <Header :isPage="isPage" />
        
        <div class="content"></div>

        <Tabbar :isPage="isPage" />
    </div>
</template>

<script>
import Header from '../header/index'
import Tabbar from '../tabbar/index'

export default {
    data() {
        return {
            isPage: { icon: '&#xe66e;', name: '豆瓣我的', mark: 'mine' },
        }
    },
    components: {
        Header,
        Tabbar
    }
}
</script>

<style lang="scss" scoped>
.content {
    flex: 1;
}
</style>


