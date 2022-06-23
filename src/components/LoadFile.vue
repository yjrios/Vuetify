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
                        <!-- <v-flex xs12 sm4 md4 lg3>
                            <v-card class="ml-5 my-3">
                                <v-menu
                                v-model="menu1"
                                close-on-content-click
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="fechad"
                                        label="Fecha Inicio Periodo"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        clearable
                                        max-height="30"
                                        ></v-text-field>
                                    </template>

                                    <v-date-picker 
                                    v-model="fechad"
                                    header-color="primary"
                                    full-width
                                    locale="es-ve"
                                    :min="minimo"
                                    :max="maximo"
                                    ></v-date-picker>
                                </v-menu>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg3>
                            <v-card class="ml-5 my-3">
                                <v-menu
                                v-model="menu2"
                                close-on-content-click
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="fechah"
                                            label="Fecha Final Periodo"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            clearable
                                            max-height="30"
                                        ></v-text-field>
                                    </template>

                                    <v-date-picker 
                                    v-model="fechah"
                                    header-color="primary"
                                    full-width
                                    locale="es-ve"
                                    :min="minimo"
                                    :max="maximo"
                                    ></v-date-picker>
                                </v-menu>
                            </v-card>
                        </v-flex> -->
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
    </v-form>
</template>

<script>

import axios from 'axios'
import readXlsxFile from 'read-excel-file'

export default {
    name: 'loadfile',

    data () {
        return {
            file: null,
            dialog: true,
            minimo: "2022",
            maximo: "2023"
        }
    },
    methods: {
        cancel () {
            this.file = null
            this.$router.go(-1)
        },
        save () {
            if(this.file){
                readXlsxFile(this.file)
                .then( xlsx => {
                    let payload = {
                        data: xlsx
                    }
                    try {
                        this.axios.post(process.env.VUE_APP_BASE_URL +'cargadedocumento', payload)
                        .then(resp => {
                            console.log(resp)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    } catch (error) {
                        console.log(error)
                    } 
                })
            }
        }
    },
    mounted (){
    }
}
</script>
