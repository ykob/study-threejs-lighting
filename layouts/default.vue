<template lang="pug">
div
  Header
  .page
    nuxt
  canvas#canvas-webgl
</template>

<script>
import WebGLContent from '@/webgl'

const webgl = new WebGLContent()

export default {
  mounted() {
    window.addEventListener('resize', this.resize)

    webgl.start()
    this.resize()
    this.update()
  },
  methods: {
    update() {
      webgl.update()
      requestAnimationFrame(this.update)
    },
    resize() {
      webgl.resize()
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  z-index: z(page);
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: z(canvas);
}
</style>
