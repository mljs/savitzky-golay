'use strict';

const Matrix = require('ml-matrix');
const padArray = require('ml-pad-array');

/**
 * Factorial of a number
 * @ignore
 * @param n
 * @return {number}
 */
function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

const defaultOptions = {
    windowSize: 5,
    derivative: 1,
    polynomial: 2,
    pad: 'none',
    padValue: 'replicate'
};

/**
 * Savitzky-Golay filter
 * @param {Array<Number>} y - Array of `y` data
 * @param {Number} h - Difference between the `x` dots
 * @param {Object} [options] - Options object
 * @param {Number} [options.windowSize = 5] - Amount of dots used to make the filtering evaluation
 * @param {Number} [options.derivative = 1] - Grade of the derivative
 * @param {Number} [options.polynomial = 2] - Grade of the polynomial function to use for calculation
 * @param {String} [options.pad = 'none'] - How to pad the array to handle borders. Can be one of:
 *  * `'none'`: No padding. The resulting array will be smaller than the original one.
 *  * `'pre'`: Pad the original array before applying the filter.
 *  * `'post'`: Pad the resulting array after applying the filter.
 * @param {String} [options.padValue = 'replicate'] - If pad is not none, determine how to fill the values, if the value
 * don't match with the next strings, the new values are going to be filled with that value.The special strings are:
 *  * `'circular'`: Pad with circular repetition of elements within the dimension.
 *  * `'replicate'`: Pad by repeating border elements of array.
 *  * `'symmetric'`: Pad array with mirror reflections of itself.
 * @return {Array<Number>} - Filtered data
 */
function savitzkyGolay(y, h, options) {
    options = Object.assign({}, defaultOptions, options);
    if ((options.windowSize % 2 === 0) || (options.windowSize < 5) || !(Number.isInteger(options.windowSize))) {
        throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
    }
    if ((options.derivative < 0) || !(Number.isInteger(options.derivative))) {
        throw new RangeError('Derivative should be a positive integer');
    }
    if ((options.polynomial < 1) || !(Number.isInteger(options.polynomial))) {
        throw new RangeError('Polynomial should be a positive integer');
    }

    const step = (options.windowSize - 1) / 2;
    if (options.pad === 'pre') {
        y = padArray(y, {size: step, value: options.padValue});
    }

    let ans =  new Array(y.length - 2 * step);
    let convolutionCoefficients, divisor;

    if ((options.windowSize === 5) && (options.polynomial === 2) && ((options.derivative === 1) || (options.derivative === 2))) {
        // precalculated values
        // https://en.wikipedia.org/wiki/Savitzky%E2%80%93Golay_filter#Tables_of_selected_convolution_coefficients
        if (options.derivative === 1) {
            convolutionCoefficients = [-2, -1, 0, 1, 2];
            divisor = 10;
        } else {
            convolutionCoefficients = [2, -1, -2, -1, 2];
            divisor = 7;
        }
    } else {
        // change of variable
        let z = new Array(options.windowSize);
        for (let i = 0; i < options.windowSize; ++i) {
            z[i] = i - step;
        }

        // Jacobian
        let jacobian = new Array(options.windowSize);
        for (let row = 0; row < options.windowSize; ++row) {
            jacobian[row] = new Array(options.polynomial + 1);
            for (let column = 0; column < options.polynomial + 1; ++column) {
                jacobian[row][column] = Math.pow(z[row], column);
            }
        }
        jacobian = new Matrix(jacobian);

        // convolution coefficients
        let transposeJacobian = jacobian.transposeView();
        let inverseMul = (transposeJacobian.mmul(jacobian)).inverse();
        convolutionCoefficients = inverseMul.mmul(transposeJacobian);

        // get the correspondent derivative coefficients
        convolutionCoefficients = convolutionCoefficients.getRow(options.derivative);
        divisor = 1;
    }

    // When calculating the nth. derivative an additional scaling factor of n!/h^n
    if (options.derivative > 0) {
        divisor *= Math.pow(h, options.derivative) / factorial(options.derivative);
    }

    // convolution with the coefficients
    for (let index = 0; index < ans.length; ++index) {
        ans[index] = 0;
        for (let i = 0; i < options.windowSize; ++i) {
            ans[index] += convolutionCoefficients[i] * y[index + i];
        }
        ans[index] /= divisor;
    }

    if (options.pad === 'post') {
        ans = padArray(ans, {size: step, value: options.padValue});
    }

    return ans;
}

module.exports = savitzkyGolay;
