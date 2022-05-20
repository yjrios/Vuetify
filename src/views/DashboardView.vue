<template>
  <v-container>
    <NavBar/>
    <Drawer/>   
    <PanelCentral/>
  </v-container>  
</template>

<script>
// import RegistrarDashboard from './RegistrarView'
import Drawer from '../components/SiderDrawer'
import NavBar from '../components/NavBar'
import PanelCentral from '../views/PanelCentral'

export default{
  name: 'DashboardPrincipal',

  components:{
    // RegistrarDashboard,
    Drawer,
    NavBar,
    PanelCentral
  },

  data(){
    return{
    }
  }
}
</script>

<style scoped>
.tituloDashboard{
  color: #000000;
}

.formato{
  height: 100%;
}
</style>