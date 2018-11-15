<template>
  <b-container fluid class="h-100">
    <b-row class="h-100" align-v="center">
      <b-col>
        <ul>
          <li v-for="(category, index) in categories" :key="index">
            <router-link :to="`/board/${category.board}/`" :title="category.description">
              /{{ category.board }}/ – {{ category.name }}
            </router-link>
          </li>
        </ul>
      </b-col>

      <b-col>
        <img alt="She's watching" src="../assets/lain/1.gif" />
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
</style>
