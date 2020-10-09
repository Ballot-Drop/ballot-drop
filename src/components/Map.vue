<template>
  <div>
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 100vh;"
      @click="closeInfoWindows()"
    >
      <!-- this marker will show the closest marker to the user's location if known -->
      <gmap-marker
        key="closestLocation"
        v-if="closestLocation"
        :position="{lat: parseFloat(closestLocation.lat), lng: parseFloat(closestLocation.lng)}"
        :icon="closestMarkerIcon"
        @click="toggleInfoWindow(closestLocation, closestMarkerIndex)"
      />

      <gmap-marker
        :key="index"
        :position="{lat: parseFloat(loc.lat), lng: parseFloat(loc.lng)}"
        v-for="(loc, index) in otherLocations"
        @click="toggleInfoWindow(loc, index)"
        :icon="regularMarkerIcon"
      />

      <!-- this marker will show the user's location on the map (if the location is know and it fits in the map's bounds) -->
      <gmap-marker
        key="currentPosition"
        v-if="currentPosition"
        :position="{lat: parseFloat(currentPosition.lat), lng: parseFloat(currentPosition.lng)}"
        :icon="currentPositionIcon"
      />

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>

export default {
  name: 'GoogleMap',
  components: {},
  props: {
    closestMarkerIndex: {
      type: Number,
    },
    currentPosition: {
      type: Object,
    },
    locations: {
      type: Array,
      required: true
    },
  },
  data: function() {
    return {
      //a default center for the map
      center: {lat: 39.7392, lng: -104.9903},
      map: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      closestMarkerIcon: { url: require("@/assets/blue-dot.png") },
      currentPositionIcon: { url: require("@/assets/green-dot.png") },
      regularMarkerIcon: { url: require("@/assets/red-dot.png") },
    }
  },
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = {lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)};
      this.infoContent = this.getInfoWindowContent(marker);

      //check if it's the same marker that was selected. if yes, toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getInfoWindowContent: function(marker) {
      let directions = [
        marker.Address.replaceAll(" ", "+"),
        marker.City.replaceAll(" ", "+"),
        marker.['State (from County Absentee Voting Data)'],
        marker.Zip,
      ].join("+");

      return (`
        <div class="">
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <strong>${marker.Name}</strong>
              </div>
            </div>
            <div class="content">
              ${marker.Address} <br />
              ${marker.City}, ${marker.['State (from County Absentee Voting Data)']} ${marker.Zip}<br />
              <a href="https://www.google.com/maps?daddr=${directions}" target="_blank">
                Get directions
              </a>
              <hr />
              Hours: ${marker.Hours.replaceAll("\n", "<br />",)}
            </div>
          </div>
        </div>`
      );
    },

    closeInfoWindows: function() {
      this.infoWinOpen = false;
    }
  },
  computed: {
    closestLocation: function() {
      if (this.locations.length && this.closestMarkerIndex > -1) {
        return this.locations[this.closestMarkerIndex];
      }
      return null;
    },
    otherLocations: function() {
      // this is for all locations that are not the closest one to the user's geolocation
      if (this.closestMarkerIndex > -1) {
        return this.locations.filter((loc, i) => i !== this.closestMarkerIndex);
      }
      // there was not a closest location, so return all locations
      return this.locations;
    },
  },
  mounted() {
    this.$refs.gmap.$mapPromise.then((map) => {
      const bounds = new window.google.maps.LatLngBounds()
      for (let m of this.locations) {
        bounds.extend({lat: parseFloat(m.lat), lng: parseFloat(m.lng)})
      }
      map.fitBounds(bounds);

      // Deal with zoom delay on load
      setTimeout(function() {
        if (map.getZoom() > 18) {
          map.setZoom(16);
        }
      }, 100);

      // any time the map is (re)rendered, emit the `findNearestMarker` event to find the nearest marker
      this.$emit("findNearestMarker");
    });
  }
}
</script>

<style scoped>

</style>
