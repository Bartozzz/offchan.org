<template>
  <b-form>
    <b-row class="h-100" align-v="center">
      <b-col lg="6" md="7" sm="12">
        <b-form-group label="Optional name:" label-for="name">
          <b-form-input id="name" type="text" placeholder="Enter your name (optional)…" />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Optional file:" label-for="file">
          <b-form-file id="file" placeholder="Choose a file (optional)..." />
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group
      label="Message:"
      label-for="message"
    >
      <b-form-textarea id="message" rows="3" max-rows="6" placeholder="Enter your message…" />
    </b-form-group>

    <b-button class="float-right" type="submit" variant="primary">Post</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class CommentForm extends Vue {}
</script>

<style lang="scss" scoped>
</style>
