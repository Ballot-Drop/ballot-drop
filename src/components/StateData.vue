<template v-if=state>
    <div>
      <h2>{{state.name}}</h2>
      <span class="meat-and-potatoes">
        Your election official accepts ballots from <span id="timeStart">{{state.start_time}}</span>-<span id="timeEnd">{{state.end_time}}</span> at <span id="address"></span>.
        Drop off boxes are located at <span id="url">{{state.locations_link}}</span>.</span>
    </div>
</template>

<script>
export default {
  name: 'StateData',
  props: {
    state: {
      type: Object,
      required: false
    }
  },
  data: function(){
    return {
      // selectedState: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meat-and-potatoes {
  font-size: 24px;
}
/*h3 {*/
/*  margin: 40px 0 0;*/
/*}*/
/*ul {*/
/*  list-style-type: none;*/
/*  padding: 0;*/
/*}*/
/*li {*/
/*  display: inline-block;*/
/*  margin: 0 10px;*/
/*}*/
/*a {*/
/*  color: #42b983;*/
/*}*/
</style>
