import { createRouter, createWebHashHistory } from "vue-router";
import TextWriting from "../views/TextWriting.vue";

const routes = [
  {
    path: "/",
    name: "TextWriting",
    component: TextWriting,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
