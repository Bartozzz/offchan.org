<template>
  <div class="error">
    <p class="error-message">An error occurred…</p>
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

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  // background-image: url(../assets/error/error-1.gif);
  background-image: url(../assets/error/error-2.gif);
  // background-image: url(../assets/error/error-3.gif);
  background-color: #111111;

  width: 100vw;
  height: 100vh;

  &:after {
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    width: 120px;
    height: 40px;

    background-image: url(../assets/stuff/navi.gif);
    background-repeat: no-repeat;

    content: "";
  }

  &-message {
    padding: 1rem 2rem;
    margin: 0 auto;

    font-size: 3rem;
    max-width: 500px;

    background-color: #cb5f75;
    color: #ffffff;

    // Glitch on text:
    &:after {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background-image: url(../assets/error/error-3.gif);

      content: "";
    }
  }
}
</style>
