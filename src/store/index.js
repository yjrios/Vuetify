import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      title: '',
      estado: false,
      color: 'primary'
    }
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
  },
  actions: {
  },
  modules: {
  }
})
