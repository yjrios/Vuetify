<template>
    <v-container class="pb-10">
        <v-layout :wrap="true" justify-center class="mb-5 slide-in-bck-center">
            <v-flex cols6 xs12 sm12 md12 lg5 offset-sm="1" class="pt-1">
                <v-layout :wrap="true">
                    <v-flex xs12 sm12 md12 lg3 class="mb-1">                            
                        <v-card light color="rgb(169,217,187)">
                            <v-menu
                            v-model="modal1"
                            close-on-content-click
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="mes1"
                                    label="Mes"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    class="pr-2 text-black"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                locale="es"
                                v-model="mes1"
                                type="month"
                                no-title
                                scrollable
                                :max="maximo"
                                >
                                </v-date-picker>
                            </v-menu>
                        </v-card>
                    </v-flex>
                    <v-divider dark vertical class="mx-1"></v-divider>
                    <v-flex xs12 sm12 md12 lg4 class="mb-1">
                        <v-card light color="rgb(169,217,187)">
                            <v-select
                            v-model="rubro1"
                            :items="rubros"
                            label="Rubro"
                            hide-details
                            class="pl-3 pr-2 pb-5"
                            @change="rubro1Bol = true, rubro2Bol = false, solicitarunidades(rubro1), disabled1 = false"
                            ></v-select>
                        </v-card>
                    </v-flex>
                    <v-divider dark vertical class="mx-1"></v-divider>
                    <v-flex xs12 sm12 md12 lg4 class="mb-1">
                        <v-card light color="rgb(169,217,187)">
                            <v-select
                            return-object
                            v-model="unidad_medida1"
                            :items="medidas1"
                            label="Unidad de medida"
                            hide-details
                            class="pl-3 pb-5 pr-2"
                            :disabled="disabled1 === true"
                            ></v-select>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-divider dark vertical class="mx-3"></v-divider>
            <v-flex cols6 xs12 sm12 md12 lg5 offset-sm="1" class="mb-2 pt-1">
                <v-layout :wrap="true">
                    <v-flex xs12 sm12 md12 lg3 class="mb-1">
                        <v-card light color="rgb(169,217,187)">
                            <v-menu
                            v-model="modal2"
                            close-on-content-click
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="mes2"
                                    label="Mes"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                    class="pr-2"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                locale="es"
                                v-model="mes2"
                                type="month"
                                no-title
                                scrollable
                                :max="maximo"
                                >
                                </v-date-picker>
                            </v-menu>
                        </v-card>
                    </v-flex>
                    <v-divider dark vertical class="mx-1"></v-divider>
                    <v-flex xs12 sm12 md12 lg4 class="mb-1">
                        <v-card light color="rgb(169,217,187)">
                            <v-select
                            v-model="rubro2"
                            :items="rubros"
                            label="Rubro"
                            hide-details
                            class="pl-3 pb-5 pr-2"
                            @change="rubro2Bol = true, rubro1Bol = false, solicitarunidades(rubro2), disabled2 = false"
                            ></v-select>
                        </v-card>
                    </v-flex>
                    <v-divider dark vertical class="mx-1"></v-divider>
                    <v-flex xs12 sm12 md12 lg4 class="mb-1">
                        <v-card light color="rgb(169,217,187)">
                            <v-select
                            return-object
                            v-model="unidad_medida2"
                            :items="medidas2"
                            label="Unidad de medida"
                            hide-details
                            class="pl-2 pb-5 pr-2"
                            :disabled="disabled2 === true"
                            ></v-select>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex cols12 xs12 sm12 md12 lg4 class="mb-5">
                <v-btn block type="submit" color="#6cc550" dark @click="solicitardata">Consultar</v-btn>
            </v-flex>
        </v-layout>
        <v-layout :wrap="true" align="center" justify-center class="mb-1">
            <v-flex xs12 sm12 md12 lg5 v-if="showgrafica1" class="slide-in-left">
                <v-card color="#FFFFFF">
                    <BarChart :chartData='data1' />
                    <v-toolbar>
                        TOTAL VENTAS:   <span><strong>{{ new Intl.NumberFormat('de-DE').format(total.toFixed(2)) }} {{uniTag}}</strong></span>
                    </v-toolbar>
                </v-card>
            </v-flex>
            <v-divider dark vertical class="mx-2"></v-divider>
            <v-flex xs12 sm12 md12 lg5 v-if="showgrafica2"  class="slide-in-right">
                <v-card color="#FFFFFF">
                    <BarChart :chartData='data2' />
                    <v-toolbar>
                        TOTAL VENTAS:   <span><strong>{{ new Intl.NumberFormat('de-DE').format(total2.toFixed(2)) }} {{uniTag2}}</strong></span>
                    </v-toolbar>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout :wrap="true">
            <v-flex cols12 xs12 sm12 md12 lg12>
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
                        @click="snackbar = false">
                        Cerrar
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BarChart from "@/components/BarChart.js"
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'Balance',

    data () {
        return {
            snackbar: false,
            data1: '',
            data2: '',
            erroreLocales: { message: '', color: true },
            maximo: new Date().toISOString().substr(0, 7),
            showgrafica1: false,
            showgrafica2: false,
            mes1: new Date().toISOString().substr(0, 7),
            mes2: new Date().toISOString().substr(0, 7),
            meses: [],
            rubros: [],
            medidas1: [],
            medidas2: [],
            rubro1: 0,
            rubro2: 0,
            modal1: false,
            modal2: false,
            unidad_medida1: '',
            unidad_medida2: '',
            rubro1Bol: false,
            rubro2Bol: false,
            disabled1: true,
            disabled2: true,
            total: 0,
            total2: 0,
            tag: '',
            tag2: '',
            uniTag: '',
            uniTag2: '',
        }
    },
    components: {
        BarChart
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
                    this.erroreLocales.message = 'Error al consultar tipos de rubros'
                    this.erroreLocales.color = false
                    this.snackbar = true
                })
        } catch (error) {
            console.log(error)
            this.erroreLocales.message = 'Error en el servidor'
            this.erroreLocales.color = false
            this.snackbar = true
        }
    },
    methods: {
        async solicitardata () {
            this.total = 0
            this.total2 = 0
            if (this.rubro2 !== 0 && this.rubro1 !== 0 && this.unidad_medida2 === '' && this.unidad_medida1 === '') {
                this.erroreLocales.message = 'Debe ingresar la unidad de medida para los rubros seleccionados'
                this.erroreLocales.color = false
                this.snackbar = true
            } else if (this.rubro1 !== 0 && this.unidad_medida1 === '') {
                this.erroreLocales.message = 'Debe ingresar la unidad de medida para el rubro ' + this.rubro1
                this.erroreLocales.color = false
                this.snackbar = true
            } else if (this.rubro2 !== 0 && this.unidad_medida2 === '') {
                this.erroreLocales.message = 'Debe ingresar la unidad de medida para el rubro ' + this.rubro2
                this.erroreLocales.color = false
                this.snackbar = true
            } else {
                let payload = {
                    fecha1d: this.mes1 + '-01',
                    fecha1h: this.mes1 + '-31',
                    fecha2d: this.mes2 + '-01',
                    fecha2h: this.mes2 + '-31',
                    rubro1: this.rubro1,
                    rubro2: this.rubro2
                }
                let data = JSON.stringify(payload)
                try {
                    const config = { headers: { fechas: data } }
                    await axios.get(process.env.VUE_APP_BASE_URL + 'obtenerdataporfecha', config)
                        .then(resp => {
                            //PRIMERA GRAFICA
                            let fechadesde = moment(new Date(payload.fecha1d).toISOString().substr(0,10))
                            let fechahasta = moment(new Date(payload.fecha1h).toISOString().substr(0,10))
                            let difFechas = fechahasta.diff(fechadesde, 'days')

                            let objeto = {
                                ventasAcum: [],
                                fechaVentas: [],
                                color: [],
                                bordercolor: []
                            }
                            let fechainicio = new Date(payload.fecha1d).toISOString().substr(0, 10)
                            for (let i = 0; i <= difFechas; i++) {
                                let ventasporfecha = 0
                                resp.data.rangeone.forEach(dato => {
                                    let fecharegistro = new Date(dato.fecha_Factura).toISOString().substr(0, 10)
                                    if (fecharegistro === fechainicio) {
                                        if ((this.unidad_medida1.text === 'DOLARES' && dato.unMed_Vta !== 'UN') || this.rubro1 === 0 && dato.unMed_Vta !== 'UN') {
                                            ventasporfecha += Number(dato.precioNeto_Pos)
                                        } else {
                                            if (dato.unMed_Vta === this.unidad_medida1.value) {
                                                ventasporfecha += Number(dato.cant_Facturada)
                                            } else {
                                                if (dato.unMed_Vta !== 'UN') {
                                                    if (this.unidad_medida1.text !== 'KILOGRAMOS') {
                                                        ventasporfecha += Number(dato.cant_Facturada) / 1000
                                                    } else {
                                                        ventasporfecha += Number(dato.cant_Facturada) * 1000
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                                /* objeto.ventasAcum.push(new Intl.NumberFormat('de-DE').format(ventasporfecha.toFixed(2))) */
                                objeto.ventasAcum.push(ventasporfecha.toFixed(2))
                                this.total += ventasporfecha
                                let fch_Aux = fechainicio.split('-')
                                objeto.fechaVentas.push(fch_Aux[2] + '/' + fch_Aux[1] + '/' + fch_Aux[0])
                                objeto.color.push('rgba(176, 176, 176 , 0.7)')
                                /* objeto.bordercolor.push('rgb(0,128,0)') */
                                objeto.bordercolor.push('#6cc550')
                                
                                let f = new Date(fechainicio)
                                f.setDate(f.getDate() + 1)
                                fechainicio = new Date(f).toISOString().substr(0, 10)
                            }
                            
                            if ( this.rubro1 !== 0 ) {
                                this.tag = 'VENTAS ' + this.rubro1 + ' EN ' + this.unidad_medida1.text
                                if ( this.unidad_medida1.value === 'DL' ) {
                                    this.uniTag = '$'
                                } else if ( this.unidad_medida1.value === 'TO' ) {
                                    this.uniTag = 'TM'
                                } else {
                                    this.uniTag = this.unidad_medida1.value
                                }
                            } else {
                                this.tag = 'VENTAS EN DOLARES'
                                this.uniTag = '$'
                            }

                            this.data1 = {
                                labels: objeto.fechaVentas,
                                datasets: [{
                                    label: this.tag,
                                    backgroundColor: objeto.color,
                                    borderColor: objeto.bordercolor,
                                    borderWidth: 2,
                                    data: objeto.ventasAcum
                                }]
                            }
                            //SEGUNDA GRAFICA
                            let fechaevaluardesde = moment(new Date(payload.fecha2d).toISOString().substr(0, 10))
                            let fechaevaluarhasta = moment(new Date(payload.fecha2h).toISOString().substr(0, 10))
                            let diferenciaFechas = fechaevaluarhasta.diff(fechaevaluardesde, 'days')

                            let obj = {
                                ventasAcum: [],
                                fechaVentas: [],
                                color: [],
                                bordercolor: []
                            }
                            let desde = new Date(payload.fecha2d).toISOString().substr(0,10)
                            for (let i = 0; i <= diferenciaFechas; i++) {
                                let acum = 0
                                resp.data.rangetwo.forEach(dato => {
                                    let fecharegistro = new Date(dato.fecha_Factura).toISOString().substr(0,10)
                                    if (fecharegistro === desde) {
                                        if ((this.unidad_medida2.text === 'DOLARES' && dato.unMed_Vta !== 'UN') || this.rubro2 === 0) {
                                            acum += Number(dato.precioNeto_Pos)
                                        } else {
                                            if (dato.unMed_Vta === this.unidad_medida2.value) {
                                                acum += Number(dato.cant_Facturada)
                                            } else {
                                                if (dato.unMed_Vta !== 'UN') {
                                                    if (this.unidad_medida2.text !== 'KILOGRAMOS') {
                                                        acum += Number(dato.cant_Facturada) / 1000
                                                    } else {
                                                        acum += Number(dato.cant_Facturada) * 1000
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                                /* obj.ventasAcum.push(new Intl.NumberFormat('de-DE').format(acum.toFixed(2))) */
                                obj.ventasAcum.push(acum.toFixed(2))
                                this.total2 += acum
                                let fch_Aux2 = desde.split('-')
                                obj.fechaVentas.push(fch_Aux2[2] + '/' + fch_Aux2[1] + '/' + fch_Aux2[0])
                                obj.color.push('rgba(176, 176, 176 , 0.7)')
                                /* obj.bordercolor.push('rgb(0,128,0)') */
                                obj.bordercolor.push('#6cc550')
                                
                                let f = new Date(desde)
                                f.setDate(f.getDate() + 1)
                                desde = new Date(f).toISOString().substr(0, 10)
                            }

                            if ( this.rubro2 !== 0 ) {
                                this.tag2 = 'VENTAS ' + this.rubro2 + ' EN ' + this.unidad_medida2.text
                                if ( this.unidad_medida2.value === 'DL' ) {
                                    this.uniTag2 = '$'
                                } else if ( this.unidad_medida2.value === 'TO' ) {
                                    this.uniTag2 = 'TM'
                                } else {
                                    this.uniTag2 = this.unidad_medida2.value
                                }
                            } else {
                               this.tag2 = 'VENTAS EN DOLARES'
                               this.uniTag2 = '$'
                            }

                            this.data2 = {
                                labels: obj.fechaVentas,
                                datasets: [{
                                    label: this.tag2,
                                    data: obj.ventasAcum,
                                    backgroundColor: obj.color,
                                    borderColor: obj.bordercolor,
                                    borderWidth: 2,
                                }]
                            }
                            
                            if (resp.data.rangetwo.length === 0 && resp.data.rangeone.length !== 0 && this.rubro2 !== 0) {
                                this.erroreLocales.message = 'No hay registros para ' + this.rubro2 + ' en el mes seleccionado'
                                this.erroreLocales.color = false
                                this.showgrafica2 = false
                                this.showgrafica1 = true
                                this.snackbar = true
                            } else if (resp.data.rangeone.length === 0 && resp.data.rangetwo.length !== 0 && this.rubro1 !== 0) {
                                this.erroreLocales.message = 'No hay registros para ' + this.rubro1 + ' en el mes seleccionado' 
                                this.erroreLocales.color = false
                                this.showgrafica1 = false
                                this.showgrafica2 = true
                                this.snackbar = true
                            } else if (resp.data.rangeone.length !== 0 && resp.data.rangetwo.length === 0) {
                                this.erroreLocales.message =  'No hay registros para el mes ' + this.mes2 
                                this.erroreLocales.color = false
                                this.showgrafica1 = true
                                this.showgrafica2 = false
                                this.snackbar = true
                            } else if (resp.data.rangeone.length === 0 && resp.data.rangetwo.length !== 0) {
                                this.erroreLocales.message =  'No hay registros para el mes '  + this.mes1 
                                this.erroreLocales.color = false
                                this.showgrafica1 = false
                                this.showgrafica2 = true
                                this.snackbar = true
                            } else if (resp.data.rangeone.length === 0 && resp.data.rangetwo.length === 0) {
                                this.erroreLocales.message = 'No hay registros para los meses y rubros seleccionados'
                                this.erroreLocales.color = false
                                this.snackbar = true
                            } else {
                                this.showgrafica1 = true
                                this.showgrafica2 = true
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            this.erroreLocales.message = 'Error al consultar, intente nuevamente'
                            this.erroreLocales.color = false
                            this.snackbar = true
                        })
                } catch (error) {
                    console.log(error)
                    this.erroreLocales.message = 'Error en el servidor'
                    this.erroreLocales.color = false
                    this.snackbar = true
                }
            }
        },
        async solicitarunidades (x) {
            try {
                await axios.get(process.env.VUE_APP_BASE_URL + 'unidadesdemedida/' + x)
                    .then(resp => {
                        if (this.rubro1Bol && !this.rubro2Bol) {
                            this.medidas1 = resp.data.map(ele => {
                                return { value: ele.codigo, text: ele.unidad }
                            })
                        }
                        if (!this.rubro1Bol && this.rubro2Bol) {
                            this.medidas2 = resp.data.map(ele => {
                                return { value: ele.codigo, text: ele.unidad }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        this.erroreLocales.message = 'Error al solicitar unidades de medida'
                        this.erroreLocales.color = false
                        this.snackbar = true
                    })
            } catch (error) {
                console.log(error)
                this.erroreLocales.message = 'Error en el servidor'
                this.erroreLocales.color = false
                this.snackbar = true
            }
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

.slide-in-left {
	-webkit-animation: slide-in-left 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-left 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-right {
	-webkit-animation: slide-in-right 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-right 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}


</style>