<template>
  <b-navbar toggleable="md" type="dark" variant="black">
    <a @click.prevent="$router.go(-1)" class="back" :class="{ 'is-visible': showBack }">
      &lsaquo;
    </a>

    <b-navbar-brand tag="router-link" to="/" class="logo">
      <img class="logo-img" src="../../assets/os.gif" />
      <span class="logo-txt" data-text="Offchan">Offchan</span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
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
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
  @Prop({ type: Boolean, default: false })
  showBack!: boolean;

  get categories() {
    return this.$store.getters.categories;
  }
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

      padding: 0 0.35rem 0 1rem;
      margin: 0;

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
