<template>
    <v-card v-if="autorizado" class="puff-in-center pb-15 pt-10" flat >
        <v-layout :wrap="true" align-center justify-center>
            <v-flex xs12 sm12 md5 lg5 offset-sm="1" class="mb-2">
                <v-card>
                    <v-menu
                        v-model="menu2"
                        close-on-content-click
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        max-width="500"
                        class="pb-0"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="#385F73"
                            v-model="fecha"
                            label="Fecha a consultar"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            clearable
                            ></v-text-field>
                        </template>

                        <v-date-picker
                        v-model="fecha"
                        class="pb-0"
                        header-color="#385F73"
                        full-width
                        locale="es-ve"
                        :min="minimo"
                        :max="maximo"
                        @change="getPrecios"
                        ></v-date-picker>
                    </v-menu>
                </v-card>
            </v-flex>
            <v-divider light :vertical="true" class="mx-12"></v-divider>
            <!-- #################################### VALOR EURO-BSD / USD-BSD ################################# -->
            <v-flex xs12 sm12 md5 lg5 offset-sm="1">
                <!-- <v-card color="#6cc550" dark> -->
                <v-card dark>
                    <v-img
                    max-height="70"
                    src="../assets/6cc550.png"
                    >
                        <v-layout class="mb-2" justify="center" no-gutters>
                            <v-flex md="11" xs="6" lg="6" class="pa-1">
                                <v-card-text class="px-0 py-0">
                                    {{fechaf}}
                                    <v-img
                                    src="../assets/euro.png"
                                    max-height="30"
                                    max-width="20"
                                    ></v-img>
                                    Euro BVC {{euro}}
                                </v-card-text>
                            </v-flex>
                            <v-divider vertical></v-divider>
                            <v-flex md="1" xs="6" class="pa-1">
                                <v-card-text class="px-0 py-0">
                                {{fechaf}}
                                <v-img
                                src="../assets/venezuela.png"
                                max-height="30px"
                                max-width="20px"
                                ></v-img>                                
                                Dolar BVC {{dolar}}
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-img>
                </v-card>
            </v-flex>
            <!-- #################################### VALOR EURO-BSD / USD-BSD #################################-->
        </v-layout>
        <v-layout :wrap="true" align-center justify-center>
            <!-- #################################### GRAFICA DOLARES #################################-->
            <v-flex xs12 sm12 md5 lg5 class="mt-6">
                <v-card light color="rgb(169,217,187)">
                    <!-- <v-img
                    max-height="70"
                    src="../assets/backside8.jpg"
                    > -->
                        <v-card-text class="mb-0 text-center font-weight-bold">
                            <v-icon
                            light
                            class="text-h4 black--text"
                            >mdi-currency-usd</v-icon>
                            USD - VES {{ dolar }}
                        </v-card-text>
                    <!-- </v-img> -->
                </v-card>
                <LineChart
                :chart-data='datacollectionVes'
                >
                </LineChart>
            </v-flex>
            <!-- #################################### GRAFICA DOLARES #################################-->
            <v-divider light :vertical="true" class="mx-12"></v-divider>
            <!-- #################################### GRAFICA BITCOIN #################################-->
            <v-flex xs12 sm12 md5 lg5 class="mt-6">
                <v-card light align="center" color="rgb(169,217,187)">
                <!-- <v-img
                max-height="70"
                src="../assets/backside8.jpg"
                > -->
                    <v-card-text class="font-weight-bold">
                        <v-icon
                        light
                        class="text-h4 black--text font-weight-bold"
                        >mdi-currency-btc</v-icon>
                        Bitcoin - BTC {{btc}}
                    </v-card-text>
                <!-- </v-img> -->
                </v-card>
                <LineChart
                :chart-data='datacollectionBit'
                >
                </LineChart>
            </v-flex>
            <!-- #################################### GRAFICA BITCOIN #################################-->
        </v-layout>
        <v-divider class="mx-0" vertical></v-divider>
        <v-layout :wrap="true" align-center justify-center>
            <!-- #################################### GRAFICA ETHERIUM #################################-->
            <v-flex xs12 sm12 md5 lg5 class="mt-2 mb-4">
                <v-card light align="center" color="rgb(169,217,187)">
                    <!-- <v-img
                    max-height="70"
                    src="../assets/backside8.jpg"
                    > -->
                        <v-card-text class="font-weight-bold">
                            <v-avatar size="35">
                                <img
                                src="../assets/etherum.png"
                                max-height="30"
                                max-width="20"
                                >
                            </v-avatar>
                            Etherium - ETH {{ eth }}
                        </v-card-text>
                    <!-- </v-img> -->
                </v-card>
                <LineChart
                    :chart-data='datacollection'
                >
                </LineChart>
            </v-flex>
            <!-- #################################### GRAFICA ETHERIUM #################################-->
            <v-divider light :vertical="true" class="mx-12"></v-divider>
            <!-- #################################### GRAFICA BINANCE #################################-->
            <v-flex xs12 sm12 md5 lg5 class="mt-2 mb-4">
                <v-card light color="rgb(169,217,187)">
                    <!-- <v-img
                    max-height="70"
                    src="../assets/backside8.jpg"
                    > -->
                        <v-card-text class="text-center font-weight-bold">
                            <v-avatar size="35">
                                <img
                                class="mx-auto"
                                src="../assets/binance.png"
                                max-height="30"
                                max-width="30"
                                >
                            </v-avatar>
                            Binance - BNB {{ bnb }}
                        </v-card-text>
                    <!-- </v-img> -->
                </v-card>
                <LineChart
                    :chart-data='datacollectionBnb'
                >
                </LineChart>
            </v-flex>
            <!-- #################################### GRAFICA BINANCE #################################-->
        </v-layout>
    </v-card>
