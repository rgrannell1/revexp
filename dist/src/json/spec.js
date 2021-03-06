const constraints = {
    MAX_STRING_LENGTH: 256,
    MAX_WHOLE_PART_LENGTH: 10,
    MAX_DECIMAL_PART: 10,
    MAX_ARRAY_LENGTH: 10,
    MAX_OBJECT_PROPERTIES: 10
};
// hacky fix
const hexes = [
    '\x00',
    '\x01',
    '\x02',
    '\x03',
    '\x04',
    '\x05',
    '\x06',
    '\x07',
    '\x08',
    '\x09',
    '\x0A',
    '\x0B',
    '\x0C',
    '\x0D',
    '\x0E',
    '\x0F',
    '\x10',
    '\x11',
    '\x12',
    '\x13',
    '\x14',
    '\x15',
    '\x16',
    '\x17',
    '\x18',
    '\x19',
    '\x1A',
    '\x1B',
    '\x1C',
    '\x1D',
    '\x1E',
    '\x1F'
];
export const string = {
    every: [
        '"',
        {
            repeat: {
                value: {
                    notOneOf: ['\\', '"', '/', '\b', '\f', '\n', '\r', '\t', ...hexes]
                },
                from: 0,
                to: constraints.MAX_STRING_LENGTH
            }
        },
        '"'
    ]
};
export const whitespace = {
    oneOf: [' ', '\n', '\r\n', '\t']
};
export const number = {
    every: [
        {
            digit: { zero: false }
        },
        {
            repeat: {
                value: { digit: {} },
                from: 0,
                to: constraints.MAX_WHOLE_PART_LENGTH
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
                            to: constraints.MAX_DECIMAL_PART
                        }
                    }
                ]
            }
        }
    ]
};
export const exponent = {
    every: [
        ...number.every,
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
};
export const array = {
    every: [
        '[',
        {
            optional: {
                every: [
                    { ref: 'value' },
                    {
                        repeat: {
                            value: {
                                every: [
                                    ', ',
                                    { ref: 'value' }
                                ]
                            },
                            from: 0,
                            to: constraints.MAX_ARRAY_LENGTH
                        }
                    }
                ]
            }
        },
        ']'
    ]
};
export const property = {
    ref: 'string'
};
export const object = {
    every: [
        '{',
        {
            optional: {
                every: [
                    { ref: 'property' },
                    ': ',
                    { ref: 'value' },
                    {
                        repeat: {
                            value: {
                                every: [
                                    ', ',
                                    { ref: 'property' },
                                    ': ',
                                    { ref: 'value' }
                                ]
                            },
                            from: 0,
                            to: constraints.MAX_OBJECT_PROPERTIES
                        }
                    }
                ]
            }
        },
        '}'
    ]
};
export const value = {
    oneOf: [
        { ref: 'object' },
        { ref: 'string' },
        { ref: 'number' },
        { ref: 'array' },
        'true',
        'false',
        'null'
    ]
};
