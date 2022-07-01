<template>
  <v-container fluid class="background">
    <v-expand-x-transition>
      <v-card color="transparent" min-height="15%">
        <v-card-text class="text-right pt-10 pr-10 font-italic text-md-end text-lg-right">
          <span class="text-h3 orange lighten-1--text font-weight-medium">Panel Gerencial</span>
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
.background{
  background: url('../assets/back.jpg');
  background-size: cover;
  height: 100vh;
}
</style>
