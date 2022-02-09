<template>
  <div class="title">And then...</div>
  <div class="content">
    <div class="form" v-if="readyToWrite">
      <writing-prompt :is-first-line="isFirstLine" />
      <div v-if="readyToWrite && !isFirstLine" class="lastLine">
        {{ lastLine }}
      </div>
      <div class="input-section">
        <text-input class="text-input" v-model="text" />
        <send-button @click="submitText" :can-send="hasEnteredText" />
      </div>
    </div>
    <span class="waitText" v-else>Waiting for next text. 😴</span>
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

export default {
  name: "TextWriting",
  components: { SendButton, WritingPrompt, TextInput },
  data() {
    return {
      lastLine: null,
      text: "",
    };
  },
  computed: {
    readyToWrite() {
      return this.lastLine !== null;
    },
    isFirstLine() {
      return this.readyToWrite && this.lastLine === "";
    },
    hasEnteredText() {
      return this.text.length > 0;
    },
  },
  methods: {
    reset() {
      this.lastLine = null;
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
     */
    [NewTextMsg.TAG]: function () {
      this.lastLine = "";
    },

    /**
     * Handles the message for when the user should continue an existing text
     * @param {ContinueTextMsg} msg The message
     */
    [ContinueTextMsg.TAG]: function (msg) {
      this.lastLine = msg.lastLine;
    },

    /**
     * Handles the message for when the games results are presented to the user
     * @param {ResultsMsg} msg The message
     */
    [ResultsMsg.TAG]: function (msg) {
      this.$store.dispatch("setResults", msg.textLines);
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
