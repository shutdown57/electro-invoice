import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import AddClient from "./views/client/AddClient.vue";
import UpdateClient from "./views/client/UpdateClient.vue";
import AllClients from "./views/client/AllClients.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/clients",
      name: "AllClients",
      component: AllClients
    },
    {
      path: "/clients/update",
      name: "UpdateClient",
      component: UpdateClient
    },
    {
      path: "/clients/create",
      name: "AddClient",
      component: AddClient
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
