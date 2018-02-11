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

<script src="./Map.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./map.scss" lang="scss" scoped></style>
