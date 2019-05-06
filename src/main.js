import Vue from 'vue'
import VueNoty from 'vuejs-noty'
import wysiwyg from "vue-wysiwyg"
import 'vue-wysiwyg/dist/vueWysiwyg.css';
import 'vuejs-noty/dist/vuejs-noty.css'
import App from './App.vue'
import router from './router'

Vue.use(VueNoty);
Vue.use(wysiwyg, {});

Vue.config.productionTip = false

const authData = localStorage.getItem("auth");

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {}
  },
  render: h => h(App),
}).$mount('#app')
