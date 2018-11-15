<template>
  <b-navbar toggleable="md" type="dark" variant="black">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">Offchan</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item
          v-for="(category, index) in categories"
          tag="router-link"
          :key="index"
          :to="`/board/${category.board}/`"
        >
          {{ category.board }}
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
