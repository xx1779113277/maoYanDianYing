<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from './pages/index'

export default {
  components: {
    Index
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>
