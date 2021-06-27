<template>
  <div :class="`text-${props.type} ${props.color}--text ${classes(element, selectedId)}`">
    {{ props.text }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses, prefixed, suffixed } from './utils'

const impl = defineComponent({
  name: 'VuetifyText',
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
  id: 'Text',
  name: 'Text',
  icon: 'mdi-text',
  tags: ['toplevel', 'main'],
  children: [],
  props: addMarginPadding([
    {
      id: 'text',
      name: 'Text',
      type: 'text',
      required: false,
      default: 'Lorem Ipsum',
    },
    {
      id: 'type',
      name: 'Type',
      type: 'choice',
      options: [
        'body-1',
        'body-2',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle-1',
        'subtitle-2',
        'button',
        'caption',
        'overline',
      ],
      required: false,
      default: 'body-1',
    },
    {
      id: 'color',
      name: 'Color',
      type: 'color',
      required: false,
      default: null,
    },
  ]),
  label: (e: CanvasElement) => (e.props.text as string) ?? e.component.name,
  impl,
  vueCode: (e: CanvasElement) => [
    `<div${vueCodeClasses(e, prefixed('text-', e.props.type), suffixed(e.props.color, '--text'))}>`,
    `  ${e.props.text}`,
    `</div>`,
  ],
}
</script>
