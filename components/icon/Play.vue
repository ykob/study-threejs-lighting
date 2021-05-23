<template lang="pug">
IconBase(
  iconName = 'play'
  :size = 'size'
  :fill = 'fill'
  )
  path(
    :d = 'd'
    )
</template>

<script>
import { mdiPlay } from '@mdi/js'

export default {
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
  computed: {
    d() {
      return mdiPlay
    },
  },
}
</script>
