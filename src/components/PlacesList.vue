<template>
  <div>
    <h2>Places List</h2>
    <div>
      Search: <input v-model="filterText" type="text" />
    </div>
    <ul>
      <li v-for="place in filteredPlaces"
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
      store,
      filterText: null
    }
  },
  computed: {
    filteredPlaces () {
      if (!this.filterText) {
        return this.store.getPlaces()
      }

      return this.store.getPlaces().filter(place => {
        return place.name.indexOf(this.filterText) > -1
      }).sort((a, b) => {
        let aPos = a.name.indexOf(this.filterText)
        let bPos = b.name.indexOf(this.filterText)

        if (aPos < bPos) {
          return -1
        } else if (aPos > bPos) {
          return 1
        } else {
          return 0
        }
      })
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
<style lang="scss" scoped>
</style>
