/*
 * Given an array of numbers, calculate the greatest contiguous sum of numbers in it.
 * A single array item will count as a contiguous sum.
 *
 * example 1: sumArray([1, 2, 3]); // => 6
 * example 2: sumArray([1, 2, 3, -4]); // 6
 * example 3: sumArray([1, 2, 3, -4, 5]); // 7
 * example 4: sumArray([4, -1, 5]); // => 8
 * example 5: sumArray([10, -11, 11]); // 11
 */

// Solved in O(n) time with O(1) memory
var sumArray = function(array) {
  // Loop through array creating sum
  // keep track of max sum
  // if sum ever reaches less than zero (net negative), it's a bad contiguous
  // region so reset to zero and keep track of new sum starting at zero

  let maxSum = array[0];
  for (let sum = 0, i = 0; i < array.length; i++) {
    sum += array[i];
    if (sum > maxSum) maxSum = sum;
    if (sum <= 0) sum = 0;
  }
  return maxSum;
};
