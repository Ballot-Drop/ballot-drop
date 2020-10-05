<template>
  <div>
    <div v-if="locations && locations.length">
      <h3>Ballot Drop Locations</h3>

      <GoogleMap
        id="map"
        v-if="locations"
        :closestMarkerIndex="closestMarkerIndex"
        :currentPosition="currentPosition"
        :locations="locations"
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
      </b-table>
    </div>
  </div>
</template>

<script>
import { airtable } from '@/airtable';
import GoogleMap from "@/components/Map";

export default {
  components: {GoogleMap},
  name: 'DropBoxContainer',
  props: {
    county_fips: String,
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

            this.findClosestMarker();
          }
        );
      } else {
        // Browser doesn't support Geolocation
        return;
      }
    },
    // async getClosestLocation() {
    //   let closestMarkerIndex = -1;
    //   let closestDistance = Number.MAX_VALUE;

    //   for (let [index, loc] of this.locations.entries()) {
    //     console.log("loc: ", loc.lat, loc.lng);
    //     let locationCoords = new window.google.maps.LatLng({
    //       lat: parseFloat(loc.lat),
    //       lng: parseFloat(loc.lng),
    //     });

    //     let currentPositionCoords = new window.google.maps.LatLng({ 
    //       lat: this.currentPosition.lat, 
    //       lng: this.currentPosition.lng
    //     });

    //     let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
    //       currentPositionCoords,
    //       locationCoords,
    //     );

    //     if (distance < closestDistance) {
    //       console.log("closer: ", distance, loc);

    //       closestMarkerIndex = index;
    //       closestDistance = distance;


    //     }
    //   }
    // },
    findClosestMarker() {
      if (!this.currentPosition || !this.currentPosition.lat || !this.currentPosition.lng) {
        console.log("no currentPosition: ", this.currentPosition);
        return;
      }

      if (!this.locations) {
        console.log("no locations: ", this.locations.length);
        return;
      }

      if (!window.google) {
        console.log("window.google: ", window.google);
        return;
      }

      console.log("currentPosition: ", this.currentPosition);

      // console.log("window.gooogle: ", window.google);

      let currentPositionCoords = new window.google.maps.LatLng({
        lat: this.currentPosition.lat,
        lng: this.currentPosition.lng
      });

      console.log("currentPositionCoords: ", currentPositionCoords);

      // let res = this.locations.reduce(function (prev, loc) {
      //   let locationCoords = new window.google.maps.LatLng({
      //     lat: parseFloat(loc.lat),
      //     lng: parseFloat(loc.lng),
      //   });

      //   var cpos = google.maps.geometry.spherical.computeDistanceBetween(currentPositionCoords, locationCoords);
      //   var ppos = google.maps.geometry.spherical.computeDistanceBetween(currentPositionCoords, prev.position);

      //   return cpos < ppos ? curr : prev;
      // });

      let closestMarkerIndex = -1;
      let closestDistance = Number.MAX_VALUE;

      for (let [index, loc] of this.locations.entries()) {
        console.log("loc: ", loc.lat, loc.lng);
        let locationCoords = new window.google.maps.LatLng({
          lat: parseFloat(loc.lat),
          lng: parseFloat(loc.lng),
        });

        let currentPositionCoords = new window.google.maps.LatLng({ 
          lat: this.currentPosition.lat, 
          lng: this.currentPosition.lng
        });

        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          currentPositionCoords,
          locationCoords,
        );

        if (distance < closestDistance) {
          console.log("closer: ", distance, loc);

          closestMarkerIndex = index;
          closestDistance = distance;
        }
      }

      console.log("closestMarkerIndex ", closestMarkerIndex);
      console.log("closestDistance ", closestDistance);

      console.log("closestMarker ", this.locations[closestMarkerIndex]);
      this.closestMarkerIndex = closestMarkerIndex;
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
            const formattedRecord = this.formatData(record.fields);
            locations.push(formattedRecord);
          });
          fetchNextPage();
        }, function done(err){
          if(err){console.error(err); return;}
        });

      this.locations = locations;
    },
    formatData(record) {
      const formattedRecord = {...record};
      formattedRecord.City = this.titleCase(record.City);
      formattedRecord.Address = this.titleCase(record.Address);
      formattedRecord.Name = this.titleCase(record.Name);
      return formattedRecord;
    },
    titleCase(str) {
      return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
          }).join(' ');
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
