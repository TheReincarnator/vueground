import type { TranslateResult } from 'vue-i18n'

export type VDataTableHeaders<Data extends string> = {
  text?: TranslateResult
  value: Data
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  filterable?: boolean
  groupable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (value: any, search: string, item: any) => boolean
  sort?: (a: any, b: any) => number
}
