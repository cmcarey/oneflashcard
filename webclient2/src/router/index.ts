import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import App from "../components/app/App.vue";
import Home from "../components/home/Home.vue";
import Learncards from "../components/learncards/Learncards.vue";
import Viewcards from "../components/viewcards/Viewcards.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", component: Home },
  {
    path: "/app",
    component: App,
    children: [
      {
        name: "viewcards",
        path: "",
        component: Viewcards
      },
      {
        name: "learncards",
        path: "learn",
        component: Learncards
      },
      {
        path: "*",
        redirect: "/app"
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
