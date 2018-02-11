<template>
  <div>
    <h2>Places List</h2>
    <div>
      Search: <input v-model="filterText" type="text" />
    </div>
    <ul class="places-list">
      <li v-for="place in filteredPlaces"
          v-bind:key="place.id"
          v-on:click="showPlace(place)">
        {{place.name}}

        <i class="icon remove"
           @click.stop="removePlace(place.id)"></i>
        <i class="icon"
           @click.stop="toggleVisitedState(place.id)"
           v-bind:class="{ star: place.isVisited, 'empty-star': !place.isVisited }"></i>
      </li>
    </ul>
  </div>
</template>

<script src="./PlacesList.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./places-list.scss" lang="scss" scoped></style>
