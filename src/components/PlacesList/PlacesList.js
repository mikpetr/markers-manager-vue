import store from '../../store'

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
