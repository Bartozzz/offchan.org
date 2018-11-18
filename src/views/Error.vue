<template>
  <div class="error">
    <div class="error-container">
      <p class="error-message">Error. Killing process…</p>
      <router-link class="error-button" to="/">Reboot</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ErrorView extends Vue {}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &-container {
    padding: 1rem;

    max-width: 530px;
  }

  &-message {
    position: relative;

    padding: 1rem 2rem;

    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;

    background-color: #cb5f75;
    color: #ffffff;

    // Glitch on text:
    // &:after {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //
    //   width: 100%;
    //   height: 100%;
    //
    //   background-image: url(../assets/error/error-3.gif);
    //
    //   content: "";
    // }
  }

  &-button {
    float: right;

    padding: 0.5rem 1rem;
    margin: 0.5rem 0;

    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;

    border-width: 4px;
    border-style: solid;
    border-color: #cb5f75;
    color: #ffffff;

    &:hover {
      background-color: #cb5f75;
    }
  }
}
</style>
