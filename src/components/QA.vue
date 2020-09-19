<template>
  <div class="row mb-5 align-items-center">
    <div class="question col-sm-4 text-xs-left text-sm-right font-weight-bold">{{question}}</div>
    <div class="answer col-sm-8 text-left">
      <a v-if="link" :href="link">{{answer}}</a>
      <span v-else-if="question === 'Office Address'" v-html="mapped_answer"></span>
      <span v-else v-html="linked_answer"></span>
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
  },
  computed: {
    linked_answer: function(){
      return this.answer.replace(/(http.*)\b/, "<a href='$1'>$1</a>")
    },
    mapped_answer: function(){
      return `<a href='https://maps.google.com/?q=${this.answer.replaceAll(" ", "+")}' target="_blank">
                    ${this.answer} <small>map</small></a>`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
