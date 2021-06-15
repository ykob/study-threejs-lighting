<template lang="pug">
.menu
  .menu__activator
    slot(
      name = 'activator'
      :on = 'toggle'
      )
  transition
    .menu__card(
      v-show = 'isShown'
      )
      slot
</template>

<script>
export default {
  data: () => ({
    isShown: false,
  }),
  methods: {
    toggle() {
      this.isShown = !this.isShown
    },
    close() {
      this.isShown = false
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  position: relative;
  &__card {
    box-sizing: border-box;
    position: absolute;
    color: #fff;
    background-color: #111;
    &.v-enter {
      opacity: 0;
    }
    &.v-enter-to {
      transform: translate3d(0, 0, 0);
    }
    &.v-leave-to {
      opacity: 0;
    }
    &.v-enter-to,
    &.v-leave-to {
      transition-duration: 0.2s;
      transition-property: opacity, transform;
    }
    @include l-pc {
      bottom: 0;
      right: 56px;
      border-radius: 8px;
      &.v-enter,
      &.v-leave-to {
        transform: translate3d(0, 28px, 0);
      }
    }
    @include l-mobile {
      right: 0;
      bottom: 56px;
      border-radius: 4px;
      &.v-enter,
      &.v-leave-to {
        transform: translate3d(28px, 0, 0);
      }
    }
  }
}
</style>
