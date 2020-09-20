<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1>Welcome to Your Vue.js App</h1>
        <p>
            <strong>Status: </strong>
            <template v-if="$store.getters.isAuthenticated">You're logged in!</template>
            <template v-else>You're not logged in!</template>
        </p>

        <div>
            <button v-if="$store.getters.isAuthenticated" type="button" @click="logout()">Logout</button>
            <template v-else>
                <router-link tag="button" :to="{ name: 'Login' }" style="margin-right: 12px;">Sign in</router-link>
                <router-link tag="button" :to="{ name: 'Register' }">Sign up</router-link>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',

    methods: {
        async logout () {
            await this.$firebase.auth().signOut()
            this.$store.commit('setIsAuthenticated', false)
            this.$router.replace({ name: 'Login' })
        },
    },
}
</script>
