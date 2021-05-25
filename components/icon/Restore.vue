<template lang="pug">
IconBase(
  iconName = 'restore'
  :size = 'size'
  :fill = 'fill'
  )
  path(
    :d = 'd'
    )
</template>

<script>
import { mdiRestore } from '@mdi/js'

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
      return mdiRestore
    },
  },
}
</script>
