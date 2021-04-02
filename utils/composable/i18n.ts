import { getCurrentInstance } from '@nuxtjs/composition-api'

export function useT() {
  const currentInstance = getCurrentInstance()

  if (!currentInstance) {
    throw new Error('useT called and got currentInstance of null')
  }

  return {
    $t: currentInstance.proxy.$t.bind(currentInstance.proxy),
    $te: currentInstance.proxy.$te.bind(currentInstance.proxy),
    $tc: currentInstance.proxy.$tc.bind(currentInstance.proxy),
  }
}
