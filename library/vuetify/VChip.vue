<template>
  <VChip
    :x-small="props.size === 'x-small'"
    :small="props.size === 'small'"
    :large="props.size === 'large'"
    :x-large="props.size === 'x-large'"
    :color="props.color"
    :outlined="props.outlined"
    :close="!!props.icon"
    :close-icon="props.icon"
    :class="classes(element, selectedId)"
  >
    {{ props.label }}
  </VChip>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses, prop } from './utils'

const impl = defineComponent({
  name: 'VuetifyChip',
  components: {},
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
  id: 'VChip',
  name: 'Chip',
  icon: 'mdi-label',
  tags: ['toplevel', 'main'],
  children: [],
  props: addMarginPadding([
    {
      id: 'size',
      name: 'Size',
      type: 'choice',
      options: ['x-small', 'small', 'regular', 'large', 'x-large'],
      required: true,
      default: 'regular',
    },
    {
      id: 'color',
      name: 'Color',
      type: 'color',
      required: false,
      default: 'primary',
    },
    {
      id: 'outlined',
      name: 'Outlined',
      type: 'boolean',
      default: false,
    },
    {
      id: 'label',
      name: 'Label',
      type: 'text',
      required: false,
      default: 'Chip label',
    },
    {
      id: 'icon',
      name: 'Icon',
      type: 'icon',
      default: null,
      required: false,
    },
  ]),
  label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,
  impl,

  vueCode: (e: CanvasElement) => [
    '<VChip' +
      vueCodeClasses(e) +
      prop('x-small', e.props.size === 'x-small') +
      prop('small', e.props.size === 'small') +
      prop('large', e.props.size === 'large') +
      prop('x-large', e.props.size === 'x-large') +
      prop('color', e.props.color) +
      prop('outlined', e.props.outlined) +
      prop('close', !!e.props.icon) +
      prop('close-icon', e.props.icon) +
      '>',
    `  ${e.props.label}`,
    `</VChip>`,
  ],
}
</script>