</template>

<script>

import axios from "axios"
import moment from "moment"
import LineChart from "@/components/LineChart.js"
import { mapState } from 'vuex'

export default {
    components: {
        LineChart
    },
    data () {
        return {
            bitcoin: [],
            etherium: [],
            binance: [],
            menu2: false,
            datacollection: null,
            datacollectionBnb: null,
            datacollectionBit: null,
            datacollectionVes: null,
            fecha: new Date().toISOString().substr(0, 10),
            minimo: "2020",
            maximo: new Date().toISOString().substr(0, 10),
            dolar: null,
            euro: null,
            btc: null,
            eth: null,
            bnb: null,
            fechaf: '',
            formato: null,
            tasas: [],
            tasasBit: [],
            tasasBnb: [],
            sheet: false,
            tasasVes: [],
            scrollInvoked: 0,
        }
    },
    computed: {
        ...mapState(['autorizado'])
    },
    methods: {
        fillDataVes () {
            let fechas = []
            let precios = []
            
            let fec = moment().add(1, 'day').format("DD-MM-YYYY")
            fechas.unshift(fec)
            Object.entries(this.tasasVes).forEach(([key, value]) => {
                if (key == 0 || Number.isInteger(key/2) || key == 32) {
                    fechas.unshift(value.fecha)
                    precios.unshift(value.precio)
                }
            })
            this.datacollectionVes = {
                labels: fechas,
                datasets: [
                    {
                        label: ' Dolar BCV ($)',
                        backgroundColor: 'rgba(181,178,178,0.5)',
                        borderColor: 'ligthblue',
                        pointBackgroundColor : 'grey',
                        borderwith : 1,
                        pointBorderColor: 'black',
                        data: precios
                    }
                ]
            }
        },
        fillData () {
            let fechas = []
            let precios = []
            Object.entries(this.tasas).forEach(([key, value]) => {
                if (key == 0 || Number.isInteger(key/30) || key == 720) {
                    fechas.push(value.fecha)
                    precios.push(value.precio)
                }
            });
            let fec  = moment().add(1, 'day').format("DD-MM-YYYY")
            fechas.push(fec) 
            let fec2  = moment().add(1, 'day').format("DD-MM-YYYY")
            fechas.push(fec2)

            this.datacollection = {
                labels: fechas,
                datasets: [
                    {
                    label: ' Etherium ($)',
                    backgroundColor: 'rgba(181,178,178,0.5)',
                    borderColor: 'ligthblue',
                    pointBackgroundColor : 'grey',
                    borderwith : 1,
                    pointBorderColor: 'black',
                    data: precios
                    }
                ]
            }
        },
        fillDataBit () {
            let fechas = []
            let precios = []
            Object.entries(this.tasasBit).forEach(([key, value]) => {
                if (key == 0 || Number.isInteger(key/30) || key == 720) {
                    fechas.push(value.fecha)
                    precios.push(value.precio)
                }
            })
            let fec = moment().add(1, 'day').format("DD-MM-YYYY")
            fechas.push(fec) 
            let fec2  = moment().add(1, 'day').format("DD-MM-YYYY")
            fechas.push(fec2)

            this.datacollectionBit = {
                labels: fechas,
                datasets: [
                    {
                    label: ' BitCoin ($)',
                    backgroundColor: 'rgba(181,178,178,0.5)',
                    borderColor: 'ligthblue',
                    pointBackgroundColor : 'grey',
                    borderwith : 1,
                    pointBorderColor: 'black',
                    data: precios
                    }
                ]
            }
        },
        fillDataBnb () {
            let fechas = []
            let precios = []
            Object.entries(this.tasasBnb).forEach(([key, value]) => {
                if(key == 0 || Number.isInteger(key/30) || key == 720) {
                    fechas.push(value.fecha)
                    precios.push(value.precio)
                }
            });
            let fec  = moment().add(1, 'day').format("DD-MM-YYYY")
            fechas.push(fec)
            let fec2  = moment().add(1, 'day').format("DD-MM-YYYY")
            fechas.push(fec2)

            this.datacollectionBnb = {
                labels: fechas,
                datasets: [
                    {
                    label: ' Binance Coin ($)',
                    backgroundColor: 'rgba(181,178,178,0.5)',
                    borderColor: 'ligthblue',
                    pointBackgroundColor : 'grey',
                    borderwith : 1,
                    pointBorderColor: 'black',
                    data: precios
                    }
                ]
            }
        },
        async getDolar (fecha) {
            let arrayFecha = fecha.split(['-'])
            let ddmmyy = arrayFecha [2] + '-' + arrayFecha [1] + '-' + arrayFecha [0]
            this.fechaf = ddmmyy

            try {
                let datos = await axios.get('https://s3.amazonaws.com/dolartoday/data.json')
                if (datos.request.status === 200) {
                    this.dolar = await datos.data.USD.promedio_real + " VED"
                    this.euro = await datos.data.EUR.promedio_real + " VED"
                } else {
                    this.dolar = "Sin Resultados"
                    this.euro = "Sin Resultados" 
                }
                
            } catch (error) {
                console.log(error)
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados" 
            }
        },
        async getCriptos () {
            try {
                let datos = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cbinancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false')
                if (datos.data.length > 0) {
                    this.btc = await new Intl.NumberFormat('de-DE').format(datos.data[0].current_price) + " $"
                    this.eth = await new Intl.NumberFormat('de-DE').format(datos.data[1].current_price) + " $"
                    this.bnb = await new Intl.NumberFormat('de-DE').format(datos.data[2].current_price) + " $"
                } else {
                    this.dolar = "Sin Resultados"
                    this.euro = "Sin Resultados" 
                }
                
            } catch (error) {
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados" 
            }
        },
        async getPrecios (fecha) {
            let arrayFecha = fecha.split(['-'])
            let ddmmyy = arrayFecha [2] + '-' + arrayFecha [1] + '-' + arrayFecha [0]
            this.fechaf = ddmmyy

            /* try {
                let test = null
                let datos = await axios.get(process.env.VUE_APP_BASE_URL + 'currentbcv')
                console.log(datos)
                    if (datos.status === 200) {
                        test = await datos.data
                    } else {
                        test = "Sin Resultados" 
                    }
                console.log(test)
            } catch (error) {
                console.log(error)
            } */

            try {
                let datos = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${ddmmyy}&localization=false`)
                    if (datos.status === 200) {
                        console.log(await datos.data.market_data.current_price.usd)
                        this.btc = await datos.data.market_data.current_price.usd.toFixed(2) + " $"
                    } else {
                        this.btc = "Sin Resultados" 
                    }
                
            } catch (error) {
                this.btc = "Sin Resultados" 
            }
            
            try {
                let datos = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/history?date=${ddmmyy}&localization=false`)
                if (datos.status === 200) {
                    this.eth = await datos.data.market_data.current_price.usd.toFixed(2) + " $"
                } else {
                    this.eth = "Sin Resultados" 
                }
            } catch (error) {
                this.eth = "Sin Resultados" 
            }
                
            try {
                let datos = await axios.get(`https://api.coingecko.com/api/v3/coins/binancecoin/history?date=${ddmmyy}&localization=false`)
                if (datos.status === 200) {
                    this.bnb = await datos.data.market_data.current_price.usd.toFixed(2) + " $"
                } else {
                    this.bnb = "Sin Resultados"
                }
            
            } catch (error) {
                this.bnb = "Sin Resultados"
            } 
        },
        getVes () {
            try {
                Object.entries(this.ves).forEach(([key, value]) => {
                    let tasa = {
                        "fecha" : moment.unix(moment(value.date).unix()).format("DD-MM-YYYY"),
                        "precio" : value.open
                    }
                    this.tasasVes.push(tasa)
                });
                this.fillDataVes()
                
            } catch (error) {
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados" 
            }
        },
        async getEth () {
            
            this.formato = moment.unix(1644861600).format("DD-MM-YYYY");

            try {
                const cantidad = Object.keys(this.etherium).length;
                Object.entries(this.etherium).forEach(([key, value]) => {
                    let tasa = {
                        "fecha": moment.unix(key).format("DD-MM-YYYY"),
                        "precio" : value.v[0].toFixed(2)
                    }
                    this.tasas.push(tasa)
                });
                this.fillData()
                
            } catch (error) {
                console.log(error)
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados" 
            }
            finally{

            }   
        },
        async getBit () {
            
            this.formato = moment.unix(1644861600).format("DD-MM-YYYY");

            try {
                const cantidad = Object.keys(this.bitcoin).length;
                    Object.entries(this.bitcoin).forEach(([key, value]) => {
                    let tasa = {
                        "fecha": moment.unix(key).format("DD-MM-YYYY"),
                        "precio": value.v[0].toFixed(2)
                    }
                    this.tasasBit.push(tasa)
                });
                this.fillDataBit() // CARGANDO LA GRAFICA
                
            } catch (error) {
                console.log(error)
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados" 
            }   
        },
        async getBnb () {
            this.formato = moment.unix(1644861600).format("DD-MM-YYYY");

            try {
                const cantidad = Object.keys(this.binance).length;
                    Object.entries(this.binance).forEach(([key, value]) => {
                    let tasa = {
                        "fecha": moment.unix(key).format("DD-MM-YYYY"),
                        "precio" : value.v[0].toFixed(2)
                    }
                    this.tasasBnb.push(tasa)
                });
                this.fillDataBnb() // CARGANDO LA GRAFICA
                                
            } catch (error) {
                console.log(error)
                this.dolar = "Sin Resultados"
                this.euro = "Sin Resultados" 
            }
        },
        async todasmonedas () {
            let datos = await axios.get(process.env.VUE_APP_BASE_URL + 'monedas')
            if (datos.data.message = 'success request') {
                this.bitcoin = datos.data.bitcoin.data.points
                this.etherium = datos.data.binance.data.points
                this.binance = datos.data.etherium.data.points
                this.ves = datos.data.ves.data
            }
            if (this.bitcoin) {
                this.getBit()
            }
            if (this.etherium) {
                this.getEth()
            }
            if (this.binance) {
                this.getBnb()
            }
            if (this.ves) {
                this.getVes()
            }
        }
    },
    mounted () {
        this.getDolar(this.fecha)
        this.getCriptos()
        this.todasmonedas()
    }
}
</script>

<style scoped>
.puff-in-center {
	-webkit-animation: puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
    animation: puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}

@-webkit-keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}


</style>