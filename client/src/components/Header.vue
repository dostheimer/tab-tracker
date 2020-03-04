<template>
  <v-app-bar app dense>
    <v-toolbar-title class="mr-4">
      <router-link
        :to="{name: 'songs'}"
        tag="span"
        class="home">
        TabTracker
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        text
        :to="{name: 'songs'}">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        text
        v-if="!$store.state.isUserLoggedIn"
        :to="{name: 'login'}">
        Login
      </v-btn>
      <v-btn
        text
        v-if="!$store.state.isUserLoggedIn"
        :to="{name: 'register'}">
        Sign Up
      </v-btn>
      <v-btn
        text
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'songs' })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
