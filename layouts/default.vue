<template>
  <nuxt></nuxt>
</template>

<script>
import WebGLContent from '@/webgl'

const webgl = new WebGLContent()

export default {
  mouted() {
    webgl.start()
  },
}
</script>

<style></style>
