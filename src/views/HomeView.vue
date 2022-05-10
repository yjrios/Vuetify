<template>
  <v-container fluid class="background">
      <v-layout justify-center align-center>
        <v-flex align-auto cols12>
          <v-spacer></v-spacer>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex align-auto cols6 sm12 md6 lg6 xl6 :wrap="true">
            <login />
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
//import axios from 'axios'
//import { mapMutations } from 'vuex'
import login from './LoginView.vue'

  export default {
    name: 'HomeView',

    components:{
      login
    },
  }
</script>

<style scoped>
.background{
  background: url('../assets/agl-back.png');
  background-size: cover;
  height: 100vh;
}
</style>
