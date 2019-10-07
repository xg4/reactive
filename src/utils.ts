export function hasOwn(x: any, key: string | number | symbol) {
  return Object.prototype.hasOwnProperty.call(x, key)
}

export function isObject(x: any) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

export const toProxy = new WeakMap()

export const toRaw = new WeakMap()
