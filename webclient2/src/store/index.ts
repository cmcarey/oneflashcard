import { api } from "@/api";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import {
  Actions,
  createMapper,
  createStore,
  Getters,
  Module,
  Mutations
} from "vuex-smart-module";

Vue.use(Vuex);

class AppState {
  sessionKey: string | null = null;
  user: { name: string } | null = null;
}

class AppGetters extends Getters<AppState> {
  get loggedIn() {
    return this.state.user !== null;
  }

  get loadingUser() {
    return this.state.sessionKey !== null && this.state.user === null;
  }
}

class AppMutations extends Mutations<AppState> {
  setUser(payload: { user: { name: string } }) {
    this.state.user = payload.user;
  }
  setSessionKey(payload: { to: string }) {
    this.state.sessionKey = payload.to;
  }
  logout() {
    localStorage.clear();
    this.state.sessionKey = null;
    this.state.user = null;
  }
}

class AppActions extends Actions<
  AppState,
  AppGetters,
  AppMutations,
  AppActions
> {
  async login(payload: { email: string; password: string }) {
    // Fetch session key
    const res = await api.login(payload.email, payload.password);
    if ("error" in res) {
      if (res.error === "INVALID_DETAILS")
        return { error: "Invalid login details" };
    } else {
      this.mutations.setSessionKey({ to: res.value.key });
      localStorage.setItem("sessionKey", res.value.key);
    }

    // Fetch user info
    await this.actions.fetchUser();

    return {};
  }

  async fetchUser() {
    const res = await api.getUser(this.state.sessionKey!);

    if ("error" in res) {
      if (res.error === "BAD_KEY") this.mutations.logout();
    } else {
      this.mutations.setUser({ user: res.value });
    }
  }

  async restore(payload: { sessionKey: string }) {
    this.mutations.setSessionKey({ to: payload.sessionKey });

    // Fetch user info
    await this.actions.fetchUser();
  }
}

export const AppStore = new Module({
  state: AppState,
  getters: AppGetters,
  mutations: AppMutations,
  actions: AppActions
});

export const useStore = (store: Store<any>) => AppStore.context(store);
export const AppMapper = createMapper(AppStore);
export default createStore(AppStore);
