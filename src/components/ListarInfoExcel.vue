<template>
    <v-container class="pb-10">
        <v-layout :wrap="true" justify-center align-center class="mb-5 slide-in-bck-center">
            <v-flex xs12 sm12 md3 lg4>
                <v-card light elevation="5" class="mb-2" color="rgb(169,217,187)">
                    <v-menu
                        v-model="menu1"
                        close-on-content-click
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="mes"
                            label="Mes"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            class="pr-2 pt-4"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        locale="es"
                        v-model="mes"
                        type="month"
                        no-title
                        :max="maximo"
                        >
                        </v-date-picker>
                    </v-menu>
                </v-card>
            </v-flex>
            <v-divider light vertical class="mx-8"></v-divider>
            <v-flex xs12 sm12 md3 lg4>
                <v-card light elevation="5" class="mb-2" color="rgb(169,217,187)">
                    <v-select
                    return-object
                    v-model="rubro"
                    :items="rubros"
                    label="Rubro"
                    hide-details
                    class="pl-3 pb-5 pr-2 pt-4"
                    ></v-select>
                </v-card>
            </v-flex>
            <v-divider light vertical class="mx-8"></v-divider>
            <v-flex xs12 sm12 md2 lg2 >
                <v-btn block type="submit" :v-on="on"  color="#6cc550" dark class="mb-2 mt-3" @click="listar">Listar</v-btn>
            </v-flex>
        </v-layout>
        
        <v-layout v-if="showlist">
            <v-flex xs12 sm12 md12 lg12>
                <v-card>
                    <v-card-title>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Buscar"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>

                    <v-data-table
                    class="tracking-in-contract-bck-bottom"
                    :headers="headers"
                    :items="datos"
                    :search="search"
                    calculate-widths
                    >
                        <template v-slot:[`item.txt_Pos`]="{ item }">
                            <span v-if="item.txt_Pos.length <= 12"> {{ item.txt_Pos.substr(0, 12) }} </span>
                            <v-tooltip bottom v-if="item.txt_Pos.length > 12">
                                <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on"> {{ item.txt_Pos.substr(0, 12) }}... </span>
                                </template>
                                <span> {{ item.txt_Pos }} </span>
                            </v-tooltip>
                        </template>

                        <template v-slot:[`item.nombre1`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on"> {{ item.nombre1.substr(0, 9) }}... </span>
                                </template>
                                <span> {{ item.nombre1 }} </span>
                            </v-tooltip>
                        </template>

                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>

        <v-snackbar v-model="snackbar"
        :color="erroreslocales.color ? '#4CAF50' : '#DE5350'"
        bottom
        dark
        >
            {{ this.erroreslocales.message }}
            <template v-slot:action="{ attrs }">
                <v-btn
                v-bind="attrs"
                text
                dark
                :color="erroreslocales.color ? '#DE5350' : '#FFFFFF'"
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
            showlist: false,
            mes: new Date().toISOString().substr(0, 7),
            meses: [],
            rubro: 0,
            rubros: [],
            snackbar: false,
            erroreslocales: { message: '', color: true },
            menu1: null,
            search: '',
            maximo: new Date().toISOString().substr(0, 7),
            datos: [],
            headers: [
                { text: 'Factura', align: 'start', filterable: false, value: 'Nro_Factura', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Fecha', value: 'fecha_Factura', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Descripción Material', value: 'txt_Pos', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Material', value: 'Material', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Precio', value: 'precio_Unitario', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Un/Med', value: 'unMed_Vta', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Cantidad', value: 'cant_Facturada', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Total', value: 'precioNeto_Pos', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
                { text: 'Cliente', value: 'nombre1', class: ["subtitle-1","font-weight-bold"], divider:true, cellClass: 'px-1' },
            ],
        }
    },
    methods: {
        async listar () {
            let payload = {
                desde: this.mes + '-01',
                hasta: this.mes + '-31',
                rubro: this.rubro
            }
            let obj = JSON.stringify(payload)
            try {
                const config = { headers: { fechas: obj } }
                await axios.get(process.env.VUE_APP_BASE_URL + 'listar', config)
                    .then(resp => {
                        if (resp.data.length !== 0) {
                            this.datos = resp.data
                            this.erroreslocales.message = 'Carga de datos exitosa'
                            this.erroreslocales.color = true
                            this.snackbar = true
                            this.showlist = true
                        } else {
                            this.datos = []
                            if (this.rubro !== 0) {
                                this.erroreslocales.message = 'No existen registros para ' + this.rubro + ' en el mes seleccionado'
                                this.erroreslocales.color = false
                            } else {
                                this.erroreslocales.message = 'No existen registros para el mes seleccionado'
                                this.erroreslocales.color = false
                            }
                            this.snackbar = true
                        }
                    })
                    .catch(err => {
                        this.erroreslocales.message = 'Error al consultar'
                        this.erroreslocales.color = false
                        this.snackbar = true
                    })
            } catch (error) {
                this.erroreslocales.message = 'Error en el servidor'
                this.erroreslocales.color = false
                this.snackbar = true
            }
        }
    },
    created () {
        try {
            axios.get(process.env.VUE_APP_BASE_URL + 'inforubros')
                .then(resp => {
                    this.rubros = resp.data.map(ele => {
                        if (ele.rubro !== 'HUEVOS EMPACADOS') {
                            return ele.rubro
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.erroreslocales.message = 'Error al consultar rubros'
                    this.erroreslocales.color = false
                    this.snackbar = true
                })
        } catch (error) {
            console.log(error)
            this.erroreslocales.message = 'Error en el servidor'
            this.erroreslocales.color = false
            this.snackbar = true
        }
    }
}
</script>


<style scoped>
.slide-in-bck-center {
	-webkit-animation: slide-in-bck-center 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-bck-center 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-bck-center {
  0% {
    -webkit-transform: translateZ(600px);
            transform: translateZ(600px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-in-bck-center {
  0% {
    -webkit-transform: translateZ(600px);
            transform: translateZ(600px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}

.tracking-in-contract-bck-bottom {
	-webkit-animation: tracking-in-contract-bck-bottom 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    animation: tracking-in-contract-bck-bottom 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

@-webkit-keyframes tracking-in-contract-bck-bottom {
  0% {
    letter-spacing: 1em;
    -webkit-transform: translateZ(400px) translateY(300px);
            transform: translateZ(400px) translateY(300px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
            transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}
@keyframes tracking-in-contract-bck-bottom {
  0% {
    letter-spacing: 1em;
    -webkit-transform: translateZ(400px) translateY(300px);
            transform: translateZ(400px) translateY(300px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
            transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}


</style>