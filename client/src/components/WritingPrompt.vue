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
    genre: {
      type: String,
      required: true,
    },
  },
  computed: {
    text() {
      return this.isFirstLine
        ? `Start a new ${this.genreName} ✍`
        : `Continue the ${this.genreName} 🤔`;
    },
    genreName() {
      return this.genre.toLowerCase();
    },
  },
};
</script>

<style scoped>
.prompt {
  color: var(--primary);
  font-family: var(--font-content);
  margin-bottom: var(--space-large);
  font-size: var(--font-large);
}
</style>
