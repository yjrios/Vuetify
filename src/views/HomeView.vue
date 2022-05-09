<template>
  <div>
    <v-layout>
      <v-flex xs12 :wrap="true">
        <v-card>
          <v-date-picker 
          v-model="date"
          full-width
          locale="es-cl"
          :min="minimo"
          :max="maximo"
          @change="getDolar(date)">
          </v-date-picker>
        </v-card>
        <v-card color="error" dark>
          <v-card-text class="display-1 text-xs-center">
            {{valor}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

  export default {
    name: 'HomeView',

    data(){
      return{
        date: new Date().toISOString().substr(0,10),
        minimo: '1984',
        maximo: new Date().toISOString().substr(0,10),
        valor: null
      }
    },
    methods:{
      ...mapMutations(['showLoanding', 'missingLoanding']),
        async getDolar(dia){
          let arrayDate = dia.split(['-'])
          let ddmmyy = arrayDate[2]+'-'+arrayDate[1]+'-'+arrayDate[0]
          try {
            this.showLoanding({title: 'Accediendo A la info', color: 'secondary'})
            let datos = await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`)
            if(datos.data.serie.length > 0){
            this.valor = await datos.data.serie[0].valor  
            }else{
              this.valor = 'Sin Resultados'
            }
          } catch (error) {
            console.log(error)
          }
          finally{
            this.missingLoanding()
          }
        }
    },
    created(){
      this.getDolar(this.date)
    }
  }
</script>
