<template>
  <ul class="comments">
    <li v-for="(comment, index) in data" :key="index" class="comment">
      <CommentPost :guid="comment.id">
        <template slot="author">{{ comment.author || "Anon" }}</template>

        <template slot="upload-file">
          <b-card-img
            v-if="comment.image"
            :src="getImageUrl(comment.image)"
            alt="Comment image"
          />
        </template>

        <MarkdownRenderer :content="comment.content"></MarkdownRenderer>
      </CommentPost>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CommentPost from "./Post.vue";
import MarkdownRenderer from "@/components/Markdown/Renderer.vue";
import { getImageUrl } from "@/helpers/getImageUrl";

@Component({
  components: {
    CommentPost,
    MarkdownRenderer
  }
})
export default class CommentsList extends Vue {
  @Prop(Array) data!: Array<Object>;

  getImageUrl(uuid: string) {
    return getImageUrl(uuid);
  }
}
</script>

<style lang="scss" scoped>
.comments {
  list-style: none;

  margin: 0;
  padding: 0;

  & > .comment {
    margin: 1rem 0;
  }
}
</style>
