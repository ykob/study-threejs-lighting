<template lang="pug">
.controls
  Button(
    width = '44px'
    height = '44px'
    radius = '50%'
    @click = '$store.commit("playPause")'
    )
    IconPause(
      v-if = 'isPlaying'
      )
    IconPlay(
      v-else
      )
</template>

<script>
export default {
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying
    },
  },
}
</script>

<style lang="scss" scoped>
.controls {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: z(controls);
  letter-spacing: 0.1em;
  @include l-pc {
    padding: 40px;
  }
  @include l-mobile {
    padding: 20px;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 18px;
  }
  p {
    line-height: 1.5;
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 11px;
  }
  .buttons {
    display: flex;
  }
  .button {
    margin-right: 4px;
  }
}
</style>
