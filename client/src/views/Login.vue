<template>
  <v-container>
    <v-row>
      <v-col xs6 offset-xs3>
        <v-alert
          type="error"
          dismissible
          v-if="error">
          {{error}}
        </v-alert>
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
          <v-btn
            class="cyan"
            @click="login"
            dark>
            Login
          </v-btn>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/api/AuthenticationService'

export default {
  name: 'Login',
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
        this.$router.push({ name: 'songs' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
