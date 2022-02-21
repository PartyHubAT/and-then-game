<template>
  <div class="title">And then...</div>
  <div class="content">
    <wait-text v-if="isWaiting" :reason="waitReason" />
    <write-form v-if="hasTask" :task="writePhase" @submit-text="reset()" />
  </div>
</template>

<script>
import * as PlayerPhase from "../types/PlayerPhase";
import * as WriteTask from "../types/WriteTask";
import WaitReason from "../types/WaitReason";
import WaitText from "../components/WaitText";
import WriteForm from "../components/WriteForm";
import PlayerPhaseType from "../types/PlayerPhaseType";
import NewTextMsg from "game-and-then-common/src/msgs/newText";
import ContinueTextMsg from "game-and-then-common/src/msgs/continueText";
import WaitForResultsMsg from "game-and-then-common/src/msgs/waitForResults";
import ResultsMsg from "game-and-then-common/src/msgs/results";
import RequestLineMsg from "game-and-then-common/src/msgs/requestLine";

export default {
  name: "Game",
  components: { WriteForm, WaitText },
  data() {
    return {
      /**
       * @type {PlayerPhase}
       */
      phase: PlayerPhase.wait(WaitReason.NO_TASK),
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
     * @returns {?WaitReason} Gets the current wait-reason or null if not waiting
     */
    waitReason() {
      if (this.isWaiting) return this.phase.reason;
      else return null;
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
      this.phase = PlayerPhase.wait(WaitReason.NO_TASK);
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
      this.phase = PlayerPhase.wait(WaitReason.DONE);
    },

    /**
     * Handles the message for when the games results are presented to the user
     * @param {ResultsMsg} msg The message
     */
    [ResultsMsg.TAG]: function (msg) {
      this.$store.dispatch("setResults", msg.texts);
      this.$router.push("/results");
    },
  },
  mounted() {
    let msg = new RequestLineMsg();
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
