import { LibraryComponent, LibraryProp } from '~/model/component'
import { CanvasElement } from './element'

export const components: LibraryComponent[] = [
  {
    id: 'Text',
    name: 'Text',
    icon: 'mdi-text',
    toplevel: true,
    children: [],
    props: [
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
        default: undefined,
      },
    ],
    label: (e: CanvasElement) => (e.props.text as string) ?? e.component.name,
    vueCode: (e: CanvasElement) => [
      `<div${classes(e, prefixed('text-', e.props.type), suffixed(e.props.color, '--text'))}>`,
      `  ${e.props.text}`,
      `</div>`,
    ],
  },
  {
    id: 'VContainer',
    name: 'Grid',
    icon: 'mdi-grid-large',
    toplevel: true,
    children: ['VRow'],
    props: [
      {
        id: 'fluid',
        name: 'Fluid (full width)',
        type: 'boolean',
        default: false,
      },
      { id: 'mt', section: 'Margins', name: 'top', type: 'margin-y', default: undefined },
      { id: 'mb', name: 'bottom', type: 'margin-y', default: undefined },
      { id: 'ml', name: 'left', type: 'margin-x', default: undefined },
      { id: 'mr', name: 'right', type: 'margin-x', default: undefined },
      { id: 'pt', section: 'Paddings', name: 'top', type: 'padding', default: undefined },
      { id: 'pb', name: 'bottom', type: 'padding', default: undefined },
      { id: 'pl', name: 'left', type: 'padding', default: 0 },
      { id: 'pr', name: 'right', type: 'padding', default: 0 },
    ],
    label: (e: CanvasElement) => e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [`<VContainer${classes(e)}>`, `  {{children}}`, `</VContainer>`],
  },
  {
    id: 'VRow',
    name: 'Row',
    icon: 'mdi-table-row',
    toplevel: false,
    children: ['VCol'],
    props: [
      {
        id: 'justify',
        name: 'Justification',
        type: 'choice',
        options: ['start', 'center', 'end', 'space-between', 'space-around'],
        required: false,
        default: undefined,
      },
      {
        id: 'align',
        name: 'Alignment',
        type: 'choice',
        required: false,
        options: ['start', 'center', 'end', 'baseline', 'stretch'],
        default: undefined,
      },
      {
        id: 'align-content',
        name: 'Content alignment',
        type: 'choice',
        options: ['start', 'center', 'end', 'space-between', 'space-around', 'stretch'],
        required: false,
        default: undefined,
      },
      {
        id: 'dense',
        name: 'Dense',
        type: 'boolean',
        default: false,
      },
      {
        id: 'no-gutters',
        name: 'No gutters',
        type: 'boolean',
        default: false,
      },
    ],
    label: (e: CanvasElement) => e.component.name,

    // TODO: v-bind="rowProps"
    vueCode: (e: CanvasElement) => [`<VRow${classes(e)}>`, `  {{children}}`, `</VRow>`],
  },
  {
    id: 'VCol',
    name: 'Column',
    icon: 'mdi-table-column',
    toplevel: false,
    children: 'toplevel',
    props: [
      {
        id: 'cols',
        name: 'Columns',
        type: 'cols',
        default: undefined,
      },
      {
        id: 'align-self',
        name: 'Alignment',
        type: 'choice',
        options: ['start', 'center', 'end', 'auto', 'baseline', 'stretch'],
        required: false,
        default: undefined,
      },
    ],
    label: (e: CanvasElement) => e.component.name,

    // TODO: v-bind="colProps"
    vueCode: (e: CanvasElement) => [`<VCol${classes(e)}>`, `  {{children}}`, `</VCol>`],
  },
  {
    id: 'VCard',
    name: 'Card',
    icon: 'mdi-card-account-details',
    toplevel: true,
    children: 'toplevel',
    props: [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
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
    ],
    label: (e: CanvasElement) => (e.props.title as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [
      `<VCard${classes(e)}>`,
      `  <VCardTitle>`,
      `    <h2 class="text-h2">${e.props.title}</h2>`,
      `  </VCardTitle>`,
      `  <VCardText>`,
      `    {{children}}`,
      `  <VCardText>`,
      `</VCard>`,
    ],
  },
  {
    id: 'VChip',
    name: 'Chip',
    icon: 'mdi-label',
    toplevel: true,
    children: [],
    props: [
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
        default: 'primary',
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
        default: 'Chip label',
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'icon',
        default: undefined,
        required: false,
      },
    ],
    label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,

    vueCode: (e: CanvasElement) => [
      '<VChip' +
        classes(e) +
        prop('x-small', e.props.size === 'x-small') +
        prop('small', e.props.size === 'small') +
        prop('large', e.props.size === 'large') +
        prop('x-large', e.props.size === 'x-large') +
        prop('color', e.props.color) +
        prop('outlined', e.props.outlined) +
        prop('close', !!e.props.icon) +
        prop('close-icon', e.props.icon) +
        '>',
      `  ${e.props.label}`,
      `</VChip>`,
    ],
  },
  {
    id: 'VIcon',
    name: 'Icon',
    icon: 'mdi-image-filter-vintage',
    toplevel: true,
    children: [],
    props: [
      {
        id: 'icon',
        name: 'Icon',
        type: 'icon',
        required: true,
        default: undefined,
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
        default: undefined,
      },
      {
        id: 'disabled',
        name: 'Disabled',
        type: 'boolean',
        default: false,
      },
    ],
    label: (e: CanvasElement) => (e.props.icon as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [
      '<VIcon' +
        classes(e) +
        prop('x-small', e.props.size === 'x-small') +
        prop('small', e.props.size === 'small') +
        prop('large', e.props.size === 'large') +
        prop('x-large', e.props.size === 'x-large') +
        '>',
      `  ${e.props.icon}`,
      `</VIcon>`,
    ],
  },
  {
    id: 'VTextField',
    name: 'Text field',
    icon: 'mdi-form-textbox',
    toplevel: true,
    children: [],
    props: [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
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
    ],
    label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [`<VTextField${classes(e)}>`, `</VTextField>`],
  },
  {
    id: 'VSelect',
    name: 'Select',
    icon: 'mdi-form-dropdown',
    toplevel: true,
    children: [],
    props: [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
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
        type: 'json',
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
        ],
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
    ],
    label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [`<VSelect${classes(e)}>`, `</VSelect>`],
  },
  {
    id: 'VCheckbox',
    name: 'Checkbox',
    icon: 'mdi-checkbox-marked-outline',
    toplevel: true,
    children: [],
    props: [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
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
    ],
    label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,

    // TODO: v-bind="props"

    vueCode: (e: CanvasElement) => [
      `<VCheckbox${classes(e)}${prop('input-value', e.props.selected)}>`,
      `</VCheckbox>`,
    ],
  },
  {
    id: 'VRadioGroup',
    name: 'Radio group',
    icon: 'mdi-radiobox-marked',
    toplevel: true,
    children: ['VRadio'],
    props: [
      {
        id: 'direction',
        name: 'Direction',
        type: 'choice',
        options: ['row', 'column'],
        required: true,
        default: 'row',
      },
      {
        id: 'selected',
        name: 'Selected',
        type: 'text',
        required: false,
        default: '',
      },
      {
        id: 'disabled',
        name: 'Disabled',
        type: 'boolean',
        default: false,
      },
    ],
    label: (e: CanvasElement) => e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [
      '<VRadioGroup' +
        classes(e) +
        prop('column', e.props.direction === 'column') +
        prop('row', e.props.direction !== 'column') +
        '>',
      `  {{children}}`,
      `</VRadioGroup>`,
    ],
  },
  {
    id: 'VRadio',
    name: 'Radio',
    icon: 'mdi-radiobox-marked',
    toplevel: false,
    children: [],
    props: [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
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
    ],
    label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [`<VRadio${classes(e)}>`, `</VRadio>`],
  },
  {
    id: 'VSwitch',
    name: 'Switch',
    icon: 'mdi-toggle-switch',
    toplevel: true,
    children: [],
    props: [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
      },
      {
        id: 'label',
        name: 'Label',
        type: 'text',
        required: false,
        default: 'Switch label',
      },
      {
        id: 'selected',
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
        id: 'disabled',
        name: 'Disabled',
        type: 'boolean',
        default: false,
      },
    ],
    label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [
      `<VSwitch${classes(e)}${prop('input-value', e.props.selected)}>`,
      `</VSwitch>`,
    ],
  },
  {
    id: 'VSlider',
    name: 'Slider',
    icon: 'mdi-minus',
    toplevel: true,
    children: [],
    props: [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
      },
      {
        id: 'label',
        name: 'Label',
        type: 'text',
        required: false,
        default: 'Slider label',
      },
      {
        id: 'min',
        name: 'Minimum',
        type: 'integer',
        required: true,
        default: 0,
      },
      {
        id: 'max',
        name: 'Maximum',
        type: 'integer',
        required: true,
        default: 20,
      },
      {
        id: 'value',
        name: 'Value',
        type: 'integer',
        required: true,
        default: 0,
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
    ],
    label: (e: CanvasElement) => (e.props.label as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [`<VSlider${classes(e)}>`, `</VSlider>`],
  },
  {
    id: 'VBtn',
    name: 'Button',
    icon: 'mdi-gesture-tap-button',
    toplevel: true,
    children: [],
    props: [
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
        default: undefined,
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
        default: undefined,
        required: false,
      },
      {
        id: 'iconRight',
        name: 'Icon right',
        type: 'icon',
        default: undefined,
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
    ],
    label: (e: CanvasElement) =>
      (e.props.label as string) ?? (e.props.icon as string) ?? e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [
      '<VBtn' +
        classes(e) +
        prop('x-small', e.props.size === 'x-small') +
        prop('small', e.props.size === 'small') +
        prop('large', e.props.size === 'large') +
        prop('x-large', e.props.size === 'x-large') +
        prop('icon', (!!e.props.iconLeft || !!e.props.iconRight) && !e.props.label) +
        '>',
      e.props.iconLeft
        ? `  <VIcon${prop('left', !!e.props.label)}>${e.props.iconLeft}</VIcon>`
        : '',
      typeof e.props.label === 'string' ? `  ${e.props.label}` : '',
      e.props.iconRight
        ? `  <VIcon${prop('right', !!e.props.label)}>${e.props.iconRight}</VIcon>`
        : '',
      `</VBtn>`,
    ],
  },
  {
    id: 'VList',
    name: 'List',
    icon: 'mdi-format-list-bulleted',
    toplevel: true,
    children: [],
    props: [
      {
        id: 'dense',
        name: 'Dense',
        type: 'boolean',
        default: false,
      },
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        required: false,
        default: undefined,
      },
      {
        id: 'items',
        name: 'Items',
        type: 'json',
        default: [
          {
            action: 'mdi-ticket',
            items: [{ title: 'List Item' }],
            title: 'Attractions',
          },
          {
            action: 'mdi-silverware-fork-knife',
            active: true,
            items: [{ title: 'Breakfast & brunch' }, { title: 'New American' }, { title: 'Sushi' }],
            title: 'Dining',
          },
          {
            action: 'mdi-school',
            items: [{ title: 'List Item' }],
            title: 'Education',
          },
          {
            action: 'mdi-run',
            items: [{ title: 'List Item' }],
            title: 'Family',
          },
          {
            action: 'mdi-bottle-tonic-plus',
            items: [{ title: 'List Item' }],
            title: 'Health',
          },
          {
            action: 'mdi-content-cut',
            items: [{ title: 'List Item' }],
            title: 'Office',
          },
          {
            action: 'mdi-tag',
            items: [{ title: 'List Item' }],
            title: 'Promotions',
          },
        ],
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
    ],
    label: (e: CanvasElement) => e.component.name,

    // TODO: v-bind="props"
    vueCode: (e: CanvasElement) => [`<VList${classes(e)}>`, `  {{children}}`, `</VList>`],
  },
  {
    id: 'VTable',
    name: 'Table',
    icon: 'mdi-table',
    toplevel: true,
    children: [],
    props: [
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
    ],
    label: (e: CanvasElement) => e.component.name,

    // TODO: v-bind="props"

    vueCode: (e: CanvasElement) => [`<VTable${classes(e)}>`, `  {{children}}`, `</VTable>`],
  },
]

