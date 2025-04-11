<template>
  <v-container fluid height="100%" class="colorfondo tipofuente" fill-height>
    <v-row class="aliniarInicio slide-in-right d-none d-md-flex">
      <v-col cols="12" lg="3" md="6" sm="8" xs="12" align-end justify-start>
        <img height="120" width="85" src="../assets/logosipger.svg"><img>
      </v-col> 
    </v-row>
    <v-row cols="12" align="end" justify="end" class="mt-16 d-none d-md-flex mr-2 slide-in-bottom">
      <v-col lg="5" md="6" sm="8" xs="12" class="mt-16 mr-16">
        <login />
      </v-col>
    </v-row>

    <v-row class="d-flex d-md-none" align="center" justify="center">
      <v-col cols="2" lg="12" md="12" sm="12" xs="12" class="aliniarInicio slide-in-right">
        <img height="80" width="60" src="../assets/logosipger.svg"><img>
      </v-col>

      <v-col cols="12" lg="5" md="6" sm="7" xs="12" class="slide-in-bottom">
        <login />
      </v-col>
    </v-row>

    <v-snackbar
    v-model="snackbar"
    :color="errores.mensaje === '' ? '#4CAF50' : '#DE5350'"
    bottom
    dark
    transition="scale-transition"
    >
      {{ errores.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
        v-bind="attrs"
        icon
        dark
        :color="errores.mensaje === '' ? '#DE5350' : '#FFFFFF'">
          <v-icon>mdi-close-octagon</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import login from './LoginView.vue'
import { mapState } from 'vuex'
  export default {
    name: 'HomeView',

    components: {
      login
    },
    data () {
      return {
        show: true
      }
    },
    computed: {
      ...mapState(['errores']),
      snackbar: {
        get () {
          return this.$store.state.hayerror
        },
        set (val) {
          this.$store.commit('vaciarErrores', val)
        }
      }
    }
  }
</script>

<style scoped>

.tipofuente {
  font-family: 'Roboto Slab', serif;
  font-size: 1rem;
}

.colorfondo {
  background: url('../assets/grafica.gif');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.aliniarInicio {
  position: absolute;
  width: 100%;
  top: 10px;
  left: 20px;
}

.slide-in-right {
	-webkit-animation: slide-in-right 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-right 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-bottom {
	-webkit-animation: slide-in-bottom 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-bottom 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(800px);
            transform: translateY(800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(800px);
            transform: translateY(800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}

</style>
