<template>
  <VApp dark>
    <template v-if="error.statusCode === 404">
      <h1>Not Found</h1>
      <p>Sorry, this page does not exist.</p>
    </template>
    <template v-else>
      <h1>Internal error</h1>
      <p>Sorry, an internal error occurred: {{ error.message }}</p>
    </template>
    <NuxtLink to="/">Restart VueGround</NuxtLink>
  </VApp>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LayoutError',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head: {},
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
