<template>
  <div>
    <h2>Places List</h2>
    <ul>
      <li v-for="place in store.getPlaces()"
          v-bind:key="place.id"
          v-on:click="showPlace(place)">
        {{place.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'PlacesList',
  data () {
    return {
      store
    }
  },
  methods: {
    showPlace (place) {
      this.store.changeSelectedPlace(place)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
