
<template>
  <div>
    <gmap-map
        ref="gmap"
        :center="center"
        :zoom="12"
        style="width:100%;  height: 100vh;"
    >

      <gmap-marker
          :key="index"
          v-for="(m, index) in locations"
          :position="m.position"
          @click="toggleInfoWindow(m,index)">
      </gmap-marker>

      <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>

    </gmap-map>
  </div>
</template>

<script>



export default {
  name: 'GoogleMap',
  props: {
    county_fips: String,
  },
  data: function(){
    return {
      locations: null,

      //a default center for the map
      center: {lat: 52.511950, lng: 6.089625},  // todo: update dynamically
      map: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }


      }
    }
  },
  methods: {

    getData() {
      const Airtable = require('airtable');
      const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
      const locations = [];
      base('Ballot Drop Off Locations').select({
        filterByFormula: `County="${this.county_fips}"`,
        sort: [
          {field: 'City', direction: 'asc'}
        ]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          record.fields.position = {lat: parseFloat(record.fields.lat), lng:parseFloat(record.fields.lng)}
          locations.push(record.fields);
        });
        fetchNextPage();
      }, function done(err){
        if(err){console.error(err); return;}
      });
      this.locations = locations;

      // set map bounds
      this.$refs.gmap.$mapPromise.then((map) => {

        const bounds = new window.google.maps.LatLngBounds()
        // console.log(bounds);
        console.log(this.locations);
        console.log(Object.keys(this.locations))
        console.log(Array.from(this.locations));
        // console.log(typeof locations);
        this.locations.forEach(m => {
          console.log(m);
        })

        Array.prototype.forEach.call(this.locations, m => {
          console.log(m);
        })

        Array.from(this.locations).forEach(m => {
          console.log(m);
        })

        Object.keys(this.locations).forEach(key => {
          const m = this.locations[key]
          console.log(m);
        })

        Object.entries(this.locations).forEach(([key, m]) => {
          console.log(key, m);
        })
        // for (let m of locations) {
        //   console.log("loop")
        //   console.log([m.position.lat, m.position.lng])
        //   bounds.extend([m.position.lat, m.position.lng])
        // }
        // for( let i of this.locations) {
        //   console.log(i);
        //   console.log(this.locations[i]);
        // }
        map.fitBounds(bounds);
      });
    },


    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);


      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent: function (marker) {
      return (`
<div class="">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <strong>${marker.Name}</strong>
      </div>
    </div>
    <div class="content">
      ${marker.Address} <br />
      ${marker.City}, ${marker.['State (from County Absentee Voting Data)']} ${marker.Zip}
      <hr />
      Hours: ${marker.Hours}
    </div>
  </div>
</div>`);
    },
  },
  watch: {
    county_fips: function() {
      this.getData();
    },
    locations: function() {
      this.$refs.gmap.$mapPromise.then((map) => {
        const bounds = new window.google.maps.LatLngBounds()
        for (let m of this.locations) {
          bounds.extend(m.position)
        }

        map.fitBounds(bounds);
      });

    }
  },
  mounted() {
    this.getData();

    //set bounds of the map
    // this.$refs.gmap.$mapPromise.then((map) => {
    //
    //   const bounds = new window.google.maps.LatLngBounds()
    //   for (let m of this.locations) {
    //     bounds.extend(m.position)
    //   }
    //   map.fitBounds(bounds);
    // });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
