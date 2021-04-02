import { LibraryComponent } from './component'
import { clone } from '../utils/clone'

export interface CanvasElement {
  id: number
  component: LibraryComponent
  props: Record<string, any>
  children: CanvasElement[]
}

export function getElementIds(elements: CanvasElement[]): number[] {
  return elements.flatMap(element => [element.id, ...getElementIds(element.children)])
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
    children: [],
  }
}

export function removeElementById(elements: CanvasElement[], id: number): void {
  const index = elements.findIndex(candidate => candidate.id === id)
  if (index >= 0) {
    elements.splice(index, 1)
  } else {
    elements.forEach(element => removeElementById(element.children, id))
  }
}

export function resetToDefaults(elements: CanvasElement[]): void {
  elements.forEach(element => {
    element.component.props.forEach(prop => {
      element.props[prop.id] = clone(prop.default)
    })

    resetToDefaults(element.children)
  })
}
