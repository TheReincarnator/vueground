<template>
  <div class="px-4 pt-4">
    <h2 v-if="selectedElement" class="text-h3 mb-2">
      {{ selectedElement.component.name }} properties
    </h2>
    <h2 v-else class="text-h3 mb-2">Properties</h2>
    <VForm v-if="selectedElement">
      <div v-for="{ key, prop, value } in elementProps" :key="key">
        <h2 v-if="prop.section" class="text-h3 my-4">{{ prop.section }}</h2>
        <VTextField v-if="prop.type === 'text'" :label="prop.name" v-model="value.value" />
        <VTextField v-if="prop.type === 'integer'" :label="prop.name" v-model="value.value" />
        <VSwitch v-if="prop.type === 'boolean'" :label="prop.name" v-model="value.value" />
        <VSelect
          v-if="prop.type === 'choice'"
          :label="prop.name"
          :items="prop.options"
          v-model="value.value"
        />
        <VSlider
          v-if="prop.type === 'slider'"
          thumb-label
          :min="prop.min"
          :max="prop.max"
          v-model="value.value"
        >
          <template v-slot:label>
            <span style="display: inline-block; min-width: 60px">{{ prop.name }}</span>
          </template>
        </VSlider>

        <ColorDialog
          v-if="prop.type === 'color'"
          :is-open.sync="colorDialog.isOpen"
          @select="
            value.value = $event
            colorDialog.isOpen = false
          "
        />
        <VContainer v-if="prop.type === 'color'" class="ma-0 pa-0">
          <VRow align="center" class="ma-0 pa-0">
            <VCol class="ma-0 pa-0">
              <VTextField :label="prop.name" v-model="value.value" />
            </VCol>
            <VCol cols="auto" class="ma-0 py-0 pr-0 pl-4">
              <VBtn small @click="colorDialog.open">
                <VIcon left>mdi-palette</VIcon>
                Select
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>

        <IconDialog :is-open.sync="iconDialog.isOpen" @select="value.value = $event" />
        <VTextField v-if="prop.type === 'icon'" :label="prop.name" v-model="value.value" />

        <VTextField v-if="prop.type === 'json'" :label="prop.name" v-model="value.value" />
      </div>
    </VForm>
    <p v-else>
      Select an element in the Elements tree to administer its properties.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, Ref } from '@nuxtjs/composition-api'

import { CanvasElement } from '~/model/element'
import { LibraryProp } from '~/model/component'
import { useDialog } from '~/utils/composable/dialog'

import ColorDialog from '~/components/Properties/ColorDialog.vue'
import IconDialog from '~/components/Properties/IconDialog.vue'

interface PropAndValue {
  key: string
  prop: LibraryProp
  value: Ref
}

export default defineComponent({
  name: 'Properties',
  components: {
    ColorDialog,
    IconDialog,
  },
  props: {
    selectedElement: {
      type: Object as PropType<CanvasElement>,
      default: null,
    },
  },
  setup(props) {
    const elementProps = computed<PropAndValue[]>(
      () =>
        props.selectedElement?.component.props.map(elementProp => ({
          key: `${String(props.selectedElement.id)}:${elementProp.id}`,
          prop: elementProp,
          value: computed({
            get: () => props.selectedElement.props?.[elementProp.id],
            set: value => {
              if (!props.selectedElement.props) {
                props.selectedElement.props = {}
              }
              props.selectedElement.props[elementProp.id] = value
            },
          }),
        })) ?? [],
    )

    const colorDialog = useDialog()
    const iconDialog = useDialog()

    return {
      elementProps,
      colorDialog,
      iconDialog,
    }
  },
})
</script>
