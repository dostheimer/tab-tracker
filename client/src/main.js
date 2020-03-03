import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import Panel from '@/components/Panel'

Vue.config.productionTip = false

// const unsync = sync(store, router)
sync(store, router)

Vue.component('panel', Panel)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
