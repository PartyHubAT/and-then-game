import { createRouter, createWebHashHistory } from "vue-router";
import LoadingScreen from "../views/LoadingScreen.vue";
import Game from "../views/Game.vue";
import Results from "../views/Results.vue";

/**
 *  @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: "/",
    name: "LoadingScreen",
    component: LoadingScreen,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
