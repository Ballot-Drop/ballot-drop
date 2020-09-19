<template>
  <div>
    <h3 v-if="locations">Ballot Drop Locations</h3>
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
</template>

<script>
export default {
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
      const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
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
