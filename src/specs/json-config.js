
const spec = {}

spec.value = {
  oneOf: [
    spec.string,
    spec.number,
    spec.array,
    'true',
    'false',
    'null'
  ]
}

spec.whitespace = {
  oneOf: ['\s', '\n', '\r\n', '\t']
}

spec.exponent = {
  every: [
    {
      digit: { zero: false }
    },
    {
      repeat: {
        value: { digit: {  } },
        from: 0,
        to: 10
      }
    },
    {
      optional: {
        every: [
          '.',
          {
            repeat: {
              value: { digit: {} },
              from: 1,
              to: 10
            }
          }
        ]
      }
    },
    {
      oneOf: ['e', 'E']
    },
    {
      repeat: {
        value: { digit: {} },
        from: 1,
        to: 2
      }
    }
  ]
}

spec.array = {
  every: [
    '[',
    spec.value,
    ']'
  ]
}

module.exports = spec
