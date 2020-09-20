<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="onSignUp">
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
            <p>Already have an account? <router-link :to="{ name: 'Login' }">Sign in</router-link></p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',

    data () {
        return {
            email: null,
            password: null,
        }
    },

    methods: {
        async onSignUp () {
            try {
                await this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

                this.$store.commit('setIsAuthenticated', true)
                this.$router.push({ name: 'Home' })
            } catch (e) {
                console.log(e.message)
            }
        },
    },
}
</script>
