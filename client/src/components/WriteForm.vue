<template>
  <div class="form">
    <writing-prompt :is-first-line="hasLastLine" :genre="this.task.genre" />
    <span v-if="hasLastLine" class="lastLine">
      {{ task.lastLine }}
    </span>
    <div class="input-section">
      <text-input class="text-input" v-model="text" />
      <send-button @click="submitText" :can-send="hasEnteredText" />
    </div>
  </div>
</template>

<script>
import WritingPrompt from "./WritingPrompt";
import TextInput from "./TextInput";
import SendButton from "./SendButton";
import LineDoneMsg from "../../../common/src/msgs/lineDone";
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
     * Checks whether the player has entered any text
     * @return {boolean} Whether the player has entered any text
     */
    hasEnteredText() {
      return this.text.length > 0;
    },
  },
  methods: {
    submitText() {
      let msg = new LineDoneMsg(this.text);
      this.$socket.emit(msg.tag, msg);
      this.text = "";
      this.$emit("submitText");
    },
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
    font-size: 20px;
    margin-bottom: var(--space-medium);
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
}
</style>
