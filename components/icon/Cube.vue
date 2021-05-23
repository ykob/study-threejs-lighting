<template lang="pug">
IconBase(
  iconName = 'cube'
  :size = 'size'
  :fill = 'fill'
  )
  path(
    :d = 'd'
    )
</template>

<script>
import { mdiCube } from '@mdi/js'

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
      return mdiCube
    },
  },
}
</script>
