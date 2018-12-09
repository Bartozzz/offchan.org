<template>
  <div id="app">
    <section class="offline" v-if="!isOnline">You are offline.</section>

    <router-view/>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { Component as VueComponent } from "vue";
import { Component, Vue } from "vue-property-decorator";
import { BeforeInstallPromptEvent } from "./plugins/pwa-install";

@Component({})
export default class App extends Vue {
  isOnline = true;

  errorCaptured(err: Error, vm: VueComponent, info: string) {
    // TODO: send logs somewhere
    console.error(err);
    console.error(info);

    this.$router.push("/error");
  }

  created() {
    this.$on("online", () => {
      this.isOnline = true;
    });

    this.$on("offline", () => {
      this.isOnline = false;
    });

    this.$on("canInstall", (event: BeforeInstallPromptEvent) => {
      event.preventDefault();

      console.log("App can be installed; showing prompt.");

      const installPop = document.getElementById("install-pop") as HTMLElement;
      const installBtn = document.getElementById("install-btn") as HTMLElement;

      installPop.style.display = "flex";
      installBtn.addEventListener("click", () => {
        installPop.style.display = "none";

        event.prompt();
        event.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
        });
      });
    });
  }

  mounted() {
    this.$store.dispatch("fetchThreadsCounter");
  }
}
</script>


<style lang="scss">
*,
*:before,
*:after {
  /* Make transparent link selection, adjust last value opacity 0 to 1.0 */
  -webkit-tap-highlight-color: rgba(black, 0);
}

#app {
  position: absolute;

  height: 100%;
  width: 100%;

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Prevent callout to copy image, etc when tap to hold */
  -webkit-touch-callout: none;

  /* Prevent webkit from resizing text to fit */
  -webkit-text-size-adjust: none;
}

.offline {
  padding: 0.25rem 0;
  margin: 0;

  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;

  background-color: #cb5f75;
}
</style>
