<template>
    <v-form @submit.prevent="save">
        <v-dialog v-model="dialog" max-width="500px" persistent  class="slide-tr">
            <v-card>
                <v-img
                max-height="auto"
                src="../assets/backside8.jpg"
                >
                    <v-card-title><span class="headline text-center white--text">Cargando Archivo</span></v-card-title>
                    <v-divider dark></v-divider>
                    <v-card-text>
                        <v-layout :wrap="true" justify-center>
                            <v-flex xs12 sm10 md10 lg12>
                                <v-file-input
                                v-model="file"
                                prepend-icon="mdi-paperclip"
                                accept=".xls, .xlsx"
                                placeholder="Añade un archivo *"
                                truncate-length="50"
                                hint="Campo requerido"
                                show-size
                                :loading="loading"
                                dark
                                ></v-file-input>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <!-- <v-card class="align-center mx-auto" color='rgb(169,217,187)'> -->
                    <v-card-actions>
                        <v-layout :wrap="true">
                            <v-spacer></v-spacer>
                            <v-btn text color="rgb(169,217,187)" class="mx-2 my-1 white--text" @click="cancel">Cerrar</v-btn>
                            <v-btn text type="submit" color="rgb(169,217,187)" class="mx-2 my-1 white--text" @click="loading = true, save()">Cargar</v-btn>
                            <v-spacer></v-spacer>
                        </v-layout>
                    </v-card-actions>
                </v-img>
                <!-- </v-card> -->
            </v-card>
        </v-dialog>
        <v-snackbar
        v-model="snackbar"
        :color="erroreLocales.color ? '#4CAF50' : '#DE5350'"
        bottom
        dark
        >
            {{ this.erroreLocales.message }}
            <template v-slot:action="{ attrs }">
                <v-btn
                v-bind="attrs"
                text
                dark
                :color="erroreLocales.color ? '#DE5350' : '#FFFFFF'"
                @click="snackbar = false, listar()">
                Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-form>
</template>

<script>
import axios from 'axios'
import readXlsxFile from 'read-excel-file'

export default {
    name: 'loadfile',

    data () {
        return {
            bienMal: false,
            snackbar: false,
            file: null,
            dialog: true,
            erroreLocales: { message: '', color: true },
            loading: false
        }
    },
    methods: {
        cancel () {
            this.file = null
            this.$store.commit('setearopcionmenu', 0)
            this.$router.push('/dash').catch({})
        },
        save () {
            if (this.file) {
                readXlsxFile(this.file)
                .then( xlsx => {
                    let payload = {
                        data: xlsx
                    }
                    try {
                        axios.post(process.env.VUE_APP_BASE_URL + 'cargadedocumento', payload)
                            .then(resp => {
                                this.loading = false
                                this.erroreLocales.message = 'Registro Exitoso'
                                this.erroreLocales.color = true
                                this.snackbar = true
                                this.bienMal = true
                            })
                            .catch(err => {
                                console.log(err)
                                this.loading = false
                                this.erroreLocales.message = 'Error al cargar archivo, intente nuevamente'
                                this.erroreLocales.color = false
                                this.snackbar = true
                                this.bienMal = false
                            })
                    } catch (error) {
                        console.log(err)
                        this.loading = false
                        this.erroreLocales.message = 'Error al intentar subir data'
                        this.erroreLocales.color = false
                        this.snackbar = true
                    }
                })
                .catch(erro => {
                    this.loading = false
                    this.erroreLocales.message = 'Error al intentar leer el archivo'
                    this.erroreLocales.color = false
                    this.snackbar = true
                })
            } else {
                this.loading = false
                this.erroreLocales.message = 'Debe seleccionar un archivo'
                this.erroreLocales.color = false
                this.snackbar = true
                this.bienMal = false
            }
        },
        listar () {
            if (this.bienMal) {
                this.$store.commit('setearopcionmenu', 0)
                this.$router.push('/dash').catch({})
            } else {
                this.snackbar = false
            }
        }
    },
}
</script>
