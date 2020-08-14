<template>
  <div id="app">
    <img alt="Be Safe and Vote" src="./assets/be_safe_and_vote.png">
    <BallotDrop
        msg="Ballot Drop"
        :states=states
    />
  </div>
</template>

<script>

import BallotDrop from './components/BallotDrop.vue'
export default {
  name: 'App',
  components: {
    BallotDrop
  },
  data: function() {
    return {
      states: []
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      const Airtable = require('airtable');
      const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
      const state_data = [];
      base('State Absentee Voting Data').select({
        sort: [
          {field: 'State/Territory', direction:'asc'}
        ]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          state_data.push(record.fields);
        });
        fetchNextPage();
      }, function done(err){
        if(err){console.error(err); return;}
      });
      this.states = state_data;

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  min-height: 1200px;
}
</style>
