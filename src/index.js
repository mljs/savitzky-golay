import { Matrix, MatrixTransposeView, inverse } from 'ml-matrix';
import padArray from 'ml-pad-array';

/**
 * Factorial of a number
 * @ignore
 * @param n
 * @return {number}
 */
function factorial(n) {
  let r = 1;
  while (n > 0) r *= n--;
  return r;
}

const defaultOptions = {
  windowSize: 5,
  derivative: 1,
  polynomial: 2,
  pad: 'none',
  padValue: 'replicate',
};

/**
 * Savitzky-Golay filter
 * @param {Array <number>} data
 * @param {number} h
 * @param {Object} options
 * @returns {Array}
 */
export default function savitzkyGolay(data, h, options) {
  options = Object.assign({}, defaultOptions, options);
  if (
    options.windowSize % 2 === 0 ||
    options.windowSize < 5 ||
    !Number.isInteger(options.windowSize)
  ) {
    throw new RangeError(
      'Invalid window size (should be odd and at least 5 integer number)',
    );
  }
  if (options.derivative < 0 || !Number.isInteger(options.derivative)) {
    throw new RangeError('Derivative should be a positive integer');
  }
  if (options.polynomial < 1 || !Number.isInteger(options.polynomial)) {
    throw new RangeError('Polynomial should be a positive integer');
  }

  let C, norm;
  let step = Math.floor(options.windowSize / 2);

  if (options.pad === 'pre') {
    data = padArray(data, { size: step, value: options.padValue });
  }

  let ans = new Array(data.length - 2 * step);

  if (
    options.windowSize === 5 &&
    options.polynomial === 2 &&
    (options.derivative === 1 || options.derivative === 2)
  ) {
    if (options.derivative === 1) {
      C = [-2, -1, 0, 1, 2];
      norm = 10;
    } else {
      C = [2, -1, -2, -1, 2];
      norm = 7;
    }
  } else {
    let J = Matrix.ones(options.windowSize, options.polynomial + 1);
    let inic = -(options.windowSize - 1) / 2;
    for (let i = 0; i < J.rows; i++) {
      for (let j = 0; j < J.columns; j++) {
        if (inic + 1 !== 0 || j !== 0) J.set(i, j, Math.pow(inic + i, j));
      }
    }
    let Jtranspose = new MatrixTransposeView(J);
    let Jinv = inverse(Jtranspose.mmul(J));
    C = Jinv.mmul(Jtranspose);
    C = C.getRow(options.derivative);
    norm = 1 / factorial(options.derivative);
  }
  let det = norm * Math.pow(h, options.derivative);
  for (let k = step; k < data.length - step; k++) {
    let d = 0;
    for (let l = 0; l < C.length; l++) d += (C[l] * data[l + k - step]) / det;
    ans[k - step] = d;
  }

  if (options.pad === 'post') {
    ans = padArray(ans, { size: step, value: options.padValue });
  }

  return ans;
}
