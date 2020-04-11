import savitzkyGolay from '../src';

describe('Savitzky–Golay test', function() {
  it('Smoothing test', function() {
    let options = {
      windowSize: 5,
      derivative: 0,
      polynomial: 3,
    };
    let data = new Array(200);
    for (let i = 0; i < data.length; i++) data[i] = Math.sin(i);
    let ans = savitzkyGolay(data, 1, options);
    expect(ans).toHaveLength(196);
    for (let j = 0; j < ans.length; j++) {
      expect(ans[j]).toBeCloseTo(data[j + 2], 0.5);
    }
  });

  it('First derivative test', function() {
    let options = {
      windowSize: 5,
      derivative: 1,
      polynomial: 3,
      pad: 'post',
      padValue: 0,
    };
    let data = new Array(200);
    for (let i = 0; i < data.length; i++) data[i] = Math.sin(i);
    let ans = savitzkyGolay(data, 1, options);
    for (let j = 2; j < ans.length - 2; j++) {
      expect(ans[j]).toBeCloseTo(Math.cos(j), 1);
    }
    expect(ans[0]).toBe(0);
  });

  it('Second derivative test', function() {
    let options = {
      windowSize: 7,
      derivative: 2,
      polynomial: 3,
    };
    let data = new Array(100);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.pow(i, 3) - 2 * Math.pow(i, 2);
    }
    let ans = savitzkyGolay(data, 1, options);
    expect(ans).toHaveLength(94);
    for (let j = 0; j < ans.length; j++) {
      expect(ans[j]).toBeCloseTo(6 * (j + 3) - 4, 2);
    }
  });
});
