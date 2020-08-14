<template v-if=state>
    <div>
      <h2>{{state["State/Territory"]}}</h2>
      <span class="meat-and-potatoes">
        <QA class="qa"
            v-for="(question, index) in questions"
            v-bind:key="index"
            :question=question.q
            :answer="state[question.a]"
            :link="state[question.link]"
        />
      </span>
    </div>
</template>

<script>
import QA from "@/components/QA";
export default {
  name: 'StateData',
  components: {QA},
  props: {
    state: {
      type: Object,
      required: false
    }
  },
  data: function(){
    return {
      questions: [
        {q: "Absentee voting", a: "Absentee Voting Status"},
        {q: "Absentee Ballot Application Deadline", a: "Absentee Application Deadline"},
        {q: "How to Apply for Absentee Ballot", a: "How to Apply for Absentee Ballot", link:"Application Link"},
        {q: "Absentee Ballot Voting Deadline", a: "Absentee Ballot Deadline"}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meat-and-potatoes {
  font-size: 24px;
}
.qa {
  display: block;
  margin-bottom: 25px;
}
</style>
