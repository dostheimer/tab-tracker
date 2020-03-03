<template>
  <div v-if="song">
    <v-container>
      <v-row>
        <v-col xs6>
          <song-metadata :song="song" />
        </v-col>
        <v-col xs6 class="ml-2">
          <youtube :video-id="song.youtubeId" width=560 height=260 />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-2">
      <v-row>
        <v-col xs6>
          <tab :song="song" />
        </v-col>
        <v-col xs6>
          <lyrics :song="song" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SongsService from '@/api/SongsService'
import SongHistoryService from '@/api/SongHistoryService'
import SongMetadata from '@/components/ViewSong/SongMetadata'
// import YouTube from './YouTube'
import Lyrics from '@/components/ViewSong/Lyrics'
import Tab from '@/components/ViewSong/Tab'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      song: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async created () {
    const songId = this.$route.params.songId
    this.song = (await SongsService.show(songId)).data

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId
      })
    }
  },
  components: {
    SongMetadata,
    // YouTube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>

</style>