const marginsPaddings: LibraryProp[] = [
  { id: 'mt', section: 'Margins', name: 'top', type: 'margin-y', default: undefined },
  { id: 'mb', name: 'bottom', type: 'margin-y', default: undefined },
  { id: 'ml', name: 'left', type: 'margin-x', default: undefined },
  { id: 'mr', name: 'right', type: 'margin-x', default: undefined },
  { id: 'pt', section: 'Paddings', name: 'top', type: 'padding', default: undefined },
  { id: 'pb', name: 'bottom', type: 'padding', default: undefined },
  { id: 'pl', name: 'left', type: 'padding', default: undefined },
  { id: 'pr', name: 'right', type: 'padding', default: undefined },
]

components.forEach(component => {
  marginsPaddings.forEach(prop => {
    if (!component.props.find(candidate => candidate.name === prop.name)) {
      component.props.push(prop)
    }
  })
})

export function getComponentById(id: string): LibraryComponent {
  const component = components.find(candidate => candidate.id === id)
  if (!component) {
    throw new Error(`Unknown library component '${id}`)
  }

  return component
}

export function getPermittedComponents(container: LibraryComponent | null): LibraryComponent[] {
  if (container && container.children !== 'toplevel') {
    return container.children.map(childId => getComponentById(childId))
  }
  return components.filter(component => component.toplevel)
}

