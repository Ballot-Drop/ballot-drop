<template>
  <div>
    <div v-if="locations && locations.length">
      <h3>Ballot Drop Locations</h3>

      <GoogleMap
          id="map"
          v-if="locations"
          :locations="locations"
      />


        <div class="table-responsive">
        <table v-if="locations" class="table table-responsive table-striped table-hover mt-4 text-left">
          <thead class="thead-light">
            <tr>
              <th>City</th>
              <th>Location Name</th>
              <th>Address</th>
              <th width=100>Zip</th>
              <th>Hours</th>
    <!--      <td>Map</td>-->
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="(location, index) in locations" :key="index" >
              <td>{{location.City}}</td>
              <td>{{location.Name}}</td>
              <td>{{location.Address}}</td>
              <td>{{location.Zip}}</td>
              <td>{{location.Hours}}</td>
            </tr>
          </tbody>
        </table>
        </div>
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
  data: function(){
    return {
      locations: null,
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
  mounted() {
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
