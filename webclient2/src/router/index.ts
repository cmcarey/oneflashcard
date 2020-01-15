import store, { useStore } from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import App from "../components/app/App.vue";
import Home from "../components/home/Home.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", component: Home },
  {
    path: "/app",
    component: App,
    beforeEnter(to, from, next) {
      const s = useStore(store);
      if (!s.state.loadingUser && !s.getters.authenticated) next("/");
    }
  },
  {
    path: "*",
    beforeEnter(to, from, next) {
      next("/");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
