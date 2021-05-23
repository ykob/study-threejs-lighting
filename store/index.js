export const state = () => ({
  isPlaying: true,
})

export const mutations = {
  playPause(state) {
    state.isPlaying = !state.isPlaying
    this.$webgl.playPause(state.isPlaying)
  },
}
