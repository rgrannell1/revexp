
const firehose = function * (seconds:number) {
  const start = Date.now()

  while (Date.now() - start > seconds) {
    yield start
  }
}

export default firehose
