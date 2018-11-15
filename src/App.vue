<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
</style>
