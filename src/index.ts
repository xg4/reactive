import { isObject, hasOwn, toProxy, toRaw } from './utils'

export default function reactive<T extends object>(target: T) {
  if (!isObject(target)) {
    return target
  }
  const proxy = toProxy.get(target)
  if (proxy) {
    return proxy
  }
  if (toRaw.has(target)) {
    return target
  }

  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      if (isObject(result)) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      if (hasOwn(target, key)) {
        // TODO: trigger callback
      }
      return Reflect.set(target, key, value, receiver)
    },
    deleteProperty(target, key) {
      // TODO: trigger callback
      return Reflect.deleteProperty(target, key)
    }
  }

  const observed = new Proxy<T>(target, handler)
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}
