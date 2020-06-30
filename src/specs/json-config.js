
const spec = {}

spec.string = {
  every: [
    '"',
    {
      repeat: {
        value: {
          notOneOf: ['\\', '\"', '\/', '\b', '\f', '\n', '\r', '\t']
        },
        from: 0,
        to: 256
      }
    },
    '"'
  ]
}

spec.whitespace = {
  oneOf: ['\s', '\n', '\r\n', '\t']
}

spec.number = {
  every: [
    {
      digit: { zero: false }
    },
    {
      repeat: {
        value: { digit: {} },
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
    }
  ]
}

spec.exponent = {
  every: [
    ...spec.number.every,
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
    {
      optional: {
        every: [
          {
            ref: 'value'
          },
          {
            repeat: {
              value: {
                every: [
                  ', ',
                  {
                    ref: 'value'
                  }
                ]
              },
              from: 0,
              to: 3
            }
          }
        ]
      }
    },
    ']'
  ]
}

spec.property = {
  ref: 'string'
}

spec.object = {
  every: [
    '{',
    {
      optional: {
        every: [
          {
            ref: 'property'
          },
          ': ',
          {
            ref: 'value'
          },
          {
            repeat: {
              value: {
                every: [
                  ', ',
                  {
                    ref: 'property'
                  },
                  ': ',
                  {
                    ref: 'value'
                  },
                ]
              },
              from: 0,
              to: 3
            }
          }
        ]
      }
    },
    '}'
  ]
}

spec.value = {
  oneOf: [
    {
      ref: 'object'
    },
    {
      ref: 'string'
    },
    {
      ref: 'number'
    },
    {
      ref: 'array'
    },
    'true',
    'false',
    'null'
  ]
}

module.exports = spec
