<template>
  <b-container>
    <b-jumbotron bg-variant="black" text-variant="white" class="jumbotron">
      <template slot="header">
        /{{ category.board }}/
        <span class="d-none d-md-inline">– {{ category.name }}</span>
      </template>

      <template slot="lead">{{ category.description }}</template>

      <hr class="my-4">

      <ThreadForm :board="category.board"></ThreadForm>
    </b-jumbotron>

    <ThreadList :data="threads"></ThreadList>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { categories, Category } from "@/config";
import ThreadForm from "@/components/Thread/Form.vue";
import ThreadList from "@/components/Thread/List.vue";
import { State } from "@/store/getInitialState";
import { Boards } from "@/api/types";

@Component({
  components: {
    ThreadForm,
    ThreadList
  }
})
export default class ThreadsView extends Vue {
  get board() {
    return this.$route.params.board as Boards;
  }

  get category() {
    return categories.find(cat => cat.board === this.board);
  }

  get threads() {
    const state = this.$store.state as State;

    return state.threads[this.board].document;
  }

  @Watch("category", { immediate: true })
  onCategoryChange(category?: Category) {
    if (!category) {
      this.$router.push("/error");
      return;
    }
    this.$store.dispatch("fetchThreads", { board: category.board });
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
