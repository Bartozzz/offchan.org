import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },

    {
      path: "/board/:board",
      name: "board",
      component: () =>
        import(/* webpackChunkName: "board" */ "../views/Board.vue"),

      children: [
        {
          path: "",
          name: "threadList",
          component: () =>
            import(/* webpackChunkName: "threads" */ "../views/Threads.vue")
        },
        {
          path: ":thread",
          name: "threadFull",
          component: () =>
            import(/* webpackChunkName: "thread" */ "../views/Thread.vue")
        }
      ]
    },

    {
      path: "*",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "error" */ "../views/Error.vue")
    }
  ]
});
