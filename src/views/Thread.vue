<template>
  <b-container>
    <ThreadPost :board="board" :guid="thread" :comments="data.comments" class="full-thread">
      <template slot="author">
        {{ data.author || "Anon" }}
      </template>

      <template slot="upload-file">
        <b-card-img :src="data.image" alt="Thread image" />
      </template>

      <template slot="upload-name">
        {{ data.image }}
      </template>

      {{ data.content }}
    </ThreadPost>

    <CommentForm></CommentForm>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThreadPost from "@/components/Thread/Post.vue";
import CommentForm from "@/components/Comments/Form.vue";

@Component({
  components: {
    ThreadPost,
    CommentForm
  }
})
export default class ThreadView extends Vue {
  get board() {
    return this.$route.params.board;
  }

  get thread() {
    return this.$route.params.thread;
  }

  data = {
    id: "guid-1",
    date: +new Date(),
    image: "https://arisuchan.jp/q/src/1504811384320.png",
    author: "Author",
    content:
      "Right as I fall asleep, something odd happens. Just before i succumb to the depths of sleep, my brain sort of sends a shock to my entire body, sort of refusing to fall asleep. Sometimes it gets weirder, I've had these times where I actually fell asleep but not entirely, my brain was still in touch with reality somehow, something in me knew that I was bound to wake up very soon. During these times I often have short spanned dreams with a tragic ending, such as falling from a tall place or getting hurt in other serious ways, sometimes involving other human beings. The thing that tripped me out the most in this scenario is how time goes on, when my 'hidden consciousness' sort of was sure that little time had been spent.",

    comments: [
      {
        id: "guid-1",
        date: +new Date(),
        image: "https://arisuchan.jp/feels/src/1519444652437.jpeg",
        author: "Author",
        content:
          "I have those, a lot actually. I don't remember the dream that I have before I wake up. I always thought that my dream finished with me falling. Just one time was out of the ordinary, I felt like someone or something pushed me into the bed as I was waking up. I never gave them much thoughts tho."
      },
      {
        id: "guid-2",
        date: +new Date(),
        image: "https://arisuchan.jp/feels/src/1542260431602.png",
        content:
          "That's your brain checking to see if the mind is asleep before putting you into sleep paralysis. If you're asleep your brain can put you under paralysis so you don't act out your dreams (kinda like sleep walking). And if you are awake, the zap makes you react and your brain knows you're still conscious, trying again later."
      }
    ]
  };
}
</script>

<style lang="scss" scoped>
.full-thread {
  margin: 5rem 0;
}
</style>
