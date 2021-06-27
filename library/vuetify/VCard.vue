<template>
  <VCard v-bind="props" :class="classes(element, selectedId)">
    <VCardTitle v-if="props.title">
      <h2 class="text-h2">{{ props.title }}</h2>
    </VCardTitle>
    <VCardText>
      <Canvas :elements="element.children" v-bind="$props" @select="$emit('select', $event)" />
    </VCardText>
  </VCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

import Canvas from '~/components/Canvas/index.vue'

const impl = defineComponent({
  name: 'VuetifyCard',
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
  id: 'VCard',
  name: 'Card',
  icon: 'mdi-card-account-details',
  tags: ['toplevel', 'main'],
  children: ['VContainer', 'main'],
  props: addMarginPadding([
    {
      id: 'color',
      name: 'Color',
      type: 'color',
      required: false,
      default: null,
    },
    {
      id: 'title',
      name: 'Title',
      type: 'text',
      required: false,
      default: 'Card title',
    },
    {
      id: 'outlined',
      name: 'Outlined',
      type: 'boolean',
      default: false,
    },
    {
      id: 'elevation',
      name: 'Elevation',
      type: 'slider',
      default: 4,
      min: 0,
      max: 24,
    },
  ]),
  label: (e: CanvasElement) => (e.props.title as string) ?? e.component.name,
  impl,

  // TODO: v-bind="props"
  vueCode: (e: CanvasElement) => [
    `<VCard${vueCodeClasses(e)}>`,
    `  <VCardTitle>`,
    `    <h2 class="text-h2">${e.props.title}</h2>`,
    `  </VCardTitle>`,
    `  <VCardText>`,
    `    {{children}}`,
    `  </VCardText>`,
    `</VCard>`,
  ],
}
</script>
