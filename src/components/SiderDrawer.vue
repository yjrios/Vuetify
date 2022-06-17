<template>
  <v-navigation-drawer
    height="100%"
    :expand-on-hover="expandOnHover"
    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    mobile-breakpoint="960"
    app
    width="260"
  >
  <v-btn text><v-icon left size="20" @click="expandOnHover= !expandOnHover">mdi-arrange-send-backward</v-icon>{{ this.datos.data.username}}</v-btn>
    <v-list v-if="!expandOnHover">
      <v-list-item class="px-10">
        <v-icon size="50">mdi-account-circle</v-icon>
      </v-list-item>
      <v-list-item>
        <span>¡Bienvenido!</span>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-list
    >
      <router-link to="/dash/mostrarbalance">
        <v-list-item >
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Estadísticas Mensuales</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dash/load">
        <v-list-item v-if="this.autorizado" color="white">
          <v-list-item-icon>
            <v-icon>mdi-file-upload-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cargar Archivo</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dash/usuarios">
        <v-list-item v-if="this.autorizado">
          <v-list-item-icon>
            <v-icon>mdi-account-details</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list> 
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
 export default{
   name: 'SiderDrawer',

   data(){
     return{
      user: '',
      expandOnHover: false,
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
      ...mapState(['autorizado','datos'])
    },
 }

</script>