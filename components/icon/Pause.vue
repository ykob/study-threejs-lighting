<template lang="pug">
IconBase(
  iconName = 'pause'
  :size = 'size'
  :fill = 'fill'
  )
  path(
    :d = 'd'
    )
</template>

<script>
import { mdiPause } from '@mdi/js'

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
      return mdiPause
    },
  },
}
</script>
