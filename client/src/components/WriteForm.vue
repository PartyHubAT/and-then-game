﻿<template>
  <div class="form">
    <writing-prompt :is-first-line="hasLastLine" :genre="this.task.genre" />
    <span v-if="hasLastLine" class="lastLine">
      {{ task.lastLine }}
    </span>
    <div class="input-section">
      <text-input
        ref="input"
        class="text-input"
        v-model="text"
        @submitText="trySubmitText"
      />
      <send-button @click="trySubmitText" :can-send="hasEnteredText" />
    </div>
  </div>
</template>

<script>
import WritingPrompt from "./WritingPrompt";
import TextInput from "./TextInput";
import SendButton from "./SendButton";
import * as LineDoneMsg from "game-and-then-common/src/msgs/lineDone";
export default {
  name: "WriteForm",
  components: { SendButton, TextInput, WritingPrompt },
  props: {
    /**
     * @type {WriteTask}
     */
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  computed: {
    /**
     * @return {boolean} Whether the player has another line to work off
     */
    hasLastLine() {
      return this.task.lastLine !== null;
    },
    /**
     * @return {boolean} Whether the player has entered any text
     */
    hasEnteredText() {
      return this.text.length > 0;
    },
  },
  methods: {
    trySubmitText() {
      if (this.hasEnteredText) {
        let msg = LineDoneMsg.make(this.text);
        this.$socket.emit(msg.tag, msg);
        this.text = "";
        this.$emit("submitText");
      }
    },
  },
  mounted() {
    this.$refs.input.focusTextArea();
  },
  emits: ["submitText"],
};
</script>

<style scoped>
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
    margin-bottom: var(--space-medium);
    font-size: var(--font-medium);
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
    margin-bottom: var(--space-medium);
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
    margin-bottom: var(--space-medium);
  }
}
</style>
