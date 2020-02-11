<template>
    <div class="app_header">

        <div class="app_header_left">
            <span class="iconfont" v-html="isPage.icon"></span>{{ isPage.name }}
        </div>
        
    </div>
</template>

<script>
export default {
    props: [
        'isPage'
    ]
}
</script>

<style lang="scss" scoped>
.app_header {
    width: 100%;
    height: 0.5rem;
    background: #42bd56;
    line-height: 0.5rem;
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    .iconfont {
        margin-right: 0.05rem;
        color: #fff;
    }
}
</style>
