import VueI18n from 'vue-i18n'
import { reactive, provide, inject, watch } from '@nuxtjs/composition-api'

export interface ConfirmDialogState {
  visible: boolean
  title?: VueI18n.TranslateResult
  message?: VueI18n.TranslateResult
  confirmLabel?: VueI18n.TranslateResult
}

interface ConfirmDialogOptions {
  confirmLabel: VueI18n.TranslateResult
  message?: VueI18n.TranslateResult
}

export interface ConfirmDialogContext {
  state: ConfirmDialogState
  open: (title: VueI18n.TranslateResult, options: ConfirmDialogOptions) => Promise<boolean>
  cancel: () => void
  confirm: () => void
}

export const ConfirmDialogSymbol = Symbol('confirmDialogContext')

export function provideConfirmDialog() {
  const state = reactive<ConfirmDialogState>({
    visible: false,
  })

  let resolveResult: (value: boolean) => void

  const open: ConfirmDialogContext['open'] = (title, { message, confirmLabel }) => {
    state.title = title
    state.message = message
    state.confirmLabel = confirmLabel
    state.visible = true
    return new Promise<boolean>((resolve) => {
      resolveResult = resolve
    })
  }

  function cancel() {
    state.visible = false
  }

  watch(
    () => state.visible,
    (value, oldValue) => {
      if (oldValue && !value) {
        resolveResult(false)
      }
    },
  )

  function confirm() {
    state.visible = false
    resolveResult(true)
  }

  const confirmDialogContext: ConfirmDialogContext = reactive({
    state,
    open,
    cancel,
    confirm,
  })

  provide<ConfirmDialogContext>(ConfirmDialogSymbol, confirmDialogContext)

  return confirmDialogContext
}

export function useConfirmDialog() {
  return inject<ConfirmDialogContext>(ConfirmDialogSymbol)!
}
