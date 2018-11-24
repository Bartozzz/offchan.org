import Vue from "vue";
// @ts-ignore
import VueOffline from "vue-offline";
import VueBootstrap from "bootstrap-vue";
import PWAInstall from "@/plugins/pwa-install";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { auth } from "@/api/firebase";

import "./registerServiceWorker";
import "./styles/_bootstrap.scss";

Vue.use(PWAInstall);
Vue.use(VueOffline);
Vue.use(VueBootstrap);
Vue.config.productionTip = false;

function handleAuthFailure() {
  (document.querySelector("#app") as HTMLElement).innerHTML = `
    You cannot enter Offchan.
  `;
}

function handleAuthSuccess() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}

/**
 * Render Vue application only if auth succeded. This is because Firebase rules
 * require the user to be logged-in.
 */
auth.onAuthStateChanged(user => {
  if (user) {
    handleAuthSuccess();
  } else {
    handleAuthFailure();
  }
});

/**
 * Force log-in anonymouly.
 */
auth.signInAnonymously().catch(handleAuthFailure);
