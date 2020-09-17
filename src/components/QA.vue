<template>
  <div class="row mb-5 align-items-center">
    <div class="question col-4 text-right font-weight-bold">{{question}}</div>
    <div class="answer col-8 text-left">
      <a v-if="link" :href="link">{{answer}}</a>
      <span v-else>{{answer}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QA',
  props: {
    question: String,
    answer: String,
    link: {type: String, required: false}
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


</style>
