<template v-if=state>
    <div>
      <h2 class="bg-dark text-light">{{state["State/Territory"]}}</h2>
      <span class="meat-and-potatoes">
        <QA class="qa"
            v-for="(question, index) in questions"
            v-bind:key="index"
            :question=question.q
            :answer="state[question.a]"
            :link="state[question.link]"
        />

        <CountyInfo v-if=state :counties=counties class="align-items-center text-center "/>
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
      questions: [
        {q: "Registration Deadline", a: "Registration Deadline"},
        {q: "Absentee voting", a: "Absentee Voting Status"},
        {q: "Absentee Voting Requirements", a: "Absentee Voting Requirements"},
        {q: "Absentee Ballot Application Deadline", a: "Absentee Application Deadline"},
        {q: "How to Apply for Absentee Ballot", a: "How to Apply for Absentee Ballot", link:"Application Link"},
        {q: "Absentee Ballot Voting Deadline", a: "Absentee Ballot Deadline"},
        {q: "Ballot Drop Off Options", a: "Ballot Drop Off Options"},
        {q: "Can Someone Else Return Your Ballot?", a: "Can Someone Else Return Your Ballot?"},
        {q: "Early Voting Dates", a: "Early Voting Dates"},
      ]
    }
  },
  mounted() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.meat-and-potatoes {
  font-size: 24px;
}
h2 {
  text-align: center;
}

</style>
