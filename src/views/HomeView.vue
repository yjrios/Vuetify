<template>
  <v-container fluid class="background">
    <v-expand-x-transition>
      <v-card color="transparent" min-height="15%">
        <v-card-text class="text-right pt-10 pr-10 text-lg-right">
            <span class="tipofuente black--text">Panel Gerencial</span>
            <v-avatar
            class="ma-3 mb-10"
            size="50"
            tile
            >
              <v-img src="../assets/balanza.png"></v-img>
            </v-avatar>
        </v-card-text>
      </v-card>
      </v-expand-x-transition>
      <v-layout justify-center>
        <v-flex align-auto cols6 sm12 md6 lg6 xl6 :wrap="true">
            <login />
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import login from './LoginView.vue'

  export default {
    name: 'HomeView',

    components:{
      login
    },
    data (){
      return {
        show: true
      }
    }
  }
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap');

html, body {
  font-family: 'Libre Baskerville', sans-serif;
}

.tipofuente {
  font-family: 'Libre Baskerville', serif;
  font-size: 40px;
}

.background{
  background: url('../assets/back2.jpeg');
  background-size: cover;
  height: 100vh;
}
</style>
