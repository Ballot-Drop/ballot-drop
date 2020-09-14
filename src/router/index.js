import Vue from 'vue'
import VueRouter from 'vue-router'
import BallotDrop from "@/components/BallotDrop";

Vue.use(VueRouter)


  const routes = [
    {
      path: '/',
      name: 'Home',
      component: BallotDrop,
      props: {
      }
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/contact',
      name: 'Contact',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
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
