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
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/pages/DashboardPage.vue"),
  },
  {
    path: "/task",
    name: "task",
    component: () => import("../views/pages/DashboardPage.vue"),
    children: [
      {
        path: "apply-credit",
        name: "apply credit",
        component: () => import("../views/pages/DashboardPage.vue"),
      },
      {
        path: "survey",
        name: "survey",
        component: () => import("../views/pages/task/SurveyPage.vue"),
      },
      {
        path: "new-survey",
        name: "tambah survey",
        component: () => import("../views/pages/task/AddSurveyPage.vue"),
      },
    ],
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
