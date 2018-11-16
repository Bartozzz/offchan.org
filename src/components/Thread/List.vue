<template>
  <ul class="threads">
    <li v-for="(thread, index) in threads" :key="index" class="thread">
      <ThreadPost>
        <template slot="author">
          {{ thread.author || "Anon" }}
        </template>

        <template slot="upload-file">
          <b-card-img :src="thread.image" alt="Thread image" />
        </template>

        <template slot="upload-name">
          {{ thread.image }}
        </template>

        {{ thread.content }}
      </ThreadPost>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThreadPost from "./Post.vue";

@Component({
  components: {
    ThreadPost
  }
})
export default class ThreadList extends Vue {
  threads = [
    {
      id: "guid-1",
      date: +new Date(),
      image: "https://placekitten.com/480/400",
      author: "Author",
      content: "Foo bar"
    },
    {
      id: "guid-2",
      date: +new Date(),
      image: "https://placekitten.com/480/400",
      content: "Foo bar 2"
    }
  ];
}
</script>

<style lang="scss" scoped>
.threads {
  list-style: none;

  margin: 0;
  padding: 0;

  & > .thread {
    margin: 1rem 0;
  }
}
</style>
