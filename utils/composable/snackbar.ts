import VueI18n from 'vue-i18n'
import { reactive, provide, inject } from '@nuxtjs/composition-api'

export interface SnackbarState {
  visible: boolean
  color?: string
  message?: VueI18n.TranslateResult
}

export interface SnackbarContext {
  state: SnackbarState
  showSuccess: (message: VueI18n.TranslateResult) => void
  showError: (message: VueI18n.TranslateResult) => void
}

export const SnackbarSymbol = Symbol('snackbarContext')

export function provideSnackbar() {
  const state = reactive<SnackbarState>({
    visible: false,
    color: undefined,
    message: undefined,
  })

  function showSuccess(message: VueI18n.TranslateResult) {
    state.color = 'success'
    state.message = message
    state.visible = true
  }

  function showError(message: VueI18n.TranslateResult) {
    state.color = 'error'
    state.message = message
    state.visible = true
  }

  const snackbarContext: SnackbarContext = reactive({
    state,
    showSuccess,
    showError,
  })

  provide<SnackbarContext>(SnackbarSymbol, snackbarContext)

  return snackbarContext
}

export function useSnackbar() {
  return inject<SnackbarContext>(SnackbarSymbol)!
}
