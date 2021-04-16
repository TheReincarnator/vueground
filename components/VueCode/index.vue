<template>
  <div style="position: relative">
    <VBtn class="my-1 mx-3" style="position: absolute; top: 0; right: 0">
      <VIcon left>mdi-content-copy</VIcon>
      Copy
    </VBtn>
    <pre class="white--text ma-2" style="font-size: 12px; line-height: 1.2">{{ code }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'

import { CanvasElement } from '~/model/element'

function getVueCode(elements: CanvasElement[]): string[] {
  return elements
    .flatMap(element =>
      element.component.vueCode(element).flatMap(line => {
        if (line.indexOf('{{children}}') >= 0) {
          const indentation = line.match(/^ */)![0].length
          return getVueCode(element.children).map(childLine => ' '.repeat(indentation) + childLine)
        }

        return line
      }),
    )
    .filter(line => line && line.trim() !== '')
}

export default defineComponent({
  name: 'VueCode',
  components: {},
  props: {
    elements: {
      type: Array as PropType<CanvasElement[]>,
      required: true,
    },
  },
  setup(props) {
    const code = computed<string>(() => getVueCode(props.elements).join('\n'))

    return {
      code,
    }
  },
})
</script>
