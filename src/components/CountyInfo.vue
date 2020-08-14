<template>
  <div>
    County info
    <select v-model="selectedCounty" v-bind:selected=selectedCounty>
      <option
          v-for="(county, index) in counties"
          :key="index"
          :value="index"
      >{{ county["County"] }}</option>
    </select>
    <div v-if="selectedCounty">
      <h3>{{counties[selectedCounty]["County"]}}</h3>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CountyInfo',
  props: {
    counties: {
      type: Array,
      required: true
    }

  },
  data: function(){
    return {
      selectedCounty: null
    }
  },
  methods: {

  },
  watch: {
    counties: function(){
      this.selectedCounty = 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
