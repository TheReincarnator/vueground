<template>
  <VSelect
    v-bind="props"
    :items="props.items ? props.items.split(';').map(item => item.trim()) : []"
    :class="classes(element, selectedId)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { addMarginPadding, classes, vueCodeClasses } from './utils'

const impl = defineComponent({
  name: 'VuetifySelect',
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
  id: 'VSelect',
  name: 'Select',
  icon: 'mdi-form-dropdown',
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
      default: 'Select label',
    },
    {
      id: 'value',
      name: 'Value',
      type: 'text',
      required: false,
      default: '',
    },
    {
      id: 'items',
      name: 'Items',
      type: 'text',
      default: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ].join('; '),
      required: false,
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
      id: 'chips',
      name: 'Chips',
      type: 'boolean',
      default: false,
    },
    {
      id: 'multiple',
      name: 'Multiple',
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
  vueCode: (e: CanvasElement) => [`<VSelect${vueCodeClasses(e)}>`, `</VSelect>`],
}
</script>
