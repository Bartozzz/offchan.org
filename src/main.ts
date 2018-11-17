import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./api/firebase";
import "./registerServiceWorker";

Vue.config.productionTip = false;

function handleAuthFailure() {
  (<Element>document.querySelector("#app")).innerHTML = `
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
