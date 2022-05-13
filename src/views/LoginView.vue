<template>
  <v-form lazy-validation ref="form" v-model="valida">
    <v-card align="center" class="elevation-12 contenedor">
      <v-toolbar dark color="orange lighten-1">
        <v-toolbar-title class="colorTexto">Login</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip left color="blue darken-1">¡Regístrese!
          <template v-slot:activator="{ on }">
            <router-link to="signup"><v-icon light size="40" v-on="on">account_circle</v-icon></router-link>
          </template>
        </v-tooltip>
      </v-toolbar>
      <v-card-text>
          <v-text-field
          prepend-icon="person"
          v-model="email"
          label="E-mail"
          :counter="10"
          hint="Al menos 7 caracteres"
          :rules="emailRules"
          ></v-text-field>

          <v-text-field
          prepend-icon="lock"
          v-model="contrasenia"
          :type="mostrar? 'text' : 'password'"
          :append-icon="mostrar? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="mostrar = !mostrar"
          label="Contraseña"
          hint="Al menos 8 caracteres"
          :rules="contraseniaRules"
          :counter="16"
          ></v-text-field>
          <v-btn
          class="mr-4 colorTexto"
          @click="submit"
          color="orange lighten-1"
          >
          Iniciar
          </v-btn>
          <v-btn 
          @click="clear"
          color="orange lighten-1">
          Limpiar
          </v-btn>
        </v-card-text>
      <v-snackbar v-model="snackbar"
      color="amber lighten-1"
      bottom
      >
      {{ errores.message }}
      <template>  
        <v-btn
        text
        dark
        color="black"
        @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
      </v-snackbar>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default{
    name: 'LoginView',

  computed:{
    ...mapState(['datos','errores'])
  },

  data(){
    return{
      snackbar: false,
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 6000,
      valida: false,
      email: '',
      contrasenia: '',
      mostrar:false,
      emailRules:[
          v => !!v || 'El e-mail es requerido',
          v => (v && v.length > 7) || 'El e-mail debe tener al menos 7 caracteres',
          v => !!( /.+@.+\..+/.test(v) ) || 'El e-mail es inválido',
      ],
        contraseniaRules:[
          v => !!v || 'La contraseña es requerida',
          v => (v && v.length >= 8) || 'La contraseña debe tener un mínimo de 8 caracteres',
          //v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/.test(v) || 'La contraseña es inválida',
          v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(v) || 'La contraseña es inválida',
      ],
    }
  },

  methods:{
    ...mapMutations(['setUsuario','vaciarErrores']),
    ...mapActions(['iniciarSesion','clearErrores']),

    async submit () {
      this.clearErrores()
      this.$refs.form.validate()  //########################### BOTON INGRESAR
      if(this.valida){
        await this.iniciarSesion({username: this.email, password: this.contrasenia})
        console.log(this.errores)
        if(this.errores.length != 0){
          if(this.errores.response.status == 404){
            console.log('Usuario incorrecto')
            this.errores.message = 'Usuario incorrecto, verifique su e-mail'
          }
          if(this.errores.response.status == 400){
            console.log('Error en contraseña')
            this.errores.message = 'Verifique su contraseña, ha ingresado un dato incorrecto'
          }
          this.snackbar = true
          console.log('Snackbar')
        }
      }
    },
      clear () {            //########################### BOTON LIMPIAR
          this.$refs.form.reset()
          this.contrasenia = ''
          this.email = ''
      },
  },
}
</script>

<style scoped>
.contenedor{
  margin-top: 34%;
}
.colorTexto{
  color: Black;
}
</style>