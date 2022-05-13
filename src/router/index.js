import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeview',
    component: () => import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'registrarusuario',
    component: () => import(/* webpackChunkName: "Dashboardview" */ '../views/DashboardView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
