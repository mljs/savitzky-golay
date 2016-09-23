'use strict';

var SG = require('..');

describe('Savitzky–Golay test', function () {

    it('Smoothing test', function () {
        var options = {
            windowSize: 5,
            derivative: 0,
            polynomial: 3
        };
        var data = new Array(200);
        for (var i = 0; i < data.length; i++)
            data[i] = Math.sin(i);
        var ans = SG(data, 1, options);
        ans.should.have.lengthOf(196);

        for (var j = 0; j < ans.length; j++)
            ans[j].should.be.approximately(data[j + 2], 0.08);
    });

    it('First derivative test', function () {
        var options = {
            windowSize: 5,
            derivative: 1,
            polynomial: 3,
            pad: 'post',
            padValue: 0
        };
        var data = new Array(200);
        for (var i = 0; i < data.length; i++)
            data[i] = Math.sin(i);
        var ans = SG(data, 1, options);
        for (var j = 2; j < ans.length - 2; j++)
            ans[j].should.be.approximately(Math.cos(j), 0.05);
        ans[0].should.equal(0);
    });
});
