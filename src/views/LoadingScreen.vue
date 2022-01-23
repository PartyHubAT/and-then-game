<template>
  <div>Waiting for other players...</div>
</template>

<script>
export default {
  name: "LoadingScreen",
  sockets: {
    start() {
      this.$router.push("/write");
    },
  },
};
</script>

<style scoped></style>
