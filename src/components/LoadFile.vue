<template>
    <v-form @submit.prevent="save">
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card color='#E0F7FA'>
                <v-card-title><span class="headline text-center">Cargando Archivo</span></v-card-title>
                <v-card-text>
                    <v-layout :wrap="true">
                        <v-flex xs12 sm4 md4 lg12>
                            <v-file-input
                            v-model="file"
                            prepend-icon="mdi-paperclip"
                            accept="file/xls"
                            placeholder="Añade un archivo *"
                            truncate-length="50"
                            hint="Campo requerido"
                            ></v-file-input>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card class="align-center mx-auto" color='#E0F7FA'>
                <v-card-text>
                    <v-layout :wrap="true">
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-3" class="mx-2 my-1" @click="cancel">Cerrar</v-btn>
                        <v-btn type="submit" color="blue darken-3" class="mx-2 my-1" @click="save">Cargar</v-btn>
                        <v-spacer></v-spacer>
                    </v-layout>
                </v-card-text>
                </v-card>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar"
      color="#4CAF50"
      bottom
      dark
      >
      {{ this.erroreLocales.message }}
      <template>
        <v-btn
        right
        text
        dark
        color="red"
        @click="listar">
          Cerrar
        </v-btn>
      </template>
      </v-snackbar>
    </v-form>
</template>

<script>

import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'loadfile',

    data () {
        return {
            bienMal: false,
            snackbar: false,
            file: null,
            dialog: true,
            minimo: "2022",
            maximo: "2023",
            erroreLocales: ''
        }
    },
    methods: {
        ...mapMutations(['setearopcionmenu']),
        cancel () {
            this.file = null
            this.setearopcionmenu('dashboard')
            this.$router.push('/dash/mostrarbalance')
        },
        save () {
            if(this.file){
                readXlsxFile(this.file)
                .then( xlsx => {
                    let payload = {
                        data: xlsx
                    }
                    try {
                        axios.post(process.env.VUE_APP_BASE_URL +'cargadedocumento', payload)
                        .then(resp => {
                            this.erroreLocales = { message : 'Registro Exitoso'}
                            this.snackbar = true
                            this.bienMal = true
                        })
                        .catch(err => {
                            this.erroreLocales = { message : 'ERROR al cargar archivo, intente nuevamente'}
                            this.snackbar = true
                            this.bienMal = false
                        })
                    } catch (error) {
                        console.log(error)
                    }
                })
            }
        },
        listar () {
            if (this.bienMal) {
                this.snackbar = false
                this.setearopcionmenu('listado')
                this.$router.push('/dash/listar')
            }else{
                this.snackbar = false
            }
        }
    },
}
</script>
