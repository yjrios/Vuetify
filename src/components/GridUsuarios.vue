<template>
  <div class="scale-up-ver-top pb-10 mt-5">
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="800px" persistent>
        <template v-slot:activator="{ on }">
          <v-fab-transition>
            <v-btn color="#6cc550" class="mx-2" v-on="{ on }" fab @click.native.stop="dialog = true" to="/dash/addusuario">
               <v-icon dark color="white">mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro que desea eliminar el usuario?</v-card-title>
            <v-card-text class="text-h5 text-center font-weight-bold text--black">{{ this.user }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cerrar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>
    <v-data-table
      :items="this.usuarios"
      :headers="headers"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`] = "{ item }">
        <v-icon color="blue darken-1" small @click="modificarUsuario(item)">mdi-pencil</v-icon>
        <v-icon color="red darken-1" small @click="eliminarUsuario(item)">mdi-delete</v-icon>
      </template>
      
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          No existen resultados para "{{ search }}"
        </v-alert>
      </template>
    </v-data-table>

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
        @click="sheet = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
    data () {
      return {
        erroresLocales: { message: '', color: true },
        user: '',
        index: null,
        dialogDelete: false,
        dialog: false,
        search: '',
        sheet: false,
        headers: [
          { text: 'Nombres',  value: 'nombres', sortable: true, class: ["subtitle-1","font-weight-bold"] },
          { text: 'Apellidos', value: 'apellidos', sortable:false, class: ["subtitle-1","font-weight-bold"] },
          { text: 'Cargo', value: 'cargo' , sortable:false, class: ["subtitle-1","font-weight-bold"] },
          { text: 'E-mail', value: 'username' , sortable:false, class: ["subtitle-1","font-weight-bold"] },
          { text: 'Imagen', value: 'img', sortable:false, class: ["subtitle-1","font-weight-bold"] },
          { text: '', value: 'actions', sortable:false, class: ["subtitle-1","font-weight-bold"] }
        ],
      }
    },
    computed: {
      ...mapState(['datos','errores','usuarios','registro','autorizado']),
    },

    created () {
      this.cargarGrid()
    },

    methods: {
      ...mapActions(['getDatos', 'clearErrores', 'editarUsuario']),
      
      async cargarGrid () {
        const config = { headers: { token: localStorage.getItem('token') } }
        await this.clearErrores()
        await this.getDatos(config)
        if ( this.usuarios === '' && this.errores.length !== 0) {
          this.sheet = true
        }
      },
      async modificarUsuario(usuario) {
        if (usuario) {
          await this.editarUsuario(usuario)
          this.$router.push("/dash/addusuario")
        }
      },
       eliminarUsuario (item) {
        this.user = item.username
        this.index = item
        this.dialogDelete = true
       },
       closeDelete () {
        this.dialogDelete = false
      },
      async deleteItemConfirm () {
        if (this.user) {
          try {
            await axios.delete(process.env.VUE_APP_BASE_URL + 'user/' + this.user)
              .then (resp => {
                this.dialogDelete = false
                let indexItem = this.usuarios.indexOf(this.index)
                this.usuarios.splice(indexItem, 1)
                this.erroresLocales.message = 'Usuario eliminado con exito'
                this.erroresLocales.color = true
                this.sheet = true
              })
              .catch (e => {
                this.erroresLocales.message === 'Error en la solicitud'
                this.erroresLocales.color = false
                this.sheet = true
              })
          } catch (error) {
            console.log(error)
            this.erroresLocales === 'Error en el servidor'
            this.erroresLocales.color = false
            this.sheet = true
          }
        } else {
          console.log('USUARIO VACIO')
          this.erroresLocales === 'Error con los datos del usuario'
          this.erroresLocales.color = false
          this.sheet = true
        }
      }
    }
}
</script>

<style scoped>
.scale-up-ver-top {
	-webkit-animation: scale-up-ver-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: scale-up-ver-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
@-webkit-keyframes scale-up-ver-top {
  0% {
    -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
  }
}
@keyframes scale-up-ver-top {
  0% {
    -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
  }
}

</style>
