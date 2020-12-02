import Vue from 'vue'
import App from './App.vue'
import {router,store} from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Editor from "vue2-editor";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueParticles from 'vue-particles'
import VueTypedJs  from 'vue-typed-js'
import AOS from 'aos'
import 'aos/dist/aos.css'
import vueSmoothScroll from 'vue2-smooth-scroll'
import HighchartsVue from 'highcharts-vue'

Vue.use(BootstrapVue);
Vue.use(Vue2Editor);
Vue.use(VueParticles);
Vue.use(VueTypedJs);
Vue.use(vueSmoothScroll);
Vue.use(HighchartsVue);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created () {
    AOS.init()
  },
  render: h => h(App)
}).$mount('#app')
