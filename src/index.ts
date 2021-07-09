import { Matrix, MatrixTransposeView, inverse } from 'ml-matrix';
import padArray from 'ml-pad-array';

function factorial(n: number): number {
  let r = 1;
  while (n > 0) r *= n--;
  return r;
}

export interface Options {
  windowSize: number;
  derivative: number;
  polynomial: number;
  pad: 'none' | 'pre' | 'post';
  padValue: 'replicate' | 'circular' | 'symmetric' | number;
}

export default function savitzkyGolay(
  data: Array<number>,
  h: number,
  options: Partial<Options> = {},
): Array<number> {
  const {
    windowSize = 5,
    derivative = 1,
    polynomial = 2,
    pad = 'none',
    padValue = 'replicate',
  } = options;
  if (windowSize % 2 === 0 || windowSize < 5 || !Number.isInteger(windowSize)) {
    throw new RangeError(
      'Invalid window size (should be odd and at least 5 integer number)',
    );
  }
  if (derivative < 0 || !Number.isInteger(derivative)) {
    throw new RangeError('Derivative should be a positive integer');
  }
  if (polynomial < 1 || !Number.isInteger(polynomial)) {
    throw new RangeError('Polynomial should be a positive integer');
  }

  let C, norm;
  let step = Math.floor(windowSize / 2);

  if (pad === 'pre') {
    data = padArray(data, { size: step, value: padValue });
  }

  let ans = new Array(data.length - 2 * step);

  if (
    windowSize === 5 &&
    polynomial === 2 &&
    (derivative === 1 || derivative === 2)
  ) {
    if (derivative === 1) {
      C = [-2, -1, 0, 1, 2];
      norm = 10;
    } else {
      C = [2, -1, -2, -1, 2];
      norm = 7;
    }
  } else {
    let J = Matrix.ones(windowSize, polynomial + 1);
    let inic = -(windowSize - 1) / 2;
    for (let i = 0; i < J.rows; i++) {
      for (let j = 0; j < J.columns; j++) {
        if (inic + 1 !== 0 || j !== 0) J.set(i, j, Math.pow(inic + i, j));
      }
    }
    let Jtranspose = new MatrixTransposeView(J);
    let Jinv = inverse(Jtranspose.mmul(J));
    C = Jinv.mmul(Jtranspose);
    C = C.getRow(derivative);
    norm = 1 / factorial(derivative);
  }
  let det = norm * Math.pow(h, derivative);
  for (let k = 0; k < data.length - 2 * step; k++) {
    let d = 0;
    for (let l = 0; l < C.length; l++) d += (C[l] * data[l + k]) / det;
    ans[k] = d;
  }

  if (pad === 'post') {
    ans = padArray(ans, { size: step, value: padValue });
  }

  return ans;
}
