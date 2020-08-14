<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
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
      states: [
        {id: 0, name:"", start_time:"", end_time:"", locations_link:""},
        {id: 1, name:"Alabama", start_time:"4pm", end_time:"6pm", locations_link:"alabama_url"},
        {id: 2, name: "Colorado", start_time:"12am", end_time:"12am", locations_link:"colorado_url"}
        ]
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      console.log('got data');
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
