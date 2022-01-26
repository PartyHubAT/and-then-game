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
<style>
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background: radial-gradient(
    circle farthest-corner at top left,
    var(--background) 0,
    var(--background-dark) 100%
  );
}
</style>
