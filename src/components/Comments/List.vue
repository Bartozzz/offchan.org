<template>
  <ul class="comments">
    <li v-for="(comment, index) in data" :key="index" class="comment">
      <CommentPost :guid="comment.id">
        <template slot="author">
          {{ comment.author || "Anon" }}
        </template>

        <template slot="upload-file">
          <b-card-img v-if="comment.image" :src="comment.image" alt="Comment image" />
        </template>

        {{ comment.content }}
      </CommentPost>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CommentPost from "./Post.vue";

@Component({
  components: {
    CommentPost
  }
})
export default class CommentsList extends Vue {
  @Prop(Array) data!: Array<Object>;
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