function convertMarginPadding(value: any): string {
  const valueNumber = parseInt(value)
  if (Number.isNaN(valueNumber)) {
    return ''
  }

  return valueNumber < 0 ? 'n' + String(-valueNumber) : String(valueNumber)
}

function toString(value: any): string {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return ''
}

function prefixed(prefix: string, value: any): string {
  return value ? `${prefix}${value}` : ''
}

function suffixed(value: any, suffix: string): string {
  return value ? `${value}${suffix}` : ''
}

function classes(element: CanvasElement, ...values: any[]): string {
  const mt = convertMarginPadding(element.props.mt)
  const mb = convertMarginPadding(element.props.mb)
  const ml = convertMarginPadding(element.props.ml)
  const mr = convertMarginPadding(element.props.mr)

  let margin: string[] = []
  if (mt && mb && ml && mr && mt === mb && mt === mr && mt === ml) {
    margin.push(prefixed('ma-', convertMarginPadding(element.props.mt)))
  } else {
    if (mt && mb && mt === mb) {
      margin.push(prefixed('my-', convertMarginPadding(element.props.mt)))
    } else {
      margin.push(prefixed('mt-', convertMarginPadding(element.props.mt)))
      margin.push(prefixed('mb-', convertMarginPadding(element.props.mb)))
    }

    if (ml && mr && ml === mr) {
      margin.push(prefixed('mx-', convertMarginPadding(element.props.ml)))
    } else {
      margin.push(prefixed('ml-', convertMarginPadding(element.props.ml)))
      margin.push(prefixed('mr-', convertMarginPadding(element.props.mr)))
    }
  }

  const pt = convertMarginPadding(element.props.pt)
  const pb = convertMarginPadding(element.props.pb)
  const pl = convertMarginPadding(element.props.pl)
  const pr = convertMarginPadding(element.props.pr)

  let padding: string[] = []
  if (pt && pb && pl && pr && pt === pb && pt === pr && pt === pl) {
    padding.push(prefixed('pa-', convertMarginPadding(element.props.pt)))
  } else {
    if (pt && pb && pt === pb) {
      padding.push(prefixed('py-', convertMarginPadding(element.props.pt)))
    } else {
      padding.push(prefixed('pt-', convertMarginPadding(element.props.pt)))
      padding.push(prefixed('pb-', convertMarginPadding(element.props.pb)))
    }

    if (pl && pr && pl === pr) {
      padding.push(prefixed('px-', convertMarginPadding(element.props.pl)))
    } else {
      padding.push(prefixed('pl-', convertMarginPadding(element.props.pl)))
      padding.push(prefixed('pr-', convertMarginPadding(element.props.pr)))
    }
  }

  const jointValues = [...values, ...margin, ...padding]
    .filter(Boolean)
    .map(toString)
    .join(' ')
    .trim()
  return jointValues ? ` class="${jointValues}"` : ''
}

function styles(...values: any[]): string {
  const jointValues = values
    .filter(Boolean)
    .map(toString)
    .join(' ')
    .trim()
  return jointValues ? ` style="${jointValues}"` : ''
}

function prop(propName: string, value: any): string {
  if (!value) {
    return ''
  } else if (value === true) {
    return ` ${propName}`
  } else {
    return ` ${propName}="${value}"`
  }
}
