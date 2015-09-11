'use strict';

var isInteger = require('is-integer');
var Matrix = require('ml-matrix');
var padArray = require('ml-pad-array');

var defaultOptions = {
    windowSize: 5,
    derivative: 1,
    polynomial: 2,
    padValue: 0
};

/**
 * Savitzky-Golay filter
 * @param {Array <number>} data
 * @param {number} h
 * @param {Object} options
 * @returns {Array}
 */
function SavitzkyGolay (data, h, options) {
    options = options || {};
    for (var o in defaultOptions)
        if (!(options.hasOwnProperty(o)))
            options[o] = defaultOptions[o];
    if ((options.windowSize % 2 === 0) || (options.windowSize < 5) || !(isInteger(options.windowSize)))
        throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
    if ((options.derivative < 0) || !(isInteger(options.derivative)))
        throw new RangeError('Derivative should be a positive integer');
    if ((options.polynomial < 1) || !(isInteger(options.polynomial)))
        throw new RangeError('Polynomial should be a positive integer');

    var C, norm;
    var step = Math.floor(options.windowSize / 2);
    var ans =  new Array(data.length - 2*step);
    if ((options.windowSize === 5) && (options.polynomial === 2) && ((options.derivative === 1) || (options.derivative === 2))) {
        if (options.derivative === 1) {
            C = [-2,-1,0,1,2];
            norm = 10;
        }
        else {
            C = [2, -1, -2, -1, 2];
            norm = 7;
        }
    }
    else {
        var J = Matrix.ones(options.windowSize, options.polynomial + 1);
        var inic = -(options.windowSize - 1) / 2;
        for (var i = 0; i < J.length; i++) {
            for (var j = 0; j < J[i].length; j++) {
                if ((inic + 1 !== 0) || (j !== 0))
                    J[i][j] = Math.pow((inic + i), j);
            }
        }
        var Jtranspose = J.transpose();
        var Jinv = (Jtranspose.mmul(J)).inverse();
        C = Jinv.mmul(Jtranspose);
        C = C[options.derivative];
        norm = 1;
    }
    var det = norm * Math.pow(h, options.derivative);
    for (var k = step; k < (data.length - step); k++) {
        var d = 0;
        for (var l = 0; l < C.length; l++)
            d += C[l] * data[l + k - step] / det;
        ans[k - step] = d;
    }
    return padArray(ans, {size: step, value: options.padValue});
}

module.exports = SavitzkyGolay;
