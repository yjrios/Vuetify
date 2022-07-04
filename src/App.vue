<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>


<template>
  <v-app>
    <v-main class="colorfondo">
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['cerrarSesion'])
  }
};
</script>

<style scoped>

.colorfondo{
  background-color: #E0F7FA;
}
</style>