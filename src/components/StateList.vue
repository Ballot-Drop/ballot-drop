<template>
  <div>
    Worried about the post office delivering your ballot on time?<br />
    Pick your state:
    <select v-model="selectedState">
      <option
          v-for="state in states"
          :key="state.id"
          :value="state.id"
      >{{ state.name }}</option>
    </select>
    <hr />
    <StateData v-if="selectedState" :state=states[selectedState]></StateData>
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
      selectedState: null
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
