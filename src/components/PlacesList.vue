<template>
  <div>
    <h2>Places List</h2>
    <ul>
      <li v-for="place in placesList" v-on:click="showPlace(place)" v-bind:key="place.id">
        {{place.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PlacesList',
  data () {
    return {
      placesList: [{
        id: 1,
        name: 'aa 1',
        lat: 44.0022,
        lng: 40.3304
      }]
    }
  },
  methods: {
    showPlace (place) {
      console.log(place)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
