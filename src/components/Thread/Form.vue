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

          <b-form-invalid-feedback id="name-feedback">{{ errors.name }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group
          label="File:"
          label-for="file"
          description="File is optional. Accepted file types: PNG, JPG, GIF, …"
        >
          <b-form-file
            v-model="form.image"
            :state="getFieldState('image')"
            id="file"
            accept="image/jpeg, image/png, image/gif"
            placeholder="Choose a file..."
            aria-describedby="file-feedback"
          />

          <b-form-invalid-feedback id="file-feedback">{{ errors.image }}</b-form-invalid-feedback>
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

      <b-form-invalid-feedback id="content-feedback">{{ errors.content }}</b-form-invalid-feedback>
    </b-form-group>

    <b-button class="float-right" type="submit" variant="primary">Post</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { nameStore, formStore } from "@/store/local";
import { normalizeString } from "@/helpers/validators";
import { uploadFile } from "@/api/firebase/document/image";

type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type ThreadData = FormErrors;

interface FormErrors {
  name?: Nullable<string>;
  image?: Nullable<string>;
  content?: Nullable<string>;
}

interface FormData {
  name?: Nullable<string>;
  image?: Nullable<File>;
  content?: Nullable<string>;
}

@Component({})
export default class ThreadForm extends Vue {
  @Prop(String) board!: string;

  errors: FormErrors = {
    name: null,
    image: null,
    content: null
  };

  form: FormData = {
    name: null,
    image: null,
    content: null
  };

  // Returns undefined if there's no error for a field:
  getFieldState(field: keyof FormErrors) {
    if (this.errors[field]) {
      return false;
    }
  }

  resetErrors() {
    this.errors.content = null;
    this.errors.image = null;
    this.errors.name = null;
  }

  resetForm() {
    this.form.content = null;
    this.form.image = null;

    // NOTE: don't clear name since it should be persistent for the session:
    // this.form.name = null;
  }

  validateForm(data: ThreadData) {
    if (!data.content) {
      this.errors.content = "Message is required.";
      return false;
    }

    return true;
  }

  storeData(data: ThreadData) {
    // NOTE: image should not be stored (too large)
    // NotE: name already stored in onSubmit method
    formStore.setItem<Optional<Nullable<string>>>(this.board, data.content);
  }

  sendData(data: ThreadData) {
    if (this.validateForm(data)) {
      this.resetErrors();
      this.resetForm();

      // Reset local storage:
      formStore.setItem(this.board, null);

      // Send thread:
      this.$store.dispatch("createThread", {
        board: this.board,
        name: data.name,
        image: data.image,
        content: data.content
      });
    }
  }

  onSubmit(event: Event) {
    // Normalize form data for further validation:
    const form: ThreadData = {
      content: normalizeString(this.form.content),
      name: normalizeString(this.form.name)
    };

    // Form name is always persistent, no matter if user is online or not:
    if (form.name) {
      nameStore.setItem<Nullable<string>>("name", form.name);
    }

    if (navigator.onLine) {
      if (this.form.image) {
        const { task, fileName, filePath } = uploadFile(this.form.image);

        task.on("state_changed", this.onImageInfo, this.onImageError, () => {
          this.sendData({ ...form, image: fileName });
        });
      } else {
        this.sendData(form);
      }
    } else {
      this.storeData(form);
    }
  }

  onImageInfo(snapshot: Object) {
    const info = snapshot as { bytesTransferred: number; totalBytes: number };

    console.log((info.bytesTransferred / info.totalBytes) * 100);
  }

  onImageError(error: Error) {
    this.errors.image = error.message;
  }

  @Watch("board", { immediate: true })
  onBoardChange() {
    nameStore.getItem<Nullable<string>>("name").then(name => {
      this.form.name = name;
    });

    formStore.getItem<Nullable<string>>(this.board).then(content => {
      this.form.content = content;
    });
  }
}
</script>
