<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Save Democracy!</h2>
    <StateList :states=states></StateList>
  </div>
</template>

<script>
import StateList from "@/components/StateList";
export default {
  name: 'BallotDrop',
  components: {StateList},
  props: {
    msg: String,
    states: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
