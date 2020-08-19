<template>
  <div id="app" ref="main_app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <router-view/>

<!--    <img alt="Be Safe and Vote" src="./assets/be_safe_and_vote.png">-->
<!--    <BallotDrop-->
<!--        msg="Ballot Drop"-->
<!--        :states=states-->
<!--        v-model=router_state-->

<!--    />-->
  </div>
</template>

<script>

// import BallotDrop from './components/BallotDrop.vue'
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
      router_state: ""
    }
  },
  mounted() {
    console.log("App mounted")
    this.getData();
    // console.log(this.$route);
    // console.log(this.$router);
    // console.log(this.$route.params)
  },
  methods: {
    getData: function() {
      const Airtable = require('airtable');
      const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
      const state_data = [{},];
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

    },
    // loadState(){
    //   console.log('load state')
    //   console.log(this.router_state)
    //   this.router_state = "test";
    //   console.log(this.router_state)
    // }
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

.qa {
  display: block;
  margin-bottom: 25px;
}
</style>
