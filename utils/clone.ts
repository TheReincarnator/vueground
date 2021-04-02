export function clone(defaultValue: any): any {
  if (Array.isArray(defaultValue)) {
    return defaultValue.map(item => clone(item))
  }

  if (typeof defaultValue === 'object' && defaultValue !== null) {
    return Object.fromEntries(
      Object.entries(defaultValue).map(([key, value]) => [key, clone(value)]),
    )
  }

  return defaultValue
}
