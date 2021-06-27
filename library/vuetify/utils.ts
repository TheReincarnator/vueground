import { LibraryProp } from '~/model/component'
import { CanvasElement } from '~/model/element'
import { JsonValue } from '~/types/json'

const marginsPaddings: LibraryProp[] = [
  { id: 'mt', section: 'Margins', name: 'top', type: 'margin-y', default: null },
  { id: 'mb', name: 'bottom', type: 'margin-y', default: null },
  { id: 'ml', name: 'left', type: 'margin-x', default: null },
  { id: 'mr', name: 'right', type: 'margin-x', default: null },
  { id: 'pt', section: 'Paddings', name: 'top', type: 'padding', default: null },
  { id: 'pb', name: 'bottom', type: 'padding', default: null },
  { id: 'pl', name: 'left', type: 'padding', default: null },
  { id: 'pr', name: 'right', type: 'padding', default: null },
]

export function addMarginPadding(props: LibraryProp[]) {
  const result = [...props]
  marginsPaddings.forEach(prop => {
    if (!props.find(candidate => candidate.name === prop.name)) {
      result.push(prop)
    }
  })
  return result
}

export function convertMarginPadding(value?: JsonValue): string {
  let valueNumber
  if (value === 'auto') {
    return 'auto'
  } else if (typeof value === 'string') {
    valueNumber = parseInt(value)
  } else if (typeof value === 'number') {
    valueNumber = value
  } else {
    return ''
  }

  return valueNumber < 0 ? 'n' + String(-valueNumber) : String(valueNumber)
}

export function toString(value: any): string {
  if (typeof value === 'string') {
    return value
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return ''
}

export function prefixed(prefix: string, value: any): string {
  return value ? `${prefix}${value}` : ''
}

export function suffixed(value: any, suffix: string): string {
  return value ? `${value}${suffix}` : ''
}

export function classes(
  element: CanvasElement,
  selectedId: number | null,
  ...values: any[]
): string {
  const mt = convertMarginPadding(element.props.mt)
  const mb = convertMarginPadding(element.props.mb)
  const ml = convertMarginPadding(element.props.ml)
  const mr = convertMarginPadding(element.props.mr)

  let margin: string[] = []
  if (mt && mb && ml && mr && mt === mb && mt === mr && mt === ml) {
    margin.push(prefixed('ma-', convertMarginPadding(element.props.mt)))
  } else {
    if (mt && mb && mt === mb) {
      margin.push(prefixed('my-', convertMarginPadding(element.props.mt)))
    } else {
      margin.push(prefixed('mt-', convertMarginPadding(element.props.mt)))
      margin.push(prefixed('mb-', convertMarginPadding(element.props.mb)))
    }

    if (ml && mr && ml === mr) {
      margin.push(prefixed('mx-', convertMarginPadding(element.props.ml)))
    } else {
      margin.push(prefixed('ml-', convertMarginPadding(element.props.ml)))
      margin.push(prefixed('mr-', convertMarginPadding(element.props.mr)))
    }
  }

  const pt = convertMarginPadding(element.props.pt)
  const pb = convertMarginPadding(element.props.pb)
  const pl = convertMarginPadding(element.props.pl)
  const pr = convertMarginPadding(element.props.pr)

  let padding: string[] = []
  if (pt && pb && pl && pr && pt === pb && pt === pr && pt === pl) {
    padding.push(prefixed('pa-', convertMarginPadding(element.props.pt)))
  } else {
    if (pt && pb && pt === pb) {
      padding.push(prefixed('py-', convertMarginPadding(element.props.pt)))
    } else {
      padding.push(prefixed('pt-', convertMarginPadding(element.props.pt)))
      padding.push(prefixed('pb-', convertMarginPadding(element.props.pb)))
    }

    if (pl && pr && pl === pr) {
      padding.push(prefixed('px-', convertMarginPadding(element.props.pl)))
    } else {
      padding.push(prefixed('pl-', convertMarginPadding(element.props.pl)))
      padding.push(prefixed('pr-', convertMarginPadding(element.props.pr)))
    }
  }

  const selected: string[] = selectedId === element.id ? ['vueground-selected'] : []

  return [...values, ...margin, ...padding, ...selected]
    .filter(Boolean)
    .map(toString)
    .join(' ')
    .trim()
}

export function vueCodeClasses(element: CanvasElement, ...values: any[]): string {
  const classesString = classes(element, null, ...values)
  return classesString ? ` class="${classesString}"` : ''
}

export function prop(propName: string, value: any): string {
  if (!value) {
    return ''
  } else if (value === true) {
    return ` ${propName}`
  } else {
    return ` ${propName}="${value}"`
  }
}
