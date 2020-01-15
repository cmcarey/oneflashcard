import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home/Home.vue";

Vue.use(VueRouter);

const routes = [{ path: "/", component: Home }];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
