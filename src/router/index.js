import { createRouter, createWebHistory } from "vue-router";
import TextWriting from "../views/TextWriting.vue";

const routes = [
  {
    path: "/",
    name: "TextWriting",
    component: TextWriting,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
