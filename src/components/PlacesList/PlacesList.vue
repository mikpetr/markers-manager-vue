<template>
  <div>
    <h2>Places List</h2>
    <div>
      Search: <input v-model="filterText" type="text" />
    </div>
    <ul>
      <li v-for="place in filteredPlaces"
          v-bind:key="place.id"
          v-on:click="showPlace(place)">
        {{place.name}}
      </li>
    </ul>
  </div>
</template>

<script src="./PlacesList.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
