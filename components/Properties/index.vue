<template>
  <div class="px-4 pt-4">
    <h2 v-if="selectedElement" class="text-h3 mb-2">
      {{ selectedElement.component.name }} properties
    </h2>
    <h2 v-else class="text-h3 mb-2">Properties</h2>

    <ColorDialog :is-open.sync="colorDialog.isOpen" @select="onValue($event)" />
    <IconDialog :is-open.sync="iconDialog.isOpen" @select="onValue($event)" />

    <VForm v-if="selectedElement">
      <div v-for="{ key, prop, value } in elementProps" :key="key">
        <h2 v-if="prop.section" class="text-h3 my-4">{{ prop.section }}</h2>

        <!-- Prop-type "text" -->
        <VTextField v-if="prop.type === 'text'" :label="prop.name" v-model="value.value" />

        <!-- Prop-type "integer" -->
        <VTextField v-if="prop.type === 'integer'" :label="prop.name" v-model="value.value" />

        <!-- Prop-type "boolean" -->
        <VSwitch v-if="prop.type === 'boolean'" :label="prop.name" v-model="value.value" />

        <!-- Prop-type "choice" -->
        <VSelect
          v-if="prop.type === 'choice'"
          :label="prop.name"
          :items="prop.options"
          v-model="value.value"
        />

        <!-- Prop-type "slider" -->
        <VSlider
          v-if="prop.type === 'slider'"
          thumb-label
          :min="prop.min"
          :max="prop.max"
          v-model="value.value"
        >
          <template v-slot:label>
            <span class="vg-prop-name">{{ prop.name }}</span>
          </template>
        </VSlider>

        <!-- Prop-type "cols" -->
        <VSelect
          v-if="prop.type === 'cols'"
          :label="prop.name"
          :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']"
          :value="!value.value || value.value === 'auto' ? '' : value.value"
          @input="value.value = $event"
        >
          <template v-slot:prepend>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === undefined ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = undefined"
            >
              Def
            </VBtn>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === 'auto' ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = 'auto'"
            >
              Auto
            </VBtn>
          </template>
        </VSelect>

        <!-- Prop-type "margin-x" -->
        <VSlider
          v-if="prop.type === 'margin-x'"
          thumb-label
          :min="-10"
          :max="10"
          :value="parseInt(value.value, 10) || 0"
          @input="value.value = $event"
        >
          <template v-slot:label>
            <span class="vg-prop-name">{{ prop.name }}</span>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === undefined ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = undefined"
            >
              Def
            </VBtn>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === 0 ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = 0"
            >
              None
            </VBtn>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === 'auto' ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = 'auto'"
            >
              Auto
            </VBtn>
          </template>
        </VSlider>

        <!-- Prop-type "margin-y" -->
        <VSlider
          v-if="prop.type === 'margin-y'"
          thumb-label
          :min="-10"
          :max="10"
          :value="parseInt(value.value, 10) || 0"
          @input="value.value = $event"
        >
          <template v-slot:label>
            <span class="vg-prop-name">{{ prop.name }}</span>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === undefined ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = undefined"
            >
              Def
            </VBtn>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === 0 ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = 0"
            >
              None
            </VBtn>
          </template>
        </VSlider>

        <!-- Prop-type "padding" -->
        <VSlider
          v-if="prop.type === 'padding'"
          thumb-label
          :min="0"
          :max="10"
          :value="parseInt(value.value, 10) || 0"
          @input="value.value = $event"
        >
          <template v-slot:label>
            <span class="vg-prop-name">{{ prop.name }}</span>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === undefined ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = undefined"
            >
              Def
            </VBtn>
            <VBtn
              small
              tile
              :elevation="0"
              :color="value.value === 0 ? 'primary' : 'grey lighten-3'"
              class="prop-button"
              @click="value.value = 0"
            >
              None
            </VBtn>
          </template>
        </VSlider>

        <!-- Prop-type "color" -->
        <VContainer v-if="prop.type === 'color'" class="ma-0 pa-0">
          <VRow align="center" class="ma-0 pa-0">
            <VCol class="ma-0 pa-0">
              <VTextField :label="prop.name" v-model="value.value" />
            </VCol>
            <VCol cols="auto" class="ma-0 py-0 pr-0 pl-4">
              <VBtn small @click="onOpenColorDialog(value)">
                <VIcon left>mdi-palette</VIcon>
                Select
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>

        <!-- Prop-type "icon" -->
        <VContainer v-if="prop.type === 'icon'" class="ma-0 pa-0">
          <VRow align="center" class="ma-0 pa-0">
            <VCol class="ma-0 pa-0">
              <VTextField :label="prop.name" v-model="value.value" />
            </VCol>
            <VCol cols="auto" class="ma-0 py-0 pr-0 pl-4">
              <VBtn small @click="onOpenIconDialog(value)">
                <VIcon left>mdi-dots-grid</VIcon>
                Select
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>

        <!-- Prop-type "json" -->
        <VTextField v-if="prop.type === 'json'" :label="prop.name" v-model="value.value" />
      </div>
    </VForm>
    <p v-else>
      Select an element in the Elements tree to administer its properties.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, Ref, ref } from '@nuxtjs/composition-api'

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

    let editedValue: Ref<string> | null = null

    const colorDialog = useDialog()
    const onOpenColorDialog = (value: Ref<string>) => {
      editedValue = value
      colorDialog.open()
    }

    const iconDialog = useDialog()
    const onOpenIconDialog = (value: Ref<string>) => {
      editedValue = value
      iconDialog.open()
    }

    const onValue = (value: string) => {
      editedValue!.value = value
    }

    return {
      elementProps,
      colorDialog,
      iconDialog,
      onOpenColorDialog,
      onOpenIconDialog,
      onValue,
    }
  },
})
</script>

<style scoped>
.vg-prop-name {
  display: inline-block;
  min-width: 60px;
}
</style>
