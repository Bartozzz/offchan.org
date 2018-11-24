<template>
  <b-container fluid class="h-100">
    <b-row class="h-100" align-v="center">
      <b-col class="d-none d-lg-block">
        <img class="w-100" alt="She's watching" src="../assets/lain/1.gif" />
      </b-col>

      <b-col>
        <ul class="boards">
          <li v-for="(category, index) in categories" :key="index">
            <router-link
              :to="`/board/${category.board}/`"
              :title="category.description"
              :data-text="`/${category.board}/ – ${category.name}`"
              class="board"
            >
              <span class="board-name"
                >/{{ category.board }}/ – {{ category.name }}</span
              >
              <span class="board-desc">{{ category.description }}</span>
            </router-link>
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as config from "@/config";

@Component({})
export default class HomeView extends Vue {
  categories = config.categories;
}
</script>

<style lang="scss" scoped>
@import "../styles/configuration/bootstrap";
@import "../styles/mixins/glitch";

$glitch-intensity: 7;
$glitch-text-color: theme-color("secondary");
$glitch-background: theme-color("black");
$glitch-color-a: theme-color("black");
$glitch-color-b: theme-color("black");
$glitch-height: 50;

.boards {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  align-items: flex-start;
  justify-content: left;

  height: 100%;
  width: 100%;

  list-style: none;

  &,
  & > li {
    margin: 0;
    padding: 0;
  }
}

.board {
  display: block;

  font-size: 4.5vmin;
  font-weight: bold;
  text-decoration: none;
  color: theme-color("primary");

  opacity: 0.75;

  @include media-breakpoint-down(sm) {
    font-size: 6vmin;
  }

  &:hover {
    @include textGlitch(
      "logo",
      $glitch-intensity,
      $glitch-text-color,
      $glitch-background,
      $glitch-color-a,
      $glitch-color-b,
      $glitch-height
    );
  }

  &-name,
  &-desc {
    display: block;
  }

  &-desc {
    font-size: 1.75vmin;
    font-family: $font-family-monospace;

    opacity: 0.65;
  }
}
</style>
