import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },

    {
      path: "/board/:category?",
      name: "board",
      component: () =>
        import(/* webpackChunkName: "board" */ "../views/Board.vue")
    },

    {
      path: "/thread/:uid",
      name: "thread",
      component: () =>
        import(/* webpackChunkName: "thread" */ "../views/Thread.vue")
    },

    {
      alias: "*",
      path: "/error",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "error" */ "../views/Error.vue")
    }
  ]
});
