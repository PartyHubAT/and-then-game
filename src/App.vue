<template>
  <router-view />
</template>
<script>
export default {
  created() {
    this.$socket.emit("gameLoaded", {});
  },
};
</script>
<style></style>
