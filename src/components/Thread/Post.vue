<template>
  <div>
    <b-card tag="article" class="thread" no-body>
      <b-row no-gutters>
        <b-col lg="2" md="3" sm="12"> <slot name="upload-file"></slot> </b-col>

        <b-col>
          <header class="thread-header text-muted">
            <span class="thread-id">#{{ guid }}</span>
            <slot name="author">Anon</slot>
          </header>

          <b-card-body class="thread-content"> <slot></slot> </b-card-body>
        </b-col>
      </b-row>

      <b-card-footer>
        <section class="text-right">
          <router-link :to="`/board/${board}/${guid}`" class="card-link"
            >View</router-link
          >
          <router-link :to="`/board/${board}/${guid}`" class="card-link"
            >Reply</router-link
          >
        </section>
      </b-card-footer>
    </b-card>

    <CommentsList :data="comments" v-if="this.$route.name === 'threadFull'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CommentsList from "@/components/Comments/List.vue";

@Component({
  components: {
    CommentsList
  }
})
export default class ThreadPost extends Vue {
  @Prop(String) guid!: string;
  @Prop(String) board!: string;
  @Prop(Array) comments!: Array<Object>;
}
</script>

<style lang="scss" scoped>
@import "../../styles/configuration/bootstrap";

.thread {
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: theme-color("primary");
  border-radius: 0;

  &-header {
    padding: 0.5rem 1.25rem;
  }

  &-content {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>
