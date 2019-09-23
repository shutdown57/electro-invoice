import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";

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
      component: () => import("./views/client/AllClients.vue")
    },
    {
      path: "/clients/update",
      name: "UpdateClient",
      component: () => import("./views/client/UpdateClient.vue")
    },
    {
      path: "/clients/create",
      name: "AddClient",
      component: () => import("./views/client/AddClient.vue")
    },
    {
      path: "/products/create",
      name: "AddProduct",
      component: () => import("./views/product/AddProduct.vue")
    },
    {
      path: "/products/update",
      name: "UpdateProduct",
      component: () => import("./views/product/UpdateProduct.vue")
    },
    {
      path: "/products",
      name: "AllProducts",
      component: () => import("./views/product/AllProducts.vue")
    },
    {
      path: "/invoices/create",
      name: "AddInvoice",
      component: () => import("./views/invoice/AddInvoice.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    }
  ]
});
