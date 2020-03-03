<template>
  <v-container>
    <v-row>
      <v-col
        v-if="isUserLoggedIn"
        xs6>
        <songs-bookmarks />
        <recently-viewed-songs class="mt-2" />
      </v-col>
      <v-col :class="{
          xs6: isUserLoggedIn,
          xs12: !isUserLoggedIn
        }"
        class="ml-2">
        <songs-search-panel />
        <songs-panel class="mt-2" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongsPanel from '@/components/songs/SongsPanel'
import SongsSearchPanel from '@/components/songs/SongsSearchPanel'
import SongsBookmarks from '@/components/songs/SongsBookmarks'
import RecentlyViewedSongs from '@/components/songs/RecentlyViewedSongs'
import { mapState } from 'vuex'

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
