<template>
  <v-container>
  <v-form lazy-validation ref="form" v-model="valida" @submit.prevent="submit">
    <v-card align="center" class="elevation-12 contenedor">
          <v-toolbar src="../assets/AGL-LOGO.jpeg" height="80">
            <v-icon color="black" size="40">account_circle</v-icon>
            <v-toolbar-title class="colorTexto">Login</v-toolbar-title>
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
          dark
          class="mr-4"
          @click="submit"
          color="#2E7D32"
          @keyup.enter="submit"
          >
          Iniciar
          </v-btn>
          <v-btn
          dark
          @click="clear"
          color="#2E7D32">
          Limpiar
          </v-btn>
        </v-card-text>
      <v-snackbar v-model="snackbar"
      color="#4CAF50"
      bottom
      dark
      >
      {{ errores.message }}
      <template>
        <v-btn
        right
        text
        dark
        color="red"
        @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
      </v-snackbar>
    </v-card>
  </v-form>
  </v-container>
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
    ...mapMutations(['setUsuario','vaciarErrores','setearopcionmenu']),
    ...mapActions(['iniciarSesion','clearErrores']),

    async submit () {
      this.clearErrores()         //########################### Limpio Erroress
      this.$refs.form.validate()  //########################### BOTON INGRESAR
      if(this.valida){
        await this.iniciarSesion({username: this.email, password: this.contrasenia})
        if(this.errores.length === 0){
          this.setearopcionmenu('dashboard')
          this.$router.push('/dash')
        }else{
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
}
</script>

<style scoped>



.contenedor{
  margin-top: 10%;
}
.colorTexto{
  color: white;
}
</style>