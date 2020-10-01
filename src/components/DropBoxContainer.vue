<template>
  <div>
    <div v-if="locations && locations.length">
      <h3>Ballot Drop Locations</h3>

      <GoogleMap
        id="map"
        v-if="locations"
        :locations="locations"
      />

      <b-row class="my-1 table-filter">
        <b-col sm="4">
          <label for="input-default">Filter the table:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input v-model="searchTerm" placeholder="Search Term"></b-form-input>
          <span class="mt-2">Value: {{ searchTerm }}</span>
        </b-col>
      </b-row>

      <div>
        <table class="table table-responsive table-striped table-hover mt-4 text-left w-auto">
          <thead class="thead-light">
            <tr>
              <th>City</th>
              <th>Location Name</th>
              <th>Address</th>
              <th width=100>Zip</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody v-if="filteredLocations && filteredLocations.length">
            <tr v-for="(location, index) in filteredLocations" :key="index">
              <td>{{location.City}}</td>
              <td>{{location.Name}}</td>
              <td>{{location.Address}}</td>
              <td>{{location.Zip}}</td>
              <td>{{location.Hours}}</td>
            </tr>
          </tbody>
          <tbody v-else>
            No cities match your search term
          </tbody>
        </table>
      </div>

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
        empty-text="No locations found"
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
          <h4>{{ scope.emptyText }}</h4>
        </template>

        <!-- show the empty-filtered-text if no locatiions match the search term-->
        <template v-slot:emptyfiltered="scope">
          <h4>{{ scope.emptyFilteredText }}</h4>
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
    <div v-else>
      Ballot drop off locations coming soon!
    </div>
  </div>
</template>

<script>
import GoogleMap from "@/components/Map";
import { AIRTABLE_API_KEY, AIRTABLE_BASE } from '@/config';

export default {
  components: {GoogleMap},
  name: 'DropBoxContainer',
  props: {
    county_fips: String,
  },
  data: function() {
    return {
      locations: null,
      searchTerm: "",

      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: ["City"],
      fields: [
        {
          key: 'City',
          label: 'City',
          filterByFormatted: true,
          sortable: true,
          sortDirection: 'desc',
        },
        { key: 'Name', label: 'Location Name' },
        { key: 'Address', label: 'Address' },
        { key: 'Zip', label: 'Zip' },
        { key: 'Hours', label: 'Hours' },
      ],
    }
  },
  methods: {
    getData() {
      const Airtable = require('airtable');
      const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE);
      const locations = [];
      base('Ballot Drop Off Locations').select({
        filterByFormula: `County="${this.county_fips}"`,
        sort: [
          {field: 'City', direction: 'asc'}
        ]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          locations.push(record.fields);
        });
        fetchNextPage();
      }, function done(err){
        if(err){console.error(err); return;}
      });
      this.locations = locations;
    }
  },
  watch: {
    county_fips: function() {
      this.getData();
    }
  },
  computed: {
    filteredLocations: function() {
      // get the locations with a city name that match the search term
      const searchTerm = this.searchTerm.toLowerCase();
      const filteredLocs = this.locations.filter(loc => loc.City.toLowerCase().includes(searchTerm));
      return filteredLocs;
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style scoped>

</style>
