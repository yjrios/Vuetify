<template>
  <v-container fluid id="containerDV" class="px-0 pt-0">
    <NavBar />
    <Drawer />
    <PanelCentral />
    <Footer />
  </v-container>
</template>

<script>
import PanelCentral from '../views/PanelCentral'
import Drawer from '@/components/SiderDrawer'
import NavBar from '@/components/NavBar'
import Footer from '@/components/TestFooter.vue'

export default {
  name: 'DashboardPrincipal',

  components: {
    PanelCentral,
    Drawer,
    NavBar,
    Footer
  },
}
</script>

<style scoped>

#containerDV {
  background-color: white;
}

</style>>
