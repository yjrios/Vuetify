import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeview',
    component: () => import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
