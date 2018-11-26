<template>
  <b-form @submit.prevent="onSubmit">
    <b-row class="h-100" align-v="center">
      <b-col lg="6" md="7" sm="12">
        <b-form-group
          label="Name:"
          label-for="name"
          description="Name is optional. If you left this field empty, you'll post anonymously."
        >
          <b-form-input
            v-model="form.name"
            :state="getFieldState('name')"
            id="name"
            type="text"
            placeholder="Enter your name…"
            aria-describedby="name-feedback"
          />

          <b-form-invalid-feedback id="name-feedback">
            {{ errors.name }}
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group
          label="File:"
          label-for="file"
          description="File is optional. Accepted file types: PNG, JPG, GIF, …"
        >
          <b-form-file
            v-model="form.file"
            :state="getFieldState('file')"
            id="file"
            placeholder="Choose a file..."
            aria-describedby="file-feedback"
            disabled
          />

          <b-form-invalid-feedback id="file-feedback">
            {{ errors.file }}
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group label="Message:" label-for="content">
      <b-form-textarea
        v-model="form.content"
        :state="getFieldState('content')"
        @keyup.enter.exact.native="/* onSubmit */"
        id="content"
        rows="3"
        max-rows="6"
        placeholder="Enter your message…"
        aria-describedby="content-feedback"
      />

      <b-form-invalid-feedback id="content-feedback">
        {{ errors.content }}
      </b-form-invalid-feedback>
    </b-form-group>

    <b-button class="float-right" type="submit" variant="primary"
      >Post</b-button
    >
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { nameStore, formStore } from "@/store/local";
import { normalizeString } from "@/helpers/validators";

type MaybeString = string | null | void;
type MaybeFile = File | null | void;

interface FormErrors {
  file: MaybeString;
  name: MaybeString;
  content: MaybeString;
}

interface FormData {
  file: MaybeFile;
  name: MaybeString;
  content: MaybeString;
}

@Component({})
export default class ThreadForm extends Vue {
  @Prop(String) board!: string;

  errors: FormErrors = {
    name: null,
    file: null,
    content: null
  };

  form: FormData = {
    name: null,
    file: null,
    content: null
  };

  get uniqueBoardID() {
    return this.board;
  }

  // Returns undefined if there's no error for a field:
  getFieldState(field: keyof FormErrors) {
    if (this.errors[field]) {
      return false;
    }
  }

  resetErrors() {
    this.errors.content = null;
    this.errors.file = null;
    this.errors.name = null;
  }

  resetForm() {
    this.form.content = null;
    this.form.file = null;

    // NOTE: don't clear name since it should be persistent for the session:
    // this.form.name = null;
  }

  validateForm(data: FormData) {
    if (!data.content) {
      this.errors.content = "Message is required.";
      return false;
    }

    return true;
  }

  storeData(data: FormData) {
    formStore.setItem<MaybeString>(this.uniqueBoardID, data.content);
  }

  sendData(data: FormData) {
    if (this.validateForm(data)) {
      this.resetErrors();
      this.resetForm();

      // Reset local storage:
      formStore.setItem<MaybeString>(this.uniqueBoardID, null);

      // Send thread:
      this.$store.dispatch("createThread", {
        board: this.uniqueBoardID,
        name: data.name,
        file: data.file,
        content: data.content
      });
    }
  }

  onSubmit(event: Event) {
    // Normalize form data for further validation:
    const form: FormData = {
      content: normalizeString(this.form.content),
      name: normalizeString(this.form.name),
      file: this.form.file
    };

    // Form name is always persistent, no matter if user is online or not:
    if (form.name) {
      nameStore.setItem<MaybeString>("name", form.name);
    }

    if (navigator.onLine) {
      this.sendData(form);
    } else {
      this.storeData(form);
    }
  }

  @Watch("uniqueBoardID", { immediate: true })
  onBoardChange() {
    nameStore.getItem<MaybeString>("name").then(name => {
      this.form.name = name;
    });

    formStore.getItem<MaybeString>(this.uniqueBoardID).then(content => {
      this.form.content = content;
    });
  }
}
</script>
