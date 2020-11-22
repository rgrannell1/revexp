
const mutateString = (str:string) => {
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

interface MutateOpts {
  test: Function
  str: string
  until: Function
}

const mutate = ({ test, str, until}: MutateOpts) => {
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

mutate.string = mutateString

export default mutate
