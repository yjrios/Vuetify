<template>
  <v-form
  v-model="valid"
  lazy-validation
  ref="form"
  @submit.prevent="submit"
  >
    <v-layout row justify-center>              
      <v-dialog v-model="dialog" persistent max-width="800px"> -->
        <v-card>
          <v-card-title>
            <v-flex xs12 sm6>
              <v-file-input
              v-model="img"
              prepend-icon="mdi-account-circle"
              accept="image/png, image/jpeg"
              placeholder="Añade una imagen *"
              truncate-length="10"
              :rules="imgRules"
              hint="Campo requerido"
              >
              </v-file-input>
            </v-flex>
            <v-spacer></v-spacer>
            <span class="headline">Perfíl del usuario</span>
            
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  prepend-icon="person"
                  v-model="nombres"
                  :counter="10"
                  :rules="nombresRules"
                  label="Nombres"
                  required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                  prepend-icon="mdi-account-multiple"
                  v-model="apellidos"
                  :counter="10"
                  :rules="apellidosRules"
                  label="Apellidos"
                  required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-select
                  return-object
                  prepend-icon="mdi-map"
                  v-model="nivel"
                  :items="items"
                  label="Nivel *"
                  outlined
                  required
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field
                  v-model="cargo"
                  prepend-icon="domain"
                  label="Cargo *"
                  :counter="30"
                  required
                  ></v-text-field>
                </v-flex>
              
                <v-flex xs12>
                  <v-text-field
                  prepend-icon="email"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail *"
                  required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                  v-model="contrasenia"
                  prepend-icon="lock"
                  :type="mostrar? 'text' : 'password'"
                  :append-icon="mostrar? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="mostrar = !mostrar"
                  label="Contraseña *"
                  hint="Al menos 8 caracteres"
                  :rules="contraseniaRules"
                  :counter="16"
                  required
                  ></v-text-field>

                  <v-progress-linear
                  :value="progress"
                  :color="color"
                  height="5"
                ></v-progress-linear>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                  v-model="confirmContrasenia"
                  prepend-icon="lock"
                  :type="mostrarconfirmacion? 'text' : 'password'"
                  :append-icon="mostrarconfirmacion? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="mostrarconfirmacion = !mostrarconfirmacion"
                  label="Confirmar contraseña *"
                  hint="Al menos 8 caracteres"
                  :rules="confirmContraseniaRules"
                  :counter="16"
                  required
                  ></v-text-field>
                
                  <v-progress-linear
                    :value="progressConfirm"
                    :color="colorConfirm"
                    height="5"
                  ></v-progress-linear>
                </v-flex>
              </v-layout>
            </v-container>
            <small>'*' Indica campos requeridos</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn keyup="enter" color="blue darken-1" text @click="dialog = false, regresar()" @keyup.esc="regresar">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="submit" @keyup.enter="submit">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <template>
    <v-bottom-sheet v-model="sheet">
        <v-sheet
          class="text-center"
          height="100px"
        >
          <v-btn
            class="mt-6"
            text
            color="red"
            @click="sheet = !sheet, valid = !valid"
          >
            Cerrar
          </v-btn>
          <div class="py-3">
            {{this.erroresLocales.message}}
          </div>
        </v-sheet>
      </v-bottom-sheet>
  </template>
  </v-form>
  
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'addUsuario',

  data(){
    return{
      erroresLocales: '',
      sheet: false,
      timeout: 6000,
      nivel2: '',
      dialog: true,
      items: [{value:'0', text:'ADMINIS'},{value:'1', text:'GUEST'}],
      img: [],
      custom: false,
      valid: false,
      mostrar: false,
      nombres: '',
      apellidos: '',
      cargo: '',
      nivel: null,
      contrasenia: '',
      confirmContrasenia: '',
      mostrarconfirmacion: false,
      email: '',
      nombresRules: [
        v => !!v || 'Este campo es requerido',
        v => (v && v.length > 10) || 'Los nombres deben tener mínimo de 10 caracteres',
      ],
      apellidosRules: [
        v => !!v || 'Este campo es requerido',
        v => (v && v.length > 10) || 'Los apellidos deben tener mínimo de 10 caracteres',
      ],
      emailRules: [
        v => !!v || 'El e-mail es un campo requerido',
        v => /.+@.+\..+/.test(v) || 'Ingrese un e-mail válido',
      ],
      imgRules: [
        v => !!v || 'La foto es un campo requerido',
      ],
      contraseniaRules:[
        v => !!v || 'La contraseña es requerida',
        v => (v && v.length >= 8) || 'La contraseña debe tener un mínimo de 8 caracteres',
        //v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/.test(v) || 'La contraseña es inválida',
        v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(v) || 'La contraseña es inválida',
      ],
      confirmContraseniaRules:[
          v => !!v || 'La contraseña es requerida',
          v => (v && v.length >= 8) || 'La contraseña debe tener un mínimo de 8 caracteres',
          //v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/.test(v) || 'La contraseña es inválida',
          v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(v) || 'La contraseña es inválida',
          v => (v && v == this.contrasenia) || 'Las contraseñas deben ser iguales',
      ],
    }
  },

  computed:{
    ...mapState(['datos', 'errores', 'registro']),

    progress () {
        return Math.min(100, this.contrasenia.length * 13)
      },
      progressConfirm(){
        return Math.min(100, this.confirmContrasenia.length * 13)
      },
      color () {
         return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
      colorConfirm () {
         return ['error', 'warning', 'success'][Math.floor(this.progressConfirm / 40)]
      },
  },

  methods:{
    ...mapActions(['registrar','clearErrores']),

    async submit(){
      this.clearErrores()
      this.$refs.form.validate()
      console.log('Valida ',this.valid)
      if(this.valid){
        let payload = {
          'nombres': this.nombres,
          'apellidos': this.apellidos,
          'cargo': this.cargo,
          'password': this.contrasenia,
          'img': this.img.name,
          'username': this.email,
          'nivel': this.nivel.value
        }
        console.log(payload)
        await this.registrar(payload)
        this.erroresLocales = {
          message: 'Verifique los datos e intente nuevamente'
        }
        this.sheet = true
        this.$router.push("/dash/usuarios")
      }else{
        console.log('PASA POR EL ELSE')
        this.erroresLocales = {
          message: 'Verifique los datos e intente nuevamente'
        }
        this.sheet = true
      }
      // if(this.errores.length == 0){
      //   this.$router.push("/dash/usuarios")
      // }
    },

    regresar(){
      this.$router.push("/dash/usuarios")
    }
  }
}
</script>