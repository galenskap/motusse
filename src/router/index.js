import { createRouter, createWebHistory } from "vue-router";
import WordleView from "../views/WordleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/word/:secret",
      name: "word",
      component: WordleView,
    },
    {
      path: "/",
      name: "new",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/NewWordView.vue"),
    },
  ],
});

export default router;
