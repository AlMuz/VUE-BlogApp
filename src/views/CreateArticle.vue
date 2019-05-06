<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <picture-input
              accept="image/jpeg,image/png"
              size="5"
              button-class="btn btn-danger"
              @change="onChange">
            </picture-input>
            <input type="text" v-model="title" placeholder="Title" class="mb-3 form-control">
            <wysiwyg v-model="content" />
            <div class="text-center mt-3">
              <button @click="createArticle" class="btn btn-success btn-lg">Create article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Axios from 'axios';
import PictureInput from 'vue-picture-input';

export default {
  mounted() {
    console.log(process.env)
  },
  components: {
    PictureInput
  },
  data() {
    return {
      title: '',
      content: '',
      image: null
    }
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {

      const form = new FormData();
      form.append('file', this.image);
      form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
      form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

      Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
      .then(response => console.log(response));

    }
  }
}
</script>
