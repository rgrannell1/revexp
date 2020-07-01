
mutateString = str => {
  if (!str) {
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

const mutate = ({test, str, until}) => {
  const startTime = Date.now()

  const state = {
    count: 0
  }

  while (true) {
    state.count++
    try {
      mutant = mutateString(str)

      test(mutant)

      return {
        invalid: str,
        valid: mutant
      }
    } catch (err) {

    }

    if (until(state.count, startTime)) {
      throw new Error(`count not find healthy mutant in ${Date.now() - startTime} ms.`)
    }
  }
}



module.exports = mutate