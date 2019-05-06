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
            <select class="form-control my-3" v-model="category">
              <option selected value="0">Select a category</option>
              <option :value="category.id" :key="category.id" v-for="category in categories">
                {{ category.name }}
              </option>
            </select>
            <input type="text" v-model="title" placeholder="Title" class="my-3 form-control">
            <wysiwyg v-model="content" />
            <div class="text-center mt-3">
              <button :disabled="loading" @click="createArticle" class="btn btn-success btn-lg">
                <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                {{ loading ? '' : 'Create article'}}
              </button>
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
import config from '@/config';

var getCategoriesUrl =  `${config.apiUrl}/categories`;
var postArticlesUrl =  `${config.apiUrl}/articles`;

export default {
  beforeRouteEnter(to, from, next) {

    if (!localStorage.getItem('auth')) {
      return next({ path: "/login" });
    }

    next();
  },
  mounted() {
    this.getCategories();
  },
  components: {
    PictureInput
  },
  data() {
    return {
      categories: [],
      title: '',
      category: '',
      content: '',
      image: null,
      loading: false
    }
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {

      if (!this.title || !this.image || !this.category || this.content) {
        this.$noty.error('Please fill all fields!');
        return
      }

      this.loading = true;
      const form = new FormData();
      form.append('file', this.image);
      form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET );
      form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

      Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
      .then(response =>
        Axios.post(postArticlesUrl, {
          title: this.title,
          content: this.content,
          category_id: this.category,
          imageUrl: response.data.secure_url
        }, {
          headers: {
            Authorization: `Bearer ${this.$root.auth.token}`
          }
        })
        .then(() => {

          this.loading = false;
          this.$noty.success('Article created succesfully');
          this.$router.push('/');
        }).catch(() => {

          this.loading = false;
          this.$noty.error('Oops something went wrong');
        })
      ).catch(() => {

        this.loading = false;
        this.$noty.error('Oops something went wrong');
      });

    },
    getCategories() {

      const categories = localStorage.getItem('categories');
      if(categories) {
        this.categories = JSON.parse(categories);
        return
      }
      Axios.get(getCategoriesUrl)
      .then(response => {
        this.categories = response.data.categories;
        localStorage.setItem('categories', JSON.stringify(this.categories));
      })
    }
  }
}
</script>
