import Vue from 'vue'
import VueRouter from 'vue-router'
import BallotDrop from "@/components/BallotDrop";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BallotDrop,
    meta: {
      title: 'Home - Ballot Drop',
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About - Ballot Drop',
    },
  },
    {
      path: '/contact',
      name: 'Contact',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
      meta: {
        title: 'Contact - Ballot Drop',
      },
    },
    {
      path: '/:state',
      name: 'State',
      component: BallotDrop,
      props: {
        state_route: null
      },
      meta: {
        title: route => `${route.params.state} - Ballot Drop`,
      },
    },
    {
      // todo: allow for url changes to effect the page, back and forward buttons, etc
      path: '/:state/:county',
      name: 'County',
      component: BallotDrop,
      meta: {
        title: route => `${route.params.county}, ${route.params.state}- Ballot Drop`,
      },
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
  mode: "history",
  routes,
})

router.afterEach((to) => {
  // set the default title to be 'Ballot Drop' in case a route doesn't specify a title
  let title = 'Ballot Drop';

  // set the title if it is specified in the route config
  if (to.meta.title) {
    // if it is static, set it to the desired string
    // if it is dynamic, call the function to get the desired title
    title = typeof to.meta.title === "function" ? to.meta.title(to) : to.meta.title;
  }

  document.title = title;
});

export default router
