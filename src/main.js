import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";

const socket =
  window.socket ||
  SocketIO(`http://${window.location.hostname}:${process.env.VUE_APP_SERVER_PORT}`);

createApp(App)
  .use(store)
  .use(router)
  .use(
    new VueSocketIO({
      debug: true,
      connection: socket,
    })
  )
  .mount("#app");
