import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
    },

    mutations: {
        setIsAuthenticated (state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },
    },

    getters: {
        isAuthenticated: state => state.isAuthenticated,
    },
})
