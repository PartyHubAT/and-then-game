<template>
  <div>
    <div v-for="result in results" :key="result.index">
      {{ result.title }}
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
        title: result.genre,
        lines: result.lines,
      }));
    },
  },
};
</script>

<style scoped></style>
