<template>
  <b-form>
    <b-row class="h-100" align-v="center">
      <b-col>
        <b-form-group
          label="Name:"
          label-for="name"
          description="Name is optional. If you left this field empty, you'll post anonymously."
        >
          <b-form-input id="name" type="text" placeholder="Enter your name…" />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group
          label="File:"
          label-for="file"
          description="File is required. Accepted files: PNG, JPG, GIF, …"
        >
          <b-form-file id="file" placeholder="Choose a file..." required />
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
export default class ThreadForm extends Vue {}
</script>

<style lang="scss" scoped>
</style>
