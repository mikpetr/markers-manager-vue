<template>
  <div class="map"></div>
</template>

<script>
import GoogleMapsLoader from 'google-maps'

export default {
  name: 'Map',
  mounted () {
    let map
    let center

    const lat = 40.1808534
    const lng = 44.5188555
    const zoomLevel = 14

    GoogleMapsLoader.KEY = 'AIzaSyCwAp6FSvCk1sKaPSQJgThEEGM134-klvU'

    GoogleMapsLoader.load(google => {
      center = new google.maps.LatLng(lat, lng)

      map = new google.maps.Map(this.$el, {
        zoom: zoomLevel,
        center: center
      })

      map.addListener('click', e => {
        let newPlace = {
          id: null,
          name: null,
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }

        console.log(newPlace)
      })
    })

    GoogleMapsLoader.onLoad(() => {
      console.log('Map initialized')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
