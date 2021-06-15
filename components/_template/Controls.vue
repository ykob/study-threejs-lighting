<template lang="pug">
.controls
  .buttons
    Button(
      width = '36px'
      height = '36px'
      radius = '50%'
      @click = '$store.commit("playPause")'
      )
      IconPause(
        v-if = 'isPlaying'
        )
      IconPlay(
        v-else
        )
    Button(
      width = '36px'
      height = '36px'
      radius = '50%'
      @click = 'resetControls'
      )
      IconRestore
    Button(
      width = '36px'
      height = '36px'
      radius = '50%'
      @click = 'toggleHelper'
      )
      IconHelpRhombusOutline 
  .buttons
    Menu
      template(
        v-slot:activator = '{ on }'
        )
        Button(
          width = '36px'
          height = '36px'
          radius = '50%'
          @click = 'on'
          )
          IconHelp
      div
        div
          |Assets
        ul
          li
            a(
              href = 'https://www.cgtrader.com/3d-model-collections/ocean-8k'
              target = '_blank'
              )
              |Water Surface Normal Map
          li
            a(
              href = 'https://www.cgtrader.com/3d-models/textures/natural/s-ea3e180f-bfed-4c62-aaa1-4045e48d8d59'
              target = '_blank'
              )
              |Object Normal Maps
          li
            a(
              href = 'https://www.cgtrader.com/3d-models/textures/miscellaneous/nebula-spherical-maps-and-skyboxes-8192x4096-px'
              target = '_blank'
              )
              |Nebula Spherical Map
</template>

<script>
export default {
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying
    },
  },
  methods: {
    resetControls() {
      this.$webgl.resetControls()
    },
    toggleHelper() {
      this.$webgl.toggleHelper()
    },
  },
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: z(controls);
  letter-spacing: 0.1em;
  background-color: #111;
  @include l-pc {
    flex-direction: column;
    top: 0;
    padding: 20px 12px;
  }
  @include l-mobile {
    left: 0;
    padding: 12px;
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
}
.buttons {
  @include l-mobile {
    display: flex;
  }
}
.button {
  @include l-pc {
    margin-top: 12px;
    &:first-child {
      margin-top: 0;
    }
  }
  @include l-mobile {
    margin-left: 8px;
  }
}
</style>
