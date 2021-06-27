<template>
  <VTable v-bind="props" :class="classes(element, selectedId)">
    <Canvas :elements="element.children" v-bind="$props" @select="$emit('select', $event)" />
  </VTable>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

import Canvas from '~/components/Canvas/index.vue'

const impl = defineComponent({
  name: 'VuetifyTable',
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
  id: 'VTable',
  name: 'Table',
  icon: 'mdi-table',
  tags: ['toplevel', 'main'],
  children: [],
  props: addMarginPadding([
    {
      id: 'caption',
      name: 'Caption',
      type: 'text',
      required: false,
      default: 'Table caoption',
    },
    {
      id: 'dense',
      name: 'Dense',
      type: 'boolean',
      default: false,
    },
    {
      id: 'headers',
      name: 'Headers',
      type: 'json',
      default: [
        { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'name' },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
    },
    {
      id: 'items',
      name: 'Items',
      type: 'json',
      default: [
        { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, iron: '1%' },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, iron: '7%' },
        { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, iron: '8%' },
        { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, iron: '16%' },
        { name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, iron: '0%' },
        { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, iron: '2%' },
        { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, iron: '45%' },
        { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, iron: '22%' },
        { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7, iron: '6%' },
      ],
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

  vueCode: (e: CanvasElement) => [`<VTable${vueCodeClasses(e)}>`, `  {{children}}`, `</VTable>`],
}
</script>
