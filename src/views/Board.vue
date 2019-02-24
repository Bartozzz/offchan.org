<template>
  <main>
    <Header :showBack="Boolean(thread)"></Header>

    <!-- Displays threads list of full thread -->
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { categories, Category } from "@/config";
import Header from "@/components/Header/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class BoardView extends Vue {
  get thread() {
    return this.$route.params.thread;
  }

  get board() {
    return categories.find(cat => cat.board === this.$route.params.board);
  }

  markBoardAsSeen() {
    if (this.board) {
      this.$store.dispatch("markBoardAsSeen", {
        board: this.board.board
      });
    }
  }

  @Watch("board", { immediate: true })
  onBoardChange(board?: Category) {
    if (!board) {
      this.$router.push("/error");
    } else {
      this.markBoardAsSeen();
    }
  }
}
</script>
