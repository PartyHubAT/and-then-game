<template>
  <div id="content">
    <div class="title">And then...</div>
    <div class="subtitle">Waiting for players ⏲</div>
  </div>
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

<style scoped>
#content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: var(--font-header), "Arial";
  font-size: 70ex;
  color: var(--primary);
}
.subtitle {
  font-family: var(--font-content), "SansSerif";
  color: #f8f8f8;
  font-size: 15ex;
}
</style>
