
interface State {
  min?: any
  max?: any
  count?: number
  sequence: any[]
}

interface HandleErrorOpts {
  all: Boolean
  state: State
  candidates: any
}

const handleError = ({ all, state, candidates }: HandleErrorOpts) => {
  const minCandidate = candidates.reduce((min: any, current: any) => {
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

interface ShrinkOpts {
  test: Function
  gen: Function
  all: Boolean
  until: Function
}

const shrink = ({ test, gen, all, until }: ShrinkOpts) => {
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
        candidates: [newGen]
      })
    }

    if (until(state.count, startTime)) {
      return all
        ? state.sequence
        : state.min
    }
  }
}

shrink.until = {
  count: (target: number) => (count: number) => {
    return count >= target
  },
  timeElapsed: (target: number) => (count: number, start: number) => {
    return Date.now() >= (start + target)
  }
}

export default shrink
