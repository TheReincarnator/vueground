import { CanvasElement } from './element'
import { components } from '../library'

export interface LibraryComponent {
  id: string
  name: string
  icon: string
  toplevel: boolean
  children: 'toplevel' | string[]
  props: LibraryProp[]
  label: (element: CanvasElement) => string
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

export function getComponentById(id: string): LibraryComponent {
  const component = components.find(candidate => candidate.id === id)
  if (!component) {
    throw new Error(`Unknown library component '${id}`)
  }

  return component
}

export function getPermittedComponents(container: LibraryComponent | null): LibraryComponent[] {
  if (container && container.children !== 'toplevel') {
    return container.children.map(childId => getComponentById(childId))
  }
  return components.filter(component => component.toplevel)
}

export function isSupportingComponent(
  container: LibraryComponent | null,
  childId: string,
): boolean {
  return !!getPermittedComponents(container).find(child => child.id === childId)
}
