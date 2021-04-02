import { getCurrentInstance } from '@nuxtjs/composition-api'

export function useRouter() {
  const currentInstance = getCurrentInstance()

  if (!currentInstance) {
    throw new Error('useRouter called and got currentInstance of null')
  }

  return currentInstance.proxy.$router
}

export function useRoute() {
  const currentInstance = getCurrentInstance()

  if (!currentInstance) {
    throw new Error('useRoute called and got currentInstance of null')
  }

  return currentInstance.proxy.$route
}
