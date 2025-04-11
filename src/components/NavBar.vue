<template>
  <v-toolbar
  flat
  class="mt-0"
  color="rgba(181,178,178,0.5)"
  >
  <!-- <v-app-bar
    id="app-bar"
    app
    color="rgba(181,178,178,1)"
    flat
    height="75"
    hide-on-scroll
    class="tipofuente"
    scroll-threshold="25"
  > -->
    <!-- src="../assets/6cc550.png" -->
    <template v-if="autorizado">
      <div v-if="!drawer">
        <v-btn @click="enviarvalor(!drawer)" class="mx-my-0 px-py-0 mb-1" :icon="true"><v-icon color="#385F73" size="18">mdi-page-layout-sidebar-left</v-icon></v-btn>
      </div>
        <v-btn class="mx-my-0 py-0" :icon="true"><v-icon color="#385F73" size="24">{{ modulo[opcionmenu].icono }}</v-icon></v-btn>
        <v-icon>mdi-chevron-right</v-icon>
        <span class="tipofuente pl-3">{{ modulo[opcionmenu].title }}</span>
    </template>
    <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="#385F73" @click="sigout()" v-bind="attrs" v-on="on">mdi-power-settings</v-icon>
        </template>
        <span>Cerrar Sesión</span>
      </v-tooltip>
  </v-toolbar>
</template>
<script>
  
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    data: () => ({
      close: false,
      modulo: [
        {title:'PANEL GERENCIAL', icono: 'mdi-home-city-outline'},
        { title:'MONEDAS INTERNACIONALES', icono: 'mdi-cash-register' },
        '',
        { title:'RUBRO/MAÍZ', icono: 'mdi-corn' },
        { title:'RUBRO/SOYA', icono: 'mdi-soy-sauce' },
        { title:'REPORTE DE VENTAS', icono: 'mdi-file-sync-outline' },
        '',
        { title:'ESTADÍSTICAS',icono: 'mdi-finance' },
        { title:'LISTADO DE VENTAS', icono: 'mdi-clipboard-list-outline' },
        { title:'USUARIOS DEL SISTEMA', icono: 'mdi-account-group-outline' },
        '',
      ]
    }),

    computed: {
      ...mapState(['showsidebar','opcionmenu','autorizado']),
      drawer: {
        get () {
          return this.$store.state.showsidebar
        },
        set (val) {
          return this.$store.commit('set_showsidebar', val)
        },
      }
    },

    methods: {
      ...mapActions(['cerrarSesion']),

      sigout () {
        this.cerrarSesion()
      },
      enviarvalor (val) {
        this.$store.commit('set_showsidebar', val)
      }
    }
  }
</script>

<style scoped>
.tipofuente {
  font-family: 'Roboto Slab', serif;
  font-size: 25px;
  font-weight: 900;
}

.quitarsubrayado {
  text-decoration: none;
}
</style>