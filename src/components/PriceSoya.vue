<template>
    <v-container fill-height class="pb-10">
        <!-- <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            top
            color="success"
        ></v-progress-linear> -->

        <v-row wrap justify-center align-center class="primerrow" v-if="loading">
                
            <v-sheet
                elevation="12"
                max-width="600"
                rounded="lg"
                width="100%"
                class='pa-4 text-center mx-auto'
            >
                <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                    <v-divider class="mb-4"></v-divider>

                        <h2 class="text-h5 mb-6">Consultando la información...</h2>
                        <p>
                        Espera un momento, por favor
                        </p>
                        <v-divider class="mb-2"></v-divider>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                    <v-progress-linear
                        color="success"
                        :active="loading"
                        :indeterminate="loading"
                        rounded
                        height="6"
                    ></v-progress-linear>
                </v-col>
            </v-sheet>
        </v-row>

        <v-row wrap justify="center" class="slide-in-bottom" v-if="showtitle">
            <v-col cols="12" lg="10" md="12" sm="12" xs="12">
                <v-row wrap>
                    <v-col cols="12" lg="6" md="6" sm="12" xs="12" v-if="showtitle">
                        <v-toolbar flat>
                            <v-toolbar-title class='font-italic'>Precio actual $/TM: <span class="font-italic"><strong>{{ title }}$</strong></span></v-toolbar-title>
                        </v-toolbar>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12" xs="12" v-if="showtitle" align="end">
                        <span class="font-italic">Fuente: </span>
                        <v-btn
                        text
                        class="font-italic font-weight-light blue--text pb-1"
                        link
                        href="https://es.tradingview.com/symbols/CBOT-ZS1!/"
                        target="_blank"
                        >
                        TradingView.com
                        </v-btn>
                    </v-col>
                    <v-col cols="12" lg="12" md="12" sm="12" xs="12" class="mb-5">
                        <v-toolbar flat v-if="showtitle">
                            <v-toolbar-title class='font-italic'>Futuros:</v-toolbar-title>
                        </v-toolbar>
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :items-per-page="10"
                            item-key="mesano"
                            class="elevation-1"
                            :footer-props="{
                            showFirstLastPage: true,
                            firstIcon: 'mdi-arrow-collapse-left',
                            lastIcon: 'mdi-arrow-collapse-right',
                            prevIcon: 'mdi-minus',
                            nextIcon: 'mdi-plus'
                            }"
                        >
                            <template v-slot:[`item.valor`]="{ item }">
                                {{ item.valor }} $
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider dark :vertical="true"></v-divider>
            <v-col cols="12" lg="8" md="8" sm="12" xs="12">
                <LineChart :chartData='data1'/>
            </v-col>
        </v-row>

        <v-snackbar
        v-model="snackbar"
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
import LineChart from "@/components/LineChart.js"
  export default {
    components: {
        LineChart
    },
    data () {
      return {
        title: '',
        headers: [
            {
                text: '',
                align: 'start',
                value: 'mesano',
                class: ["subtitle-1","font-weight-bold"]
            },
            {
                text: '$/TM',
                value: 'valor',
                class: ["subtitle-1","font-weight-bold"]
            },
        ],
        desserts: [],
        loading: true,
        data1: '',
        showtitle: false,
        erroreslocales: { message: '', color: true },
        snackbar: false
      }
    },
    created () {

        try {
            axios.get(process.env.VUE_APP_BASE_URL + 'infofuturosoya')
                .then(resp => {
                    let objeto = {
                        tags: [],
                        valores: [],
                        backgroundColor: 'rgb(181,178,178,0.4)',
                        borderColor: 'rgb(50,205,50,0.8)',
                        borderWidth: 2
                    }
                    resp.data.forEach(ele => {
                        if (ele.mesano === 'ACTUAL') {
                            this.title = `${ele.valor.toFixed(2)}`
                        } else if (ele.mesano.substring(0,3) === 'ZSF') {
                            this.desserts.push({mesano: 'Enero-' + ele.mesano.substring(3,ele.mesano.length), valor: ele.valor.toFixed(2)})
                            objeto.tags.push('Enero-' + ele.mesano.substring(3,ele.mesano.length))
                            objeto.valores.push(ele.valor.toFixed(2))
                        } else if (ele.mesano.substring(0,3) === 'ZSH') {
                            this.desserts.push({mesano: 'Marzo-' + ele.mesano.substring(3,ele.mesano.length), valor: ele.valor.toFixed(2)})
                            objeto.tags.push('Marzo-' + ele.mesano.substring(3,ele.mesano.length))
                            objeto.valores.push(ele.valor.toFixed(2))
                        } else if (ele.mesano.substring(0,3) === 'ZSK') {
                            this.desserts.push({mesano: 'Mayo-' + ele.mesano.substring(3,ele.mesano.length), valor: ele.valor.toFixed(2)})
                            objeto.tags.push('Mayo-' + ele.mesano.substring(3,ele.mesano.length))
                            objeto.valores.push(ele.valor.toFixed(2))
                        } else if (ele.mesano.substring(0,3) === 'ZSN') {
                            this.desserts.push({mesano: 'Julio-' + ele.mesano.substring(3,ele.mesano.length), valor: ele.valor.toFixed(2)})
                            objeto.tags.push('Julio-' + ele.mesano.substring(3,ele.mesano.length))
                            objeto.valores.push(ele.valor.toFixed(2))
                        } else if (ele.mesano.substring(0,3) === 'ZSQ') {
                            this.desserts.push({mesano: 'Agosto-' + ele.mesano.substring(3,ele.mesano.length), valor: ele.valor.toFixed(2)})
                            objeto.tags.push('Agosto-' + ele.mesano.substring(3,ele.mesano.length))
                            objeto.valores.push(ele.valor.toFixed(2))
                        } else if (ele.mesano.substring(0,3) === 'ZSX') {
                            this.desserts.push({mesano: 'Noviembre-' + ele.mesano.substring(3,ele.mesano.length), valor: ele.valor.toFixed(2)})
                            objeto.tags.push('Noviembre-' + ele.mesano.substring(3,ele.mesano.length))
                            objeto.valores.push(ele.valor.toFixed(2))
                        } else {
                            this.desserts.push({mesano: 'Septiembre-' + ele.mesano.substring(3,ele.mesano.length), valor: ele.valor.toFixed(2)})
                            objeto.tags.push('Septiembre-' + ele.mesano.substring(3,ele.mesano.length))
                            objeto.valores.push(ele.valor.toFixed(2))
                        }
                    })
                    this.data1 = {
                        labels: objeto.tags,
                        datasets: [{
                            label: 'SOYA $/T',
                            data: objeto.valores,
                            backgroundColor: objeto.backgroundColor,
                            borderColor: objeto.borderColor,
                            borderWidth: objeto.borderWidth,
                            pointBorderColor: 'orange',
                        }]
                    }
                    this.showtitle = true
                    this.loading = false
                    this.erroreslocales.message = 'Solicitud procesada exitosamente'
                    this.erroreslocales.color = true
                    this.snackbar = true
                })
                .catch(error => {
                    console.log('error desde back end ' + error)
                    this.erroreslocales.message = 'Existe un error de petición'
                    this.erroreslocales.color = false
                    this.snackbar = true
                })
        } catch (error) {
            console.log('error desde back end ' + error)
            this.erroreslocales.message = 'Error en el servidor'
            this.erroreslocales.color = false
            this.snackbar = true
        }
    }
  }
</script>

<style scoped>

.primerrow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.slide-in-bottom {
	-webkit-animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
