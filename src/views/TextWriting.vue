<template>
  <div>
    <text-input v-if="hasLastLine" :last-line="lastLine" @submit="reset" />
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
  methods: {
    reset() {
      this.lastLine = null;
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
