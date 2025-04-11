<template>
  <v-navigation-drawer
    v-model="drawer"
    height="100%"
    :expand-on-hover="expandOnHover"
    mobile-breakpoint="960"
    mini-variant-width="960"
    app
    class="tipofuente"
  >
    <!-- src="../assets/body-bg.jpg" -->
    <v-list expand class="py-0">
        <v-layout align-center justify-center>
          <v-flex lg="1" md="1" sm="1" xs="1" class="pr-0 mr-0">
            <v-btn left @click="enviarvalor(!drawer)" icon class="px-0 mx-0">
              <v-icon size="20" class="pr-0 mr-0" color="#385F73">mdi-page-layout-sidebar-left</v-icon>
            </v-btn>
          </v-flex>
          <v-flex lg="10" md="10" sm="10" xs="10" class="px-0 mx-0">
            <v-avatar
              size="120"
              tile
              height="35"
            >
              <img src="@/assets/grupo.png" class="opacidad">
            </v-avatar>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>

      <v-layout column align-center justify-center>
        <v-flex>
            <v-list-item class="ml-13 mb-0">
              <v-avatar size="80">
                <v-img class="img-fluid grey darken-4" :src="this.address + this.user.data.img"></v-img>
              </v-avatar>
            </v-list-item>
            <v-list-item class="mb-0">
              <v-list-item-title class="black--text"> {{ this.user.data.username }} </v-list-item-title>
            </v-list-item>
        </v-flex>
      </v-layout>
    </v-list>

    <v-divider></v-divider>

    <v-list
    shaped
    class="pr-0"
    light
    >
      <v-list-item-group
        v-model="selectedItem"
        active-class='cambiarcolor'
        mandatory
      >
        <router-link to="/dash" class="quitarsubrayado">
          <v-list-item
          v-if="this.autorizado"
          >
            <v-list-item-icon>
              <v-icon color="#311B92">mdi-view-dashboard-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 font-weight-bold">Dashboard</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link to="/dash/mostrarbalance" class="quitarsubrayado">
          <v-list-item
          v-if="this.autorizado"
          >
            <v-list-item-icon>
              <v-icon color="#9E9D24">mdi-cash-fast</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 font-weight-bold">Monedas/Criptos</v-list-item-title>
          </v-list-item>
        </router-link>

        <v-list
        shaped
        :outlined="colorfondoprecios ? false : true"
        :class="colorfondoprecios ? 'sinborde' : 'rounded-lg pa-1'"
        :color="colorfondoprecios ? '' : 'rgba(181,178,178,0.1)'"
        >
          <v-list-group
          :value="expandp"
          active-class='cambiarcolor black--text'
          @click="colorfondoprecios = !colorfondoprecios"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#1B5E20">mdi-cash-check</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="ml-4 font-weight-bold">Precios</v-list-item-title>
            </template>

            <router-link to="/dash/indim" class="quitarsubrayado">
              <v-list-item>
                <v-list-item-icon class="ml-4 text-pop-up-right">
                  <v-icon color="#FFD54F">mdi-corn</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="ml-8 font-weight-bold text-pop-up-right">Maíz</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link to="/dash/indis" class="quitarsubrayado">
              <v-list-item>
                <v-list-item-icon class="ml-4 text-pop-up-right">
                  <v-icon color="#FFCC80">mdi-soy-sauce</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="ml-8 font-weight-bold text-pop-up-right">Soya</v-list-item-title>
              </v-list-item>
            </router-link>

          </v-list-group>

        </v-list>

        <router-link to="/dash/load" class="quitarsubrayado" v-show="this.user.data.id_nivel">
          <v-list-item
          v-if="this.autorizado"
          >
            <v-list-item-icon>
              <v-icon color="#741b1f">mdi-file-upload-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 font-weight-bold">Archivo</v-list-item-title>
          </v-list-item>
        </router-link>

        <v-list
        shaped
        :outlined="colorfondoreportes ? false : true"
        :class="colorfondoreportes ? 'sinborde' : 'rounded-lg pa-1'"
        :color="colorfondoreportes ? '' : 'rgba(181,178,178,0.1)'"
        >
          <v-list-group
          @click="colorfondoreportes = !colorfondoreportes"
          :value="expandr"
          active-class='cambiarcolor black--text'
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#546E7A">mdi-chart-box-plus-outline</v-icon>
              </v-list-item-icon>
                <v-list-item-title class="ml-4 font-weight-bold">Reportes</v-list-item-title>
            </template>
            
              <router-link to="/dash/month" class="quitarsubrayado">
                <v-list-item>
                  <v-list-item-icon class="ml-4" >
                    <v-icon color="#BF360C" class="text-pop-up-right">mdi-chart-line</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="ml-8 font-weight-bold text-pop-up-right">Gráficos</v-list-item-title>
                </v-list-item>
              </router-link>

              <router-link to="/dash/listar" class="quitarsubrayado">
                <v-list-item>
                  <v-list-item-icon class="ml-4">
                    <v-icon color="#4E342E" class="text-pop-up-right">mdi-format-list-numbered-rtl</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="ml-8 font-weight-bold text-pop-up-right">Listado</v-list-item-title>
                </v-list-item>
              </router-link>
          </v-list-group>
        </v-list>

        <router-link to="/dash/usuarios" class="quitarsubrayado" v-show="this.user.data.id_nivel">
          <v-list-item
          v-if="this.autorizado"
          >
            <v-list-item-icon>
              <v-icon color="#000000">mdi-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 font-weight-bold">Usuarios</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import decode from 'jwt-decode'
 export default {
   name: 'SiderDrawer',

    data () {
      return {
        user: '',
        expandOnHover: false,
        colorfondoprecios: false,
        colorfondoreportes: false,
        expandp: true,
        expandr: true,
        mostrar: true
      }
    },

    computed: {
      ...mapState(['autorizado','datos','address']),

      drawer: {
        get () {
          return this.$store.state.showsidebar
        },
        set (val) {
          this.$store.commit('set_showsidebar', val)
        }
      },

      selectedItem: {
        get () {
          return this.$store.state.opcionmenu
        },
        set (val) {
          this.$store.commit('setearopcionmenu', val)
        }
      }
    },

    created () {
      this.obtenerUsuario()
      this.$store.commit('obtenerautorizado')
    },

    methods: {
      ...mapMutations(['setearopcionmenu']),

      obtenerUsuario () {
        if (localStorage.getItem('token')) {
          this.user = decode(localStorage.getItem('token'))
        } else {
          this.user = "User"
        }
      },

      enviarvalor (val) {
        this.$store.commit('set_showsidebar', val)
      },
    }
  }
</script>

<style scoped>

.quitarsubrayado {
  text-decoration: none;
}

.tipofuente {
  font-family: 'Roboto Slab', sans-serif;
  font-size: 40px;
  background-image: linear-gradient(180deg, #b9b27d 0, #a4ec79 16.67%, #8be373 33.33%, #6cd86c 50%, #65cd66 66.67%, #00c464 83.33%, #00bd65 100%) !important;
}

.cambiarcolor {
  /* background-color:rgba(181,178,178,0.5); */
  /* background: url('../assets/6cc550.png'); */
  background:rgba(102, 102, 102, .4) !important;
  /* background: rgb(231, 246, 200) !important; */
  color: rgba(60, 60, 60, 1) !important;
  /* border-left: #b9b27d solid 10px; */
  border-left: #1B5E20 solid 5px !important;
}

.sinborde {
  border: 0;
}

.opacidad {
  opacity: 0.9;
}

.text-pop-up-right {
	-webkit-animation: text-pop-up-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: text-pop-up-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes text-pop-up-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateX(30px);
    transform: translateX(30px);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: none;
  }
}
@keyframes text-pop-up-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateX(30px);
            transform: translateX(30px);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    text-shadow: none;
  }
}

</style>