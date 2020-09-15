<template>
  <div class="hello">
    <div id="stateSelector">
      <img alt="Be Safe and Vote" src="../assets/be_safe_and_vote.png">
      <h1>{{ msg }}</h1>
      <h2>Save Democracy!</h2>
    </div>
    <StateList></StateList>
  </div>
</template>

<script>
import StateList from "@/components/StateList";
export default {
  name: 'BallotDrop',
  components: {StateList},
  props: {
    msg: String,
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stateSelector{
  text-align: center;
}
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
