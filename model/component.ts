import { CanvasElement } from './element'

export interface LibraryComponent {
  id: string
  name: string
  icon: string
  toplevel: boolean
  children: 'toplevel' | string[]
  props: LibraryProp[]
  vueCode: (element: CanvasElement) => string[]
}

export type LibraryProp = {
  id: string
  section?: string
  name: string
  default: any
} & (
  | {
      type: 'text'
      required: boolean
      default: string
    }
  | {
      type: 'integer'
      required: boolean
      default: number
    }
  | {
      type: 'boolean'
      default: boolean
    }
  | {
      type: 'choice'
      required: boolean
      options: string[]
      default: string | undefined
    }
  | {
      type: 'slider'
      default: number
      min: number
      max: number
    }
  | { type: 'cols'; default: number | 'auto' | undefined }
  | {
      type: 'margin-x'
      default: number | 'auto' | undefined
    }
  | {
      type: 'margin-y'
      default: number | undefined
    }
  | {
      type: 'padding'
      default: number | undefined
    }
  | {
      type: 'color'
      required: boolean
      default: string | undefined
    }
  | {
      type: 'icon'
      required: boolean
      default: string | undefined
    }
  | {
      type: 'json'
      default: any
    }
)
