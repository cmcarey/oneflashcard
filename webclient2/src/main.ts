import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import "normalize.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store, { useStore } from "./store";

Vue.config.productionTip = false;

const sessionKey = localStorage.getItem("sessionKey");
if (sessionKey) {
  const s = useStore(store);
  s.mutations.setSessionKey({ key: sessionKey });
  useStore(store).actions.fetchUser();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
