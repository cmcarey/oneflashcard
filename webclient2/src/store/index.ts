import { api } from "@/api";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

interface State {
  sessionKey: string | null;
}

const store: StoreOptions<State> = {
  state: {
    sessionKey: null
  },

  getters: {
    authenticated(state) {
      return !!state.sessionKey;
    }
  },

  mutations: {
    setSessionKey(state, payload: { key: string }) {
      state.sessionKey = payload.key;
    }
  },

  actions: {
    async login({ commit }, payload: { email: string; password: string }) {
      const res = await api.login(payload.email, payload.password);

      if ("error" in res) {
        if (res.error === "INVALID_DETAILS") {
          return { error: "Invalid login details" };
        }
      } else {
        commit("setSessionKey", { key: res.value.key });
        localStorage.setItem("sessionKey", res.value.key);
      }
    }
  }
};

export default new Vuex.Store<State>(store);
