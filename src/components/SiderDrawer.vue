<template>
  <v-navigation-drawer
    height="100%"
    :expand-on-hover="expandOnHover"
    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    mobile-breakpoint="960"
    app
    width="260"
  >
  <v-btn text dark><v-icon left size="20" @click="expandOnHover= !expandOnHover">mdi-arrange-send-backward</v-icon>{{ this.datos.data.username}}</v-btn>
    <v-list v-if="!expandOnHover">
      <v-list-item class="px-10 mb-4 ml-5">
        <v-avatar size="80">
          <v-img class="img-fluid grey darken-4" :src="this.address+this.datos.data.img"></v-img>
        </v-avatar>
      </v-list-item>
      <v-list-item class="ml-10" dark>
        <div>
          <span>¡Bienvenido!</span>
        </div>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list shaped>
      <v-list-item-group
        v-model="selectedItem"
        active-class="black--text"
      >
      <router-link to="/dash/mostrarbalance">
        <v-list-item dark>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-list-group prepend-icon="mdi-chart-box-plus-outline">
        <template v-slot:activator>
          <v-list-item-title dark>Reportes</v-list-item-title>
        </template>
        <router-link to="/dash/month">
          <v-list-item v-if="this.autorizado" dark>
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Gráficos</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/dash/month">
          <v-list-item v-if="this.autorizado" dark>
            <v-list-item-icon>
              <v-icon>mdi-file-chart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Listado Ingresos</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>
      
      <router-link to="/dash/load">
        <v-list-item v-if="this.autorizado" dark>
          <v-list-item-icon>
            <v-icon>mdi-file-upload-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cargar Archivo</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dash/usuarios">
        <v-list-item v-if="this.autorizado" dark>
          <v-list-item-icon>
            <v-icon>mdi-account-details</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item>
      </router-link>
      </v-list-item-group>
    </v-list> 
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import decode from 'jwt-decode'
 export default{
   name: 'SiderDrawer',

   data(){
     return{
      user: '',
      expandOnHover: false,
      selectedItem: 0,
      items: [
          {
            icon: 'mdi-view-dashboard',
            title: 'Dashboard',
            to: '/DashboardView',
          },
          {
            icon: 'mdi-account',
            title: 'Usuario',
            to: '/pages/user',
          },
          {
            title: 'Panel Gerencial',
            icon: 'mdi-clipboard-outline',
            to: '/tables/regular-tables',
          },
      ]
     }
   },
   computed: {
      ...mapState(['autorizado','datos','address'])
    },
    beforeCreate(){
      this.user = decode(localStorage.getItem('token'))
    }
 }

</script>