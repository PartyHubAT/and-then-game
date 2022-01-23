<template>
  <div>
    <text-input v-if="hasLastLine" :last-line="lastLine" @submit="reset" />
    <span v-else>Waiting for text...</span>
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
    gameDone(data) {
      const { texts } = data;
      this.$store.dispatch("setResults", texts);
      this.$router.push("/results");
    },
  },
  mounted() {
    this.$socket.emit("startWaiting", {});
  },
};
</script>

<style scoped></style>
