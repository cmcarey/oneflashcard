import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home/Home.vue";
import Viewcards from "../components/viewcards/Viewcards.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/app", component: Viewcards }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
