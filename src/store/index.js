import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    opcionmenu: 0,
    loading: [],
    datos: '',
    errores: '',
    usuarios: [],
    registro: [],
    token: '',
    address: '../photos/',
    /* address: '../img/', */
    autorizado: false,
    showsidebar: true,
    hayerror: false
  },
 
  mutations: {
    loginUsuario (state, payload) {
      if (payload !== '') {
        localStorage.setItem('token', payload)
        state.datos = decode(payload)
        state.autorizado = true
      } else {
        state.datos = []
        state.autorizado = false
      }
    },
    set_showsidebar (state, booleano) {
      state.showsidebar = booleano
    },
    getUsuarios(state, payload) {
      state.usuarios = payload
    },
    cargarErrores(state, error) {
      state.errores = error
      state.hayerror = true
    },
    vaciarErrores(state) {
      state.errores = []
      state.hayerror = false
    },
    usuarioaModificar(state, usuario) {
      state.registro = usuario
    },
    limpiarRegistro(state) {
      state.registro = []
    },
    async verificar(state) {
      try {
        if (localStorage.getItem('token')) {
          const config = { headers: { token: localStorage.getItem('token') } }
          await axios.get(process.env.VUE_APP_BASE_URL + 'verify', config)
            .then(resp => {
              if (resp.status === 200) {
                state.autorizado = true
                router.push('/dash').catch({})
              }
            })
            .catch(err => {
              if (err.response && err.response.status === 401) {
                state.autorizado = false
                router.push('/').catch({})
              }
            })
        } else {
          router.push( { name: 'homeview' } ).catch({})
        }
      } catch (error) {
        console.log(error)
      }
    },
    setearopcionmenu(state, opcion) {
      if ( opcion !== 2 && opcion !== 6 && opcion !== undefined ) {
        state.opcionmenu = opcion
      }
    },
    obtenerautorizado(state) {
      return state.autorizado
    },
    obtenererrores(state) {
      return state.errores
    },
    obteneropcionmenu(state) {
      return state.opcionmenu
    }
  },
 
  actions: {
    async getDatos( {commit}, config ) {
      try {
        await axios.get(process.env.VUE_APP_BASE_URL, config)
        .then(res => {
          commit('getUsuarios', res.data.data)
        })
        .catch(error => {
          commit('cargarErrores', error)
        })
      } catch (error) {
        console.log(error)
      }
    },
 
    async iniciarSesion( {commit}, payload ) {
      try {
        await axios.post(process.env.VUE_APP_BASE_URL + 'login', payload)
          .then(res => {
            if (res.status === 200) {
              commit('loginUsuario', res.data.token)
              /* router.push('/dash').catch({}) */
            }
          })
          .catch(error => {
            let obj = {
              message: ''
            }
            if (error.response && error.response.status === 400) {
              obj.message = '¡Contraseña Incorrecta!'
            } else if (error.response && error.response.status === 404) {
              obj.message = '¡Usuario Incorrecto!'
            } else {
              obj.message = 'Error en el servidor'
            }
            commit('cargarErrores', obj)
          })
      } catch (error) {
        commit('cargarErrores', error)
      }
    },

    cerrarSesion( {commit} ) {
      commit('loginUsuario', '')
      localStorage.removeItem('token')
      localStorage.removeItem('opcion')
      router.push({name: 'homeview'})
    },

    async clearErrores( {commit} ) {
      await commit('vaciarErrores')
    },

    async registrar( {commit}, formData ) {
      try {
        await axios.post(process.env.VUE_APP_BASE_URL+'usernuevo', formData)
          .then(res => {
            console.log(res)
          })
          .catch(error => {
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

    editarUsuario( {commit} , usuario ) {
      if (usuario) {
        commit('usuarioaModificar', usuario)
      }
    }
  },
})
