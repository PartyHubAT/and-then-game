<template>
  <div v-if="hasResult">
    <div>
      {{ latestResult.title }}
      <div v-for="line in latestResult.lines" :key="line">{{ line }}</div>
    </div>
    <button v-if="!canPressNext" @click="requestNextResult">Next</button>
  </div>
  <span v-else>You're done. Wait for others 🥳</span>
</template>

<script>
import * as ResultsMsg from "game-and-then-common/src/msgs/result";
import * as NextResultMsg from "game-and-then-common/src/msgs/nextResult";

export default {
  name: "Results",
  data() {
    return {
      /**
       * @type {?CompletedText}
       */
      latestResult: null,
    };
  },
  computed: {
    hasResult() {
      return this.latestResult !== null;
    },
    canPressNext() {
      return this.$store.getters.playerIsHost;
    },
  },
  sockets: {
    /**
     * Handles the message for when one of the games results are presented to the user
     * @param {ResultsMsg} msg The message
     */
    [ResultsMsg.TAG]: function (msg) {
      this.latestResult = msg.text;
    },
  },
  methods: {
    requestNextResult() {
      this.$socket.emit(NextResultMsg.TAG, NextResultMsg.make());
    },
  },
};
</script>

<style scoped></style>
