
export const ranges = {
  // -- get your game on.
  ALL_CHARS: [0x000, 0x10ffff],
  DIGITS: [48, 57],
  NONZERO_DIGITS: [49, 57]
}

export const rangeSets = {
  SPACES: [
    [0x0020],
    [0x00A0],
    [0x1680],
    [0x180E],
    [0x2000],
    [0x2009, 0x200B],
    [0x202F],
    [0x205F],
    [0x3000],
    [0xFEFF]
  ],
  WORD_CHAR: [
    [65, 90],
    [97, 122]
  ]
}

export const codes = {
  INVALID_GENERATOR: 'RE_001',
  INVALID_CONFIG: 'RE_002'
}
