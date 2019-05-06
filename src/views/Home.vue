<template>
  <div class="row" v-if="articles.data">
    <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
      <Article :article="article" />
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
      articles: {}
    }
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      Axios.get(getArticleUrl)
      .then(response => {
        this.articles = response.data.data;
      })
    }
  }
}
</script>
