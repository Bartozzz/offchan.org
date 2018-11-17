<template>
  <ul class="threads">
    <li v-for="(thread, index) in threads" :key="index" class="thread">
      <ThreadPost :board="board" :guid="thread.id" :comments="thread.comments">
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
  get board() {
    return this.$route.params.board;
  }

  threads = [
    {
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
    },
    {
      id: "guid-2",
      date: +new Date(),
      image: "https://arisuchan.jp/q/src/1540224466819.gif",
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
    margin: 4rem 0;
  }
}
</style>
