﻿<template>
  <div class="title">And then...</div>
  <div class="content">
    <wait-text v-if="isWaiting" />
    <write-form v-if="hasTask" :task="writePhase" @submit-text="reset()" />
  </div>
</template>

<script>
import * as PlayerPhase from "../types/PlayerPhase";
import * as WriteTask from "../types/WriteTask";
import WaitText from "../components/WaitText";
import WriteForm from "../components/WriteForm";
import PlayerPhaseType from "../types/PlayerPhaseType";
import * as NewTextMsg from "game-and-then-common/src/msgs/newText";
import * as ContinueTextMsg from "game-and-then-common/src/msgs/continueText";
import * as WaitForResultsMsg from "game-and-then-common/src/msgs/waitForResults";
import * as RequestLineMsg from "game-and-then-common/src/msgs/requestLine";

export default {
  name: "Game",
  components: { WriteForm, WaitText },
  data() {
    return {
      /**
       * @type {PlayerPhase}
       */
      phase: PlayerPhase.wait(),
    };
  },
  computed: {
    /**
     * @returns {boolean} Whether the player is currently waiting for a task
     */
    isWaiting() {
      return this.phase.type === PlayerPhaseType.Wait;
    },

    /**
     * @return {boolean} Whether the player currently has a task
     */
    hasTask() {
      return this.phase.type === PlayerPhaseType.Write;
    },

    /**
     * @returns {?WriteTask} Gets the current write-task or null if waiting
     */
    writePhase() {
      if (this.hasTask) return this.phase.task;
      else return null;
    },
  },
  methods: {
    reset() {
      this.phase = PlayerPhase.wait();
    },
  },
  sockets: {
    /**
     * Handles the message for when the user should start writing a new text
     * @param {NewTextMsg} msg The message
     */
    [NewTextMsg.TAG]: function (msg) {
      this.phase = PlayerPhase.write(WriteTask.newText(msg.genre));
    },

    /**
     * Handles the message for when the user should continue an existing text
     * @param {ContinueTextMsg} msg The message
     */
    [ContinueTextMsg.TAG]: function (msg) {
      this.phase = PlayerPhase.write(
        WriteTask.continueText(msg.genre, msg.lastLine)
      );
    },

    /**
     * Handles the message for when the player should wait for results
     */
    [WaitForResultsMsg.TAG]: function () {
      this.$router.push("/results");
    },
  },
  mounted() {
    let msg = RequestLineMsg.make();
    this.$socket.emit(msg.tag, msg);
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  left: 0;
  top: 0;
  font-family: var(--font-header);
  color: var(--primary);
  margin: var(--space-small);
  font-size: 25px;
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
