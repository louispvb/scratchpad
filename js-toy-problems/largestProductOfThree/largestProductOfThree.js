/* Write a function that finds the largest possible product of any three numbers
 * from an array.
 *
 * Example:
 * largestProductOfThree([2, 1, 3, 7]) === 42
 *
 * Extra credit: Make your function handle negative numbers.
 */


var largestProductOfThree = function(array) {
  let sorted = array.sort((a, b) => b - a);
  let [x, y, z] = sorted;
  let [smallY, smallZ] = sorted.reverse();
  return Math.max(x * y * z, x * smallY * smallZ);
};

console.log(largestProductOfThree([-31, 41, 34, -37, -17, 29]));
