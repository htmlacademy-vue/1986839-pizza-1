import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    meta: {
      layout: 'AppLayoutMain',
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: 'AppLayoutMain',
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: 'AppLayoutMain',
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: 'AppLayoutMain',
      middlewares: [auth],
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isLoggedIn],
    },
  },
];
