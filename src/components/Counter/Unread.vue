<template>
  <span v-if="counter === '+' || counter > 0">{{ counter }}</span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "@/store/getInitialState";
import { Board } from "@/api/types";

@Component({})
export default class UnreadCounter extends Vue {
  @Prop(String) board!: Board;

  get counter() {
    try {
      const state = this.$store.state as State;
      const server = state.counters.threads.server[this.board];
      const client = state.counters.threads.client[this.board];
      const unread = server - client;

      return unread > 9 ? "+" : unread;
    } catch (_) {
      return null;
    }
  }
}
</script>
