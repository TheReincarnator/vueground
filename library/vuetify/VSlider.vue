<template>
  <VSlider v-bind="props" :class="classes(element, selectedId)" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

const impl = defineComponent({
  name: 'VuetifySlider',
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
  id: 'VSlider',
  name: 'Slider',
  icon: 'mdi-minus',
  tags: ['toplevel', 'main'],
  children: [],
  props: addMarginPadding([
    {
      id: 'color',
      name: 'Color',
      type: 'color',
      required: false,
      default: null,
    },
    {
      id: 'label',
      name: 'Label',
      type: 'text',
      required: false,
      default: 'Slider label',
    },
    {
      id: 'min',
      name: 'Minimum',
      type: 'integer',
      required: true,
      default: 0,
    },
    {
      id: 'max',
      name: 'Maximum',
      type: 'integer',
      required: true,
      default: 20,
    },
    {
      id: 'value',
      name: 'Value',
      type: 'integer',
      required: true,
      default: 0,
    },
    {
      id: 'outlined',
      name: 'Outlined',
      type: 'boolean',
      default: false,
    },
    {
      id: 'dense',
      name: 'Dense',
      type: 'boolean',
      default: false,
    },
    {
      id: 'clearable',
      name: 'Clearable',
      type: 'boolean',
      default: false,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      type: 'boolean',
      default: false,
    },
  ]),
  label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,
  impl,

  // TODO: v-bind="props"
  vueCode: (e: CanvasElement) => [`<VSlider${vueCodeClasses(e)}>`, `</VSlider>`],
}
</script>
