<template>
  <div class="center-screen">
    <div v-if="hasResult" class="form">
      <div class="result">
        <span class="genre"> {{ latestResult.genre }} </span>
        <div v-for="line in latestResult.lines" :key="line" class="line">
          {{ line }}
        </div>
      </div>
      <button
        v-if="nextIsVisible"
        :disabled="!canPressNext"
        @click="requestNextResult"
        class="next"
      >
        Next
      </button>

      <button v-if="canEnd" @click="returnToLobby">Return to lobby</button>
    </div>
    <span v-else class="wait-text">You're done. Wait for others 🥳</span>
  </div>
</template>

<script>
import * as ResultMsg from "game-and-then-common/src/msgs/result";
import * as NextResultMsg from "game-and-then-common/src/msgs/nextResult";
import * as EndMsg from "game-and-then-common/src/msgs/end";

export default {
  name: "Results",
  data() {
    return {
      /**
       * @type {?CompletedText}
       */
      latestResult: null,
      /**
       * @type {boolean}
       */
      isLastResult: false,
    };
  },
  computed: {
    /**
     * @returns {boolean} Whether there is a result to display
     */
    hasResult() {
      return this.latestResult !== null;
    },
    /**
     * @returns {boolean} Whether the next-button is visible
     */
    nextIsVisible() {
      return this.$store.getters.playerIsHost;
    },
    /**
     * @returns {boolean} Whether the next-button can be pressed
     */
    canPressNext() {
      return !this.isLastResult;
    },
    /**
     * @returns {boolean} Whether the end-button can be pressed
     */
    canEnd() {
      return this.$store.getters.playerIsHost;
    },
  },
  sockets: {
    /**
     * Handles the message for when one of the games results are presented to the user
     * @param {ResultMsg} msg The message
     */
    [ResultMsg.TAG]: function (msg) {
      this.latestResult = msg.text;
      this.isLastResult = msg.isLast;
    },

    /**
     * Called by the server when the game should end
     */
    returnToLobby() {
      // Send message to parent
      window.parent.postMessage("returnToLobby", "*");
    },
  },
  methods: {
    /**
     * Sends a request for the next result to the server
     */
    requestNextResult() {
      this.$socket.emit(NextResultMsg.TAG, NextResultMsg.make());
    },
    /**
     * Sends a request to return to the lobby to the server
     */
    returnToLobby() {
      this.$socket.emit(EndMsg.TAG, EndMsg.make());
    },
  },
};
</script>

<style scoped>
.center-screen {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wait-text {
  color: white;
  font-family: var(--font-content);
  font-size: var(--font-large);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: var(--space-large);
}

.genre {
  color: var(--primary);
  font-family: var(--font-content);
  font-size: var(--font-large);
  margin-bottom: var(--space-medium);
  text-align: center;
}

.line {
  color: white;
  font-family: var(--font-content);
  font-size: var(--font-medium);
  margin-bottom: var(--space-small);
}

.next {
  margin-bottom: var(--space-large);
}

button {
  background-color: var(--primary);
  border: 0;
  padding: var(--space-small);
  font-family: var(--font-content);
  color: var(--on-primary);
  border-radius: var(--space-small);
  font-size: var(--font-medium);
}

button:hover {
  background-color: var(--primary-light);
}

button:disabled {
  background-color: var(--primary-disabled);
}

button:active {
  background-color: var(--primary-dark);
}
</style>
