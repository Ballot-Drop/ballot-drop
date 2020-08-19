<template>
  <div>
    <h3 v-if="locations">Ballot Drop Locations</h3>
    <table v-if="locations" cellpadding="3">
      <thead>
      <td>City</td>
      <td>Location Name</td>
      <td>Address</td>
      <td width=100>Zip</td>
      <td>Hours</td>
<!--      <td>Map</td>-->
      </thead>
      <tr v-for="(location, index) in locations" :key="index" >
        <td>{{location.City}}</td>
        <td>{{location.Name}}</td>
        <td>{{location.Address}}</td>
        <td>{{location.Zip}}</td>
        <td>{{location.Hours}}</td>
      </tr>
    </table>
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
      locations: null
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
#drop_box table {
  margin: 0 auto;
  text-align: left;
}


</style>
