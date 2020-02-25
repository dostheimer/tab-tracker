<template>
  <panel title="YouTube Video">
    <youtube :video-id="youtubeId"
      :player-width="500"
      :player-height="290" />
  </panel>
</template>

<script>
export default {
  mounted () {

  },
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>

</style>
