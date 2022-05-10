<template>
  <v-form lazy-validation ref="form" v-model="valida">
    <v-card align="center" class="elevation-12">
      <v-toolbar dark color="green darken-3">
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip left color="blue-grey lighten-1">Registrese
          <template v-slot:activator="{ on }">
            <span v-on="on"><v-icon light size="40">account_circle</v-icon></span>
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
          :append-icon="mostrar? 'visibility' : 'visibility_off'"
          @click:append="mostrar = !mostrar"
          label="Contraseña"
          hint="Al menos 8 caracteres"
          :rules="contraseniaRules"
          :counter="16"
          ></v-text-field>
          <v-btn
          text-color="white"
          class="mr-4"
          @click="submit"
          color="green darken-3"
          >
          Iniciar
          </v-btn>
          <v-btn 
          @click="clear"
          color="green darken-3">
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
  created(){
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
    ...mapMutations(['setUsuario']),
    ...mapActions(['getDatos', 'iniciarSesion']),

    async submit () {
      this.$refs.form.validate()  //########################### BOTON INGRESAR
      if(this.valida){
        await this.iniciarSesion({username: this.email, password: this.contrasenia})
        if(this.errores){
          if(this.errores.response.status === 404){
            console.log('Usuario incorrecto')
            this.errores.message = 'Usuario incorrecto'
          }
          if(this.errores.response.status === 400){
            console.log('Error en contraseña')
            this.errores.message = 'Error en contraseña'
          }
          this.snackbar = true
        }
      }
    },
      clear () {            //########################### BOTON LIMPIAR
          this.$refs.form.reset()
          this.contrasenia = ''
          this.email = ''
      },
  }
}
</script>
