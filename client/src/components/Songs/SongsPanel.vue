<template>
  <panel title="Songs">
    <v-btn class="accent-2"
      slot="action"
      :to="{name: 'songs-create'}"
      light
      medium
      absolute
      right
      middle
      fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <div v-for="song in songs" :key="song.id" class="song">
      <v-container>
        <v-row>
          <v-col xs6>
            <div class="song-title">
              {{song.title}}
            </div>
            <div class="song-artist">
              {{song.artist}}
            </div>
            <div class="song-genre">
              {{song.genre}}
            </div>
            <v-btn
              :to="{
                name: 'song',
                params: {
                  songId: song._id
                }
              }">
              View
            </v-btn>
          </v-col>
          <v-col xs6>
            <img class="album-image" :src="song.albumImageUrl" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/api/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
