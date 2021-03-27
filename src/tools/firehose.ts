
const firehose = function* (gen: () => string, ms: number) {
  const start = Date.now()

  while (Date.now() - start < ms) {
    yield gen()
  }
}

export default firehose
