<template>
  <VBtn
    v-bind="props"
    :x-small="props.size === 'x-small'"
    :small="props.size === 'small'"
    :large="props.size === 'large'"
    :x-large="props.size === 'x-large'"
    :icon="(!!props.iconLeft || !!props.iconRight) && !props.label"
    :class="classes(element, selectedId)"
  >
    <VIcon v-if="props.iconLeft" :left="!!props.label">{{ props.iconLeft }}</VIcon>
    {{ props.label }}
    <VIcon v-if="props.iconRight" :right="!!props.label">{{ props.iconRight }}</VIcon>
  </VBtn>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses, prop } from './utils'

const impl = defineComponent({
  name: 'VuetifyBtn',
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
  id: 'VBtn',
  name: 'Button',
  icon: 'mdi-gesture-tap-button',
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
      default: null,
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
      default: 'Button label',
    },
    {
      id: 'text',
      name: 'Text only',
      type: 'boolean',
      default: false,
    },
    {
      id: 'iconLeft',
      name: 'Icon left',
      type: 'icon',
      default: null,
      required: false,
    },
    {
      id: 'iconRight',
      name: 'Icon right',
      type: 'icon',
      default: null,
      required: false,
    },
    {
      id: 'disabled',
      name: 'Disabled',
      type: 'boolean',
      default: false,
    },
    {
      id: 'elevation',
      name: 'Elevation',
      type: 'slider',
      default: 2,
      min: 0,
      max: 24,
    },
  ]),
  label: (e: CanvasElement) =>
    (e.props.label as string) ?? (e.props.icon as string) ?? e.component.name,
  impl,

  // TODO: v-bind="props"
  vueCode: (e: CanvasElement) => [
    '<VBtn' +
      vueCodeClasses(e) +
      prop('x-small', e.props.size === 'x-small') +
      prop('small', e.props.size === 'small') +
      prop('large', e.props.size === 'large') +
      prop('x-large', e.props.size === 'x-large') +
      prop('icon', (!!e.props.iconLeft || !!e.props.iconRight) && !e.props.label) +
      '>',
    e.props.iconLeft ? `  <VIcon${prop('left', !!e.props.label)}>${e.props.iconLeft}</VIcon>` : '',
    typeof e.props.label === 'string' ? `  ${e.props.label}` : '',
    e.props.iconRight
      ? `  <VIcon${prop('right', !!e.props.label)}>${e.props.iconRight}</VIcon>`
      : '',
    `</VBtn>`,
  ],
}
</script>
