<template>
    <div class="empty"></div>
</template>

<script>
export default {
    beforeCreate() {
        this.$router.push('/home')
    }
}
</script>


<style lang="scss" scoped>
.empty {
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>

