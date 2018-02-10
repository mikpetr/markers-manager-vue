<template>
  <div>
    <div class="map-wrapper">
      <Map/>
    </div>
    <div class="places-list-wrapper">
      <PlacesList/>
    </div>
  </div>
</template>

<script>
import Map from './Map'
import PlacesList from './PlacesList'

export default {
  name: 'PlacesManager',
  components: {
    Map,
    PlacesList
  },
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.map-wrapper {
  float: left;
  width: 65%;
}

.places-list-wrapper {
  float: left;
  width: 35%;
}
</style>
