<template>
  <v-container fluid>
    <v-toolbar color="deep-purple darken-3">
      <v-toolbar-title class="tituloDashboard">¡BIENVENIDO! Sistema de Balance Gerencial</v-toolbar-title>       
    </v-toolbar>
    <!-- ################################################### SIDERBAR #################################### -->  
    <v-layout no-gutters>
      <v-flex grow=true>
      <v-navigation-drawer
      height="100%"
        permanent
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-file-input
            prepend-icon="mdi-account-circle"
            hide-input
            accept="image/png, image/jpeg">
              <!-- <v-icon size="80" v-on="on">mdi-account-circle</v-icon> -->
            </v-file-input>
          </v-list-item>
          <v-list-item>
            Perfíl
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shared with me</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      </v-flex>
    <!-- ################################################### DASHBOARD #################################### -->
    <v-flex lg10>
          <RegistrarDashboard/>
    </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
import RegistrarDashboard from './RegistrarView'

export default{
  name: 'DashboardPrincipal',

  components:{
    RegistrarDashboard,
  },

  data(){
    return{
    }
  }
}
</script>

<style scoped>
.tituloDashboard{
  color: #40C4FF;
}

.formato{
  height: 100%;
}
</style>