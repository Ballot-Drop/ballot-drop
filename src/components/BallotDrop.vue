<template>
  <div class="hello">
    <div id="stateSelector" class="text-center">
      <img alt="Be Safe and Vote" src="../assets/be_safe_and_vote.webp" class="img-fluid">
      <h1>{{ msg }}</h1>
      <h2>Save Democracy!</h2>
    </div>
    <StateList />
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
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
