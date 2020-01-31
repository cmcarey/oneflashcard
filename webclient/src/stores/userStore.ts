import { action, computed, observable } from "mobx";
import api, { isNever } from "../interface/api";
import { User } from "../interface/model";
import cardStore from "./cardStore";

class UserStore {
  @observable
  sessionKey?: string;
  @observable
  user?: User;

  @computed
  get fetchingUser() {
    return this.sessionKey !== undefined && this.user === undefined;
  }

  @computed
  get loggedIn() {
    return this.user !== undefined;
  }

  @action
  async login(email: string, password: string) {
    const res = await api.login(email, password);
    if (res.tag === "error") {
      if (res.error === "BAD_EMAIL") {
        return "BAD_EMAIL";
      } else if (res.error === "BAD_PASSWORD") {
        return "BAD_PASSWORD";
      } else isNever(res.error);
      return;
    }

    this.sessionKey = res.payload.sessionKey;
    this.user = res.payload.user;

    localStorage.setItem("sessionKey", this.sessionKey!);

    cardStore.fetchAll();
  }

  @action
  async restore(sessionKey: string) {
    this.sessionKey = sessionKey;

    const res = await api.fetchUser(sessionKey);
    if (res.tag === "error") {
      if (res.error === "INVALID_SESSION_KEY") {
        // TODO Handle bad session key
      } else isNever(res.error);
      return;
    }

    this.user = res.payload.user;

    cardStore.fetchAll();
  }

  @action
  reset() {
    this.sessionKey = undefined;
    this.user = undefined;
    localStorage.clear();
  }
}

export default new UserStore();
