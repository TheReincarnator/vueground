<template>
  <VTextField v-bind="props" :class="classes(element, selectedId)" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

const impl = defineComponent({
  name: 'VuetifyTextField',
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
  id: 'VTextField',
  name: 'Text field',
  icon: 'mdi-form-textbox',
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
      default: 'Text field label',
    },
    {
      id: 'value',
      name: 'Value',
      type: 'text',
      required: false,
      default: '',
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
  vueCode: (e: CanvasElement) => [`<VTextField${vueCodeClasses(e)}>`, `</VTextField>`],
}
</script>
