<template>
  <VIcon
    v-bind="props"
    :x-small="props.size === 'x-small'"
    :small="props.size === 'small'"
    :large="props.size === 'large'"
    :x-large="props.size === 'x-large'"
    :class="classes(element, selectedId)"
  >
    {{ props.icon }}
  </VIcon>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses, prop } from './utils'

const impl = defineComponent({
  name: 'VuetifyIcon',
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
  id: 'VIcon',
  name: 'Icon',
  icon: 'mdi-image-filter-vintage',
  tags: ['toplevel', 'main'],
  children: [],
  props: addMarginPadding([
    {
      id: 'icon',
      name: 'Icon',
      type: 'icon',
      required: true,
      default: null,
    },
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
      default: null,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      type: 'boolean',
      default: false,
    },
  ]),
  label: (e: CanvasElement) => (e.props.icon as string) ?? e.component.name,
  impl,

  // TODO: v-bind="props"
  vueCode: (e: CanvasElement) => [
    '<VIcon' +
      vueCodeClasses(e) +
      prop('x-small', e.props.size === 'x-small') +
      prop('small', e.props.size === 'small') +
      prop('large', e.props.size === 'large') +
      prop('x-large', e.props.size === 'x-large') +
      '>',
    `  ${e.props.icon}`,
    `</VIcon>`,
  ],
}
</script>
