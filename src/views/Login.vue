<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="onSignIn">
            <div class="form-group">
                <label for="email">E-Mail</label>
                <input id="email" type="email" v-model="email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password">
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            <p>No account yet? <router-link :to="{ name: 'Register' }">Sign up</router-link></p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data () {
        return {
            email: null,
            password: null,
        }
    },

    methods: {
        async onSignIn () {
            try {
                await this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)

                this.$store.commit('setIsAuthenticated', true)
                this.$router.push({ name: 'Home' })
            } catch (e) {
                console.log(e.message)
            }
        },
    },
}
</script>
