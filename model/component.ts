import { CanvasElement } from './element'
import { components } from '../library'
import { Component } from 'vue-fragment'

export interface LibraryComponent {
  id: string
  name: string
  icon: string
  tags: string[]
  children: string[]
  props: LibraryProp[]
  label: (element: CanvasElement) => string
  impl: Component
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
      default: string | null
    }
  | {
      type: 'slider'
      default: number
      min: number
      max: number
    }
  | { type: 'cols'; default: number | 'auto' | null }
  | { type: 'margin-x'; default: number | 'auto' | null }
  | {
      type: 'margin-y'
      default: number | null
    }
  | {
      type: 'padding'
      default: number | null
    }
  | {
      type: 'color'
      required: boolean
      default: string | null
    }
  | {
      type: 'icon'
      required: boolean
      default: string | null
    }
  | {
      type: 'json'
      default: any
    }
)

export function getComponentById(id: string): LibraryComponent {
  const component = components.find(candidate => candidate.id === id)
  if (!component) {
    throw new Error(`Unknown library component '${id}'`)
  }

  return component
}

export function getPermittedComponents(container: LibraryComponent | null): LibraryComponent[] {
  return components.filter(
    component =>
      (!container && component.tags.includes('toplevel')) ||
      container?.children.includes(component.id) ||
      container?.children.find(childId => component.tags.includes(childId)),
  )
}

export function isSupportingComponent(
  container: LibraryComponent | null,
  childId: string,
): boolean {
  return !!getPermittedComponents(container).find(child => child.id === childId)
}
