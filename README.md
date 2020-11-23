
# revexp ![CI](https://github.com/rgrannell1/revexp/workflows/CI/badge.svg)

Reverse regular-expression generator.

### Stability Index

1, Experimental - This project might die, it's undertested and underdocumented, and redesigns and breaking changes are likely

### Files

```
src/
  core/                     core revexp api.
    commons/
      constants.ts
      types.ts
    character-classes.ts
    characters.ts
    logic.ts
    quantifers.ts
    random.ts

  json/
    builder.ts
    spec.ts                  json specification in terms of generator objects
    types.ts

  tools/
    evolve.ts
    index.ts
    shrink.ts
```

### Generators

Generators are the building-blocks for reverse regular-expressions. A generator:

- takes configuration options
- generates a random string

Combining generators allow complex data-structures to be created, like emails, phone-numbers, or structured syntax like JSON.

#### `characters/any`

The `any` generator generates all characters.

```js
{
  any: {}
}
```

#### `characters/digit`

Generate the arabic digits `0...9`.

Options:
- `zero`: should the digit zero be printed? [optional, default: true]

```js
{
  digit: {
    zero: false
  }
}
```

#### `characters/wordChar`

Return an ASCII word-character.

```js
{
  wordChar: {}
}
```

#### `characters/spaces`

Return an ASCII or Unicode space-character

Options:
- `unicode`: should Unicode space-characters such as the non-empty Ogham space-character `U+1680` be included? [optional, default: false]

```js
{
  wordChar: {
    unicode: true
  }
}
```

#### `classes/oneOf`

Choose a random generator from a provided list.

Options:
- `elements`: a sequence of valid generator objects [mandatory]

```js
{
  oneof: [
    {
      range: [[0, 100]]
    }
  ]
}
```

#### `classes/notOnOf`

Generate all characters _not_ in a provided list of single-letter characters.

```js
{
  notOneOf: [
    "a",
    "b",
    "1"
  ]
}
```

#### `classes/range`

Generate all characters in a character-point range.

```js
{
  range: [
    [0, 100],
    [300, 400]
  ]
}
```

#### `logic/every`

Combine a sequence of generators, yielding a concatenated string.

```js
{
  every: [
    { digit: { zero: false } },
    { digit: {} }
  ]
}
```

#### `quantifiers/repeat`

Repeat a generator a set number of times. Note that many generators will
yield different results each time they are called, so this will not necessarily
create a string of repeated characters.

Options:
- `value`: the generator to repeat
- `min`: the minimum number of items to return from the generator [mandatory]
- `max`: the maximum number of items to return from the generator [optional, default: 256]

```js
{
  repeat: {
    value: { digit: {} },
    min: 0,
    max: 256
  }
}
```

#### `quantifiers/optional`

Return either the generator, or an empty string. A shorthand for calling `repeat` with `min=0`, `max=1`.

```js
{
  optional: { digit: {} }
}
```

---

### License

The MIT License

Copyright (c) 2020 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
