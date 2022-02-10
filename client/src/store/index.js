import { createStore } from "vuex";

const settings = window.settings || require("../../../settings").defaultValues;

/**
 * @typedef {Object} AppState
 * @property {Settings} settings
 * @property {CompletedText[]} results
 */

/**
 * @type {Store<AppState>}
 */
const store = createStore({
  state: {
    settings: settings,
    /**
     * @type {CompletedText[]} The completed texts
     */
    results: [],
  },
  mutations: {
    /**
     * Sets the games results
     * @param {AppState} state The current state
     * @param {CompletedText[]} results The completed texts
     */
    setResults: (state, results) => {
      state.results = results;
    },
  },
  actions: {
    /**
     * Stores the games results
     * @param {import('vuex').ActionContext<AppState,AppState>} context
     * @param {CompletedText[]} results The completed texts
     */
    setResults: (context, results) => context.commit("setResults", results),
  },
  getters: {
    /**
     * Gets the current results
     * @param {AppState} state The current state
     * @return {CompletedText[]} The completed texts
     */
    results: (state) => state.results,
  },
});

export default store;
