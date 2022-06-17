<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Usuarios</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="800px" persistent>
        <template v-slot:activator="{ on }" v-if="autorizado">
            <v-btn color="success" class="mx-2" v-on="{on}" fab @click.native.stop="dialog = true" to="/dash/addusuario">
               <v-icon dark color="blue darken-4">mdi-plus</v-icon>
            </v-btn>
        </template>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro que desea eliminar el registro?</v-card-title>
            <v-card-text class="text-h5 text-center font-weight-bold text--black">{{this.user}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Seguro</v-btn>
              <v-btn color="blue darken-1" text @click="closeDelete">Cerrar</v-btn>
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

    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
          Cerrar
        </v-btn>
        <div class="py-3" v-if="autorizado">
          NO EXISTEN DATOS QUE MOSTRAR
        </div>
        <div class="py-3" v-if="!autorizado">
          USUARIO NO AUTORIZADO
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return{
        unauthorized: false,
        user: '',
        index: null,
        dialogDelete: false,
        dialog: false,
        search: '',
        sheet: false,
        headers: [
          { text: 'Nombres',  value: 'nombres', sortable:true },
          { text: 'Apellidos', value: 'apellidos', sortable:false },
          { text: 'Cargo', value: 'cargo' , sortable:false },
          { text: 'E-mail', value: 'username' , sortable:false },
          { text: 'Imagen', value: 'img', sortable:false },
          { text: '', value: 'actions', sortable:false }
        ],
      }
    },
    computed: {
      ...mapState(['datos','errores','usuarios','registro','autorizado'])
    },
    created () {
      this.cargarGrid()
    },
    methods: {
      ...mapActions(['getDatos','clearErrores', 'editarUsuario']),
      
      async cargarGrid(){
        const config = { headers: { token: localStorage.getItem('token') }}
        await this.clearErrores()
        await this.getDatos(config)
        if( this.usuarios == '' && this.errores.length != 0){
          this.sheet = true
          this.unauthorized = true
          console.log('AUTORIZADO')
        }
      },
      async modificarUsuario(usuario){
        if(usuario){
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
        if(this.user){
          try {
            await this.axios.delete(process.env.VUE_APP_BASE_URL+'user/'+this.user)
            .then (resp => {
              this.dialogDelete = false
              let indexItem = this.usuarios.indexOf(this.index)
              this.usuarios.splice(indexItem, 1)
            })
            .catch (e => {
              console.log(e)
            })
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
}
</script>