# savitzky-golay

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

Savitzky–Golay filter in Javascript

This code is based on the article: [Smoothing and Differentiation of Data by Simplified Least Squares Procedures](http://dx.doi.org/10.1021/ac60214a047)

## Installation

`npm install ml-savitzky-golay`

## SavitzkyGolay(data, h, [options])

Uses the Savitzky-Golay filter based in the array of `y` values(`data`) and the difference between `x` dots(`h`).

__Options__
* __windowSize__: The amount of dots used to make the filtering evaluation, the default value is 5.
* __derivative__: The grade for the derivative, the default value is 1.
* __polynomial__: The grade of the polynomial function to use for calculation, the default value is 2.
* __pad__: How to pad the array to handle borders. Can be one of:
  * `'none'` (default): No padding. The resulting array will be smaller than the original one.
  * `'pre'`: Pad the original array before applying the filter
  * `'post'`: Pad the resulting array after applying the filter
* __padValue__: If pad is not none, Determine how to fill the values, if the value don't match with the next strings, the new values are going to be filled with that value.
The default value is 0. The special strings are:
  * `'circular'`: Pad with circular repetition of elements within the dimension.
  * `'replicate'`: Pad by repeating border elements of array.
  * `'symmetric'`: Pad array with mirror reflections of itself.

## Examples
### Smoothing
```js
var SG = require('ml-savitzky-golay');
var data = [/* ... */];
var options = {derivative: 0};
var ans = SG(data, 1, options);
console.log(ans); // smoothed data
```

### First derivative with padding
```js
var SG = require('ml-savitzky-golay');
var X = [/* ... */];
var options = {
  derivative: 1,
  pad: 'post',
  padValue: 'replicate'
};
var dX = SG(X, 1, options);
console.log(dX); // first derivative
```

## Contributors

* [Miguel Asencio](https://github.com/maasencioh)
* [Michaël Zasso](https://github.com/targos)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-savitzky-golay.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-savitzky-golay
[travis-image]: https://img.shields.io/travis/mljs/savitzky-golay/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/savitzky-golay
[david-image]: https://img.shields.io/david/mljs/savitzky-golay.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/savitzky-golay
[download-image]: https://img.shields.io/npm/dm/ml-savitzky-golay.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-savitzky-golay
