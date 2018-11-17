<template>
  <div class="view">
    <Header></Header>

    <b-container>
      <b-jumbotron bg-variant="black" text-variant="white" class="jumbotron">
        <template slot="header">
          /{{ category.board }}/ <span class="d-none d-md-inline">– {{ category.name }}</span>
        </template>

        <template slot="lead">
          {{ category.description }}
        </template>

        <hr class="my-4">

        <ThreadForm></ThreadForm>
      </b-jumbotron>
    </b-container>

    <b-container>
      <ThreadList></ThreadList>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { categories, Category } from "@/config";
import Header from "@/components/Header/Header.vue";
import ThreadForm from "@/components/Thread/Form.vue";
import ThreadList from "@/components/Thread/List.vue";

@Component({
  components: {
    Header,
    ThreadForm,
    ThreadList
  }
})
export default class BoardView extends Vue {
  get category() {
    return categories.find(cat => cat.board === this.$route.params.category);
  }

  @Watch("category", { immediate: true })
  onCategoryChange(category?: Category) {
    if (!category) {
      this.$router.push("/error");
    }
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
