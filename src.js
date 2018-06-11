export default function fnalPipe (firstMethod, ...methods) {
  return value => {
    if (typeof firstMethod !== 'function') {
      return value
    }
    const result = firstMethod(value)
    if (result instanceof Promise) {
      return result.then(fnalPipe(...methods))
    }
    return fnalPipe(...methods)(result)
  }
}
