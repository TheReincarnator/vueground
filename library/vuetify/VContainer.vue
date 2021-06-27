<template>
  <VContainer v-bind="props" :class="classes(element, selectedId)">
    <VRow
      v-for="row in element.children"
      :key="row.id"
      v-bind="row.props"
      :class="classes(row, selectedId)"
      @mousedown.stop="$emit('select', row.id)"
    >
      <VCol
        v-for="col in row.children"
        :key="col.id"
        v-bind="col.props"
        :class="classes(col, selectedId)"
        @mousedown.stop="$emit('select', col.id)"
      >
        <Canvas :elements="col.children" v-bind="$props" @select="$emit('select', $event)" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { classes, vueCodeClasses } from './utils'

import Canvas from '~/components/Canvas/index.vue'

const impl = defineComponent({
  name: 'VuetifyContainer',
  components: { Canvas },
  props: {
    element: {
      type: Object as PropType<CanvasElement>,
      default: null,
    },
    selectedId: {
      type: Number,
      default: null,
    },
  },
  setup(props, { emit }) {
    return {
      classes,
      props: props.element.props,
    }
  },
})
export default impl

export const component: LibraryComponent = {
  id: 'VContainer',
  name: 'Container',
  icon: 'mdi-page-layout-body',
  tags: ['toplevel'],
  children: ['VRow'],
  props: [
    {
      id: 'fluid',
      name: 'Fluid (full width)',
      type: 'boolean',
      default: false,
    },
    { id: 'mt', section: 'Margins', name: 'top', type: 'margin-y', default: null },
    { id: 'mb', name: 'bottom', type: 'margin-y', default: null },
    { id: 'ml', name: 'left', type: 'margin-x', default: null },
    { id: 'mr', name: 'right', type: 'margin-x', default: null },
    { id: 'pt', section: 'Paddings', name: 'top', type: 'padding', default: null },
    { id: 'pb', name: 'bottom', type: 'padding', default: null },
    { id: 'pl', name: 'left', type: 'padding', default: 0 },
    { id: 'pr', name: 'right', type: 'padding', default: 0 },
  ],
  label: (e: CanvasElement) => e.component.name,
  impl,

  // TODO: v-bind="props"
  vueCode: (e: CanvasElement) => [
    `<VContainer${vueCodeClasses(e)}>`,
    `  {{children}}`,
    `</VContainer>`,
  ],
}
</script>
