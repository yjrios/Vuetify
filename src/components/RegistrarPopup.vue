<template>
  <v-form
  v-model="valid"
  lazy-validation
  ref="form"
  @submit.prevent="submit"
  >
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Perfíl del usuario</span>
            <v-spacer></v-spacer>
            <v-flex>
              <template>
                <v-avatar size="80">
                  <v-img class="img-fluid grey darken-4" :src="ruta"></v-img>
                </v-avatar>
              </template>
            </v-flex>
            <v-flex xs12 sm6>
              <v-file-input
              v-model="img"
              prepend-icon="mdi-account-circle"
              accept="image/*"
              placeholder="Añade una imagen *"
              truncate-length="20"
              :rules="imgRules"
              hint="Campo requerido"
              @change="previewImage"
              ></v-file-input>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field 
                  prepend-icon="person"
                  v-model="nombres"
                  :counter="25"
                  :rules="nombresRules"
                  label="Nombres"
                  required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field
                  prepend-icon="mdi-account-multiple"
                  v-model="apellidos"
                  :counter="25"
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
                  @change="cambionivel"
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
                  :disabled="lockEmail"
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
            <v-btn keyup="enter" color="#6cc550" text @click="regresar(),dialog = false" @keyup.esc="regresar">Cancelar</v-btn>
            <v-btn color="#6cc550" text @click="submit" @keyup.enter="submit">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-snackbar
      v-model="sheet"
      :color="erroresLocales.color ? '#4CAF50' : '#DE5350'"
      bottom
      dark
      >
        {{ this.erroresLocales.message }}
        <template v-slot:action="{ attrs }">
          <v-btn
          v-bind="attrs"
          text
          dark
          :color="erroresLocales.color ? '#DE5350' : '#FFFFFF'"
          @click="sheet = false, registroExitoso()">
            Cerrar
          </v-btn>
        </template>
    </v-snackbar>
  </v-form>
  
</template>
<script>

