<template lang="pug">
.modal-help
  .modal-help__heading
    |About This Page
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.modal-help {
  width: 100%;
  max-width: 720px;
  height: 100%;
  max-height: 480px;
  box-sizing: border-box;
  pointer-events: auto;
  border-radius: 8px;
  background-color: #111;
  @include l-pc {
    padding: 64px 48px;
  }
  @include l-mobile {
    padding: 32px 24px;
  }
  &__heading {
    text-align: center;
    letter-spacing: 0.1em;
  }
}
</style>
