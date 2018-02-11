export default {
  state: {
    places: [],
    selectedPlace: null
  },
  findPlaceIndex (placeId) {
    let placeInState = this.state.places.find(tmpPlace => {
      return tmpPlace.id === placeId
    })

    return this.state.places.indexOf(placeInState)
  },
  addPlace (place) {
    // Store properties must be immutable
    this.state.places = [
      ...this.state.places,
      {...place}
    ]
  },
  editPlace (place) {
    this.state.places[this.findPlaceIndex(place.id)] = place

    this.state.places = [...this.state.places]
  },
  removePlace (placeId) {
    this.state.places.splice(this.findPlaceIndex(placeId), 1)

    this.state.places = [...this.state.places]
  },
  togglePlaceVisitedState (placeId) {
    let place = this.state.places.find(tmpPlace => {
      return tmpPlace.id === placeId
    })

    place.isVisited = !place.isVisited

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
