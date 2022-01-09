<template>
  <div>
    <text-input v-if="hasLastLine" :last-line="lastLine" />
  </div>
</template>

<script>
import TextInput from "../components/TextInput";
export default {
  name: "TextWriting",
  components: { TextInput },
  data() {
    return {
      lastLine: null,
    };
  },
  computed: {
    hasLastLine() {
      return this.lastLine !== null;
    },
  },
  sockets: {
    nextText(data) {
      const { lastLine } = data;
      this.lastLine = lastLine;
    },
  },
};
</script>

<style scoped></style>
