<template>
  <v-navigation-drawer
    height="100%"
    permanent
    :expand-on-hover="expandOnHover"
    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    mobile-breakpoint="960"
    app
    width="260"
    @click="!expandOnHover"
  >
    <v-list>
      <v-list-item class="px-10">
        <!-- <v-file-input
        prepend-icon="mdi-account-circle"
        hide-input
        accept="image/png, image/jpeg"> -->
          <v-icon size="50">mdi-account-circle</v-icon>
        <!-- </v-file-input> -->
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
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Estadísticas Mensuales</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/dash/usuarios">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item>
      </router-link>
    
    </v-list> 
  </v-navigation-drawer>
</template>

<script>
 export default{
   name: 'SiderDrawer',

   data(){
     return{
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
   }
 }

</script>