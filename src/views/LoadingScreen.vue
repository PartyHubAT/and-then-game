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
  font-family: var(--font-header);
  color: var(--primary);
}
.subtitle {
  font-family: var(--font-content);
  color: #f8f8f8;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 20px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .title {
    font-size: 80px;
  }
  .subtitle {
    font-size: 20px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .title {
    font-size: 100px;
  }
  .subtitle {
    font-size: 25px;
  }
}

</style>
