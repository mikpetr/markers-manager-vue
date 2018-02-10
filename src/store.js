export default {
  state: {
    places: []
  },
  addPlace (place) {
    // Store properties must be immutable
    this.state.places = [
      ...this.state.places,
      {...place}
    ]
  },
  getPlaces () {
    return this.state.places
  }
}
