<template>
  <div id="app" ref="main_app" class="container">
    <div id="nav" class="text-center">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link>
    </div>
    <router-view/>
    <div id="flag" class="fixed-bottom"
         @mouseover="flagHover = true"
         @mouseleave="flagHover = false"
         v-b-modal.flag-modal
    >
      <b-icon-flag-fill v-if="flagHover"></b-icon-flag-fill>
      <b-icon-flag v-else></b-icon-flag>
    </div>
    <span id="flagHover" class="fixed-bottom" v-if="flagHover">
      See an issue on this page?<br />
      Click here to let us know!
    </span>
    <b-modal id="flag-modal" title="Something wrong on this page? Let us know!" hide-footer>
      <Contact :current-page="$route.path"></Contact>
    </b-modal>
    <div id="footer">
    </div>
  </div>
</template>

<script>

import Contact from "@/views/Contact";

export default {
  name: 'App',
  components: {Contact},
  props: {
    state_route: {type: String, required: false},
    county_route: {type: String, required: false},
  },
  data: function() {
    return {
      states: [],
      flagHover: false,
      flagModal: false,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  margin-bottom: 25px;
}
#footer {
  min-height: 50px;
  margin-top: 50px;
}

#flag, #flagHover {
  left: unset;
  right: 25px;
  bottom: 15px;
}

#flag {
  cursor: pointer;
}

#flagHover {
  bottom: 45px;
}

@media only screen and (max-width: 400px) {

  #flag, #flagHover {
    right: 5px;
    bottom: 5px;
  }

  #flag {
    cursor: pointer;
  }

  #flagHover {
    bottom: 10px;
  }
}
</style>
