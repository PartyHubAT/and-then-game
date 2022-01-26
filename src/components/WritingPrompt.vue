<template>
  <span class="prompt">{{ text }}</span>
</template>
<script>
export default {
  name: "WritingPrompt",
  props: {
    isFirstLine: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    text() {
      return this.isFirstLine
        ? "Start a new text ✍"
        : "Continue the last-line";
    },
  },
};
</script>

<style scoped>
.prompt {
  color: var(--primary);
  font-family: var(--font-content);
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .prompt {
    font-size: 30px;
    margin-bottom: var(--space-large);
  }
}
</style>
