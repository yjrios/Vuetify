<template>
<v-container>
    <v-card color="#BBDEFB">    
        <v-layout :wrap="true">
            <v-divider dark vertical class="mx-5"></v-divider>
            <v-flex xs12 sm12 md12 lg5 offset-sm="1" class="mb-2">
                <div align="center" justify="center">
                    <span class="font-weight-medium">RANGO DE FECHAS</span>
                </div>
                <v-layout :wrap="true">
                    <v-divider dark vertical class="mx-2"></v-divider>
                    <v-flex xs12 sm12 md12 lg4>
                        <v-card class="mb-5" color="blue darken-1" dark>
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
                                        v-model="fecha1d"
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
                                    v-model="fecha1d"
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
                    <v-flex xs12 sm12 md12 lg4>
                        <v-card class="mb-5" color="blue darken-1" dark>
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
                                        v-model="fecha1h"
                                        label="Fecha Hasta"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        clearable
                                        height="50"
                                    ></v-text-field>
                                </template>

                                <v-date-picker 
                                    v-model="fecha1h"
                                    header-color="success"
                                    locale="es-ve"
                                    :min="minimo"
                                    :max="maximo"
                                    max-width="200"
                                    >
                                </v-date-picker>
                            </v-menu>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout :wrap="true">
                    <v-flex xs12 sm12 md12 lg12 v-if="showgrafica">
                        <v-card color="#FFFFFF">
                            <BarChart :chartData='data1'/>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-divider dark vertical class="mx-8"></v-divider>
            <v-flex xs12 sm12 md12 lg5 offset-sm="1" class="mb-2">
                <div align="center" justify="center">
                    <span class="mt-mb-4 font-weight-medium">RANGO DE FECHAS</span>
                </div>
                <v-layout :wrap="true">
                    <v-divider dark vertical class="mx-2"></v-divider>
                    <v-flex xs12 sm12 md12 lg4>
                        <v-card dark class="mb-5" color="blue darken-1">
                            <v-menu
                                v-model="menu3"
                                close-on-content-click
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="fecha2d"
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
                                    v-model="fecha2d"
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
                    <v-flex xs12 sm12 md12 lg4>
                        <v-card dark class="mb-5 mr-2" color="blue darken-1">
                            <v-menu
                                v-model="menu4"
                                close-on-content-click
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                left
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="fecha2h"
                                        label="Fecha Hasta"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        clearable
                                        height="50"
                                    ></v-text-field>
                                </template>

                                <v-date-picker 
                                    v-model="fecha2h"
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
                    <v-flex xs12 sm12 md12 lg1>
                        <div align="center" justify="center">
                        <v-tooltip bottom color="success">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-on="on" v-bind="attrs" block type="submit" color="success" dark class="mt-8 mb-2" @click="solicitardata">Listar</v-btn>
                                
                            </template>
                            <span>Enviar Rangos de Fechas</span>
                        </v-tooltip>
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout :wrap="true">
                    <v-flex xs12 sm12 md12 lg12 v-if="showgrafica">
                        <v-card color="#FFFFFF">
                            <BarChart :chartData='data2'/>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card>
    <v-card>
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
                @click="snackbar = false">
                Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-card>
</v-container>
</template>

