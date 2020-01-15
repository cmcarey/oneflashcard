import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import "normalize.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
