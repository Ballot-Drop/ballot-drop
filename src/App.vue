<template>
  <div id="app" ref="main_app" class="container">
    <div id="nav" class="text-center">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link>
    </div>
    <router-view/>
    <div id="footer">
    </div>
  </div>
</template>

<script>
import { airtable } from '@/airtable';

export default {
  name: 'App',
  components: {
    // BallotDrop
  },
  props: {
    state_route: {type: String, required: false},
    county_route: {type: String, required: false},
  },
  data: function() {
    return {
      states: [],
    }
  },
  mounted() {
    // this.getData();
  },
  methods: {
    getData: function() {
      // todo: not currently in use
      const base = airtable();

      const stateData = [{}];

      base('State Absentee Voting Data')
        .select({
          sort: [
            {field: 'State/Territory', direction:'asc'}
          ]
        })
        .eachPage(function page(records, fetchNextPage) {
          records.forEach(function(record) {
            stateData.push(record.fields);
          });
          fetchNextPage();
        }, function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        });

      this.states = stateData;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  margin-bottom: 25px;
}
#footer {
  min-height: 50px;
  margin-top: 50px;
}
</style>
