<template>
  <div class="title">And then...</div>
  <div class="content">
    <div class="form" v-if="!isDone && hasTask">
      <writing-prompt :is-first-line="isFirstLine" :genre="this.task.genre" />
      <div v-if="hasTask && !isFirstLine" class="lastLine">
        {{ task.lastLine }}
      </div>
      <div class="input-section">
        <text-input class="text-input" v-model="text" />
        <send-button @click="submitText" :can-send="hasEnteredText" />
      </div>
    </div>
    <span class="waitText" v-else>{{ waitText }}</span>
  </div>
</template>

<script>
import TextInput from "../components/TextInput";
import WritingPrompt from "../components/WritingPrompt";
import SendButton from "../components/SendButton";
import LineDoneMsg from "../../../common/msgs/lineDone";
import NewTextMsg from "../../../common/msgs/newText";
import ContinueTextMsg from "../../../common/msgs/continueText";
import ResultsMsg from "../../../common/msgs/results";
import RequestLineMsg from "../../../common/msgs/requestLine";
import WaitForResultsMsg from "../../../common/msgs/waitForResults";

export default {
  name: "Writing",
  components: { SendButton, WritingPrompt, TextInput },
  data() {
    return {
      /**
       * The task the player is currently working on. Null if the player has no task
       * @type {?WritingTask}
       */
      task: null,
      text: "",
      isDone: false,
    };
  },
  computed: {
    /**
     * Checks whether the player currently has a task
     * @return {boolean} Whether they have a task
     */
    hasTask() {
      return this.task !== null;
    },
    /**
     * Checks whether the player is writing the first line of the text or a continuation
     * @return {boolean} Whether it's the first line or not
     */
    isFirstLine() {
      return this.task?.lastLine === null ?? false;
    },
    /**
     * Checks whether the player has entered any text
     * @return {boolean} Whether the player has entered any text
     */
    hasEnteredText() {
      return this.text.length > 0;
    },
    waitText() {
      return this.isDone
        ? "You're done. Waiting for others. 🥳"
        : "Waiting for next text. 😴";
    },
  },
  methods: {
    reset() {
      this.task = null;
      this.text = "";
    },
    submitText() {
      let msg = new LineDoneMsg(this.text);
      this.$socket.emit(msg.tag, msg);
      this.reset();
    },
  },
  sockets: {
    /**
     * Handles the message for when the user should start writing a new text
     * @param {NewTextMsg} msg The message
     */
    [NewTextMsg.TAG]: function (msg) {
      this.task = {
        lastLine: null,
        genre: msg.genre,
      };
    },

    /**
     * Handles the message for when the user should continue an existing text
     * @param {ContinueTextMsg} msg The message
     */
    [ContinueTextMsg.TAG]: function (msg) {
      this.task = {
        lastLine: msg.lastLine,
        genre: msg.genre,
      };
    },

    /**
     * Handles the message for when the player should wait for results
     */
    [WaitForResultsMsg.TAG]: function () {
      this.isDone = true;
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

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lastLine {
  font-family: var(--font-content);
  color: white;
  text-align: center;
  word-wrap: anywhere;
}

.waitText {
  font-family: var(--font-content);
  color: white;
  text-align: center;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 80%;
  }

  .lastLine {
    width: 90%;
    font-size: 20px;
    margin-bottom: var(--space-medium);
  }

  .waitText {
    font-size: 20px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 60%;
  }

  .lastLine {
    width: 80%;
    font-size: 20px;
    margin-bottom: var(--space-medium);
  }

  .waitText {
    font-size: 40px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .input-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
  }

  .text-input {
    flex-grow: 1;
  }

  .lastLine {
    font-size: 20px;
    margin-bottom: var(--space-medium);
  }

  .waitText {
    font-size: 40px;
  }
}
</style>
