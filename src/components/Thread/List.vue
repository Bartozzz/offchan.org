<template>
  <ul class="threads">
    <li v-for="(thread, index) in data" :key="index" class="thread">
      <ThreadPost
        :board="board"
        :guid="thread.guid"
        :comments="thread.comments"
      >
        <template slot="author">{{ thread.author || "Anon" }}</template>

        <template slot="upload-file">
          <b-card-img
            v-if="thread.image"
            :src="getImageUrl(thread.image)"
            alt="Thread image"
          />
        </template>

        <template slot="upload-name">{{ getImageUrl(thread.image) }}</template>

        <MarkdownRenderer :content="thread.content"></MarkdownRenderer>
      </ThreadPost>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ThreadPost from "./Post.vue";
import MarkdownRenderer from "@/components/Markdown/Renderer.vue";
import { getImageUrl } from "@/helpers/getImageUrl";
import { Thread } from "@/api/firebase/document/thread";

@Component({
  components: {
    ThreadPost,
    MarkdownRenderer
  }
})
export default class ThreadList extends Vue {
  @Prop(Array) data!: Thread[];

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
