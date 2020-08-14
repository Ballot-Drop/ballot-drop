<template>
  <div>
    County info
    <select v-model="selectedCounty">
      <option
          v-for="(county, index) in counties"
          :key="index"
          :value="index"
      >{{ county["County"] }}</option>
    </select>
    <div v-if="selectedCounty">
      <h3>{{counties[selectedCounty]["County"]}}</h3>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CountyInfo',
  props: {
    stateName: {
      type: String,
      required: true
    }

  },
  data: function(){
    return {
      counties: [],
      selectedCounty: null
    }
  },
  methods: {
    getCountyData() {
      const Airtable = require('airtable');
      const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
      const county_data = [];
      base('County Drop Off Information').select({
        filterByFormula: `State="${this.stateName}"`,
        sort: [
          {field: 'County', direction: 'asc'}
        ]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
          county_data.push(record.fields)
        });
        fetchNextPage();
      }, function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      });
      this.counties = county_data;

    }
  },
  mounted() {
    this.getCountyData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
