<template>
  <v-container>
    <v-form lazy-validation ref="form" v-model="valida" @submit.prevent="submit" class="tipofuente">
      <v-card align="center" class="elevation-12 py-10">
        
        <!-- <v-card-text class="px-0 py-0">
          <v-img src="../assets/AGL-LOGO.jpeg" flat class="my-2 mx-0"></v-img>
        </v-card-text> -->

        <v-card-text>
          <v-text-field
          prepend-icon="person"
          v-model="email"
          label="E-mail"
          :counter="30"
          hint="Al menos 7 caracteres"
          :rules="emailRules"
          ></v-text-field>

          <v-text-field
          prepend-icon="lock"
          v-model="contrasenia"
          :type="mostrar ? 'text' : 'password'"
          :append-icon="mostrar? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="mostrar = !mostrar"
          label="Contraseña"
          hint="Al menos 8 caracteres"
          :rules="contraseniaRules"
          :counter="16"
          @keyup.enter="submit"
          ></v-text-field>

          <v-btn
          dark
          @click="clear"
          color="#6cc550"
          class="mr-4"
          >
          Limpiar
          </v-btn>
          
          <v-btn
          dark
          @click="submit"
          color="#6cc550"
          >
          Iniciar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
    <!-- <v-snackbar
    v-model="snackbar"
    :color="errores.message === '' ? '#4CAF50' : 'red'"
    bottom
    dark
    transition="scale-transition"
    >
      {{ errores.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
        v-bind="attrs"
        text
        dark
        :color="errores.message === '' ? 'red' : '#FFFFFF'"
        @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar> -->
  </v-container>
</template>
 
<script>

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'LoginView',

  computed: {
    ...mapState(['datos', 'errores', 'autorizado'])
  },

  data () {
    return {
      snackbar: false,
      y: 'bottom',
      x: null,
      mode: '',
      valida: false,
      /* email: 'yeison.jesus@gmail.com',
      contrasenia: 'Yr12345?', */
      email: 'guest@agroinlaca.com',
      contrasenia: 'Guest12345?',
      mostrar:false,
      emailRules: [
          v => !!v || 'El e-mail es requerido',
          v => (v && v.length > 7) || 'El e-mail debe tener al menos 7 caracteres',
          v => !!( /.+@.+\..+/.test(v) ) || 'El e-mail es inválido',
      ],
      contraseniaRules: [
          v => !!v || 'La contraseña es requerida',
          v => (v && v.length >= 8) || 'La contraseña debe tener un mínimo de 8 caracteres',
          v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(v) || 'La contraseña es inválida',
      ],
    }
  },
 
  methods: {
    ...mapMutations(['setUsuario','vaciarErrores','setearopcionmenu']),
    ...mapActions(['iniciarSesion','clearErrores']),

    async submit () {
      this.clearErrores()         //########################### Limpio Erroress
      this.$refs.form.validate()  //########################### BOTON INGRESAR
      if (this.valida) {
        await this.iniciarSesion({ username: this.email, password: this.contrasenia })
        if (this.errores.length === 0) {
          this.$store.commit('setearopcionmenu', 0)
          this.$router.push('/dash').catch({})
        } else {
          this.snackbar = true
        }
      }
    },
    clear () {            //########################### BOTON LIMPIAR
        this.$refs.form.reset()
        this.contrasenia = ''
        this.email = ''
    },
  },
  beforeMount () {
    if (this.autorizado) {
      this.$router.push('/dash')
    }
  }

/* COLOR PARA LETRA DEL LOGO */
  /* rgb(108,197,80); */
}
</script>
