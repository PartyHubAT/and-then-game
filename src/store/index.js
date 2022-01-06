import { createStore } from "vuex";

const settings =
  window.settings || require("../../public/settings").defaultValues;

export default createStore({
  state: {
    settings: settings,
  },
  mutations: {},
  actions: {},
  modules: {},
});
