<template>
  <div v-html="html"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "@/store/getInitialState";
import { Board } from "@/api/types";

import markdown from "markdown-it";
// @ts-ignore
import markdownItKatex from "markdown-it-katex";
// @ts-ignore
import markdownItContainer from "markdown-it-container";
// @ts-ignore
import markdownItSup from "markdown-it-sup";
// @ts-ignore
import markdownItSub from "markdown-it-sub";

const renderer = markdown({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true
});

@Component({})
export default class MarkdownRenderer extends Vue {
  renderer = renderer
    .disable("image")
    .use(markdownItKatex)
    .use(markdownItSup)
    .use(markdownItSub)
    .use(markdownItContainer, "spoiler", {
      validate(params: string) {
        return params.trim().match(/^spoiler/);
      }
    });

  @Prop(String) content!: string;

  get html() {
    return this.renderer.render(this.content);
  }
}
</script>

<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css);
@import "../../styles/configuration/bootstrap";

$spoiler-animation-duration: 7s;
$spoiler-stripe-size-a: 1px;
$spoiler-stripe-size-b: 2px;
$spolier-stripe-color-a: theme-color("primary");
$spoiler-stripe-color-b: theme-color("dark");

@keyframes animateSpoilerBackground {
  0% {
    background-position: 0 0, 0 0;
  }
  100% {
    background-position: -43px 0, 0 0;
  }
}

.spoiler > * {
  position: relative;

  color: transparent;
  background-color: $spoiler-stripe-color-b;
  background-position: 0 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='8px' width='43px'><text x='0' y='7' fill='black' font-size='10' font-family='monospace' font-weight='bold'>SPOILER</text></svg>"),
    repeating-linear-gradient(
      45deg,
      $spolier-stripe-color-a,
      $spolier-stripe-color-a $spoiler-stripe-size-a,
      $spoiler-stripe-color-b $spoiler-stripe-size-a,
      $spoiler-stripe-color-b ($spoiler-stripe-size-a + $spoiler-stripe-size-b)
    );

  animation: animateSpoilerBackground $spoiler-animation-duration linear
    infinite;

  &:hover {
    color: inherit;
    background-color: transparent;
    background-image: none;
  }
}
</style>
