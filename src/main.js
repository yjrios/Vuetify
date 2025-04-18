import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)

//Vue.config.productionTip = false
Vue.config.devtools = true;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
