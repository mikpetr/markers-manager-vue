<template>
  <div class="map-container">
    <div class="map"></div>
    <div class="marker-name"
         v-if="selectedPlace"
         v-bind:style="{ top: selectedPlace.pointerPosition.y + 'px', left: selectedPlace.pointerPosition.x + 'px' }">
      <input type="text"
             v-model="selectedPlace.name"
             @keyup.enter="onEnter" />
    </div>
  </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps'
import store from '../store'

export default {
  name: 'Map',
  data () {
    return {
      map: null,
      marker: null,
      google: null,
      selectedPlace: null
    }
  },
  mounted () {
    let center

    const lat = 40.1808534
    const lng = 44.5188555
    const zoomLevel = 14

    GoogleMapsLoader.KEY = 'AIzaSyCwAp6FSvCk1sKaPSQJgThEEGM134-klvU'

    GoogleMapsLoader.load(google => {
      this.google = google

      center = new google.maps.LatLng(lat, lng)

      this.map = new google.maps.Map(this.$el.querySelector('.map'), {
        zoom: zoomLevel,
        center: center
      })

      this.marker = new this.google.maps.Marker({
        position: {
          lat: 0,
          lng: 0
        },
        map: null
      })

      this.map.addListener('click', this.addMarker)
    })
  },
  methods: {
    addMarker (e) {
      let pointerPosition

      if (e.pixel) {
        pointerPosition = {
          x: e.pixel.x,
          y: e.pixel.y
        }
      } else if (e.xa) {
        pointerPosition = {
          x: e.xa.layerX,
          y: e.xa.layerY
        }
      } else {
        return
      }

      this.selectedPlace = {
        id: null,
        name: null,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        pointerPosition
      }

      this.marker.setPosition({
        lat: this.selectedPlace.lat,
        lng: this.selectedPlace.lng
      })

      this.marker.setMap(this.map)
    },
    onEnter () {
      this.selectedPlace.id = (new Date()).getTime()
      store.addPlace(this.selectedPlace)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.map-container {
  position: relative;
}

.map {
  width: 100%;
  height: 400px;
}

.marker-name {
  position: absolute;
  z-index: 1;
  margin-left: -75px;
  margin-top: -70px;
}

.marker-name input {
  width: 150px;
  height: 24px;
  box-sizing: border-box;
}
</style>
