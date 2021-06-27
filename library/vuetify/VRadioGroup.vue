<template>
  <VRadioGroup
    v-bind="props"
    :column="props.direction === 'column'"
    :row="props.direction !== 'column'"
    :class="classes(element, selectedId)"
  >
    <Canvas :elements="element.children" v-bind="$props" @select="$emit('select', $event)" />
  </VRadioGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses, prop } from './utils'

import Canvas from '~/components/Canvas/index.vue'

const impl = defineComponent({
  name: 'VuetifyRadioGroup',
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
  setup(props) {
    return {
      classes,
      props: props.element.props,
    }
  },
})
export default impl

export const component: LibraryComponent = {
  id: 'VRadioGroup',
  name: 'Radio group',
  icon: 'mdi-radiobox-marked',
  tags: ['toplevel', 'main'],
  children: ['VRadio'],
  props: addMarginPadding([
    {
      id: 'direction',
      name: 'Direction',
      type: 'choice',
      options: ['row', 'column'],
      required: true,
      default: 'row',
    },
    {
      id: 'selected',
      name: 'Selected',
      type: 'text',
      required: false,
      default: '',
    },
    {
      id: 'disabled',
      name: 'Disabled',
      type: 'boolean',
      default: false,
    },
  ]),
  label: (e: CanvasElement) => e.component.name,
  impl,

  // TODO: v-bind="props"
  vueCode: (e: CanvasElement) => [
    '<VRadioGroup' +
      vueCodeClasses(e) +
      prop('column', e.props.direction === 'column') +
      prop('row', e.props.direction !== 'column') +
      '>',
    `  {{children}}`,
    `</VRadioGroup>`,
  ],
}
</script>
