<template>
  <div id="app">
    <section class="offline" v-if="!isOnline">
      You are offline.
    </section>

    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  isOnline = true;

  created() {
    this.$on("online", () => {
      this.isOnline = true;
    });

    this.$on("offline", () => {
      this.isOnline = false;
    });
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
