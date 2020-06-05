import Vue from 'vue';
import VueRouter from 'vue-router';
import LMainLayout from "@/components/layout/LMainLayout.vue";
import RouterLayout from "@/components/layout/RouterLayout.vue";
import UserLayout from "@/components/layout/UserLayout.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: "Index",
  //   component: LMainLayout,
  //   redirect: "/dashboard/index",
  //   children: [{
  //       path: '/dashboard',
  //       name: "Dashboard",
  //       component: RouterLayout,
  //       meta: {
  //         component: 'Dashboard',
  //         keepAlive: false,
  //         hidden: false,
  //         icon: "el-icon-data-analysis",
  //       },
  //       children: [{
  //         path: 'index',
  //         name: "DashboardIndex",
  //         component: () => import("@/views/dashboard/Index.vue"),
  //       }]
  //     },
  //     {
  //       path: 'system',
  //       name: "System",
  //       component: RouterLayout,
  //       children: [{
  //           path: 'menu-list-page',
  //           name: "SystemMenuListPage",
  //           component: () => import("@/views/system/MenuListPage.vue"),
  //         },
  //         {
  //           path: 'user-list-page',
  //           name: "SystemsuerListPage",
  //           component: () => import("@/views/system/UserListPage.vue"),
  //         },
  //         {
  //           path: 'role-list-page',
  //           name: "SystemsuerListPage1",
  //           component: () => import("@/views/system/RoleListPage.vue"),
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    path: "/user",
    name: "user",
    redirect: "/user/login",
    component: UserLayout,
    children: [{
      path: "login",
      name: "login",
      component: () => import("@/views/user/Login.vue"),
    }, {
      path: "register",
      name: "Register",
      component: () => import("@/views/user/Register.vue"),
    }, ]
  },
  {
    path: "*",
    name: "error-not-find",
    component: () => import("@/views/error/404.vue"),
  }
];

const router = new VueRouter({
  routes,
});

export default router;
