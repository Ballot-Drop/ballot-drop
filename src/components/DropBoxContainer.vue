<template>
  <div>
    <div v-if="locations && locations.length">
      <h3>Ballot Drop Locations in {{ county_name }}</h3>

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

      <b-table
        :items="locations"
        :fields="fields"
        :filter="filter"
        :filter-included-fields="filterOn"
        empty-text="Ballot drop off locations coming soon!"
        empty-filtered-text="No locations match that search term"
        hover
        responsive="sm"
        show-empty
        small
        striped
        text-left
      >
        <!-- show the empty-text if no locatiions -->
        <template v-slot:empty="scope">
          <h4 class="text-center">{{ scope.emptyText }}</h4>
        </template>

        <!-- show the empty-filtered-text if no locatiions match the search term-->
        <template v-slot:emptyfiltered="scope">
          <h4 class="text-center">{{ scope.emptyFilteredText }}</h4>
        </template>

        <!-- display the table when it has location data -->
        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>

        <template #cell(Name)="data">
          {{ titleCase(data.item.Name) }}
        </template>
        <template #cell(City)="data">
          {{ titleCase(data.item.City) }}
        </template>
        <template #cell(Address)="data">
          {{ titleCase(data.item.Address) }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import { airtable } from '@/airtable';
import GoogleMap from "@/components/Map";

export default {
  components: {GoogleMap},
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
      filterOn: ["City"],
      fields: [
        {
          key: 'City',
          label: 'City',
          filterByFormatted: true,
        },
        { key: 'Name', label: 'Location Name' },
        { key: 'Address', label: 'Address' },
        { key: 'Zip', label: 'Zip' },
        { key: 'Hours', label: 'Hours' },
      ],
    }
  },
  methods: {
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
    findClosestMarker() {
      console.log("called findClosestMarker");

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
          console.log("no locations: ", this.locations.length);
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

        console.log("closestMarkerIndex ", closestMarkerIndex);
        console.log("closestDistance ", closestDistance);

        console.log("closestMarker ", this.locations[closestMarkerIndex]);
        this.closestMarkerIndex = closestMarkerIndex;
      });
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
    titleCase(str) {
      if (str)
        return str.toLowerCase().split(' ').map(function(word) {
          return word.replace(word[0], word[0].toUpperCase());
            }).join(' ');
    }
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
