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
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue'),
  },
  {
    path: '/dash',
    name: 'Vista Dashboard',
    component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue'),
    redirect: '/dash/mostrarbalance',
    children: [
      {
        path: 'usuarios',
        // name: 'Usuarios General',
        component: () => import(/* webpackChunkName: "GridUsuarios" */ '../components/GridUsuarios.vue')
      },
      {
        path: 'addusuario',
        // name: 'Alta Usuario',
        component: () => import(/* webpackChunkName: "RegistrarPopup" */ '../components/RegistrarPopup.vue')
      },
      {
        path: '/dash/mostrarbalance',
        // name: 'Balance General',
        component: () => import(/* webpackChunkName: "BalanceGeneral" */ '../components/BalanceGeneral.vue')
      },
      {
        path: 'valordolar',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Consulta por día" */ '../components/ConsultaDolar.vue')
      },
      {
        path: '/dash/load',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Consulta por día" */ '../views/FileLoadView.vue')
      },
      {
        path: '/dash/month',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Consulta por día" */ '../components/BalanceMensual.vue')
      },
      {
        path: '/dash/listar',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Consulta por día" */ '../components/ListarInfoExcel.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
