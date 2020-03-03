<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :items="bookmarks">
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
import BookmarkService from '@/api/BookmarkService'

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
      bookmarks: []
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
      this.bookmarks = (await BookmarkService.index()).data
    }
  }
}
</script>

<style>

</style>
