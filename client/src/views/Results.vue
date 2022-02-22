<template>
  <div v-if="hasResult">
    <div>
      {{ latestResult.title }}
      <div v-for="line in latestResult.lines" :key="line">{{ line }}</div>
    </div>
    <button
      v-if="nextIsVisible"
      :disabled="!canPressNext"
      @click="requestNextResult"
    >
      Next
    </button>

    <button v-if="canEnd" @click="returnToLobby">Return to lobby</button>
  </div>
  <span v-else>You're done. Wait for others 🥳</span>
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

<style scoped></style>
