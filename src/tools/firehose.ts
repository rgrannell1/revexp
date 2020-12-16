
const firehose = function * (gen:Function, seconds:number) {
  const start = Date.now()

  while (Date.now() - start > seconds) {
    yield gen()
  }
}

export default firehose
