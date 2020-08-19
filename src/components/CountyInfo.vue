<template>
  <div>
    County info
    <select v-model="selectedCounty" v-bind:selected=selectedCounty>
      <option
          v-for="(county, index) in counties"
          :key="index"
          :value="index"
      >{{ county["County"] }}
      </option>
    </select>
    <div v-if="selectedCounty">
      <h3>{{ counties[selectedCounty]["County"] }}</h3>
      <div v-if="anyData">
        <QA class="qa"
            v-for="(question, index) in questions"
            v-bind:key="index"
            :question=question.q
            :answer="counties[selectedCounty][question.a]"
            :link="counties[selectedCounty][question.link]"
        />

      </div>
      <span v-else>{{ counties[selectedCounty]['County'] }} info coming soon!</span>
      <DropBoxContainer
          id="drop_box"
          v-if="selectedCounty"
          :county_fips="counties[selectedCounty]['Area FIPS']"
      />
    </div>

  </div>
</template>

<script>
import QA from "@/components/QA"
import DropBoxContainer from "@/components/DropBoxContainer";

export default {
  name: 'CountyInfo',
  components: {QA, DropBoxContainer},
  props: {
    counties: {
      type: Array,
      required: true
    }

  },
  data: function () {
    return {
      selectedCounty: null,
      questions: [
        {q: 'Local Election Official', a: 'Local Election Official'},
        {q: 'Office Address', a: 'Local Election Office Address'},
        {q: 'Phone Number', a: 'Local Election Office Phone Number'},
        {q: "Website", a: "Local Election Office Website", link: "Local Election Office Website"},
        {q: "Ballot Drop Off Locations", a: "Ballot Drop Off Locations"},
        {q: "Early Voting Locations", a: "Early Voting Locations"},
      ],
    }
  },
  computed: {
    anyData: function () {
      return this.questions.some(qa => this.counties[this.selectedCounty][qa.a] !== undefined);
    }
  },
  methods: {},
  watch: {
    counties: function () {
      this.selectedCounty = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
