<template>
  <div class="map-legend mb-2 mt-2 p-2">
    <div class="legend-icon your-location-icon">
      <img src="@/assets/green-dot.png" alt="your location (green) icon" class="icon" />
      <span class="description">your location</span>
    </div>
    <div class="legend-icon closest-dropbox-icon">
      <img src="@/assets/blue-dot.png" alt="closest dropbox (blue) icon" class="icon" />
      <span class="description">closest dropbox</span>
    </div>
    <div class="legend-icon dropbox-icon">
      <img src="@/assets/red-dot.png" alt="dropbox (red) icon" class="icon" />
      <span class="description">dropbox</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapLegend',
}
</script>

<style scoped>
.description {
  font-size: 0.9rem;
  font-weight: bold;
}

.map-legend {
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  border: 1px solid #343a40;
}

@media only screen and (max-width: 400px) {
  .legend-icon {
    text-align: center;
  }
  .description {
    display: block;
    font-size: 0.8rem;
  }
}

/* 
in-map legend
.map-legend {
  background-color: white;
  position: absolute;
  right: 10px;
  top: 50px;
  width: 160px;
  z-index: 20000;
} */
</style>
