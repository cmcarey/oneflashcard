import { action, computed, observable } from "mobx";
import api from "../interface/api";
import { User } from "../interface/model";

class UserStore {
  @observable
  sessionKey?: string;
  @observable
  user?: User;

  @computed
  get fetchingUser() {
    return this.sessionKey !== undefined && this.user === undefined;
  }

  @action
  async login(email: string, password: string) {
    const res = await api.login(email, password);

    if ("error" in res) return res.error;

    this.sessionKey = res.value.sessionKey;
    this.user = res.value.user;
  }

  @action
  async restore(sessionKey: string) {
    const res = await api.restore(sessionKey);

    if ("error" in res) return res.error;

    this.user = res.value.user;
  }
}

export default new UserStore();
