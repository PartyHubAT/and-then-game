import { createStore } from "vuex";

/**
 * The apps global state
 * @typedef {Object} AppState
 * @property {boolean} playerIsHost Whether this player is the host
 */

/**
 * @type {Store<AppState>}
 */
const store = createStore({
  state: {
    playerIsHost: false,
  },
  mutations: {
    /**
     * Sets whether the player is host or not
     * @param {AppState} state The current state
     * @param {boolean} playerIsHost Whether this player is the host
     */
    setPlayerIsHost: (state, playerIsHost) => {
      state.playerIsHost = playerIsHost;
    },
  },
  actions: {
    /**
     * Sets whether the player is host or not
     * @param {import('vuex').ActionContext<AppState>} context The current context
     * @param {boolean} playerIsHost Whether this player is the host
     */
    setPlayerIsHost: (context, playerIsHost) => {
      context.commit("setPlayerIsHost", playerIsHost);
    },
  },
  getters: {
    /**
     * @param {AppState} state The current state
     * @returns {boolean} Whether this player is the host
     */
    playerIsHost: (state) => state.playerIsHost,
  },
});

export default store;
