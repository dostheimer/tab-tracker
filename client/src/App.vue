<template>
  <v-app>
    <page-header/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'App',

  components: {
    PageHeader
  },

  data: () => ({
    //
  })
}
</script>

<style>
.danger-alert {
  color: red;
}
</style>
