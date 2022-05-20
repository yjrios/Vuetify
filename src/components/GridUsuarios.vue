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
        <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mx-2" v-on="{on}" fab @click.native.stop="dialog = true" to="/dash/addusuario">
               <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </template>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :items="this.usuarios"
      :headers="headers"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`] = "{ item }">
        <v-icon small @click="editarUsuario(item)">mdi-pencil</v-icon>
        <v-icon small @click="eliminarUsuario(item)">mdi-delete</v-icon>
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
        <div class="py-3">
          NO EXISTEN DATOS QUE MOSTRAR
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
    data: () => ({
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

    computed: {
      ...mapState(['datos','errores','usuarios'])
    },

    // watch: {
    //   dialog (val) {
    //     val || this.close()
    //   }
    // },

    created () {
      this.cargarGrid()
    },

    methods: {
      ...mapActions(['getDatos','clearErrores']),
      //...mapMutations(['editarUsuario']),

      async cargarGrid(){
        await this.clearErrores()
        await this.getDatos()
        if( this.usuarios == '' && this.errores.length == 0){
          this.sheet = true
        }
      },
      // async editarUsuario(usuario){
      //   if(usuario != ''){
      //     console.log('Usuario '+usuario)
      //    await this.editarUsuario(usuario)
      //     this.$router.push("/dash/addusuario")
      //   }
      // },

      // deleteItem (item) {
      //   const index = this.desserts.indexOf(item)
      //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      // },

      // close () {
      //   this.dialog = false
      //   setTimeout(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   }, 300)
      // },

      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
      //   } else {
      //     this.desserts.push(this.editedItem)
      //   }
      //   this.close()
      // }
    }
  })
}
</script>