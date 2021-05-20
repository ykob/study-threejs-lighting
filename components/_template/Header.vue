<template lang="pug">
.header
  h1
    |study-threejs-lighting
  p
    |It's a study record of 3D graphic lighting
    br
    |with the shaders that I created by quoting from three.js.
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  padding-bottom: 0;
  bottom: 0;
  left: 0;
  z-index: z(header);
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
    margin: 0;
    font-size: 11px;
  }
}
</style>
