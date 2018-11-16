<template>
  <b-navbar toggleable="md" type="dark" variant="black">
    <b-navbar-brand tag="router-link" to="/">Offchan</b-navbar-brand>
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
