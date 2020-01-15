import { api } from "@/api";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
  Actions,
  createStore,
  Getters,
  Module,
  Mutations
} from "vuex-smart-module";

Vue.use(Vuex);

class AppState {
  sessionKey: string | null = null;
}

class AppGetters extends Getters<AppState> {
  get authenticated() {
    return !!this.state.sessionKey;
  }
}

class AppMutations extends Mutations<AppState> {
  setSessionKey(payload: { key: string }) {
    this.state.sessionKey = payload.key;
  }
}

class AppActions extends Actions<
  AppState,
  AppGetters,
  AppMutations,
  AppActions
> {
  async login(payload: { email: string; password: string }) {
    const res = await api.login(payload.email, payload.password);

    if ("error" in res) {
      if (res.error === "INVALID_DETAILS")
        return { error: "Invalid login details" };
    } else {
      this.mutations.setSessionKey({ key: res.value.key });
      localStorage.setItem("sessionKey", res.value.key);
    }

    return {};
  }
}

export const AppStore = new Module({
  state: AppState,
  getters: AppGetters,
  mutations: AppMutations,
  actions: AppActions
});

export const useStore = (store: Store<any>) => AppStore.context(store);

export default createStore(AppStore);
