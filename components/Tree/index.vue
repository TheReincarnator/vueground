<template>
  <div @mousedown.stop="onSelectElements([])">
    <h2 class="text-h3 px-4 pt-4 pb-2">Elements</h2>
    <VTreeview
      v-if="elements.length"
      hoverable
      activatable
      :active="selectedElementIds"
      :items="elements"
      :open="openElementIds"
      class="vg-treeview ml-1"
      @update:active="onSelectElements"
      @mousedown.stop
    >
      <template v-slot:prepend="{ item }">
        <VIcon>{{ item.component.icon }}</VIcon>
      </template>
      <template v-slot:label="{ item }">
        <span class="vg-treeview-item-label text-body-1">
          {{ item.component.label(item) }}
        </span>
      </template>
      <template v-slot:append="{ item }">
        <VBtn icon @click="$emit('remove', item)"><VIcon>mdi-delete</VIcon></VBtn>
      </template>
    </VTreeview>
    <p v-else class="px-4">
      Click the plus icon in the Design Library to add your first element.
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

import { CanvasElement } from '~/model/element'

function findElement(items: CanvasElement[], id: number): CanvasElement | null {
  let match: CanvasElement | null = null

  items.forEach(item => {
    if (item.id === id) {
      match = item
    }

    const childMatch = findElement(item.children, id)
    if (childMatch) {
      match = childMatch
    }
  })

  return match
}

export default defineComponent({
  name: 'Tree',
  components: {},
  props: {
    elements: {
      type: Array as PropType<CanvasElement[]>,
      required: true,
    },
    openElementIds: {
      type: Array as PropType<number[]>,
      required: true,
    },
    selectedElement: {
      type: Object as PropType<CanvasElement>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const onSelectElements = (selected: number[]) => {
      emit('select', selected.length === 1 ? findElement(props.elements, selected[0]) : null)
    }

    const selectedElementIds = computed<number[]>(() =>
      props.selectedElement ? [props.selectedElement.id] : [],
    )

    return {
      selectedElementIds,
      onSelectElements,
    }
  },
})
</script>

<style scoped>
.vg-treeview {
  cursor: pointer;
}

.vg-treeview-item-label {
  text-overflow: ellipsis;
}
</style>
