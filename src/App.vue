<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>

<template>
  <v-app>
    <v-main class="colorfondo" id="menu">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapMutations(['verificar'])
  },
  
  created () {
    this.verificar()
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&display=swap');

.colorfondo {
  background: #FFFFFF;
  /* background: rgba(169,217,187,0.2); */
  /* background: rgb(181,178,178,0.3); */
  /* background: url('./assets/6cc550.png');
  width: 100%;
  height: 100%; */
  /* position: fixed; */
  /* background-size: 100% 100%; */
}
</style>