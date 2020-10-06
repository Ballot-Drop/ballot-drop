<template v-if=state>
  <div>
    <h2 class="bg-dark text-light text-center">Ballot information for {{state["State/Territory"]}}</h2>
    <span class="info-section">
      <QA
        v-for="(question, index) in questions"
        v-bind:key="index"
        :question=question.q
        :answer="state[question.a]"
        :link="state[question.link]"
      />

      <CountyInfo v-if=state :counties=counties class="align-items-center"/>
    </span>
  </div>
</template>

<script>
import QA from "@/components/QA";
import CountyInfo from "@/components/CountyInfo";

export default {
  name: 'StateData',
  components: {QA, CountyInfo},
  props: {
    state: {
      type: Object,
      required: false
    },
    counties: {
      type: Array,
      required: false
    }
  },
  data: function(){
    return {

    }
  },
  computed: {
    questions: function(){
      let questions = [
        {q: "Registration Deadline", a: "Registration Deadline"},
        {q: "Absentee voting", a: "Absentee Voting Status"},
        {q: "Absentee Voting Requirements", a: "Absentee Voting Requirements"},
        {q: "Absentee Ballot Application Deadline", a: "Absentee Application Deadline"},
        {q: "How to Apply for Absentee Ballot", a: "How to Apply for Absentee Ballot", link:"Application Link"},
        {q: "Absentee Ballot Voting Deadline", a: "Absentee Ballot Deadline"},
        {q: "Ballot Drop Off Options", a: "Ballot Drop Off Options"},
        {q: "Can Someone Else Return Your Ballot?", a: "Can Someone Else Return Your Ballot?"},
        {q: "Early Voting Dates", a: "Early Voting Dates"},
      ];

      return questions.filter(question => this.state[question.a] !== undefined);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info-section {
  font-size: 1.5rem;
}
</style>
