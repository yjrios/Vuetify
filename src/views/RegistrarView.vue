<template>
        <v-form
          ref="form"
          v-model="validar"
          lazy-validation
        > 
          <v-text-field
            prepend-icon="person"
            v-model="nombre"
            :counter="10"
            :rules="usuarioRules"
            label="Nombres"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="person"
            v-model="apellidos"
            :counter="10"
            :rules="usuarioRules"
            label="Apellidos"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
          ></v-text-field>

        <v-text-field
          v-model="contrasenia"
          prepend-icon="lock"
          :type="mostrar? 'text' : 'password'"
          :append-icon="mostrar? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="mostrar = !mostrar"
          label="Contraseña"
          hint="Al menos 8 caracteres"
          :rules="contraseniaRules"
          :counter="16"
        >
        </v-text-field>
        <v-progress-linear
            :value="progress"
            :color="color"
            height="5"
          ></v-progress-linear>

        <v-text-field
          v-model="confirmContrasenia"
          prepend-icon="lock"
          :type="mostrarconfirmacion? 'text' : 'password'"
          :append-icon="mostrarconfirmacion? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="mostrarconfirmacion = !mostrarconfirmacion"
          label="Confirmar contraseña"
          hint="Al menos 8 caracteres"
          :rules="confirmContraseniaRules"
          :counter="16"
        >
        </v-text-field>
          <v-progress-linear
            :value="progressConfirm"
            :color="colorConfirm"
            height="5"
          ></v-progress-linear>
        
        <v-text-field
          prepend-icon="domain"
          label="Cargo"
          :counter="30"
          required
        ></v-text-field>

        <v-select
          :items="items"
          label="Nivel"
          outlined
        ></v-select>
          
            <v-btn
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>
          
            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset Form
            </v-btn>
        </v-form>
</template>

<script>

export default {
    name: 'RegistrarDashboard',
    
data() {
    return {
    items: ['ADMIN', 'GUEST'],
    custom: false,
    validar: false,
    mostrar: false,
    nombres: '',
    apellidos: '',
    contrasenia: '',
    confirmContrasenia: '',
    mostrarconfirmacion: false,
    usuarioRules: [
      v => !!v || 'Este campo es requerido',
      v => (v && v.length < 10) || 'El nombre debe tener mínimo de 10 caracteres',
    ],
    email: '',
    emailRules: [
      v => !!v || 'El e-mail es un campo requerido ',
      v => /.+@.+\..+/.test(v) || 'Ingrese un e-mail válido',
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
        v => ( v =  contrasenia) || 'Las contraseñas no coinciden'
    ],
    }
  },
  methods: {
    async validate () {
      this.$refs.form.validate()
    
    },
    reset () {
      this.$refs.form.reset()
    },
  },
  computed: {
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
}
</script>
