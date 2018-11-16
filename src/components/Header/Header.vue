<template>
  <b-navbar toggleable="md" type="dark" variant="black">
    <b-navbar-brand tag="router-link" to="/">
      <img class="logo-img" src="../../assets/os.gif" />
      <span class="logo-txt" data-text="Offchan">Offchan</span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item
          v-for="(category, index) in categories"
          tag="router-link"
          :key="index"
          :to="`/board/${category.board}/`"
          :title="`${category.name} - ${category.description }`"
        >
          <span class="category-board">/{{ category.board }}/</span>
          <span class="category-name"> - {{ category.name }}</span>
          <span class="category-description">{{ category.description }}</span>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as config from "@/config";

@Component({})
export default class Header extends Vue {
  categories = config.categories;
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins/glitch";

$glitch-intensity: 5;
$glitch-text-color: white;
$glitch-background: #111111;
$glitch-color-a: black;
$glitch-color-b: black;
$glitch-width: 70;
$glitch-height: 30;

.logo {
  &-img {
    height: 35px;

    margin: 0 1rem 0 0;
  }

  &-txt {
    color: $glitch-text-color;

    font-weight: bold;
    font-size: 1.25rem;

    @include textGlitch(
      "logo",
      $glitch-intensity,
      $glitch-text-color,
      $glitch-background,
      $glitch-color-a,
      $glitch-color-b,
      $glitch-width,
      $glitch-height
    );
  }
}

.category {
  &-board {
    @media screen and (max-width: 768px - 1px) {
      display: inline-block;

      padding: 0 0 0 1rem;
      margin: 0;

      min-width: 60px;

      font-weight: bold;
      color: #cb5f75;
    }
  }

  &-name {
    display: none;

    color: #cb5f75;

    @media screen and (max-width: 768px - 1px) {
      display: inline-block;
    }
  }

  &-description {
    display: none;

    padding: 0 1rem;
    margin: 0;

    @media screen and (max-width: 768px - 1px) {
      display: block;
    }
  }
}
</style>
