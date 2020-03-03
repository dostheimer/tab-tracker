<template>
  <panel title="Song Metadata">
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
            dark
            class="cyan"
            :to="{
              name: 'song-edit',
              params () {
                return {
                  songId: song._id
                }
              }
            }">
            Edit
          </v-btn>
          <v-btn
            v-if="isUserLoggedIn && !bookmark"
            dark
            class="cyan ml-2"
            @click="setAsBookmark">
            Bookmark
          </v-btn>
          <v-btn
            v-if="isUserLoggedIn && bookmark"
            dark
            class="cyan ml-2"
            @click="unsetAsBookmark">
            UnBookmark
          </v-btn>
        </v-col>
        <v-col xs6>
          <img class="album-image" :src="song.albumImageUrl" />
          <br />
          {{song.album}}
        </v-col>
      </v-row>
    </v-container>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarkService from '@/api/BookmarkService'

export default {
  data () {
    return {
      bookmark: null
    }
  },
  props: [
    'song'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarkService.post({
          songId: this.song._id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        this.bookmark = (await BookmarkService.delete(this.bookmark._id)).data
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    try {
      const bookmarks = (await BookmarkService.index({
        songId: this.song._id
      })).data
      if (bookmarks.length > 0) {
        this.bookmark = bookmarks[0]
      }
      this.isBookmarked = !!this.bookmark
    } catch (err) {
      console.log(err)
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
