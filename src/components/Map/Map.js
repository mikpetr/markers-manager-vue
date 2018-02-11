import GoogleMapsLoader from 'google-maps'
import store from '../../store'

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
    this.$watch(() => this.store.getSelectedPlace(), place => {
      if (place) {
        this.showPlace(place)
      } else {
        this.clearMap()
      }
    })
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
