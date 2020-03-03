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
        <panel title="Register">
          <form
            name="tab-tracker-form"
            autocomplete="off">
            <v-text-field
              label="Email"
              v-model="email" />
            <br/>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              autocomplete="new-password"
              hint="Minimum 8 characters, maximum 32." />
          </form>
          <br/>
          <v-btn
            class="cyan"
            @click="register"
            dark>
            Register
          </v-btn>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/api/AuthenticationService'

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
    async register () {
      try {
        const response = await AuthenticationService.register({
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
