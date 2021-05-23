<template lang="pug">
div
  Header
  .page
    nuxt
</template>

<script>
export default {
  mounted() {
    window.addEventListener('resize', this.resize)

    this.$webgl.start()
    this.resize()
    this.update()
  },
  methods: {
    update() {
      this.$webgl.update()
      requestAnimationFrame(this.update)
    },
    resize() {
      this.$webgl.resize()
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  z-index: z(page);
}
</style>
