<template>
    <v-container class="pb-15" id="scroll-target">
        <v-layout :wrap="true" class="slide-in-left px-10">
            <v-flex
            cols12
            lg3
            md3
            sm12
            xs12
            >
                <v-card class="pt-2" flat>
                    <v-card-title class="py-0 px-0">
                        Hoy:
                        <v-badge
                            color="warning"
                            icon="mdi-exclamation-thick"
                            class="colortext"
                        >
                            {{ today[2] }}/{{ today[1] }}/{{ today[0] }}
                        </v-badge>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>

        <v-divider dark class="my-2 d-none d-lg-flex d-md-flex"></v-divider>

        <v-layout :wrap="true" class="slide-in-left px-10">
            <v-spacer class="d-none d-sm-flex"></v-spacer>
            <v-flex
            cols12
            lg3
            md3
            sm12
            xs12
            class="mt-2"
            >
                <v-card rounded="xl" class="pl-3">
                    <v-card-title class="py-0 px-0">
                        {{ dolar }}
                        <v-spacer></v-spacer>
                        <v-badge
                        overlap
                        :value="hoverdolar"
                        color="rgba(181,178,178)"
                        content="Dolar"
                        :text-color="colorbadge"
                        transition="slide-x-transition"
                        >
                            <v-chip
                            color="rgb(169,217,187,0.4)"
                            >
                                <v-hover v-model="hoverdolar">
                                    <v-icon color="rgb(108,197,80)">mdi-currency-usd</v-icon>
                                </v-hover>
                            </v-chip>
                        </v-badge>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-spacer class="d-none d-sm-flex"></v-spacer>

            <v-flex
            cols12
            lg3
            md3
            sm12
            xs12
            class="mt-2"
            >
                <v-card rounded="xl" class="pl-3">
                    <v-card-title class="py-0 px-0">
                        {{ euro }}
                        <v-spacer></v-spacer>
                        <v-badge
                        overlap
                        :value="hovereuro"
                        color="rgba(181,178,178)"
                        content="Euro"
                        transition="slide-x-transition"
                        >
                            <v-chip
                            color="rgb(169,217,187,0.4)"
                            >
                                <v-hover v-model="hovereuro">
                                    <v-icon color="rgb(108,197,80)">mdi-currency-eur</v-icon>
                                </v-hover>
                            </v-chip>
                        </v-badge>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-spacer class="d-none d-sm-flex"></v-spacer>

        </v-layout>

        <v-divider dark class="my-5 d-none d-lg-flex d-md-flex"></v-divider>

        <v-layout :wrap="true" class="slide-in-left px-10">
            <v-flex
            cols12
            lg3
            md3
            sm12
            xs12
            class="mt-2"
            >
                <v-card rounded="xl" class="pl-3">
                    <v-card-title class="py-0 px-0">
                        {{ bnb }}
                        <v-spacer></v-spacer>
                        <v-badge
                        overlap
                        :value="hoverbinance"
                        color="rgba(181,178,178)"
                        content="Binance"
                        transition="slide-x-transition"
                        >
                            <v-chip
                            color="rgb(169,217,187,0.4)"
                            >
                                <v-hover v-model="hoverbinance">
                                    <v-avatar size="35">
                                        <img src="../assets/binance.png"
                                        max-height="30"
                                        max-width="20">
                                    </v-avatar>
                                </v-hover>
                            </v-chip>
                        </v-badge>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-spacer class="d-none d-sm-flex"></v-spacer>

            <v-flex
            cols12
            lg3
            md3
            sm12
            xs12
            class="mt-2"
            >
                <v-card rounded="xl" class="pl-3">
                    <v-card-title class="py-0 px-0">
                        {{ eth }}
                        <v-spacer></v-spacer>
                        <v-badge
                        overlap
                        :value="hoverethereum"
                        color="rgba(181,178,178)"
                        content="Ethereum"
                        transition="slide-x-transition"
                        >
                            <v-chip
                            color="rgb(169,217,187,0.4)"
                            >
                                <v-hover v-model="hoverethereum">
                                    <v-avatar size="35">
                                        <img src="../assets/etherum.png"
                                        max-height="30"
                                        max-width="20">
                                    </v-avatar>
                                </v-hover>
                            </v-chip>
                        </v-badge>
                    </v-card-title>
                </v-card>
            </v-flex>

            <v-spacer class="d-none d-sm-flex"></v-spacer>

            <v-flex
            cols12
            lg3
            md3
            sm12
            xs12
            class="mt-2"
            >
                <v-card rounded="xl" class="pl-3">
                    <v-card-title class="py-0 px-0">
                        {{ btc }}
                        <v-spacer></v-spacer>
                        <v-badge
                        overlap
                        :value="hoverbitcoin"
                        color="rgba(181,178,178)"
                        content="Bitcoin"
                        transition="slide-x-transition"
                        >
                            <v-chip
                            color="rgb(169,217,187,0.4)"
                            >
                                <v-hover v-model="hoverbitcoin">
                                    <v-icon color="rgb(108,197,80)">mdi-currency-btc</v-icon>
                                </v-hover>
                            </v-chip>
                        </v-badge>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>         

