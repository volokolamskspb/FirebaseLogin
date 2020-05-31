import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    loading: true
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoading(state, loader) {
      state.loading = loader;
    }
  },
})

export default store;