import Vue from 'vue'
import App from './App.vue'

import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

import router from './router'
import store from './store'

Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_BASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
}

Firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = Firebase

new Vue({
    router,
    store,
    render: h => h(App),
    async beforeCreate () {
        await Firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                // User is still logged into firebase, so update store
                store.commit('setIsAuthenticated', true)
            } else {
                // User is no longer logged in, so redirect to login
                router.replace({ name: 'Login' })
            }

            router.beforeEach((to, from, next) => {
                if (to.meta.authRequired && !store.getters.isAuthenticated) {
                    // Route is secure and user is not logged in, so redirect to login
                    next({ name: 'Login' })
                    return
                }

                next()
            })
        })
    },
}).$mount('#app')
