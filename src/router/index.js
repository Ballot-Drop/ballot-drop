import Vue from 'vue'
import VueRouter from 'vue-router'
import BallotDrop from "@/components/BallotDrop";

Vue.use(VueRouter)

// const getData = () => {
//   const Airtable = require('airtable');
//   const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appUkL89RMW3J7G5t');
//   const state_data = [{},];
//   base('State Absentee Voting Data').select({
//     sort: [
//       {field: 'State/Territory', direction:'asc'}
//     ]
//   }).eachPage(function page(records, fetchNextPage) {
//     records.forEach(function(record) {
//       state_data.push(record.fields);
//     });
//     fetchNextPage();
//   }, function done(err){
//     if(err){console.error(err); return;}
//   });
//   // this.states = state_data;
//   return state_data;
//
// }


  const routes = [
    {
      path: '/',
      name: 'Home',
      component: BallotDrop,
      props: {
        // state_route: "Test",
        // states: getData()

      }
    },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/:state',
      name: 'State',
      component: BallotDrop,
      props: {
        state_route: null

      }
    },
    {
      // todo: allow for url changes to effect the page, back and forward buttons, etc
      path: '/:state/:county',
      name: 'County',
      component: BallotDrop
    }



  // {
  //   path: '/:state', component: () => {
  //     // console.log("~~")
  //     // console.log(App.$refs);
  //     // console.log(App);
  //     // App.$broadcast('load-state', "test");
  //     // App.$refs.main_app.loadState();
  //   }
  // }
]

const router = new VueRouter({
  routes
})

export default router
