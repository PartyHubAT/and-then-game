<template>
  <div>
    <label> Text <input maxlength="128" v-model="text" /> </label>
    <button @click="submitText">Submit</button>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    submitText() {
      this.$emit("submitText", this.text);
    },
  },
  emits: ["submitText"],
};
</script>

<style scoped></style>
