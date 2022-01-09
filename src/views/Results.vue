<template>
  <div>
    <div v-for="result in results" :key="result.index">
      Result {{ result.index + 1 }}
      <div v-for="line in result.lines" :key="line">{{ line }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  computed: {
    results() {
      return this.$store.getters.results.map((result, i) => ({
        index: i,
        lines: result,
      }));
    },
  },
};
</script>

<style scoped></style>
