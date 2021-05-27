<template lang="pug">
.header
  h1
    |study-threejs-lighting
  p
    |It's a study record of 3D graphic lighting
    br
    |with the shaders that I created by quoting from three.js.
  .buttons
    Button(
      role = 'transparent'
      tag = 'a'
      href = 'https://github.com/ykob/study-threejs-lighting'
      width = '32px'
      height = '32px'
      radius = '50%'
      target = '_blank'
      )
      IconGithub
    Button(
      role = 'transparent'
      tag = 'a'
      href = 'https://twitter.com/ykob0123'
      width = '32px'
      height = '32px'
      radius = '50%'
      target = '_blank'
      )
      IconTwitter
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  padding-bottom: 0;
  left: 0;
  z-index: z(header);
  letter-spacing: 0.1em;
  @include l-pc {
    bottom: 0;
    padding: 40px;
  }
  @include l-mobile {
    top: 0;
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
