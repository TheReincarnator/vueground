<template>
  <div class="d-flex flex-row" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0">
    <div
      class="d-flex flex-column"
      style="flex: 0 0 auto; min-width: 320px; width: 20vw; max-width: 400px"
    >
      <VSheet elevation="8" class="d-flex flex-column" style="flex: 1 0 0">
        <VAppBar style="flex: 0 0 auto">
          <input ref="inputRef" type="file" style="position: absolute; width: 0; height: 0" />
          <div class="d-flex justify-space-between" style="width: 100%">
            <VBtn color="white" @click="onNewModel">
              <VIcon left>mdi-file-outline</VIcon>
              New
            </VBtn>
            <VBtn color="white" @click="onLoadModel">
              <VIcon left>mdi-folder-open-outline</VIcon>
              Load
            </VBtn>
            <VBtn color="white" @click="onSaveModel">
              <VIcon left>mdi-download</VIcon>
              Save
            </VBtn>
          </div>
        </VAppBar>
        <Tree
          :elements="elements.value"
          :open-element-ids="openElementIds"
          :selected-element="selectedElement"
          style="flex: 1 0 0; overflow: auto"
          @new="onNewModel"
          @select="onSelectElement"
          @remove="onRemoveElement"
        />
      </VSheet>
      <VSheet elevation="8" style="flex: 1 0 0; overflow: auto">
        <Library :selected-element="selectedElement" @add="onAddElement" />
      </VSheet>
    </div>
    <div
      class="d-flex flex-column"
      style="flex: 10 1 100px"
      @mousedown.stop="onSelectElement(null)"
    >
      <div v-if="elements.value.length" class="pa-4" style="flex: 1 0 0">
        <Canvas
          :elements="elements.value"
          :selected-element="selectedElement"
          @select="onSelectElement"
        />
      </div>
      <div v-else class="py-4 px-6" style="flex: 1 0 0">
        <div class="text-h1">Welcome to VueGround</div>
        <div class="text-subtitle-1">
          A UX design tool and visual playground for Vuetify projects.
        </div>
        <div class="text-body-1 mt-4">
          Use the Design Library to start sketching.
        </div>
      </div>
      <VSheet color="grey darken-2" style="flex: 0 0 auto">
        <VueCode :elements="elements.value" />
      </VSheet>
    </div>
    <div
      class="d-flex flex-column"
      style="flex: 0 0 auto; min-width: 320px; width: 20vw; max-width: 400px"
    >
      <VSheet elevation="8" style="flex: 1 0 0; overflow: auto">
        <Properties :selected-element="selectedElement" />
      </VSheet>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from '@nuxtjs/composition-api'
import { saveAs } from 'file-saver'
import { format } from 'date-fns'

import {
  CanvasElement,
  getElementIds,
  resetSequence,
  createElement,
  removeElementById,
  cloneElement,
  serializeModel,
  parseModel,
} from '~/model/element'
import { LibraryComponent } from '~/model/component'
import { isSupportingComponent } from '~/model/library'

import { useConfirmDialog } from '~/utils/composable/confirmDialog'

import Tree from '~/components/Tree/index.vue'
import Library from '~/components/Library/index.vue'
import Canvas from '~/components/Canvas/index.vue'
import VueCode from '~/components/VueCode/index.vue'
import Properties from '~/components/Properties/index.vue'

interface CanvasElements {
  value: CanvasElement[]
}

