<template>
  <div>
    <div
      v-for="element in elements"
      :key="element.id"
      @mousedown.stop="$emit('select', element.id)"
    >
      <Component
        :is="element.component.impl"
        :element="element"
        :selected-id="selectedId"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Fragment } from 'vue-fragment'

import { CanvasElement } from '~/model/element'

export default defineComponent({
  name: 'Canvas',
  components: {
    Fragment,
  },
  props: {
    elements: {
      type: Array as PropType<CanvasElement[]>,
      required: true,
    },
    selectedId: {
      type: Number,
      default: null,
    },
    hoverElement: {
      type: Object as PropType<CanvasElement>,
      default: null,
    },
  },
})
</script>

<style scoped>
* >>> .vueground-selected {
  outline: 3px solid #e91e63;
}
</style>
