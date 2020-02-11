<template>
    <div class="app-a">
        <Header :isPage="isPage" />
        
        <Content />

        <Tabbar :isPage="isPage" />
    </div>
</template>

<script>
import Header from '../view/header'
import Tabbar from '../view/tabbar'
import Content from './view/content'

export default {
    data() {
        return {
            isPage: { icon: '&#xe66e;', name: '豆瓣我的', mark: 'mine' },
        }
    },
    components: {
        Header,
        Tabbar,
        Content
    }
}
</script>

<style lang="scss" scoped>
.content {
    flex: 1;
}
</style>


