<template>
  <VRadio v-bind="props" :class="classes(element, selectedId)" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

const impl = defineComponent({
  name: 'VuetifyRadio',
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
  id: 'VRadio',
  name: 'Radio',
  icon: 'mdi-radiobox-marked',
  tags: [],
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
      default: 'Radio label',
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
  vueCode: (e: CanvasElement) => [`<VRadio${vueCodeClasses(e)}>`, `</VRadio>`],
}
</script>
