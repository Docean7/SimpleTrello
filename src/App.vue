<template>
  <div id="app">
    <TrelloBoard></TrelloBoard>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
<script>
import TrelloBoard from '@/components/TrelloBoard'
export default {
  components: { TrelloBoard }
}
</script>
