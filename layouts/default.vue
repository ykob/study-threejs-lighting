<template lang="pug">
.page
  nuxt
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

<style lang="scss" scoped>
.page {
  position: relative;
}
</style>
