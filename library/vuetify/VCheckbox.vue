<template>
  <VCheckbox v-bind="props" :input-value="props.selected" :class="classes(element, selectedId)" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses, prop } from './utils'

const impl = defineComponent({
  name: 'VuetifyCheckbox',
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
  id: 'VCheckbox',
  name: 'Checkbox',
  icon: 'mdi-checkbox-marked-outline',
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
      default: 'Checkbox label',
    },
    {
      id: 'value',
      name: 'Selected',
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
      id: 'indeterminate',
      name: 'Three states',
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

  vueCode: (e: CanvasElement) => [
    `<VCheckbox${vueCodeClasses(e)}${prop('input-value', e.props.selected)}>`,
    `</VCheckbox>`,
  ],
}
</script>
