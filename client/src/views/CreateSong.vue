<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert
          type="error"
          dismissible
          v-if="error">
          {{error}}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs4>
        <panel title="Song Metadata">
          <v-text-field
            label="Title"
            v-model="song.title"
            required
            :rules="[required]" />
          <v-text-field
            label="Artist"
            v-model="song.artist"
            required
            :rules="[required]" />
          <v-text-field
            label="Genre"
            v-model="song.genre"
            required
            :rules="[required]" />
          <v-text-field
            label="Album"
            v-model="song.album"
            required
            :rules="[required]" />
        <v-text-field
            label="Album
            Image"
            v-model="song.albumImageUrl"
            required
            :rules="[required]" />
        <v-text-field
            label="YouTube
            ID"
            v-model="song.youtubeId"
            required
            :rules="[required]" />

      </panel>
      </v-col>
      <v-col xs8>
        <panel title="Song Structure" class="ml-2">
          <v-textarea
            label="Lyrics"
            v-model="song.lyrics"
            :rules="[required]" />
          <v-textarea
            label="Tab"
            v-model="song.tab"
            :rules="[required]" />
        </panel>
        <v-btn
            class="mt-4 ml-2"
            @click="create">
            Create Song
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongsService from '@/api/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      required: (value) => !!value || 'Required.',
      error: null
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])

      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
