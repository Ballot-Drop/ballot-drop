<template>
  <div>
    <span class="question">{{question}}</span>
    <span class="answer">
      <a v-if="link" :href="link">{{answer}}</a>
      <span v-else>{{answer}}</span>
    </span>
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
.question, .answer {
  display: block;
}
.question {
  font-weight: bold;
}

</style>