import { mapActions, mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'addUsuario',

  data () {
    return {
      cambiolevel: false,
      img2: null,
      ruta: '',
      tiposNiveles: '',
      lockEmail: false,
      erroresLocales: { message: '', color: true },
      sheet: false,
      timeout: 6000,
      dialog: true,
      items: [],
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
        v => (v && v.length > 4) || 'Los nombres deben tener mínimo de 10 caracteres',
      ],
      apellidosRules: [
        v => !!v || 'Este campo es requerido',
        v => (v && v.length > 4) || 'Los apellidos deben tener mínimo de 10 caracteres',
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
        v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(v) || 'La contraseña es inválida',
      ],
      confirmContraseniaRules:[
          v => !!v || 'La contraseña es requerida',
          v => (v && v.length >= 8) || 'La contraseña debe tener un mínimo de 8 caracteres',
          v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(v) || 'La contraseña es inválida',
          v => (v && v === this.contrasenia) || 'Las contraseñas deben ser iguales',
      ],
    }
  },

  computed: {
    ...mapState(['datos', 'errores', 'registro','niveles','address']),

    progress () {
        return Math.min(100, this.contrasenia.length * 13)
      },
      progressConfirm () {
        return Math.min(100, this.confirmContrasenia.length * 13)
      },
      color () {
         return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
      colorConfirm () {
         return ['error', 'warning', 'success'][Math.floor(this.progressConfirm / 40)]
      },
  },

  methods: {
    ...mapActions(['registrar','clearErrores']),
    ...mapMutations(['limpiarRegistro']),

    registroExitoso () {
      if (this.erroresLocales.message === 'Actualización exitosa' || this.erroresLocales.message ===  'Usuario añadido exitosamente') {
        this.limpiarRegistro()
        this.$router.push("/dash/usuarios").catch({})
      }
    },

    cambionivel () {
      this.cambiolevel = true
    },

    async submit () {
      this.clearErrores()
      this.$refs.form.validate()
      if (this.valid) {
        if (this.registro.length !== 0) {
          const formData = new FormData()
          if (this.img.length !== 0) {
            formData.append('img', this.img)
          } else {
            formData.append('img', this.registro.img)
          }

          formData.append('nombres', this.nombres)
          formData.append('apellidos', this.apellidos)
          formData.append('cargo', this.cargo)
          formData.append('password', this.contrasenia)

          if (!this.nivel) {
            formData.append('id_nivel', this.registro.id_nivel)
          } else {
            if (this.cambiolevel) {
              formData.append('id_nivel', this.nivel.value)
            } else {
              formData.append('id_nivel', this.nivel)
            }
          }
          await axios.put(process.env.VUE_APP_BASE_URL + 'user/' + this.registro.username, formData)
            .then(resp => {
              this.erroresLocales.message = 'Actualización exitosa'
              this.erroresLocales.color = true
              this.sheet = true
            })
            .catch(er => {
              console.log(er)
              this.erroresLocales = { message: 'Existe un error en la solicitud' }
              this.erroresLocales.color = false
              this.sheet = true
            })
        } else {
          const formData = new FormData()
          formData.append('img', this.img)
          formData.append('nombres', this.nombres)
          formData.append('apellidos', this.apellidos)
          formData.append('cargo', this.cargo)
          formData.append('password', this.contrasenia)
          formData.append('username', this.email)
          formData.append('id_nivel', this.nivel)
          await axios.post(process.env.VUE_APP_BASE_URL + 'usernuevo', formData)
            .then(res => {
              this.erroresLocales = { message: 'Usuario añadido exitosamente' }
              this.erroresLocales.color = true
              this.sheet = true
            })
            .catch(error => {
              if (error.response && error.response.status === 401) {
                this.erroresLocales = { message: 'E-mail ya existe' }
                this.erroresLocales.color = false
              }
              if (error.response && error.response.status === 400) {
                this.erroresLocales = { message: 'Error al ingresar los datos' }
                this.erroresLocales.color = false
              }
              if ( !error.response || (error.response && error.response.status === 500) ) {
                this.erroresLocales = { message: 'Error en el servidor' }
                this.erroresLocales.color = false
              }
              this.sheet = true
            })
        }
      } else {
        this.erroresLocales = {
          message: 'Verifique los datos e intente nuevamente',
          color: false
        }
        this.sheet = true
      }
    },

    regresar () {
      this.limpiarRegistro()
      this.nombres = ''
      this.apellidos = ''
      this.cargo = ''
      this.nivel = ''
      this.email = ''
      this.$router.push("/dash/usuarios").catch({})
    },

    previewImage () {
      if (this.img) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.ruta = e.target.result;
        }
        reader.readAsDataURL(this.img)
      }
    }
  },

  created () {
    axios.get(process.env.VUE_APP_BASE_URL + 'user/niveles')
      .then(resp => {
        if (resp.data) {
          if (this.registro.length !== 0) {
            this.lockEmail = true
            this.nombres = this.registro.nombres
            this.apellidos = this.registro.apellidos
            this.cargo = this.registro.cargo
            this.email = this.registro.username
            this.img.name = this.registro.img
            this.ruta = this.address + this.registro.img
            this.items = resp.data.map(element => {
              if (element.id_nivel === this.registro.id_nivel) {
                this.nivel = element.id_nivel
              }
              return { value: element.id_nivel, text: element.nivel }
            })
          } else {
            this.lockEmail = false
            this.limpiarRegistro()
            this.nombres = ''
            this.apellidos = ''
            this.cargo = ''
            this.email = ''
            this.items = resp.data.map(element => {
              return { value: element.id_nivel, text: element.nivel }
            })
          }
        }
      })
      .catch (error => {
        console.log(error)
        this.erroresLocales = { message: 'Error al cargar niveles' }
        this.erroresLocales.color = false
        this.sheet = true
      })
  },
}
</script>