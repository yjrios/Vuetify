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
    path: '/dash',
    name: 'Vista Dashboard',
    component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue'),
    redirect: '/dash/inicio',
    children: [
      {
        path: '/dash/inicio',
        // name: 'Usuarios General',
        component: () => import(/* webpackChunkName: "InicioModal" */ '../components/InicioModal.vue')
      },
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
        path: '/dash/load',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Cargar Archivo" */ '../views/FileLoadView.vue')
      },
      {
        path: '/dash/month',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Consulta Gráficas" */ '../components/BalanceMensual.vue')
      },
      {
        path: '/dash/listar',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Listado de Ventas" */ '../components/ListarInfoExcel.vue')
      },
      {
        path: '/dash/indim',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Precio Maiz Futuro" */ '../components/PriceMaiz.vue')
      },
      {
        path: '/dash/indis',
        // name: 'Consulta por día',
        component: () => import(/* webpackChunkName: "Precio Soya Futuro" */ '../components/PriceSoya.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
