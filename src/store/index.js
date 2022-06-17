import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:[],
    datos:'',
    errores:[],
    usuarios: [],
    registro: [],
    token: '',
    address: 'img/',
    autorizado: false
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
      }else{
        state.datos = []
        state.autorizado = false
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
    usuarioaModificar(state, usuario){
      state.registro = usuario
    },
    limpiarRegistro(state){
      state.registro = []
    },
    async verificar(state) {
      try {
        const config = { headers: { token: localStorage.getItem('token') } }
        await axios.get(process.env.VUE_APP_BASE_URL+'verify', config)
        .then(resp => {
          if (resp.status == 200){
            state.autorizado = true
          }
        })
        .catch(err => {
          if (err.status == 401){
            console.log('NO ESÁ AUTORIZADO')
            state.autorizado = false
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
 
  actions: {

    async getDatos({commit}, config){
      try {
        await axios.get(process.env.VUE_APP_BASE_URL, config)
        .then(res => {
          commit('getUsuarios', res.data.data)
        })
        .catch(error =>{
          commit('cargarErrores', error)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async iniciarSesion({commit}, payload){
       try {
          await axios.post(process.env.VUE_APP_BASE_URL+'login', payload)
          .then(res => {
            if(res.status == 200){
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

    cerrarSesion({commit}){
      commit('loginUsuario', '')
      localStorage.removeItem('token')
      router.push({name: 'homeview'})
    },

   async clearErrores({commit}){
     await commit('vaciarErrores')
    },

    async registrar({commit}, formData){
      try {
        await axios.post(process.env.VUE_APP_BASE_URL+'usernuevo', formData)
        .then(res =>{
          console.log(res)
        })
        .catch(error => {
          commit('cargarErrores', error)
        })
      } catch (error) {
        console.log(error)
        commit('cargarErrores', error)
      }
    },

    editarUsuario( {commit} , usuario){
      if(usuario) {
        commit('usuarioaModificar', usuario)
      }
    },

    async enviarPutUsuario( {commit}, formData){
      try {
        await axios.put(process.env.VUE_APP_BASE_URL+'user/'+formData.append.username, formData)
        .then(resp => {

            if(resp.data.mensaje){
              console.lod(Object(resp.data))
              let error = {message:resp.data.mensaje, statuscode: resp.data.status}
              commit('cargarErrores', error)
            }
        })
      } catch (error) {
        console.log('ERROR '+error)        
      }
    }
  },
})
