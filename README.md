# savitzky-golay

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Savitzky–Golay filter in Javascript.

This code is based on the article: [Smoothing and Differentiation of Data by Simplified Least Squares Procedures](http://dx.doi.org/10.1021/ac60214a047)

## Installation

`$ npm i ml-savitzky-golay`

## SavitzkyGolay(data, h, [options])

Uses the Savitzky-Golay filter based in the array of `y` values(`data`) and the difference between `x` dots(`h`).

**Options**:

- **windowSize**: The amount of dots used to make the filtering evaluation, the default value is 5.
- **derivative**: The grade for the derivative, the default value is 1.
- **polynomial**: The grade of the polynomial function to use for calculation, the default value is 2.
- **pad**: How to pad the array to handle borders. Can be one of:
  - `'none'` (default): No padding. The resulting array will be smaller than the original one.
  - `'pre'`: Pad the original array before applying the filter
  - `'post'`: Pad the resulting array after applying the filter
- **padValue**: If pad is not none, Determine how to fill the values, if the value don't match with the next strings, the new values are going to be filled with that value.
  The default value is 0. The special strings are:
  - `'circular'`: Pad with circular repetition of elements within the dimension.
  - `'replicate'`: Pad by repeating border elements of array.
  - `'symmetric'`: Pad array with mirror reflections of itself.

## Examples

### Smoothing

```js
const savitzkyGolay = require('ml-savitzky-golay');
let data = [
  /* ... */
];
let options = { derivative: 0 };
let ans = savitzkyGolay(data, 1, options);
console.log(ans); // smoothed data
```

or

```js
import savitzkyGolay from 'ml-savitzky-golay';

let data = [
  /* ... */
];
let options = { derivative: 0 };
let ans = savitzkyGolay(data, 1, options);
```

### First derivative with padding

```js
var SG = require('ml-savitzky-golay');
var X = [
  /* ... */
];
var options = {
  derivative: 1,
  pad: 'post',
  padValue: 'replicate',
};
var dX = SG(X, 1, options);
console.log(dX); // first derivative
```

## [API Documentation](https://mljs.github.io/savitzky-golay/modules.html)

## Contributors

- [Miguel Asencio](https://github.com/maasencioh)
- [Michaël Zasso](https://github.com/targos)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-savitzky-golay.svg
[npm-url]: https://www.npmjs.com/package/ml-savitzky-golay
[ci-image]: https://github.com/mljs/savitzky-golay/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/mljs/savitzky-golay/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/savitzky-golay.svg
[codecov-url]: https://codecov.io/gh/mljs/savitzky-golay
[download-image]: https://img.shields.io/npm/dm/ml-savitzky-golay.svg
[download-url]: https://www.npmjs.com/package/ml-savitzky-golay
