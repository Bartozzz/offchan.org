<template>
  <ul class="threads">
    <li v-for="(thread, index) in threads" :key="index" class="thread">
      <ThreadPost :board="board" :guid="thread.guid" :comments="thread.comments">
        <template slot="author">
          {{ thread.author || "Anon" }}
        </template>

        <template slot="upload-file">
          <b-card-img v-if="thread.image" :src="getImageUrl(thread.image)" alt="Thread image" />
        </template>

        <template slot="upload-name">
          {{ getImageUrl(thread.image) }}
        </template>

        {{ thread.content }}
      </ThreadPost>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThreadPost from "./Post.vue";
import { getImageUrl } from "@/helpers/getImageUrl";

@Component({
  components: {
    ThreadPost
  }
})
export default class ThreadList extends Vue {
  get threads() {
    return this.$store.state.threads[this.board];
  }

  get board() {
    return this.$route.params.board;
  }

  getImageUrl(uuid: string) {
    return getImageUrl(uuid);
  }
}
</script>

<style lang="scss" scoped>
.threads {
  list-style: none;

  margin: 0;
  padding: 0;

  & > .thread {
    margin: 4rem 0;
  }
}
</style>
