"use strict";

var SG = require('..');

describe('Savitzky–Golay test', function () {

    it('Smoothing test', function () {
        var options = {
            windSize: 5,
            deriv: 0,
            pol: 3
        };
        var data = new Array(200);
        for (var i = 0; i < data.length; i++)
            data[i] = Math.sin(i);
        var model = new SG(data,1);
        var ans = model.calc(options);
        for (var j = 4; j < ans.length - 4; j++)
            ans[j].should.be.approximately(data[j], 0.08);
    });

    it('First derivative test', function () {
        var options = {
            windSize: 5,
            deriv: 1,
            pol: 3
        };
        var data = new Array(200);
        for (var i = 0; i < data.length; i++)
            data[i] = Math.sin(i);
        var model = new SG(data,1);
        var ans = model.calc(options);
        for (var j = 4; j < ans.length - 4; j++)
            ans[j].should.be.approximately(Math.cos(j), 0.05);
    });
});