<!-- <v-divider dark class="my-15 d-none d-lg-flex d-md-flex"></v-divider> -->

        <v-card class="mx-0" flat>
            <v-layout justify-space-around class="mt-10 px-0" :wrap="true">
                <v-flex
                cols12
                lg4
                md8
                sm10
                xs12
                class="slide-in-right"
                v-show="noShowTable.abas"
                >
                    <v-card-title>ABAS</v-card-title>
                    <v-data-table
                        mobile-breakpoint="md"
                        :headers="headers"
                        :items="dessertsA"
                        :items-per-page="7"
                        hide-default-footer
                        :page.sync="pageA"
                        @page-count="pageCountA = $event"
                        loading-text="Cargando ventas..."
                        :loading="dessertsA.length > 0 ? false : true"
                    >
                        <template v-slot:[`item.venta`]="{ item }">
                            <v-chip
                                :color="getColor(item.venta)"
                                light
                            >
                                {{ new Intl.NumberFormat('de-DE').format(item.venta) }}
                            </v-chip>
                        </template>
                    </v-data-table>
                    <div class="text-center">
                        <v-pagination
                            color="rgb(169,217,187)"
                            v-model="pageA"
                            :length="pageCountA"
                        ></v-pagination>
                    </div>
                </v-flex>
                <!-- <v-divider light :vertical="true" class="mx-1"></v-divider> -->
                <!-- <v-flex
                cols12
                xl5
                lg3
                md8
                sm10
                xs12
                class=" pb-10"
                >
                    <v-card class="pl-3" flat>
                        <v-card-text>
                            <LineChart
                            :chart-data='datacollectionBit'
                            >
                            </LineChart>
                        </v-card-text>
                    </v-card>
                </v-flex> -->
            <!-- </v-layout> -->
<!-- <v-divider light :vertical="true" class="mx-1"></v-divider> -->
            <!-- <v-layout justify-center class="mt-10 slide-in-right" :wrap="true"> -->
                <v-flex
                cols12
                lg4
                md8
                sm10
                xs12
                class="slide-in-right1"
                v-show="noShowTable.huevos"
                >
                    <v-card-title>HUEVOS</v-card-title>
                    <v-data-table
                        mobile-breakpoint="md"
                        :headers="headers"
                        :items="dessertsH"
                        :items-per-page="7"
                        hide-default-footer
                        :page.sync="pageH"
                        @page-count="pageCountH = $event"
                        loading-text="Cargando ventas..."
                        :loading="dessertsH.length > 0 ? false : true"
                    >
                        <template v-slot:[`item.venta`]="{ item }">
                            <v-chip
                                :color="getColor(item.venta)"
                                light
                            >
                                {{ new Intl.NumberFormat('de-DE').format(item.venta) }}
                            </v-chip>
                        </template>
                    </v-data-table>
                    <div class="text-center">
                        <v-pagination
                            color="rgb(169,217,187)"
                            v-model="pageH"
                            :length="pageCountH"
                        ></v-pagination>
                    </div>
                </v-flex>
            <!-- </v-layout> -->
