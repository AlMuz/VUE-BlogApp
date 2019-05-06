<template>
  <div>
    <div class="d-flex justify-content-between mt-4">
      <button @click="getPreviousArticles()" :disabled="articles.prev_page_url === null" class="btn btn-warning"> Previous page </button>
      <button @click="getNextArticles()" :disabled="articles.next_page_url === null" class="btn btn-warning"> Next page </button>
    </div>
    <div class="row" v-if="!loading">
      <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
        <Article :article="article" />
      </div>
    </div>
    <div class="loader text-center" v-else>
      <i class="fas fa-5x fa-spin fa-spinner"></i>
    </div>
  </div>
</template>

<script>

import Axios from 'axios';
import config from '@/config';
import Article from '@/components/Article.vue';
var getArticleUrl =  `${config.apiUrl}/articles`;

export default {
  components: {
    Article
  },
  data() {
    return {
      articles: {},
      loading: true
    }
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles(url = getArticleUrl) {

      this.loading = true;
      Axios.get(url)
      .then(response => {

        this.loading = false;
        this.articles = response.data.data;
      })
    },
    getNextArticles() {
      this.getArticles(this.articles.next_page_url);
    },
    getPreviousArticles() {
      this.getArticles(this.articles.prev_page_url);
    }
  }
}
</script>

<style>
.btn-warning {
  color: #fff ;
}
</style>
