import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:[],
    datos:[],
    errores:[],
    token: '',
    usuarios: [],
    registro: [],
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
    loginUsuario(state, payload){
      if(payload != ''){
        localStorage.setItem('token', payload)
        state.datos = decode(payload)
      }
    },
    altaExitosa(state, payload){
      if(payload != ''){
        state.registro = payload
      }
    },
    getUsuarios(state, payload){
      state.usuarios = payload
    },
    cargarErrores(state, error){
      state.errores = error
    },
    vaciarErrores(state){
      state.errores = []
    },
    editarUsuario(state, usuario){
      state.registro = []
      state.registro = usuario
    },
  },
 
  actions: {

    async getDatos({commit}){
      try {
        await axios.get(process.env.VUE_APP_BASE_URL)
        .then(res => {
          commit('getUsuarios', res.data.data)
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
              console.log(res)
              commit('loginUsuario', res.data.token)
            }
          })
         .catch(error =>{
            commit('cargarErrores', error)
            }
          )
       } catch (error) {
        commit('cargarErrores', error)
      }
    },

   async clearErrores({commit}){
     await commit('vaciarErrores')
    },

    async registrar({commit}, payload){
      try {
        await axios.post(process.env.VUE_APP_BASE_URL+'usernuevo', payload)
        .then(res =>{
          commit('altaExitosa', res.data.info)
        })
        .catch(error => {
          commit('cargarErrores', error)
        })
      } catch (error) {
        console.log(error)
        commit('cargarErrores', error)
      }
    }
  },

  modules: {
  }
})