<!-- <v-divider light :vertical="true" class="mx-1"></v-divider> -->
            <!-- <v-layout justify-center class="mt-10 slide-in-right" :wrap="true"> -->
                <v-flex
                cols12
                lg4
                md8
                sm10
                xs12
                class="slide-in-right2"
                v-show="noShowTable.cerdo"
                >
                    <v-card-title>CERDO</v-card-title>
                    <v-data-table
                        mobile-breakpoint="md"
                        :headers="headers"
                        :items="dessertsC"
                        :items-per-page="7"
                        hide-default-footer
                        :page.sync="pageC"
                        @page-count="pageCountC = $event"
                        loading-text="Cargando ventas..."
                        :loading="dessertsC.length > 0 ? false : true"
                    >
                        <template v-slot:[`item.venta`]="{ item }">
                            <v-chip
                                :color="getColor(item.venta)"
                                light
                            >
                                {{ new Intl.NumberFormat('de-DE').format(item.venta) }}
                            </v-chip>
                        </template>
                    </v-data-table>
                    <div class="text-center">
                        <v-pagination
                            color="rgb(169,217,187)"
                            v-model="pageC"
                            :length="pageCountC"
                        ></v-pagination>
                    </div>
                </v-flex>
            </v-layout>
        </v-card>
        <v-snackbar
        v-model="snackbar"
        :color="erroreLocales.mensaje === '' ? '#4CAF50' : '#DE5350'"
        bottom
        dark
        transition="scale-transition"
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
    </v-container>
</template>
    
<script>

import axios from "axios";
import LineChart from '@/components/LineChart';