<script>
import BarChart from "@/components/BarChart.js"
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'Balance',

    data () {
        return{
            snackbar: false,
            valor: null,
            aux: [],
            color1: [],
            bordercolor1: [],
            color2: [],
            bordercolor2: [],
            ventas1: [], 
            ventas2: [],
            fechas1: [],
            fechas2: [],
            data1: '',
            data2: '',
            menu1: null,
            menu2: null,
            menu3: null,
            menu4: null,
            fecha1d: new Date().toISOString().substr(0,10),
            fecha1h: new Date().toISOString().substr(0,10),
            fecha2d: new Date().toISOString().substr(0,10),
            fecha2h: new Date().toISOString().substr(0,10),
            erroreLocales: '',
            minimo: "2020",
            maximo: new Date().toISOString().substr(0, 10),
            showgrafica: false
        }
    },

    components:{
        BarChart
    },
    mounted () {

    },
    methods:{
        async solicitardata () {
            let hoy = new Date().toLocaleDateString()
            if ( this.fecha1d === hoy && this.fecha1h === hoy && this.fecha2d === hoy && this.fecha2h === hoy ) {
                this.erroreLocales = 'Debe ingresar todas las fechas para solicitar'
            }else{
                let payload = {
                    fecha1d: this.fecha1d,
                    fecha1h: this.fecha1h,
                    fecha2d: this.fecha2d,
                    fecha2h: this.fecha2h
                }
                let data = JSON.stringify(payload)
                try {
                    const config = { headers: { token: localStorage.getItem('token'), fechas: data } }
                    await axios.get(process.env.VUE_APP_BASE_URL+'obtenerdataporfecha', config)
                    .then(resp => {

                        //PRIMERA GRAFICA
                        let fechadesde = moment(new Date(this.fecha1d).toISOString().substr(0,10))
                        let fechahasta = moment(new Date(this.fecha1h).toISOString().substr(0,10))
                        let difFechas = fechahasta.diff(fechadesde, 'days')

                        let objeto = {
                            ventasAcum: [],
                            fechaVentas: [],
                            color: [],
                            bordercolor: []
                        }
                        let fechainicio = new Date(this.fecha1d).toISOString().substr(0,10)
                        for(let i = 0; i <= difFechas; i++){
                            let ventasporfecha = 0
                            let resultado = resp.data.rangeone.filter(dato => {
                                let fecharegistro = new Date(dato.fecha_Factura).toISOString().substr(0,10)
                                if (fecharegistro === fechainicio) {
                                    ventasporfecha += Number(dato.precioNeto_Pos)
                                    return dato
                                }
                            });
                            objeto.ventasAcum.push(ventasporfecha)
                            objeto.fechaVentas.push(fechainicio)
                            objeto.color.push('rgba(0, 99, 132, 0.6)')
                            objeto.bordercolor.push('rgba(0, 99, 132, 1)')
                            
                            let f = new Date(fechainicio)
                            f.setDate(f.getDate()+1)
                            fechainicio = new Date(f).toISOString().substr(0,10)
                        }
                        this.data1 = {
                            labels: objeto.fechaVentas,
                            datasets: [{
                                label: 'VENTAS '+this.fecha1d+' a '+this.fecha1h,
                                backgroundColor: objeto.color,
                                borderColor: objeto.bordercolor,
                                borderWidth: 2,
                                data: objeto.ventasAcum
                            }]
                        }

                        //SEGUNDA GRAFICA
                        let fechaevaluardesde = moment(new Date(this.fecha2d).toISOString().substr(0,10))
                        let fechaevaluarhasta = moment(new Date(this.fecha2h).toISOString().substr(0,10))
                        let diferenciaFechas = fechaevaluarhasta.diff(fechaevaluardesde, 'days')

                        let obj = {
                            ventasAcum: [],
                            fechaVentas: [],
                            color: [],
                            bordercolor: []
                        }
                        let desde = new Date(this.fecha2d).toISOString().substr(0,10)
                        for(let i = 0; i <= diferenciaFechas; i++){
                            let acum = 0
                            let respueta = resp.data.rangetwo.filter(dato => {
                                let fecharegistro = new Date(dato.fecha_Factura).toISOString().substr(0,10)
                                if (fecharegistro === desde) {
                                    acum += Number(dato.precioNeto_Pos)
                                    return dato
                                }
                            });
                            obj.ventasAcum.push(acum)
                            obj.fechaVentas.push(desde)
                            obj.color.push('rgba(0, 99, 132, 0.6)')
                            obj.bordercolor.push('rgba(0, 99, 132, 1)')
                            
                            let f = new Date(desde)
                            f.setDate(f.getDate()+1)
                            desde = new Date(f).toISOString().substr(0,10)
                        }
                        this.data2 = {
                            labels: obj.fechaVentas,
                            datasets: [{
                                label: 'VENTAS '+this.fecha2d+' a '+this.fecha2h,
                                data: obj.ventasAcum,
                                backgroundColor: obj.color,
                                borderColor: obj.bordercolor,
                                borderWidth: 2,
                            }]
                        }
                        this.showgrafica = true
                        if (resp.data.rangetwo.length === 0) {
                            this.datos = resp.data
                            this.erroreLocales = { message: 'No hay datos para el rango 2' }
                            this.snackbar = true
                        }
                        if (resp.data.rangeone.length === 0) {
                            this.erroreLocales = { message: 'No hay datos para el rango 1' }
                            this.snackbar = true
                        }
                    })
                    .catch(err => {
                        this.erroreLocales = { message: 'ERROR al consultar, intente nuevamente' }
                        this.snackbar = true
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}
</script>