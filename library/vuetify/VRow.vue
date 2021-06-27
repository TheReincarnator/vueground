<template>
  <VRow v-bind="props" :class="classes(element, selectedId)">
    <VCol
      v-for="col in element.children"
      :key="col.id"
      v-bind="col.props"
      :class="classes(col, selectedId)"
      @mousedown.stop="$emit('select', col.id)"
    >
      <Canvas :elements="col.children" v-bind="$props" @select="$emit('select', $event)" />
    </VCol>
  </VRow>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement, getElementById } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

import Canvas from '~/components/Canvas/index.vue'

const impl = defineComponent({
  name: 'VuetifyRow',
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
  id: 'VRow',
  name: 'Row',
  icon: 'mdi-table-row',
  tags: [],
  children: ['VCol'],
  props: addMarginPadding([
    {
      id: 'justify',
      name: 'Justification',
      type: 'choice',
      options: ['start', 'center', 'end', 'space-between', 'space-around'],
      required: false,
      default: null,
    },
    {
      id: 'align',
      name: 'Alignment',
      type: 'choice',
      required: false,
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
      default: null,
    },
    {
      id: 'align-content',
      name: 'Content alignment',
      type: 'choice',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'stretch'],
      required: false,
      default: null,
    },
    {
      id: 'dense',
      name: 'Dense',
      type: 'boolean',
      default: false,
    },
    {
      id: 'no-gutters',
      name: 'No gutters',
      type: 'boolean',
      default: false,
    },
  ]),
  label: (e: CanvasElement) => e.component.name,
  impl,

  // TODO: v-bind="rowProps"
  vueCode: (e: CanvasElement) => [`<VRow${vueCodeClasses(e)}>`, `  {{children}}`, `</VRow>`],
}
</script>
