import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:[],
    datos:[],
    errores:[],
  },
  getters: { 
  },

  mutations: {
    showLoanding(state, payload){
      state.loading.title = payload.title
      state.loading.title = payload.color
      state.loading.estado = true
    },
    missingLoanding(state){
      state.loading.estado = false
    },
    setUsuario(state, datos){
      state.datos = datos
    },
    cargarErrores(state, errores){
      state.errores = errores
    }
  },
  actions: {
    async getDatos({commit}){
      try {
        await axios.get(process.env.VUE_APP_BASE_URL)
        .then(res => {
          // const respuesta = res.data
          commit('setUsuario', res.data.data)
        })
        .catch(error =>{
          console.log('Error' + error)
        })
      } catch (error) {
        console.log(error)
      }
    },

     async iniciarSesion({commit}, payload){
       try {
        //  yeison.jesus@gmail.com
        // danijosa@gmail.com
          await axios.post(process.env.VUE_APP_BASE_URL+'login', payload)
          .then(res => {
            if(res.status == 200){
              commit('setUsuario', res.data.info)
            }
          })
         .catch(error =>{
            console.log(error)
            commit('cargarErrores', error)
            }
          )
       } catch (error) {
        console.log(error)
      }
     }
  },
  modules: {
  }
})
