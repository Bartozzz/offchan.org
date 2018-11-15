<template>
  <div class="error">
    <p class="error-message">An error occurred, please refresh</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ErrorView extends Vue {}
</script>

<style lang="scss" scoped>
.error {
  position: relative;

  background-image: url(../assets/error-1.gif);
  background-size: contain;
  background-position: bottom;

  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;

  width: 100vw;
  height: 100vh;

  &-message {
    position: absolute;
    top: 3rem;
    left: 3rem;

    padding: 1rem 2rem;
    margin: 0;

    font-size: 4rem;

    background-color: #cb5f75;
    color: #ffffff;
  }
}
</style>
