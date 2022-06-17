<template>
  <v-container>
    <NavBar/>
    <Drawer/>
    <PanelCentral/>
  </v-container>
</template>

<script>
import Drawer from '../components/SiderDrawer'
import NavBar from '../components/NavBar'
import PanelCentral from '../views/PanelCentral'

export default {
  name: 'DashboardPrincipal',

  components:{
    Drawer,
    NavBar,
    PanelCentral
  },
}
</script>
