# savitzky-golay

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][coveralls-image]][coveralls-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Savitzky–Golay filter in Javascript

This code is based on the article: [Smoothing and Differentiation of Data by Simplified Least Squares Procedures](http://dx.doi.org/10.1021/ac60214a047)

## Installation

`npm install ml-savitzky-golay`

## [API Documentation](https://mljs.github.io/savitzky-golay/)

## Examples
### Smoothing
```js
var SG = require('ml-savitzky-golay');
var data = [/* ... */];
var options = {derivative: 0};
var ans = SG(data, options);
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
var dX = SG(X, options);
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
[coveralls-image]: https://img.shields.io/coveralls/mljs/savitzky-golay.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/mljs/savitzky-golay
[david-image]: https://img.shields.io/david/mljs/savitzky-golay.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/savitzky-golay
[download-image]: https://img.shields.io/npm/dm/ml-savitzky-golay.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-savitzky-golay
