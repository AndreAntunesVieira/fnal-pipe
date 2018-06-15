export default function fnalPipe (firstMethod, ...methods) {
  if (typeof firstMethod === 'function') {
    return fnalPipeRecursive(firstMethod, ...methods)
  }
  return fnalPipeRecursive(...methods)(firstMethod)
}

function fnalPipeRecursive (firstMethod, ...methods) {
  return value => {
    if (typeof firstMethod !== 'function') {
      return value
    }
    const result = firstMethod(value)
    if (result instanceof Promise) {
      return result.then(fnalPipeRecursive(...methods))
    }
    return fnalPipeRecursive(...methods)(result)
  }
}