export default defineComponent({
  name: 'VueGround',
  components: {
    Tree,
    Library,
    Canvas,
    VueCode,
    Properties,
  },
  setup() {
    const confirmDialog = useConfirmDialog()

    const elements = reactive<CanvasElements>({ value: [] })
    resetSequence(elements.value)

    const openElementIds = ref<number[]>(getElementIds(elements.value))
    const selectedElement = ref<CanvasElement | null>(null)
    const clipboard = ref<CanvasElement | null>(null)

    const onNewModel = async () => {
      if (
        !(await confirmDialog.open('New model', {
          message: 'Are you sure to clear all elements and start from scratch?',
          confirmLabel: 'New Model',
        }))
      ) {
        return
      }

      elements.value = []
      openElementIds.value = []
      selectedElement.value = null
    }

    const inputRef = ref<HTMLInputElement | null>(null)

    const onLoadModel = () => {
      const input = inputRef.value as HTMLInputElement
      input.click()
    }

    const onSaveModel = () => {
      const blob = new Blob([JSON.stringify(serializeModel(elements.value), undefined, 2)], {
        type: 'application/json;charset=utf-8',
      })
      const dateString = format(new Date(), 'yyyyMMdd-HHmmss')
      saveAs(blob, `vueground-${dateString}.vgm`)
    }

    const onSelectElement = (element: CanvasElement | null) => {
      selectedElement.value = element
    }

    const addElementTo = (element: CanvasElement, parent: CanvasElement | null) => {
      if (parent) {
        parent.children.push(element)
      } else {
        elements.value.push(element)
      }
      element.parent = parent
    }

    const addElementAfter = (element: CanvasElement, after: CanvasElement | null) => {
      if (after === null) {
        addElementTo(element, null)
        return
      }

      const parentChildren = after.parent !== null ? after.parent.children : elements.value
      const index = parentChildren.indexOf(after)
      const newIndex = index >= 0 ? index + 1 : parentChildren.length
      parentChildren.splice(newIndex, 0, element)
      element.parent = after.parent
    }

    const openElement = (elementId: string) => {
      if (!openElementIds.value.includes(elementId)) {
        openElementIds.value.push(elementId)
      }
    }

    const onAddElement = (component: LibraryComponent) => {
      const newElement = createElement(component)
      addElementTo(newElement, selectedElement.value)

      if (selectedElement.value) {
        openElement(selectedElement.value.id)
      }

      selectedElement.value = newElement
    }

    const onRemoveElement = (element: CanvasElement) => {
      removeElementById(elements.value, element.id)
      if (selectedElement.value?.id === element.id) {
        selectedElement.value = null
      }
    }

    onMounted(() => {
      const input = inputRef.value as HTMLInputElement

      input.addEventListener('change', () => {
        if (!input.files || input.files.length === 0) {
          return
        }

        const reader = new FileReader()
        reader.onload = event => {
          elements.value = []
          parseModel(JSON.parse(event.target!.result as string)).forEach(element =>
            elements.value.push(element),
          )
          resetSequence(elements.value)
          openElementIds.value = getElementIds(elements.value)
        }
        reader.readAsText(input.files.item(0)!)
      })

      document.addEventListener('keydown', event => {
        const cmd = event.getModifierState('Control') || event.getModifierState('Meta')
        if (cmd && event.key === 'x') {
          event.preventDefault()
          if (selectedElement.value) {
            clipboard.value = selectedElement.value
            removeElementById(elements.value, selectedElement.value.id)
          }
        } else if (cmd && event.key === 'c') {
          event.preventDefault()
          if (selectedElement.value) {
            clipboard.value = selectedElement.value
          }
        } else if (cmd && event.key === 'v') {
          event.preventDefault()
          console.log({ SELECTED_IS: selectedElement.value?.component.id })
          console.log({ SELECTED_SUPPORTS: selectedElement.value?.component.children })
          console.log({ PARENT_IS: selectedElement.value?.parent?.component.id })
          console.log({ PARENT_SUPPORTS: selectedElement.value?.parent?.component.children })
          console.log({ ELEMENT_IS: clipboard.value.component.id })
          if (clipboard.value) {
            if (
              selectedElement.value?.component &&
              isSupportingComponent(selectedElement.value.component, clipboard.value.component.id)
            ) {
              const newElement = cloneElement(clipboard.value)
              addElementTo(newElement, selectedElement.value)
              selectedElement.value = newElement
              openElement(newElement.id)
              openElement(selectedElement.value.id)
            } else if (
              selectedElement.value?.parent?.component &&
              isSupportingComponent(
                selectedElement.value.parent.component,
                clipboard.value.component.id,
              )
            ) {
              const newElement = cloneElement(clipboard.value)
              addElementAfter(newElement, selectedElement.value)
              selectedElement.value = newElement
              openElement(newElement.id)
            }
          }
        } else if (cmd && event.key === 'd') {
          event.preventDefault()
          if (selectedElement.value) {
            const newElement = cloneElement(selectedElement.value)
            addElementAfter(newElement, selectedElement.value)
            selectedElement.value = newElement
            openElement(newElement.id)
          }
        }
      })
    })

    return {
      inputRef,
      elements,
      openElementIds,
      selectedElement,
      onNewModel,
      onLoadModel,
      onSaveModel,
      onSelectElement,
      onAddElement,
      onRemoveElement,
    }
  },
})
</script>
