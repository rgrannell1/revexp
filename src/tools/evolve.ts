
/**
 * Return a slightly modifier string.
 *
 * @param str
 *
 */
export const mutateString = (str: string) => {
  if (!str || str.length === 0) {
    return str
  }

  let message = ''
  const idx = Math.floor(Math.random() * str.length)

  for (let ith = 0; ith < str.length; ++ith) {
    if (ith === idx) {
      continue
    }
    message += str[ith]
  }

  return message
}

export interface EvolveOpts {
  test: Function
  str: string
  until: Function
}

/**
 * Find a mutant that satisfies a test.
 *
 * @param param0
 */
const evolve = ({ test, str, until }: EvolveOpts) => {
  const startTime = Date.now()

  const state = {
    count: 0
  }

  while (true) {
    state.count++
    try {
      const mutant = mutateString(str)

      test(mutant)

      return {
        invalid: str,
        valid: mutant
      }
    } catch (err) {

    }

    if (until(state.count, startTime)) {
      throw new Error(`could not find healthy mutant in ${Date.now() - startTime} ms.`)
    }
  }
}

export default evolve