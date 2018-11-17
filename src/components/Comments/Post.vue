<template>
  <b-card tag="article" class="comment" bg-variant="black" border-variant="dark" no-body>
    <b-row no-gutters>
      <b-col lg="2" md="3" sm="12">
        <slot name="upload-file"></slot>
      </b-col>

      <b-col>
        <header class="comment-header text-muted">
          <span class="comment-id">#{{ guid }}</span>
          <slot name="author">Anon</slot>
        </header>

        <b-card-body class="comment-content">
          <slot></slot>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class CommentPost extends Vue {
  @Prop(String) guid!: string;
}
</script>

<style lang="scss" scoped>
.comment {
  border-width: 1px;
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
