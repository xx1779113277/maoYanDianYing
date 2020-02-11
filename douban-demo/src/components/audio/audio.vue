<template>
    <div class="app-a">
      <Header :isPage="isPage" />

        <div class="content"></div>

      <Tabbar :isPage="isPage" />
    </div>
</template>

<script>
import Header from '../view/header'
import Tabbar from '../view/tabbar'

export default {
    data() {
        return {
            isPage: { icon: '&#xe631;', name: '豆瓣影院', mark: 'audio' },
        }
    },
    components: {
        Header,
        Tabbar
    }
};
</script>

<style lang="scss" scoped>
.content {
    flex: 1;
}
</style>


