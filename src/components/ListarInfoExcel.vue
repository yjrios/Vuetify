<template>
    <v-container>
        <v-layout :wrap="true">
            <v-divider dark vertical class="mx-3"></v-divider>
            <v-flex xs12 sm12 md3 lg4>
                <v-card class="mb-5" color="primary" dark>
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
                                label="Fecha Desde"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                height="50"
                            ></v-text-field>
                        </template>

                        <v-date-picker 
                            v-model="fechad"
                            header-color="success"
                            max-width="200"
                            locale="es-ve"
                            :min="minimo"
                            :max="maximo"
                            >
                        </v-date-picker>
                    </v-menu>
                </v-card>
            </v-flex>
            <v-divider light vertical class="mx-8"></v-divider>
            <v-flex xs12 sm12 md3 lg4>
                <v-card class="mb-5" color="primary" dark>
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
                                label="Fecha Desde"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                clearable
                                height="50"
                            ></v-text-field>
                        </template>

                        <v-date-picker 
                            v-model="fechah"
                            header-color="success"
                            max-width="200"
                            locale="es-ve"
                            :min="minimo"
                            :max="maximo"
                            >
                        </v-date-picker>
                    </v-menu>
                </v-card>
            </v-flex>
            <v-divider light vertical class="mx-8"></v-divider>
            <v-flex xs12 sm12 md2 lg2>
                <v-btn block type="submit" color="success" dark class="mt-8 mb-2" @click="listar">Listar</v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="datos"
                    :search="search"
                    ></v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar v-model="snackbar"
        color="#4CAF50"
        bottom
        dark
        >
            {{ this.erroreslocales.message }}
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
    </v-container>
</template> 

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        snackbar: false,
        erroreslocales: '',
        menu1: null,
        menu2: null,
        fechad: new Date().toISOString().substr(0,10),
        fechah: new Date().toISOString().substr(0,10),
        search: '',
        minimo: '2020',
        maximo: new Date().toISOString().substr(0, 10),
        datos: [],
        headers: [
          { text: 'Factura', align: 'start', filterable: false, value: 'Nro_Factura'},
          { text: 'Fecha Factura', value: 'fecha_Factura' },
          { text: 'Precio c/u', value: 'precio_Unitario' },
          { text: 'Cantidad F.', value: 'cant_Facturada' },
          { text: 'Precio Neto', value: 'precioNeto_Pos' },
          { text: 'Material', value: 'Material' },
        ],
      }
    },
    methods: {
        async listar () {
            let payload = {
                desde: this.fechad,
                hasta: this.fechah
            }
            let obj = JSON.stringify(payload)

            try {
                const config = { headers: { token: localStorage.getItem('token'), fechas: obj } }
                await axios.get(process.env.VUE_APP_BASE_URL+'listar', config)
                .then(resp =>{
                    if (resp.data.length !== 0) {
                        this.datos = resp.data
                        this.erroreslocales = { message: 'Carga de Datos Exitoso' }
                        this.snackbar = true
                    }else{
                        this.erroreslocales = { message: 'No hay datos para el rango' }
                        this.snackbar = true
                    }
                })
                .catch(err =>{
                    this.erroreslocales = {message: 'ERROR al consultar'}
                })
            } catch (error) {
                this.erroreslocales = { message: 'ERROR en el servidor'}
            }
            

        }

    },
  }
</script>