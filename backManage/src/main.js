import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (
    window.localStorage.getItem("username") &&
    window.localStorage.getItem("token")
  ) {
    store.state["user"].displayName = window.localStorage.getItem("username");
    if (to.path === "/admin/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path === "/admin/login") {
      next();
    } else {
      next("/admin/login");
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
