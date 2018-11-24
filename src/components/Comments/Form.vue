<template>
  <b-form @submit="onSubmit">
    <b-row class="h-100" align-v="center">
      <b-col lg="6" md="7" sm="12">
        <b-form-group label="Optional name:" label-for="name">
          <b-form-input v-model="form.name" id="name" type="text" placeholder="Enter your name (optional)…" />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Optional file:" label-for="file">
          <b-form-file v-model="form.file" id="file" placeholder="Choose a file (optional)..." />
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group
      label="Message:"
      label-for="content"
    >
      <b-form-textarea v-model="form.content" id="content" rows="3" max-rows="6" placeholder="Enter your message…" />
    </b-form-group>

    <b-button class="float-right" type="submit" variant="primary">Post</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { nameStore, formStore } from "@/store/local";

type MaybeString = string | null;
type MaybeFile = File | null;

interface FormData {
  file: MaybeFile;
  name: MaybeString;
  content: MaybeString;
}

@Component({})
export default class CommentForm extends Vue {
  @Prop(String) guid!: string;
  @Prop(String) board!: string;

  get uniqueCommentID() {
    return `${this.board}-${this.guid}`;
  }

  form: FormData = {
    name: null,
    file: null,
    content: null
  };

  storeData(data: FormData) {
    formStore.setItem<MaybeString>(this.uniqueCommentID, data.content);

    if (data.name) {
      nameStore.setItem<MaybeString>("name", data.name);
    }
  }

  sendData({ name, file, content }: FormData) {
    if (!content) {
      return;
    }
    this.$store.dispatch("createComment", {
      threadId: this.guid,
      name,
      file,
      content
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (navigator.onLine) {
      this.sendData({ ...this.form });
    } else {
      this.storeData({ ...this.form });
    }
  }

  @Watch("uniqueCommentID", { immediate: true })
  onThreadChange() {
    nameStore.getItem<MaybeString>("name").then(name => {
      this.form.name = name;
    });

    formStore.getItem<MaybeString>(this.uniqueCommentID).then(content => {
      this.form.content = content;
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
