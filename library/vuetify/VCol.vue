<template>
  <div :class="`${classes}`">
    TODO
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

const impl = defineComponent({
  name: 'VuetifyCol',
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
  id: 'VCol',
  name: 'Column',
  icon: 'mdi-table-column',
  tags: [],
  children: ['main', 'VRow'],
  props: addMarginPadding([
    {
      id: 'cols',
      name: 'Columns',
      type: 'cols',
      default: null,
    },
    {
      id: 'align-self',
      name: 'Alignment',
      type: 'choice',
      options: ['start', 'center', 'end', 'auto', 'baseline', 'stretch'],
      required: false,
      default: null,
    },
  ]),
  label: (e: CanvasElement) => e.component.name,
  impl,

  // TODO: v-bind="colProps"
  vueCode: (e: CanvasElement) => [`<VCol${vueCodeClasses(e)}>`, `  {{children}}`, `</VCol>`],
}
</script>
