<template>
  <div class="map-container">
    <div class="map"></div>
    <div class="marker-name"
         v-if="selectedPlace"
         v-bind:style="{ top: selectedPlace.pointerPosition.y + 'px', left: selectedPlace.pointerPosition.x + 'px' }"
         v-bind:class="{ 'read-only': selectedPlace.readOnly }">
      <div v-if="selectedPlace.readOnly" class="name-wrapper">
        {{selectedPlace.name}}
        <i class="edit-icon" @click="editPlace"></i>
      </div>
      <div v-else>
        <div>
          <input type="text"
                v-model="selectedPlace.name"
                @keyup.enter="savePlace" />
        </div>
        <div class="controls">
          <button @click="savePlace">Save</button>
          <button @click="clearMap">Close</button>
        </div>
      </div>
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
      store,
      map: null,
      marker: null,
      google: null,
      selectedPlace: null
    }
  },
  created () {
    this.$watch(() => this.store.getSelectedPlace(), this.showPlace)
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

      this.map.addListener('click', this.onMapClick)
    })
  },
  methods: {
    showPlace (place, readOnly) {
      this.selectedPlace = place
      this.selectedPlace.readOnly = typeof readOnly !== 'undefined' ? readOnly : true
      this.setMarker(place.markerPosition)
    },
    clearMap () {
      this.selectedPlace = null
      this.marker.setMap(null)
    },
    setMarker (position) {
      this.marker.setPosition(position)
      this.marker.setMap(this.map)
    },
    onMapClick (e) {
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

      const newPlace = {
        id: null,
        name: null,
        markerPosition: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        },
        pointerPosition
      }

      this.showPlace(newPlace, false)
    },
    savePlace () {
      if (this.selectedPlace.id) {
        // editing
        this.store.editPlace(this.selectedPlace)
      } else {
        // create new place
        this.selectedPlace.id = (new Date()).getTime()
        this.store.addPlace(this.selectedPlace)
      }

      this.clearMap()
    },
    editPlace () {
      this.selectedPlace.readOnly = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.map-container {
  position: relative;

  .map {
    width: 100%;
    height: 400px;
  }

  .marker-name {
    position: absolute;
    z-index: 1;
    margin-left: -75px;
    margin-top: -90px;
    width: 150px;

    &.read-only {
      margin-top: -70px;
      text-align: center;
    }

    .name-wrapper {
      position: relative;

      &:hover {
        .edit-icon {
          display: block;
        }
      }

      .edit-icon {
        position: absolute;
        top: 0;
        right: 0;
        display: none;
        background-image: url('../assets/edit-icon.png');
        background-size: cover;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }

    input {
      width: 100%;
      height: 24px;
      box-sizing: border-box;
    }

    .controls {
      display: flex;

      button {
        width: 50%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
