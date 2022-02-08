import { createStore } from "vuex";

const settings = window.settings || require("../../../settings").defaultValues;

export default createStore({
  state: {
    settings: settings,
    results: [],
  },
  mutations: {
    setResults: (state, results) => (state.results = results),
  },
  actions: {
    setResults: ({ commit }, results) => commit("setResults", results),
  },
  getters: {
    results: (state) => state.results,
  },
});
