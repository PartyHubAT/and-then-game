<template>
  <div class="title">And then...</div>
  <div class="content">
    <div class="form" v-if="readyToWrite">
      <writing-prompt :is-first-line="isFirstLine" />
      <div v-if="readyToWrite && !isFirstLine">{{ lastLine }}</div>
      <div class="input-section">
        <text-input class="text-input" v-model="text" />
        <send-button @click="submitText" :can-send="hasEnteredText" />
      </div>
    </div>
    <span v-else>Waiting for text...</span>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .input-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 80%;
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
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .input-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
  }

  .text-input{
    flex-grow: 1;
  }
}
</style>
