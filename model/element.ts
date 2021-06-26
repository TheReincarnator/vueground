import { LibraryComponent, getComponentById } from './component'
import { JsonObject } from '../types/json'
import { clone } from '../utils/clone'

export interface CanvasElement {
  id: number
  component: LibraryComponent
  props: JsonObject
  parent: CanvasElement | null
  children: CanvasElement[]
}

export function getElementIds(elements: CanvasElement[]): number[] {
  return elements.flatMap(element => [element.id, ...getElementIds(element.children)])
}

export function getElementById(elements: CanvasElement[], id: number): CanvasElement | null {
  let element: CanvasElement | null = null
  elements.forEach(candidate => {
    if (candidate.id === id) {
      element = candidate
    }

    if (!element) {
      element = getElementById(candidate.children, id)
    }
  })

  return element
}

let sequence = 1

export function resetSequence(elements: CanvasElement[]): void {
  sequence = 1
  resetSequenceInternval(elements)
}

function resetSequenceInternval(elements: CanvasElement[]): void {
  elements.forEach(element => {
    if (sequence < element.id) {
      sequence = element.id
    }

    resetSequenceInternval(element.children)
  })
}

export function createElement(component: LibraryComponent): CanvasElement {
  return {
    id: ++sequence,
    component,
    props: Object.fromEntries(component.props.map(prop => [prop.id, clone(prop.default)])),
    parent: null,
    children: [],
  }
}

export function removeElementById(elements: CanvasElement[], id: number): void {
  const index = elements.findIndex(candidate => candidate.id === id)
  if (index >= 0) {
    elements[index].parent = null
    elements.splice(index, 1)
  } else {
    elements.forEach(element => removeElementById(element.children, id))
  }
}

export function cloneElement(original: CanvasElement): CanvasElement {
  const clonedElement: CanvasElement = {
    id: ++sequence,
    component: original.component,
    props: clone(original.props),
    parent: null,
    children: original.children.map(child => cloneElement(child)),
  }

  clonedElement.children.forEach(child => (child.parent = clonedElement))

  return clonedElement
}

function serializeElement(element: CanvasElement): JsonObject {
  return {
    id: element.id,
    component: element.component.id,
    props: element.props,
    children: element.children.map(child => serializeElement(child)),
  }
}

export function serializeModel(elements: CanvasElement[]): JsonObject {
  return {
    type: 'VueGroundModel',
    modelVersion: 1,
    elements: elements.map(serializeElement),
  }
}

function isCanvasElement(value: CanvasElement | null): value is CanvasElement {
  return value !== null
}

function parseElement(json: JsonObject): CanvasElement | null {
  const id = json.id
  if (typeof id !== 'number') {
    console.warn('Skipping invalid element')
    return null
  }

  const componentId = json.component
  if (typeof componentId !== 'string') {
    console.warn(`Skipping invalid element ${id}: No component ID`)
    return null
  }

  const component = getComponentById(componentId)
  if (!component) {
    console.warn(`Skipping invalid element ${id}: Unknown component ${componentId}`)
    return null
  }

  const props = json.props
  if (!props || typeof props !== 'object') {
    console.warn(`Skipping invalid element ${id}: Props is not an object`)
    return null
  }

  // Ensure all prop keys are set, otherwise the Vue reactivity does not work
  component.props.forEach(prop => {
    if (!(prop.id in props)) {
      ;(props as JsonObject)[prop.id] = null
    }
  })

  const children = json.children
  if (!Array.isArray(children)) {
    console.warn(`Skipping invalid element ${id}: Children is not an array`)
    return null
  }

  const element: CanvasElement = {
    id,
    component,
    props: props as JsonObject,
    parent: null,
    children: (children as JsonObject[]).map(parseElement).filter(isCanvasElement),
  }

  element.children.forEach(child => (child.parent = element))

  return element
}

export function parseModel(json: JsonObject): CanvasElement[] {
  if (json.type !== 'VueGroundModel' || json.modelVersion !== 1 || !Array.isArray(json.elements)) {
    throw new Error('This is no VueGround model')
  }

  return (json.elements as JsonObject[]).map(parseElement).filter(isCanvasElement)
}
