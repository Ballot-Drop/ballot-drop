<template>
  <div class="hello">
    <div id="stateSelector" class="text-center">
      <picture>
        <source srcset="@/assets/be_safe_and_vote.webp" type="image/webp" class="img-fluid" />
        <source srcset="@/assets/be_safe_and_vote.jpg" type="image/jpeg" class="img-fluid" />
        <img src="@/assets/be_safe_and_vote.jpg" alt="Be Safe and Vote" class="img-fluid" />
      </picture>
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
