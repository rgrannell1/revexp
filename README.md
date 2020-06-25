
# revexp [![Build Status](https://travis-ci.org/rgrannell1/revexp.svg?branch=master)](https://travis-ci.org/rgrannell1/revexp)

Reverse regular-expression generator.

## Documentation

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

### License

The MIT License

Copyright (c) 2020 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
