import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios';

export default new Vuex.Store({
  state: {
    pokemones: [],
    Name: "",
  },
  getters:{
     getPokemones: state => state.pokemones
  },
  mutations: {
    setPokemones: function(state, payload){
      state.pokemones = payload;
    },
  },
  actions: {
    getPokemones: function({commit}){
      axios.get('Pokemon').then(response => {
        commit('setPokemones', response.data.results);
      });
    },
  },
  modules: {
  }
})
