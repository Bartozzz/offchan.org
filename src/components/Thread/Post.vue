<template>
  <b-card tag="article" class="thread" no-body>
    <b-row no-gutters>
      <b-col lg="2" md="3" sm="12">
        <slot name="upload-file"></slot>
      </b-col>

      <b-col>
        <header class="thread-header text-muted">
          <slot name="author">Anon</slot>
        </header>

        <b-card-body class="thread-content">
          <slot></slot>
        </b-card-body>
      </b-col>
    </b-row>

    <b-card-footer class="w-100 text-muted">
      <section class="float-left">
        <slot name="upload-name"></slot>
      </section>

      <section class="text-right">
        <a href="#" class="card-link">View</a>
        <a href="#" class="card-link">Reply</a>
      </section>
    </b-card-footer>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ThreadPost extends Vue {}
</script>

<style lang="scss" scoped>
.thread {
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: #cb5f75;
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
