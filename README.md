
# revexp ![CI](https://github.com/rgrannell1/revexp/workflows/CI/badge.svg)

Create endless random strings that match a pattern.

### Usage

Revexp can be called in two ways:

- using a short builder-pattern series of functions
- using a JSON-based specification documented below

### Stability Index

1, Experimental - This project might die, it's undertested and underdocumented, and redesigns and breaking changes are likely

### Files

```
src/
  core/                     core revexp api.
    commons/
      constants.ts           library constants
      types.ts               library types
    character-classes.ts     create character groupings.
    characters.ts            character generators.
    logic.ts                 and / or operations for generators.
    quantifers.ts            create multiple instances of a generator.
    random.ts                random utilities.
    builder.ts               creates a revexp from JSON configuration.

  json/
    spec.ts                  json specification in terms of generator objects

  tools/
    evolve.ts                try to turn an invalid revexp into a valid one. Used to identify problematic areas of the input.
    index.ts
    shrink.ts                find a minimal failing revexp string.
```

<<<<<<< HEAD
### Concept

Generators are the building-blocks for reverse regular-expressions. A generator:

- takes configuration options
- generates a random string

Combining generators allow complex data-structures to be created, like emails, phone-numbers, or structured syntax like JSON. A simple example is:

```ts
const numberBlock = R.repeat(R.digit, { from: 4, to: 4 })
const space = () => ' '
const visaGen = R.and([numberBlock, space, numberBlock, space, numberBlock, space, numberBlock])

visaGen()
```

=======
>>>>>>> 01e7190973c8c214fb7b2900380ee8d4561af441
### Method-Based Generators

```ts
const { parts: R } = revexp
```

#### `R.oneOf`
```
R.oneOf([ R.digit, R.nonZeroDigit ])
```

#### `R.notOneOf`
```ts
R.notOneOf([ 'a', 'b', '1' ])
```

#### `R.range`
```ts
R.range([[0, 100]])
```

#### `R.any`
```ts
R.any()
```

#### `R.digit`
```ts
R.digit()
```

#### `R.nonZeroDigit`
```ts
R.nonZeroDigit()
```

#### `R.space`
```ts
R.space()
```

#### `R.literal`
```ts
R.literal('a')
```

#### `R.nonLineBreak`
```ts
R.nonLineBreak()
```

#### `R.regexp`
```ts
R.regexp(/Mon|Tue/i)
```

#### `R.and`
```ts
R.and([ R.nonZeroDigit, '-', R.digit ])
```

#### `R.or`
```ts
R.or([ R.digit(), R.character() ])
```

### JSON-Based Generators

```ts
const integerGen = revexp.builder({
  repeat: {
    value: { digit: {} },
    min: 0,
    max: 10
  }
})

integerGen()
```

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
