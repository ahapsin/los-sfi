import { createRouter, createWebHistory } from "vue-router";
// slice

const routes = [
  {
    path: "/",
    name: "landing",
    component: () => import("../views/pages/LoginPage.vue"),
  },
  {
    path: "/test-view",
    name: "testview",
    component: () => import("../views/pages/TestView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = () => {
//     if (localStorage.getItem("token")) {
//       return true;
//     }
//     return false;
//   };
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next("/login");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
