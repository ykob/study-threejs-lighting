<template lang="pug">
.menu-help
  .menu-help__heading
    |Assets
  ul
    li
      a(
        href = 'https://www.cgtrader.com/3d-model-collections/ocean-8k'
        target = '_blank'
        )
        |Water Surface Normal Map
        IconOpenInNew(
          :size = '16'
          )
    li
      a(
        href = 'https://www.cgtrader.com/3d-models/textures/natural/s-ea3e180f-bfed-4c62-aaa1-4045e48d8d59'
        target = '_blank'
        )
        |Object Normal Maps
        IconOpenInNew(
          :size = '16'
          )
    li
      a(
        href = 'https://www.cgtrader.com/3d-models/textures/miscellaneous/nebula-spherical-maps-and-skyboxes-8192x4096-px'
        target = '_blank'
        )
        |Nebula Spherical Map
        IconOpenInNew(
          :size = '16'
          )
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.menu-help {
  box-sizing: border-box;
  line-height: 1.5;
  font-size: 11px;
  @include l-pc {
    width: 360px;
    padding: 24px 32px;
  }
  @include l-mobile {
    width: calc(100vw - 48px);
    padding: 16px 24px;
  }
  &__heading {
    margin-bottom: 4px;
    font-size: 15px;
  }
  a {
    color: #fff;
    &:hover {
      text-decoration: none;
    }
  }
  ul {
    margin: 0;
    padding-left: 20px;
  }
  li {
    margin-top: 4px;
  }
  svg {
    vertical-align: middle;
    margin-left: 4px;
  }
}
</style>
