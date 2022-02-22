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
  </div>
  <span v-else>You're done. Wait for others 🥳</span>
</template>

<script>
import * as ResultMsg from "game-and-then-common/src/msgs/result";
import * as NextResultMsg from "game-and-then-common/src/msgs/nextResult";

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
  },
  methods: {
    /**
     * Sends a request for the next result to the server
     */
    requestNextResult() {
      this.$socket.emit(NextResultMsg.TAG, NextResultMsg.make());
    },
  },
};
</script>

<style scoped></style>
