<template>
  <div>
    Worried about the post office delivering your ballot on time?<br />
    Pick your state:
    <select v-model="selectedState">
      <option
          v-for="(state, index) in states"
          :key="index"
          :value="index"
      >{{ state["State/Territory"] }}</option>
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
</style>
