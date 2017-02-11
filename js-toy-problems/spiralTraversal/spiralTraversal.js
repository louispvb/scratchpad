/*
 * Write a function that accepts a 2-dimensional array (that is, an array containing many same-length arrays),
 * and prints out every value found, but in a spiral from the upper left in to the center
 * Please write some form of specs, tests, or assertions for your code, and check as many edge cases as you can think of
 *
 * example:

    spiralTraversal([
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]);

    returns [1, 2, 3, 6, 9, 8, 7, 4, 5]
 */

var spiralTraversal = function(matrix) {
  if (matrix.length === 0) {
    // Empty
    return [];
  } else if (matrix.length === 1) {
    // Horizontal strand
    return matrix[0];
  } else if (matrix[0].length === 1) {
    // Vertical strand
    return matrix.reduce((acc, a) => acc.concat(a), []);
  }

  let getInnerMatrix = () => matrix.slice(1, matrix.length - 1).map(a => a.slice(1, a.length - 1));
  let getSideEdge = isRightEdge => {
    let lastElemIdx = matrix[0].length - 1;
    let result = matrix.slice(1, matrix.length - 1)
    .reduce((acc, a) => acc.concat(a[isRightEdge ? lastElemIdx : 0]), []);

    return isRightEdge ? result : result.reverse();
  };

  let topEdge = matrix[0];
  let bottomEdge = matrix[matrix.length - 1].reverse();
  let rightEdge = getSideEdge(true);
  let leftEdge = getSideEdge(false);
  return [topEdge, rightEdge, bottomEdge, leftEdge]
    .reduce((acc, a) => acc.concat(a))
    .concat(spiralTraversal(getInnerMatrix()));
};

let deq = (a, b) => {if (typeof a === 'object' && typeof b === 'object') {for (let k in a) { if (!deq(a[k], b[k])) return false; }return Object.keys(a).length === Object.keys(b).length;}return a === b;};
let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(deq(x,y))?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  expect(spiralTraversal([
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
  expect(spiralTraversal([
    [1,2,3,4],
    [4,5,6,7],
    [8,9,10,11]
  ]), [1,2,3,4,7,11,10,9,8,4,5,6]);
  expect(spiralTraversal([
    [1,2,3]
  ]), [1, 2, 3]);
  expect(spiralTraversal([
    [1,2,3],
    [4,5,6]
  ]), [1,2,3,6,5,4]);
  expect(spiralTraversal([
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [10,11,12]
  ]), [1,2,3,6,9,12,11,10,7,4,5,8]);
  expect(spiralTraversal([
    [1,2,3,4,5],
    [6,1,2,3,7],
    [8,4,5,6,9],
    [10,7,8,9,11],
    [12,13,14,15,16]
  ]), [1,2,3,4,5,7,9,11,16,15,14,13,12,10,8,6, 1, 2, 3, 6, 9, 8, 7, 4, 5]);
})();
