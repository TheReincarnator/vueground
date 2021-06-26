<template>
  <div class="vg-vuecode">
    <VBtn class="vg-vuecode-copy my-1 mx-8" @click="onCopy">
      <VIcon left>mdi-content-copy</VIcon>
      Copy
    </VBtn>
    <pre class="vg-vuecode-code white--text ma-2">{{ code }}</pre>
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

    const onCopy = async () => {
      await navigator.clipboard.writeText(code.value)
    }

    return {
      code,
      onCopy,
    }
  },
})
</script>

<style scoped>
.vg-vuecode {
  position: relative;
}

.vg-vuecode-copy {
  position: absolute;
  top: 0;
  right: 0;
}

.vg-vuecode-code {
  font-size: 12px;
  line-height: 1.2;
  min-height: 50px;
  max-height: 250px;
  overflow-y: auto;
}
</style>
