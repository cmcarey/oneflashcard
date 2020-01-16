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

type Card = { cardID: string; title: string; text: string; tagIDs: string[] };
type Tag = { tagID: string; text: string; color: string };

class AppState {
  sessionKey: string | null = null;
  user: { name: string } | null = null;
  cards: Card[] = [];
  tags: Tag[] = [];
}

class AppGetters extends Getters<AppState> {
  get loggedIn() {
    return this.state.user !== null;
  }

  get loadingUser() {
    return this.state.sessionKey !== null && this.state.user === null;
  }

  get mappedCards() {
    const tags = this.state.tags;
    const tagIDs = tags.map(tag => tag.tagID);

    return this.state.cards.map(card => ({
      cardID: card.cardID,
      title: card.title,
      text: card.text,
      tags: card.tagIDs.map(tagID => tags[tagIDs.indexOf(tagID)])
    }));
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
  setCards(payload: { to: Card[] }) {
    this.state.cards = payload.to;
  }
  setTags(payload: { to: Tag[] }) {
    this.state.tags = payload.to;
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

  async restore(payload: { sessionKey: string }) {
    this.mutations.setSessionKey({ to: payload.sessionKey });

    // Fetch user info
    await this.actions.fetchUser();
  }

  async fetchUser() {
    const res = await api.getUser(this.state.sessionKey!);

    if ("error" in res) {
      if (res.error === "BAD_KEY") this.mutations.logout();
    } else {
      this.mutations.setUser({ user: res.value });
    }

    await this.actions.fetchCardsAndTags();
  }

  async fetchCardsAndTags() {
    const cardRes = await api.getCards(this.state.sessionKey!);

    if ("error" in cardRes) {
      if (cardRes.error === "BAD_KEY") this.mutations.logout();
      return;
    }

    this.mutations.setCards({ to: cardRes.value });

    const tagRes = await api.getTags(this.state.sessionKey!);

    if ("error" in tagRes) {
      if (tagRes.error === "BAD_KEY") this.mutations.logout();
      return;
    }

    this.mutations.setTags({ to: tagRes.value });
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
