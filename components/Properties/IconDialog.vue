<template>
  <VDialog :value="isOpen" @input="$emit('update:is-open', $event)">
    <VCard>
      <VForm ref="form" @submit.prevent="onSubmit">
        <VCardTitle>
          <VContainer class="ma-0 pa-0">
            <VRow>
              <VCol>
                <h2 class="text-h2">Select an icon</h2>
              </VCol>
              <VCol cols="auto">
                <VBtn icon class="mt-n2 mr-n2" @click="onClose">
                  <VIcon color="secondary">mdi-close</VIcon>
                </VBtn>
              </VCol>
            </VRow>
          </VContainer>
        </VCardTitle>
        <VCardText>
          <VTextField v-model="term" label="Search term" />
          <VBtn v-for="icon in icons" :key="icon" icon color="secondary" @click="onIcon(icon)">
            <VIcon>mdi-{{ icon }}</VIcon>
          </VBtn>
          <p v-if="term.length < 3" class="text-body-1">
            Enter a search term to show icons.
          </p>
          <p v-else-if="icons.length === 0" class="text-body-1">
            Sorry, no icons match your query.
          </p>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { mdiIcons } from './mdiIcons'

export default defineComponent({
  name: 'AttributeModal',
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const onClose = () => emit('update:is-open', false)

    const onIcon = (icon: string) => {
      emit('select', `mdi-${icon}`)
      emit('update:is-open', false)
    }

    const term = ref<string>('')

    const icons = computed<string[]>(() => {
      const termValue = term.value
      if (termValue.length < 3) {
        return []
      }

      return mdiIcons.filter(icon => icon.indexOf(termValue) >= 0)
    })

    return {
      term,
      icons,
      onClose,
      onIcon,
    }
  },
})
</script>
