import { reactive, ref } from '@nuxtjs/composition-api'

export function useDialog() {
  const isOpen = ref(false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return reactive({
    isOpen,
    open,
    close,
  })
}
