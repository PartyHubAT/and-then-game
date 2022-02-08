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
      this.$socket.emit("lineDone", { line: this.text });
      this.reset();
    },
  },
  sockets: {
    /**
     * Called when a prompt is received from the server
     * @param {Prompt} prompt
     */
    receivePrompt(prompt) {
      this.lastLine = prompt.lastLine;
    },
    gameDone(data) {
      const { texts } = data;
      this.$store.dispatch("setResults", texts);
      this.$router.push("/results");
    },
  },
  mounted() {
    this.$socket.emit("requestPrompt", {});
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
