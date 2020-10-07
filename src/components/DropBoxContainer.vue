<template>
  <div>
    <div v-if="locations && locations.length">
      <h3>Ballot Drop Locations in {{ county_name }}</h3>


      <p v-if="place">selected location: {{ place.formatted_address }}</p>
      <p v-if="place">place: {{ place.geometry.location }}</p>

      <b-form-group
        label="Enter your address"
        label-size="md"
        label-cols="auto"
        class="mb-2 mt-4"
      >
        <b-input-group size="md">
          <GmapAutocomplete
            @place_changed="setPlace"
            class="form-control"
            :options="{ fields: ['geometry', 'formatted_address', 'address_components'] }"
          />
          <!-- <b-input-group-append>
            <b-button @click="setPlace">Use address</b-button>
          </b-input-group-append> -->
        </b-input-group>
      </b-form-group>

      <GoogleMap
        id="map"
        v-if="locations"
        :closestMarkerIndex="closestMarkerIndex"
        :currentPosition="currentPosition"
        :locations="locations"
        @findNearestMarker="findClosestMarker"
      />

      <b-form-group
        label="Filter By City"
        label-size="md"
        label-for="filterInput"
        label-cols="auto"
        class="mb-2 mt-4"
      >
        <b-input-group size="md">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to Search"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <LocationTable
        :filter="filter"
        :locations="locations"
      />
    </div>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import { airtable } from '@/airtable';
import LocationTable from '@/components/LocationTable';
import GoogleMap from "@/components/Map";

export default {
  components: {GoogleMap, LocationTable},
  name: 'DropBoxContainer',
  props: {
    county_fips: String,
    county_name: String,
  },
  data: function() {
    return {
      closestMarkerIndex: null,
      currentPosition: null,
      locations: null,
      filter: null,
      place: null,
    }
  },
  methods: {
    findClosestMarker() {
      this.$nextTick(() => {
        let gmaps = gmapApi()?.maps;

        if (!gmaps) {
          console.error("error loading the gmaps library: ", gmaps);
          return;
        }

        if (!this.currentPosition || !this.currentPosition.lat || !this.currentPosition.lng) {
          console.error("no currentPosition: ", this.currentPosition);
          return;
        }

        if (!this.locations) {
          return;
        }

        let currentPositionCoords = new gmaps.LatLng({
          lat: this.currentPosition.lat,
          lng: this.currentPosition.lng
        });

        let closestMarkerIndex = -1;
        let closestDistance = Number.MAX_VALUE;

        // compare the distance from the user's location to each of the dropboxes (markers)
        for (let [index, loc] of this.locations.entries()) {
          let locationCoords = new gmaps.LatLng({
            lat: parseFloat(loc.lat),
            lng: parseFloat(loc.lng),
          });

          let distance = gmaps.geometry.spherical.computeDistanceBetween(
            currentPositionCoords,
            locationCoords,
          );

          if (distance < closestDistance) {
            closestMarkerIndex = index;
            closestDistance = distance;
          }
        }

        this.closestMarkerIndex = closestMarkerIndex;
      });
    },
    getCurrentPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentPosition = { 
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            // the user could consent to using their geolocation after the map and markers have already rendered.
            // because of this, we need to call `findClosestMarker` after they give consent to use their geolocation
            // so the map will rerender with the updated `closestMarkerIndex` and `currentPosition` props
            this.findClosestMarker();
          }
        );
      } else {
        // Browser doesn't support Geolocation
        return;
      }
    },
    getData() {
      const locations = [];

      const base = airtable();

      base('Ballot Drop Off Locations')
        .select({
          filterByFormula: `County="${this.county_fips}"`,
          sort: [
            {field: 'City', direction: 'asc'}
          ]
        })
        .eachPage((records, fetchNextPage) => {
          records.forEach((record) => {
            locations.push(record.fields);
          });
          fetchNextPage();
        }, function done(err){
          if(err){console.error(err); return;}
        });

      this.locations = locations;
    },
    setPlace(place) {
      // set the place and the currentPosition coordinates
      this.place = place;
      this.currentPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }

      console.log("this.place: ", this.place);
      this.findClosestMarker();
    },
  },
  watch: {
    county_fips: function() {
      this.getData();
    }
  },
  mounted() {
    this.getData();

    this.getCurrentPosition();
  }
}
</script>

<style scoped>

</style>