export default {
    name: 'InicioModal',

    components: {
        LineChart
    },

    data: () => ({
        pageA: 1,
        pageH: 1,
        pageC: 1,
        pageCountA: 0,
        pageCountC: 0,
        pageCountH: 0,
        mostrargrafica: true,
        hovereuro: false,
        hoverdolar: false,
        hoverbitcoin: false,
        hoverbinance: false,
        hoverethereum: false,
        btc: '',
        eth: '',
        bnb: '',
        dolar: '',
        dolar2: 0,
        euro: '',
        datacollectionBit: null,
        fecha: new Date().toISOString().substr(0, 10),
        dessertsA: [],
        dessertsC: [],
        dessertsH: [],
        headers: [
          {text: 'Fecha', align: 'start', sortable: false, value: 'fecha', class: ["subtitle-1","font-weight-bold"] },
          {text: 'VED', value: 'ves', align: 'center', sortable: false, class: ["subtitle-1","font-weight-bold"] },
          {text: 'Ventas $', value: 'venta', divider:true, align: 'end', sortable: false, class: ["subtitle-1","font-weight-bold"] }
          
        ],
        colorbadge: '#6CC550',
        offsetTop: 0,
        today: new Date().toISOString().substr(0, 10).split('-'),
        noShowTable: {abas: true, huevos: true, cerdo: true},
        snackbar: false,
        erroreLocales: { message: '', color: true }
    }),

    async mounted () {
        await this.getCriptos()
        await this.getDolar(this.fecha)
        this.fillChart()
    },

    methods: {
        iniciar () {
            this.$store.commit('setearopcionmenu', 0)
            this.$router.push('/dash/mostrarbalance')
        },
        async getCriptos () {
            try {
                let datos = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cbinancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false')
                if (datos.data.length > 0) {

                    this.btc = await datos.data[0].current_price
                    this.btc = new Intl.NumberFormat('de-DE').format(this.btc)
                    this.btc = this.btc + " $"
                    
                    this.eth = await datos.data[1].current_price
                    this.eth = new Intl.NumberFormat('de-DE').format(this.eth)
                    this.eth = this.eth + " $"

                    this.bnb = await datos.data[2].current_price
                    this.bnb = new Intl.NumberFormat('de-DE').format(this.bnb)
                    this.bnb = this.bnb + " $"
                } else {
                    this.dolar = "Sin Resultados"
                    this.euro = "Sin Resultados" 
                }
                
            } catch (error) {
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados" 
            }
        },
        async getDolar (fecha) {
            let arrayFecha = fecha.split(['-'])
            let ddmmyy = arrayFecha [2] + '-' + arrayFecha [1] + '-' + arrayFecha [0]
            this.fechaf = ddmmyy

            try {
                let datos = await axios.get('https://s3.amazonaws.com/dolartoday/data.json')
                if (datos.request.status === 200) {

                    this.dolar = await datos.data.USD.promedio_real
                    this.dolar2 = this.dolar
                    this.dolar = new Intl.NumberFormat('de-DE').format(this.dolar)
                    this.dolar = this.dolar + " VED"

                    this.euro = await datos.data.EUR.promedio_real
                    this.euro = new Intl.NumberFormat('de-DE').format(this.euro)

                    this.euro = this.euro + " VED"
                } else {
                    this.dolar = "Sin Resultados"
                    this.euro = "Sin Resultados" 
                }
                
            } catch (error) {
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados"
            }
        },
        fillChart () {
            try {
                axios.get(process.env.VUE_APP_BASE_URL + 'inicial')
                    .then(resp => {                        
                        if (Object.keys(resp.data).length !== 0) {
                            Object.entries(resp.data).forEach( ([key,item]) => {
                                let obj = {
                                    ventasAcum: [],
                                    fechaVentas: [],
                                    color: [],
                                    bordercolor: []
                                }
                                if (item.length !== 0) {
                                    item.sort((a,b) => new Date(a.fecha_Factura).getTime() - new Date(b.fecha_Factura).getTime())
                                    let acum = 0
                                    let fchInial = item[0].fecha_Factura
                                    let fechas = []
                                    let index = 0
                                    item.forEach(record => {
                                        if (index === 0) {
                                            fechas[index] = fchInial.substr(0, 10)
                                            index++
                                        }
                                        if (record.fecha_Factura !== fchInial) {
                                            fechas[index] = record.fecha_Factura.substr(0, 10)
                                            fchInial = record.fecha_Factura
                                            index++
                                        }
                                    })
                                    
                                    fchInial = item[0].fecha_Factura
                                    item.forEach((dato,index) => {
                                        /* if (dato.unMed_Vta !== 'UN') { */
                                        if (fchInial === dato.fecha_Factura) {
                                            acum += Number(dato.precioNeto_Pos)
                                            if ((index + 1) === item.length) {
                                                obj.ventasAcum.push(acum.toFixed(2))
                                            }
                                        } else {
                                            obj.ventasAcum.push(acum.toFixed(2))
                                            index++
                                            acum = Number(dato.precioNeto_Pos)
                                            fchInial = dato.fecha_Factura
                                        }
                                        /* } */
                                    })
                                    obj.fechaVentas = fechas
                                    obj.color.push('rgba(181,178,178,0.5)')
                                    obj.bordercolor.push('ligthblue')
                                    this.datacollectionBit = {
                                        labels: obj.fechaVentas,
                                        datasets: [{
                                            label: 'VENTAS ÚLTIMO MES CARGADO',
                                            /* backgroundColor: obj.color,  */
                                            backgroundColor: 'transparent',
                                            borderColor: obj.bordercolor,
                                            pointBackgroundColor: 'grey',
                                            borderwith: 1,
                                            pointBorderColor: 'black',
                                            data: obj.ventasAcum
                                        }]
                                    }
                                    /* }) */
                                
                                    for (let i = 0; i < obj.fechaVentas.length; i++) {
                                        if ( key === "abas" ) {
                                            if (obj.ventasAcum[i] < 1 || obj.ventasAcum[i] === undefined || obj.ventasAcum[i] === null) {
                                                this.dessertsA.push( { fecha: obj.fechaVentas[i], venta: 0, ves: 0 } )
                                            } else {
                                                this.dessertsA.push( { fecha: obj.fechaVentas[i], venta: obj.ventasAcum[i], ves: new Intl.NumberFormat('de-DE').format((obj.ventasAcum[i] * this.dolar2).toFixed(2)) } )
                                            }
                                        }
                                        if ( key === "huevos" ) {
                                            if (obj.ventasAcum[i] < 1 || obj.ventasAcum[i] === undefined || obj.ventasAcum[i] === null) {
                                                this.dessertsH.push( { fecha: obj.fechaVentas[i], venta: 0, ves: 0 } )
                                            } else {
                                                this.dessertsH.push( { fecha: obj.fechaVentas[i], venta: obj.ventasAcum[i], ves: new Intl.NumberFormat('de-DE').format((obj.ventasAcum[i] * this.dolar2).toFixed(2)) } )
                                            }
                                        }
                                        if ( key === "cerdo" ) {
                                            if (obj.ventasAcum[i] < 1 || obj.ventasAcum[i] === undefined || obj.ventasAcum[i] === null) {
                                                this.dessertsC.push( { fecha: obj.fechaVentas[i], venta: 0, ves: 0 } )
                                            } else {
                                                this.dessertsC.push( { fecha: obj.fechaVentas[i], venta: obj.ventasAcum[i], ves: new Intl.NumberFormat('de-DE').format((obj.ventasAcum[i] * this.dolar2).toFixed(2)) } )
                                            }
                                        }
                                    }
                                } else {
                                    if (key === "abas") {
                                        this.noShowTable.abas = false
                                        this.erroreLocales.color = false
                                        this.erroreLocales.message = '¡Sin ventas ABAS para el último mes registrado!'
                                        this.snackbar = true
                                    }
                                    if (key === "huevos") {
                                        this.noShowTable.huevos = false
                                        this.erroreLocales.color = false
                                        this.erroreLocales.message = '¡Sin ventas de HUEVOS para el último mes registrado!'
                                        this.snackbar = true
                                    }
                                    if (key === "cerdo") {
                                        this.noShowTable.cerdo = false
                                        this.erroreLocales.color = false
                                        this.erroreLocales.message = '¡Sin ventas de CERDO para el último mes registrado!'
                                        this.snackbar = true
                                    }
                                }
                            })
                        }
                        this.pageCountA = this.dessertsA.length
                        this.pageCountC = this.dessertsC.length
                        this.pageCountH = this.dessertsH.length
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 404) {
                            this.erroreLocales.color = false
                            this.erroreLocales.message = '¡Error en el servidor!'
                            this.snackbar = true
                        }
                        if (err.response && err.response.status === 400) {
                            this.erroreLocales.color = false
                            this.erroreLocales.message = 'No se han encontrado datos para mostrar'
                            this.snackbar = true
                        }
                    })
            } catch (error) {
                console.log(error)
            }    
        },
        getColor (cantidad) {
            if (cantidad > 1000) return 'rgb(169,217,187)'
            else if (cantidad > 500) return 'orange'
            else return 'rgba(239, 83, 80, .6)'
        }
    },
}
</script>

<style scoped>

/* De Izquiera a Derecha */

.slide-in-left {
	-webkit-animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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

/* De Derecha a Izquierda */

.slide-in-right {
	-webkit-animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-right1 {
	-webkit-animation: slide-in-right 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-right 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-right2 {
	-webkit-animation: slide-in-right 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-right 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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

.colorfondoerror {
    background-image: radial-gradient(circle at 50% -20.71%, #f19583 0, #e68379 25%, #d86c6c 50%, #c95561 75%, #bd425b 100%);
}

.colorfondosuccess {
    background-image: linear-gradient(90deg, #e3ff57 0, #c7f95c 12.5%, #aaf162 25%, #8ce668 37.5%, #6cd86c 50%, #4bca70 62.5%, #1fbe74 75%, #00b378 87.5%, #00aa7d 100%);
}

.colortext {
    color: #6cc550
}

</style>