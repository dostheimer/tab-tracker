<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <form
          name="tab-tracker-form">
          <v-text-field
            label="Email"
            v-model="email" />
          <br/>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            hint="Minimum 8 characters, maximum 32." />
        </form>
        <br/>
        <div class="danger-alert" v-html="error"/>
        <v-btn
          class="cyan"
          @click="login"
          dark>
          Login
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'songs'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
