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
  editPlace (place) {
    let placeInState = this.state.places.find(tmpPlace => {
      return tmpPlace.id === place.id
    })

    let index = this.state.places.indexOf(placeInState)

    this.state.places[index] = place

    this.state.places = [...this.state.places]
  },
  removePlace (placeId) {
    let placeInState = this.state.places.find(tmpPlace => {
      return tmpPlace.id === placeId
    })

    let index = this.state.places.indexOf(placeInState)

    this.state.places.splice(index, 1)

    this.state.places = [...this.state.places]
  },
  getPlaces () {
    return [...this.state.places]
  },
  changeSelectedPlace (newPlace) {
    this.state.selectedPlace = newPlace ? {...newPlace} : null
  },
  getSelectedPlace () {
    return this.state.selectedPlace ? {...this.state.selectedPlace} : null
  }
}
