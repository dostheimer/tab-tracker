import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Panel from '@/components/Panel'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false

Vue.use(VueYoutube)
Vue.component('panel', Panel)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
