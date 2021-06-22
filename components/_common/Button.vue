<template lang="pug">
.button(
  :is = 'tag'
  :to = 'to'
  :style = 'styles'
  :class = 'classnames'
  @click = '$emit("click", $event)'
  )
  slot
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '42px',
    },
    role: {
      type: String,
      default: 'common',
    },
    radius: {
      type: String,
      default: '3px',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius,
      }
    },
    classnames() {
      return [
        `${this.role}`,
        {
          'is-active': this.active,
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  overflow: hidden;
  text-decoration: none;
  transition-duration: 0.4s;
  &:hover {
    transition-duration: 0.2s;
  }
  &:active {
    transition-duration: 0.04s;
  }
  &.common {
    border: 0;
    color: #000;
    background-color: #fff;
    transition-property: color, background-color;
    &:hover {
      color: #fff;
      background-color: #333;
    }
    &:active {
      background-color: #f36;
    }
    &.is-active {
      color: #000;
      background-color: #f36;
    }
  }
  &.transparent {
    border: 0;
    color: #fff;
    background-color: transparent;
    transition-property: color, background-color;
    &:hover {
      color: #000;
      background-color: #fff;
    }
    &:active {
      background-color: #f36;
    }
  }
}
</style>
