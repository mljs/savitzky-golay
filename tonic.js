'use strict';

var SG = require('ml-savitzky-golay');

// First derivative with replication padding
var options = {
    derivative: 1,
    pad: 'post',
    padValue: 'replicate'
};

// data example (sin function)
var data = new Array(200);
for (var i = 0; i < data.length; i++)
    data[i] = Math.sin(i);

// answer (cos function)
var ans = SG(data, 1, options);
console.log(ans);
