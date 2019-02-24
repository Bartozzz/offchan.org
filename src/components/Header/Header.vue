<template>
  <b-navbar sticky toggleable="md" type="dark" variant="black">
    <a @click.prevent="goBack" class="back" :class="{ 'is-visible': showBack }">&lsaquo;</a>

    <b-navbar-brand to="/" exact class="logo">
      <img class="logo-img" src="../../assets/os.gif">
      <span class="logo-txt" data-text="Offchan">Offchan</span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          v-for="(category, index) in categories"
          class="category"
          :key="index"
          :to="`/board/${category.board}/`"
          :title="`${category.name} - ${category.description}`"
        >
          <span class="category-board">/{{ category.board }}/</span>
          <span class="category-name">- {{ category.name }}</span>
          <span class="category-description">{{ category.description }}</span>
          <UnreadCounter class="unread" :board="category.board"></UnreadCounter>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UnreadCounter from "../Counter/Unread.vue";
import * as config from "@/config";

@Component({
  components: {
    UnreadCounter
  }
})
export default class Header extends Vue {
  @Prop({ type: Boolean, default: false })
  showBack!: boolean;

  categories = config.categories;

  goBack() {
    // Fixes issue #52 – for a page loaded in a new tab this property returns 1:
    if (history.length > 1) {
      this.$router.go(-1);
    } else {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixins/glitch";
@import "../../styles/configuration/bootstrap";

$glitch-intensity: 5;
$glitch-text-color: $body-color;
$glitch-background: theme-color("dark");
$glitch-color-a: theme-color("black");
$glitch-color-b: theme-color("black");
$glitch-height: 30;

.back {
  padding: 0 1.25rem 0 0.75rem;
  margin: -5px 0 0 0;

  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;

  cursor: pointer;

  opacity: 0;
  transform: translateX(-50px);
  transition: all 350ms ease;

  &.is-visible {
    opacity: 1;
    transform: translateX(0);
  }
}

$unread-size-md: 16px;
$unread-size-sm: 18px;

.unread {
  position: absolute;
  top: -13px;
  right: 0;

  // Vertical & horizontal center:
  text-align: center;
  line-height: $unread-size-md;

  width: $unread-size-md;
  height: $unread-size-md;
  font-size: $unread-size-md * 0.65;
  font-weight: 900;
  font-family: $font-family-monospace;

  background-color: theme-color("primary");
  color: $white;

  border-width: 0;
  border-radius: 100%;

  @include media-breakpoint-down(sm) {
    left: -10px;
    top: 50%;

    transform: translateY(-50%);

    width: $unread-size-sm;
    height: $unread-size-sm;
    line-height: $unread-size-sm;
    font-size: $unread-size-sm * 0.65;
  }
}

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
      $glitch-height
    );
  }
}

.category {
  position: relative;

  @include media-breakpoint-down(sm) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &-board {
    @include media-breakpoint-up(sm) {
      font-family: $font-family-monospace;
      font-size: 0.85rem;
    }

    @include media-breakpoint-down(sm) {
      display: inline-block;

      padding: 0 0.35rem 0 1rem;
      margin: 0;

      font-weight: bold;
      color: theme-color("primary");
    }
  }

  &-name {
    display: none;

    color: theme-color("primary");

    @include media-breakpoint-down(sm) {
      display: inline-block;
    }
  }

  &-description {
    display: none;

    padding: 0 1rem;
    margin: 0;

    @include media-breakpoint-down(sm) {
      display: block;
    }
  }
}
</style>
