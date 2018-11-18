<template>
  <b-form @submit="onSubmit">
    <b-row class="h-100" align-v="center">
      <b-col lg="6" md="7" sm="12">
        <b-form-group
          label="Name:"
          label-for="name"
          description="Name is optional. If you left this field empty, you'll post anonymously."
        >
          <b-form-input v-model="form.name" id="name" type="text" placeholder="Enter your name…" />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group
          label="File:"
          label-for="file"
          description="File is optional. Accepted file types: PNG, JPG, GIF, …"
        >
          <b-form-file v-model="form.file" id="file" placeholder="Choose a file..." />
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
import { Component, Vue } from "vue-property-decorator";
import { nameStore, formStore } from "@/store/local";

type MaybeString = string | null;
type MaybeFile = File | null;

interface FormData {
  file: MaybeFile;
  name: MaybeString;
  content: MaybeString;
}

@Component({})
export default class ThreadForm extends Vue {
  form: FormData = {
    name: null,
    file: null,
    content: null
  };

  storeData(data: FormData) {
    formStore.setItem<MaybeString>("thread-form", data.content);

    if (data.name) {
      nameStore.setItem<MaybeString>("name", data.name);
    }
  }

  sendData(data: FormData) {
    // TODO
    console.log("Sending thread", data);
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

  created() {
    nameStore.getItem<MaybeString>("name").then(name => {
      this.form.name = name;
    });

    formStore.getItem<MaybeString>("thread-form").then(content => {
      this.form.content = content;
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
