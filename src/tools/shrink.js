
const handleError = ({all, state, candidates}) => {
  const minCandidate = candidates.reduce((min, current) => {
    return current.length < min.length
      ? current
      : min
  })

  if (state.min === null || minCandidate.length < state.min.length) {
    state.min = minCandidate
  }

  if (all) {
    state.sequence.push(minCandidate)
  }
}

const shrink = ({ test, gen, all, until }) => {
  const startTime = Date.now()
  const state = {
    count: 0,
    min: null,
    sequence: []
  }

  while (true) {
    state.count++

    const newGen = gen()

    try {
      test(newGen)
    } catch (err) {
      handleError({
        state,
        all,
        candidates: [ newGen ]
      })
    }

    if (until(state.count, startTime)) {
      return all
        ? state.sequence
        : state.min
    }

    if (state.count % 1000 === 0) {
      console.log(`[count=${state.count}, len=${state.min?.length}]`)
    }
  }
}

shrink.until = {}

shrink.until.count = target => count => {
  return count >= target
}

shrink.until.timeElapsed = target => (count, start) => {
  return Date.now() >= (start + target)
}

module.exports = shrink
