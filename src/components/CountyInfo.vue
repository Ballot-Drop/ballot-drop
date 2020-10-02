<template>
  <div>
    County info
    <select v-model="selectedCounty" v-bind:selected=selectedCounty @change="updateRouter()">
      <option
          v-for="(county, index) in counties"
          :key="index"
          :value="index"
      >{{ county["County"] }}
      </option>
    </select>
    <div v-if="selectedCounty">
      <h3 class="bg-dark text-light mt-3 mb-3">{{ counties[selectedCounty]["County"] }}</h3>
      <div v-if="anyData">
        <QA
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
      selectedCountyName: null,
    }
  },
  computed: {
    anyData: function () {
      return this.questions.some(qa => this.counties[this.selectedCounty][qa.a] !== undefined);
    },
    countyName: function(){
      if( ! this.selectedCounty ) return null;
      return this.counties[this.selectedCounty]["County"];
    },
    questions: function(){
      let questions = [
        {q: 'County Election Official', a: 'County Election Official'},
        {q: 'Office Address', a: 'County Election Office Address'},
        {q: 'Phone Number', a: 'County Election Office Phone Number'},
        {q: "Website", a: "County Election Office Website", link: "County Election Office Website"},
        {q: "County Election Office Hours of Operation", a: "County Election Office Hours of Operation (M-F)"},
        {q: "Ballot Drop Off Locations", a: "Are Ballot Drop Boxes Available?"},
        {q: "Where Can Absentee Ballots be Dropped Off?", a: "Where Can Absentee Ballots be Dropped Off?"},
      ];

      return questions.filter(question => this.counties[this.selectedCounty][question.a] !== undefined);
    }
  },
  methods: {
    updateRouter() {
      let state = this.$route.fullPath.split("/")[1];
      this.$router.push({path:`/${state}/${this.countyName.replace(/\s/g, "-")}`});

    },
    checkRoute(){
      // Check for county route
      if( this.$route.params.state !== undefined && this.$route.params.county !== undefined) {
        this.selectedStateName = this.$route.params.state.replace("-"," ");
        this.selectedCountyName = this.$route.params.county.replace("-", " ");
        let i=0;
        for(i; i<this.counties.length; i++) {
          if( this.counties[i]["County"] === this.selectedCountyName ) break;
        }
        // County doesn't exist as spelled
        if( i === this.counties.length ){
          this.selectedCounty = 0;
          let path = `/${this.$route.params.state}`
          this.$router.push({path: path});
        }
        else this.selectedCounty = i;
      }
      // Check for county route
    }
  },
  watch: {
    counties: function () {
      this.selectedCounty = 0;
      this.checkRoute()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
