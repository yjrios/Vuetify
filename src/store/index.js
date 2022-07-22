import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    opcionmenu: '',
    loading:[],
    datos:'',
    errores: '',
    usuarios: [],
    registro: [],
    token: '',
    address: '../photos/',
    autorizado: false
  },

  mutations: {
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
      console.log(state.errores)
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
            console('AUTORIZADO')
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
    },
    setearopcionmenu(state, opcion){
      if (opcion === 'dashboard'){
        state.opcionmenu = 0
      }
      if (opcion === 'graficas'){
        state.opcionmenu = 1
      }
      if (opcion === 'listado'){
        state.opcionmenu = 2
      }
      if (opcion === 'load'){
        state.opcionmenu = 3
      }
      if (opcion === 'users'){
        state.opcionmenu = 4
      }
    },
    obtenerautorizado(state){
      return state.autorizado
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
           if (error.response && error.response.status === 400){
           let obj = {
             message:'¡Contraseña Incorrecta!'
            }
            commit('cargarErrores', obj)
            }
            if (error.response && error.response.status === 404){
              let obj = {
                message:'¡Usuario Incorrecto!'
               }
               commit('cargarErrores', obj)
            }
            if (error.response && error.response.status === 500 || !error.response){
              let obj = {
                message:'ERROR en el servidor'
              }
              commit('cargarErrores', obj)
            }
         })
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
          console.log('STORE')
          if (error.response.status === 401) {
            let obj = {
              message:'¡Usuario Ya Existe!'
             }
             commit('cargarErrores', obj)
          }
          if (error.response.status === 400) {
            let obj = {
              message:'¡ERROR al ingresar los datos!'
             }
             commit('cargarErrores', obj)
          }
          if (error.response.status === 500) {
            let obj = {
              message:'¡ERROR del servidor!'
             }
             commit('cargarErrores', obj)
          }
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
