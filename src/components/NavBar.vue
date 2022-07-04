<template>
  <v-app-bar
    id="app-bar"
    app
    color="transparent"
    flat
    height="75"
    hide-on-scroll
  >
  <template v-if="autorizado">
  <v-menu bottom transition="slide-x-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>

      <v-list color="primary">
        <router-link to="/dash/mostrarbalance">
          <v-list-item class="font-weight-medium" @click="enviaropcionmenu('dashboard')">
            <v-list-item-title>DASHBOARD</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link to="/dash/month">
          <v-list-item class="font-weight-medium" @click="enviaropcionmenu('graficas')">
            <v-list-item-title color="success">GRAFICOS</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link to="/dash/listar">
          <v-list-item class="font-weight-medium" @click="enviaropcionmenu('listado')">
            <v-list-item-title>LISTADO</v-list-item-title>
          </v-list-item>
        </router-link>
        
        <router-link to="/dash/load">
          <v-list-item class="font-weight-medium" @click="enviaropcionmenu('load')">
            <v-list-item-title>ARCHIVO</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link to="/dash/usuarios">
          <v-list-item class="font-weight-medium" @click="enviaropcionmenu('users')">
            <v-list-item-title>USUARIOS</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-menu>
    <h3><span>{{ this.modulo[this.opcionmenu] }}</span></h3>
    </template>
    <v-spacer></v-spacer>
      <v-icon @click="sigout()">mdi-export</v-icon>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      modulo: [
        'MONEDAS INTERNACIONALES',
        'GRAFICAS ESTADISTICAS',
        'LISTADO DE VENTAS',
        'ENVIAR INFORME DE VENTAS',
        'USUARIOS DEL SISTEMA',
      ],
      menuBarra: false
    }),

    computed: {
      ...mapState(['drawer','opcionmenu','autorizado']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
        setopcion: 'setearopcionmenu',
        verificar: 'verificar'
      }),
      ...mapActions(['cerrarSesion']),

      sigout () {
        this.cerrarSesion()
      },
      enviaropcionmenu (opcion){
        this.setopcion(opcion)
      }
    },
    created () {
      this.verificar()
      this.enviaropcionmenu('dashboard')
    }
  }
</script>
