import Vue from "vue";
import VueRouter from "vue-router";
import main from "@/components/Main.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: main,
    children: [
      {
        path: "/user/edit",
        name: "userEdit",
        component: () => import("@/components/UserEdit.vue")
      },
      {
        path: "/user/info",
        name: "personalinfo",
        component: () => import("@/components/PersonalInfo.vue")
      },
      {
        path: "/tag/create",
        name: "tagCreate",
        component: () => import("@/components/TagCreate.vue")
      },
      {
        path: "/tag/edit/:id",
        name: "tagEdit",
        component: () => import("@/components/TagCreate.vue")
      },
      {
        path: "/tag/list",
        name: "tagList",
        component: () => import("@/components/TagList.vue")
      },
      {
        path: "/article/list",
        name: "articleList",
        component: () => import("@/components/ArticleList.vue")
      },
      {
        path: "/article/create",
        name: "articleCreate",
        component: () => import("@/components/ArticleCreate.vue")
      },
      {
        path: "/article/edit/:id",
        name: "articleEdit",
        component: () => import("@/components/ArticleCreate.vue")
      },
      {
        path: "/collection/list",
        name: "collectionList",
        component: () => import("@/components/CollectionList.vue")
      },
      {
        path: "/collection/create",
        name: "collectionCreate",
        component: () => import("@/components/CollectionCreate.vue")
      },
      {
        path: "/collection/edit/:id",
        name: "collectionEdit",
        component: () => import("@/components/CollectionCreate.vue")
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/components/Dashboard.vue")
      }
    ]
  },
  {
    path: "/admin/logout",
    name: "logout",
    component: () => import("@/components/Logout.vue")
  },
  {
    path: "/admin/login",
    name: "login",
    component: () => import("@/components/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
