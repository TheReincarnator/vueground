<template>
  <div>
    <h2 class="text-h3 px-4 pt-4 pb-2">Design library</h2>
    <VList dense>
      <VListItemGroup>
        <VListItem v-for="item in permittedComponents" :key="item.id" class="pr-2">
          <VListItemIcon class="mr-4">
            <VIcon v-if="item.icon">{{ item.icon }}</VIcon>
          </VListItemIcon>
          <VListItemContent>
            <VListItemTitle class="text-body-1">{{ item.name }}</VListItemTitle>
          </VListItemContent>
          <VListItemAction class="ma-0">
            <VBtn icon @click="$emit('add', item)"><VIcon>mdi-plus</VIcon></VBtn>
          </VListItemAction>
        </VListItem>
      </VListItemGroup>
    </VList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'

import { getPermittedComponents } from '~/model/library'

export default defineComponent({
  name: 'Library',
  components: {},
  props: {
    selectedElement: {
      type: Object as PropType<CanvasElement>,
      default: null,
    },
  },
  setup(props) {
    const permittedComponents = computed<LibraryComponent[]>(() =>
      getPermittedComponents(props.selectedElement?.component ?? null),
    )

    return {
      permittedComponents,
    }
  },
})
</script>
