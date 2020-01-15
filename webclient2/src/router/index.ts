import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import App from "../components/app/App.vue";
import Home from "../components/home/Home.vue";
import Viewcards from "../components/viewcards/Viewcards.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", component: Home },
  {
    path: "/app",
    component: App,
    children: [
      {
        path: "",
        component: Viewcards
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
