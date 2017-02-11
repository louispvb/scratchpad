/**
 * A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each
 * subsequent number is the sum of the previous two.
 *
 * For example, the first five Fibonacci numbers are:
 *
 *   0 1 1 2 3
 *
 * If n were 4, your function should return 3; for 5, it should return 5.
 *
 * Write a function that accepts a number, n, and returns the nth Fibonacci
 * number. Use a recursive solution to this problem; if you finish with time
 * left over, implement an iterative solution.
 *
 * example usage:
 * nthFibonacci(2); // => 1
 * nthFibonacci(3); // => 2
 * nthFibonacci(4); // => 3
 * etc...
 *
 */

// var nthFibonacci = function (n) {
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   return nthFibonacci(n-1) + nthFibonacci(n-2);
// };

var iterativeNthFibonacci = function(n) {
  let start = [0, 1];
  for (let i = 0; i < n - 1; i++) {
    start.push(start[i] + start[i+1]);
  }
  return start[n];
}

var nthFibonacci = iterativeNthFibonacci;

let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(x===y)?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  expect(nthFibonacci(0), 0);
  expect(nthFibonacci(1), 1);
  expect(nthFibonacci(2), 1);
  expect(nthFibonacci(3), 2);
  expect(nthFibonacci(4), 3);
  expect(iterativeNthFibonacci(4), 3);
  expect(iterativeNthFibonacci(1), 1);
  expect(iterativeNthFibonacci(0), 0);
})();
