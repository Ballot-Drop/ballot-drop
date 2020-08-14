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
// import dotenv from 'dotenv';

// require('dotenv').config({ debug: process.env.DEBUG })
console.log(process.env.AIRTABLE_API_KEY);
// const config = dotenv.config()
// if(config.error){
//   console.log('Could not load env file', config.error)
// }
import BallotDrop from './components/BallotDrop.vue'
// import Airtable from 'airtable'
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
      console.log(process.env);
      const Airtable = require('airtable');
      const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
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
        console.log(state_data)
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
}
</style>
