import "@fortawesome/fontawesome-free/css/all.css";
import VueCompositionApi from "@vue/composition-api";
import "bulma/css/bulma.css";
import "normalize.css";
import Vue from "vue";
import App from "./components/App.vue";
import router from "./router";
import store, { useStore } from "./store";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

const sessionKey = localStorage.getItem("sessionKey");
if (sessionKey) useStore(store).actions.restore({ sessionKey });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
