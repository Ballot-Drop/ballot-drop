<template>
  <div>
    Worried about the post office delivering your ballot on time?<br />
    Pick your state:
    <select v-model="selectedState" @change="getCountyData()">
      <option
          v-for="(state, index) in states"
          :key="index"
          :value="index"
      >{{ state["State/Territory"] }}</option>
    </select>
    <hr />
    <StateData
        v-if="selectedState"
        :state=states[selectedState]
        :counties="counties"
    />
  </div>
</template>

<script>
import StateData from "@/components/StateData";
export default {
  name: 'StateList',
  components: {StateData},
  props: {
    states: {
      type: Array,
      required: true
    }
  },
  data: function(){
    return {
      selectedState: null,
      counties: [{},],
    }
  },
  methods: {
    getCountyData() {
      const Airtable = require('airtable');
      const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
      const county_data = [{}, ];
      base('County Local Election Information').select({
        filterByFormula: `State="${this.states[this.selectedState]['State/Territory']}"`,
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meat-and-potatoes {
  font-size: 24px;
}
</style>
