<template>
  <div>
    <span>{{ prompt }}</span>
    <span v-if="hasLastLine">{{ lastLine }}</span>
    <label> Text <input maxlength="128" v-model="text" /> </label>
    <button @click="submitText">Submit</button>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    lastLine: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  computed: {
    hasLastLine() {
      return this.lastLine !== "";
    },
    prompt() {
      return this.hasLastLine
        ? "Continue the last-line"
        : "Enter the first line.";
    },
  },
  methods: {
    submitText() {
      this.$socket.emit("lineDone", { line: this.text });
    },
  },
};
</script>

<style scoped></style>
