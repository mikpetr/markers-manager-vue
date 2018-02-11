<template>
  <div id="app">
    <PlacesManager/>
  </div>
</template>

<script>
import PlacesManager from './components/PlacesManager/PlacesManager'

export default {
  name: 'App',
  components: {
    PlacesManager
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
