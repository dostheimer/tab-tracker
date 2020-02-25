<template>
  <v-layout>
    <v-flex
      v-if="isUserLoggedIn"
      xs6>
      <songs-bookmarks />
      <recently-viewed-songs class="mt-2" />
    </v-flex>
    <v-flex :class="{
        xs6: isUserLoggedIn,
        xs12: !isUserLoggedIn
      }"
      class="ml-2">
      <songs-search-panel />
      <songs-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import {mapState} from 'vuex'

export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  }
}
</script>

<style scoped>
</style>
