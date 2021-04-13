<template>
  <div>
    <div
      v-for="{ id: elementId, props, classes, component, children } in elementViews"
      :key="elementId"
    >
      <div
        v-if="component.id === 'Text'"
        :class="`text-${props.type} ${props.color}--text ${classes}`"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        {{ props.text }}
      </div>

      <VContainer
        v-else-if="component.id === 'VContainer'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        <VRow
          v-for="{
            id: rowId,
            props: rowProps,
            classes: rowClasses,
            children: rowChildren,
          } in children"
          :key="rowId"
          v-bind="rowProps"
          :class="rowClasses"
          :style="selectedId === rowId ? selectedOutline : ''"
        >
          <VCol
            v-for="{
              id: colId,
              props: colProps,
              classes: colClasses,
              children: colChildren,
            } in rowChildren"
            :key="colId"
            v-bind="colProps"
            :class="colClasses"
            :style="selectedId === colId ? selectedOutline : ''"
          >
            <Canvas :elements="colChildren" v-bind="$props" />
          </VCol>
        </VRow>
      </VContainer>

      <VCard
        v-else-if="component.id === 'VCard'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        <VCardTitle v-if="props.title">
          <h2 class="text-h2">{{ props.title }}</h2>
        </VCardTitle>
        <VCardText>
          <Canvas :elements="children" v-bind="$props" />
        </VCardText>
      </VCard>

      <VChip
        v-else-if="component.id === 'VChip'"
        :x-small="props.size === 'x-small'"
        :small="props.size === 'small'"
        :large="props.size === 'large'"
        :x-large="props.size === 'x-large'"
        :color="props.color"
        :outlined="props.outlined"
        :close="!!props.icon"
        :close-icon="props.icon"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        {{ props.label }}
      </VChip>

      <VIcon
        v-else-if="component.id === 'VIcon'"
        v-bind="props"
        :x-small="props.size === 'x-small'"
        :small="props.size === 'small'"
        :large="props.size === 'large'"
        :x-large="props.size === 'x-large'"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        {{ props.icon }}
      </VIcon>

      <VTextField
        v-else-if="component.id === 'VTextField'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      />

      <VSelect
        v-else-if="component.id === 'VSelect'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      />

      <VCheckbox
        v-else-if="component.id === 'VCheckbox'"
        v-bind="props"
        :input-value="props.selected"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      />

      <VRadioGroup
        v-else-if="component.id === 'VRadioGroup'"
        v-bind="props"
        :column="props.direction === 'column'"
        :row="props.direction !== 'column'"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        <Canvas :elements="children" v-bind="$props" />
      </VRadioGroup>

      <VRadio
        v-else-if="component.id === 'VRadio'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      />

      <VSwitch
        v-else-if="component.id === 'VSwitch'"
        v-bind="props"
        :input-value="props.selected"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      />

      <VSlider
        v-else-if="component.id === 'VSlider'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      />

      <VBtn
        v-else-if="component.id === 'VBtn'"
        v-bind="props"
        :x-small="props.size === 'x-small'"
        :small="props.size === 'small'"
        :large="props.size === 'large'"
        :x-large="props.size === 'x-large'"
        :icon="(!!props.iconLeft || !!props.iconRight) && !props.label"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        <VIcon v-if="props.iconLeft" :left="!!props.label">{{ props.iconLeft }}</VIcon>
        {{ props.label }}
        <VIcon v-if="props.iconRight" :right="!!props.label">{{ props.iconRight }}</VIcon>
      </VBtn>

      <VList
        v-else-if="component.id === 'VList'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        <Canvas :elements="children" v-bind="$props" />
      </VList>

      <VTable
        v-else-if="component.id === 'VTable'"
        v-bind="props"
        :class="classes"
        :style="selectedId === elementId ? selectedOutline : ''"
      >
        <Canvas :elements="children" v-bind="$props" />
      </VTable>

      <div v-else class="text--red" :style="selectedId === elementId ? selectedOutline : ''">
        Unknown design component '{{ component.id }}'
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Fragment } from 'vue-fragment'

import { LibraryComponent } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { Json } from '~/types/json'

interface ElementView {
  id: number
  component: LibraryComponent
  props: Record<string, Json>
  children: CanvasElement[]
  classes: string
}

function convertMarginPadding(value?: string): string {
  if (value === null || value === undefined) {
    return ''
  }
  const valueNumber = parseInt(value)
  return valueNumber < 0 ? 'n' + String(-valueNumber) : String(valueNumber)
}

function createElementView(element: CanvasElement): ElementView {
  const classes =
    ` mt-${convertMarginPadding(element.props.mt)}` +
    ` mb-${convertMarginPadding(element.props.mb)}` +
    ` ml-${convertMarginPadding(element.props.ml)}` +
    ` mr-${convertMarginPadding(element.props.mr)}` +
    ` pt-${convertMarginPadding(element.props.pt)}` +
    ` pb-${convertMarginPadding(element.props.pb)}` +
    ` pl-${convertMarginPadding(element.props.pl)}` +
    ` pr-${convertMarginPadding(element.props.pr)}`

  return {
    ...element,
    children: element.children.map(child => createElementView(child)),
    classes,
  }
}

export default defineComponent({
  name: 'Canvas',
  components: {
    Fragment,
  },
  props: {
    elements: {
      type: Array as PropType<CanvasElement[]>,
      required: true,
    },
    selectedElement: {
      type: Object as PropType<CanvasElement>,
      default: null,
    },
    hoverElement: {
      type: Object as PropType<CanvasElement>,
      default: null,
    },
  },
  setup(props) {
    const elementViews = computed<ElementView[]>(() =>
      props.elements.map(element => createElementView(element)),
    )

    const selectedId = computed(() => props.selectedElement?.id)
    const selectedOutline = 'outline:3px solid #e91e63'

    return {
      elementViews,
      selectedId,
      selectedOutline,
    }
  },
})
</script>
