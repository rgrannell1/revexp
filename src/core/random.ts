
export const oneOf = <I>(elems:I[]) => {
  if (!elems || elems.length === 0) {
    throw new Error('no elements provided; cannot choose between options.')
  } else {
    const idx = Math.floor(Math.random() * elems.length)
    return elems[idx]
  }
}

export const range = (from: number, to: number): number => {
  return Math.floor(Math.random() * (to - from)) + from
}

interface SampleOpts {
  ranges: number[][]
}

export const sample = (ranges:number[][]) => {
  const ith = Math.floor(Math.random() * ranges.length)

  let [lower, upper] = ranges[ith]
  if (typeof upper === 'undefined') {
    upper = lower + 1
  }

  return String.fromCharCode(range(lower, upper))
}

export const coinFlip = () => {
  return Math.random() >= 0.5
}
