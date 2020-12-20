
/**
 * Create a generator from a template string.
 *
 * @param strings
 * @param keys
 */
export const fromTemplate = (strings:TemplateStringsArray, ...keys:any) => {
  return () => {
    const result = [strings[0]]

    keys.forEach((key:any, ith:number) => {
      const evalled = typeof key === 'function'
        ? key()
        : key
      result.push(evalled, strings[ith + 1])
    })

    return result
  }
}
