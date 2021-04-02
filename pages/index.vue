<template>
  <div class="d-flex flex-row" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0">
    <div class="d-flex flex-column" style="flex: 1 0 250px">
      <VSheet elevation="8" style="flex: 1 0 0; overflow: auto">
        <Tree
          :elements="elements.value"
          :open-element-ids="openElementIds"
          :selected-element="selectedElement"
          @select="onSelectElement"
          @remove="onRemoveElement"
        />
      </VSheet>
      <VSheet elevation="8" style="flex: 1 0 0; overflow: auto">
        <Library :selected-element="selectedElement" @add="onAddElement" />
      </VSheet>
    </div>
    <div class="pa-4" style="flex: 10 1 100px">
      <Canvas :elements="elements.value" :selected-element="selectedElement" />
    </div>
    <div class="d-flex flex-column" style="flex: 1 0 250px">
      <VSheet elevation="8" style="flex: 1 0 0; overflow: auto">
        <Properties :selected-element="selectedElement" />
      </VSheet>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

import {
  CanvasElement,
  getElementIds,
  resetSequence,
  createElement,
  removeElementById,
  resetToDefaults,
} from '~/model/element'
import { LibraryComponent } from '~/model/component'
import { exampleModel } from '~/model/example'

import Tree from '~/components/Tree/index.vue'
import Library from '~/components/Library/index.vue'
import Canvas from '~/components/Canvas/index.vue'
import Properties from '~/components/Properties/index.vue'

interface CanvasElements {
  value: CanvasElement[]
}

export default defineComponent({
  name: 'VueGround',
  components: {
    Tree,
    Library,
    Canvas,
    Properties,
  },
  setup() {
    const elements = reactive<CanvasElements>({ value: exampleModel })
    resetSequence(elements.value)

    // TODO: Remove
    resetToDefaults(elements.value)

    const openElementIds = ref<number[]>(getElementIds(elements.value))
    const selectedElement = ref<CanvasElement | null>(null)

    const onSelectElement = (element: CanvasElement | null) => {
      selectedElement.value = element
    }

    const onAddElement = (component: LibraryComponent) => {
      const newElement = createElement(component)

      if (selectedElement.value) {
        openElementIds.value.push(selectedElement.value.id)
        selectedElement.value.children.push(newElement)
      } else {
        elements.value.push(newElement)
      }

      selectedElement.value = newElement
    }

    const onRemoveElement = (element: CanvasElement) => {
      removeElementById(elements.value, element.id)
      if (selectedElement.value?.id === element.id) {
        selectedElement.value = null
      }
    }

    return {
      elements,
      openElementIds,
      selectedElement,
      onSelectElement,
      onAddElement,
      onRemoveElement,
    }
  },
})
</script>
