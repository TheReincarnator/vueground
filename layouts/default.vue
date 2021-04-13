<template>
  <VApp dark>
    <VMain class="grey lighten-4">
      <VSnackbar v-model="snackbar.state.visible" :color="snackbar.state.color" top>
        {{ snackbar.state.message }}
      </VSnackbar>
      <VDialog v-model="confirmDialog.state.visible" width="650px">
        <VCard>
          <VCardTitle>
            <h2 class="text-h2">{{ confirmDialog.state.title }}</h2>
          </VCardTitle>
          <VCardText v-if="confirmDialog.state.message" class="text-body-1">
            {{ confirmDialog.state.message }}
          </VCardText>
          <VCardActions class="px-4 pb-4">
            <VSpacer />
            <VBtn type="button" class="ml-4" @click="confirmDialog.cancel">Cancel</VBtn>
            <VBtn type="button" color="primary" class="ml-4" @click="confirmDialog.confirm">
              {{ confirmDialog.state.confirmLabel }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
      <Nuxt />
    </VMain>
  </VApp>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { VApp } from 'vuetify/lib'

import { provideSnackbar } from '~/utils/composable/snackbar'
import { provideConfirmDialog } from '~/utils/composable/confirmDialog'

export default defineComponent({
  name: 'LayoutDefault',
  components: {
    // Note: Usually, Vuetify components need no declaration.
    // However, at least this one component (VApp) must be declared,
    // otherwise headlines have wrong font size
    VApp,
  },
  setup() {
    const isOpen = ref(true)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const snackbar = provideSnackbar()
    const confirmDialog = provideConfirmDialog()

    return {
      isOpen,
      toggleOpen,
      snackbar,
      confirmDialog,
    }
  },
})
</script>
