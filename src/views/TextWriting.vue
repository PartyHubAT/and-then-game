<template>
  <div class="title">And then...</div>
  <div class="content">
    <div class="form" v-if="readyToWrite">
      <writing-prompt :is-first-line="isFirstLine" />
      <div v-if="readyToWrite && !isFirstLine">{{ lastLine }}</div>
      <div class="input-section">
        <text-input v-model="text" />
        <button class="send-button" @click="submitText" :disabled="!canSubmit">
          Send
        </button>
      </div>
    </div>
    <span v-else>Waiting for text...</span>
  </div>
</template>

<script>
import TextInput from "../components/TextInput";
import WritingPrompt from "../components/WritingPrompt";
export default {
  name: "TextWriting",
  components: { WritingPrompt, TextInput },
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
    canSubmit() {
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
    nextText(data) {
      const { lastLine } = data;
      this.lastLine = lastLine;
    },
    gameDone(data) {
      const { texts } = data;
      this.$store.dispatch("setResults", texts);
      this.$router.push("/results");
    },
  },
  mounted() {
    this.$socket.emit("startWaiting", {});
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.send-button {
  background-color: var(--primary);
  border: 0;
  font-family: var(--font-content);
  color: var(--on-primary);
}

.send-button:hover {
  background-color: var(--primary-light);
}

.send-button:disabled {
  background-color: var(--primary-disabled);
}

.send-button:active {
  background-color: var(--primary-dark);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 90%;
  }

  .send-button {
    margin-top: var(--space-large);
    padding: var(--space-medium);
    border-radius: 10px;
    font-size: 20px;
  }
}
</style>
