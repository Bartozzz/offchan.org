<template>
  <span v-if="counter > 0">{{ counter }}</span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "@/store/getInitialState";
import { Board } from "@/api/types";

@Component({})
export default class UnreadCounter extends Vue {
  @Prop(String) board!: Board;

  get counter() {
    const state = this.$store.state as State;
    const total = state.counters.threads.server[this.board];
    const readed = state.counters.threads.user[this.board];

    return total - readed;
  }
}
</script>

<style lang="scss" scoped>
</style>
