﻿<template>
  <div id="content">
    <div class="title">And then...</div>
    <div class="subtitle">Waiting for players ⏲</div>
  </div>
</template>

<script>
import * as StartMsg from "game-and-then-common/src/msgs/start";

export default {
  name: "LoadingScreen",
  sockets: {
    /**
     * Handles the message for when the game starts
     * @param {StartMsg} msg The message
     */
    [StartMsg.TAG]: function (msg) {
      this.$store.dispatch("setPlayerIsHost", msg.playerIsHost);
      this.$router.push("/game");
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
  font-size: var(--font-large);
  color: #f8f8f8;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .title {
    font-size: 50px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .title {
    font-size: 80px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .title {
    font-size: 100px;
  }
}
</style>
