import Vue from "vue";
import VueBootstrap from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./registerServiceWorker";
import "./styles/_bootstrap.scss";

Vue.use(VueBootstrap);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
