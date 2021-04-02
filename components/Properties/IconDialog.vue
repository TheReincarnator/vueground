<template>
  <VDialog :value="isOpen" @input="$emit('update:is-open', $event)">
    <VCard>
      <VForm ref="form" @submit.prevent="onSubmit">
        <VCardTitle>
          <h2 class="text-h2">Select a color</h2>
        </VCardTitle>
        <VCardText></VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

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
    const onIcon = (color: string) => {
      emit('select', color)
      emit('is-open', false)
    }

    return {
      onIcon,
    }
  },
})
</script>
