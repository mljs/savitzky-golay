'use strict';

var SG = require('..');

describe('Savitzky–Golay test', function () {

    it('Smoothing', function () {
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

    it('First derivative', function () {
        var options = {
            windowSize: 5,
            derivative: 1,
            polynomial: 2,
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

    it('Second derivative', function () {
        var options = {
            windowSize: 5,
            derivative: 2,
            polynomial: 2,
            pad: 'pre',
            padValue: 0
        };
        var data = new Array(200);
        for (var i = 0; i < data.length; i++)
            data[i] = Math.sin(i);
        var ans = SG(data, 1, options);
        for (var j = 2; j < ans.length - 2; j++)
            ans[j].should.be.approximately(-Math.sin(j), 0.05);
        ans[0].should.equal(0);
    });

    it('Range errors', function () {
        const data = new Array(200);
        SG.bind(null, data, 1, {windowSize: 4}).should.throw('Invalid window size (should be odd and at least 5 integer number)');
        SG.bind(null, data, 1, {windowSize: 1}).should.throw('Invalid window size (should be odd and at least 5 integer number)');
        SG.bind(null, data, 1, {windowSize: 5.4}).should.throw('Invalid window size (should be odd and at least 5 integer number)');
        SG.bind(null, data, 1, {derivative: -3}).should.throw('Derivative should be a positive integer');
        SG.bind(null, data, 1, {derivative: 5.4}).should.throw('Derivative should be a positive integer');
        SG.bind(null, data, 1, {polynomial: 0}).should.throw('Polynomial should be a positive integer');
        SG.bind(null, data, 1, {polynomial: 3.5}).should.throw('Polynomial should be a positive integer');
    });
});
