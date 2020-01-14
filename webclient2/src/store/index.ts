import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

interface State {}

const store: StoreOptions<State> = {
  state: {},
  mutations: {},
  actions: {},
  modules: {}
};

export default new Vuex.Store<State>(store);
