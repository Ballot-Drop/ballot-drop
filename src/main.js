import Vue from 'vue'
import VueRouter from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-178886586-1',
  router
});

new Vue({
  render: h => h(App),
  router,
  use: VueRouter
}).$mount('#app');
