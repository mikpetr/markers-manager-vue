export default {
  state: {
    places: [],
    selectedPlace: null
  },
  addPlace (place) {
    // Store properties must be immutable
    this.state.places = [
      ...this.state.places,
      {...place}
    ]
  },
  getPlaces () {
    return [...this.state.places]
  },
  changeSelectedPlace (newPlace) {
    this.state.selectedPlace = {...newPlace}
  },
  getSelectedPlace () {
    return this.state.selectedPlace ? {...this.state.selectedPlace} : null
  }
}
