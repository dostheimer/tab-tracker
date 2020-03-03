<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
      :headers="headers"
      :items="songs">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.song._id">
            <td class="text-xs-right">
              {{item.song.title}}
            </td>
            <td class="text-xs-right">
              {{item.song.artist}}
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import SongHistoryService from '@/api/SongHistoryService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      songs: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.songs = (await SongHistoryService.index()).data
    }
  }
}
</script>

<style>

</style>
