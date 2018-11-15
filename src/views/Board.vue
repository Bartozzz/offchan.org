<template>
  <div class="view">
    <Header />

    <b-container>
      <b-jumbotron bg-variant="black" text-variant="white" class="jumbotron">
        <template slot="header">
          /{{ category.board }}/ – {{ category.name }}
        </template>

        <template slot="lead">
          {{ category.description }}
        </template>

        <hr class="my-4">

        <ThreadForm></ThreadForm>
      </b-jumbotron>
    </b-container>

    <b-container>
      Board page
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as config from "@/config";
import Header from "@/components/Header/Header.vue";
import ThreadForm from "@/components/Thread/Form.vue";

@Component({
  components: {
    Header,
    ThreadForm
  }
})
export default class BoardView extends Vue {
  get category() {
    return config.categories.find(
      category => category.board === this.$route.params.category
    );
  }
}
</script>

<style lang="scss" scoped>
.jumbotron {
  // Head & lead
  & > h1,
  & > p {
    text-align: center;

    margin: 1rem auto;
    padding: 0;
  }

  & > p {
    max-width: 600px;
  }
}
</style>
