/*jshint expr:true*/

/*
 * Bubble sort is the most basic sorting algorithm in all of Computer
 * Sciencedom. It works by starting at the first element of an array and
 * comparing it to the second element; if the first element is greater than the
 * second element, it swaps the two. It then compares the second to the third,
 * and the third to the fourth, and so on; in this way, the largest values
 * "bubble" to the end of the array. Once it gets to the end of the array, it
 * starts over and repeats the process until the array is sorted numerically.
 *
 * Implement a function that takes an array and sorts it using this technique.
 * Don't use JavaScript's built-in sorting function (Array.prototype.sort).
 *
 * QUERY: What's the time complexity of your algorithm? If you don't already
 * know, try to intuit this without consulting the Googles.
 *
 * Extra credit: Optimization time! During any given pass, if no elements are
 * swapped we can assume the list is sorted and can exit the function early.
 * After this optimization, what is the time complexity of your algorithm?
 *
 * Moar credits: Do you need to consider every element every time you iterate
 * through the array? Make it happen, boss. Again: Has the time complexity of
 * your algorithm changed?
*/

/*
 * Example usage:
 * bubbleSort([2, 1, 3]); // yields [1, 2, 3]
 *
*/

// Introduce i into the global scope so we can test function efficiency
var i;

// Feel free to add helper functions if needed.

// Time complexity: consider worst case where list is in reverse order
// To sort we swap an element repeatedly to the end
// 5 4 3 2 1
// 4 3 2 1 5
// 3 2 1 4 5
// 2 1 3 4 5
// 1 2 3 4 5
// we need to iterate n times to sort one item
// we have n items
// complexity = O(n^2)

// Time complexity for below function: Consider same scenario
// 5 4 3 2 1
// 4 3 2 1 5, last swapped idx = 4
// 3 2 1 4 5, last swapped idx = 3
// 2 1 3 4 5, last swapped idx = 2
// 1 2 3 4 5, last swapped idx = 1
// If we stop considering elements beyond the index we stopped at the last sweep
// through the list, then our last swap decreases by one every sweep
// we loop through n times, then n-1 times, then n-2 times and so on
// n + n - 1 + n - 2 ... n - n
// n .. 2 + 1 + 0
// complexity = O(n(n+1)/2) = O(n^2+n) = O(n^2) (factor out constants and lesser orders)
// so in the long run our complexity is no better
// interesting?

var bubbleSort = function(array) {
  let arr = array.slice();
  let swappedIdx = arr.length;
  let swapped = true;
  while (swapped) {
    swapped = false;
    let lastSwappedIdx;
    for (let i = 0; i < swappedIdx; i++) {
      if (arr[i] > arr[i+1]) {
        let temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        lastSwappedIdx = i;
        swapped = true;
      }
    }
    swappedIdx = lastSwappedIdx;
  }
  return arr;
};

let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(x===y)?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  console.log(bubbleSort([2,1,3]));
  console.log(bubbleSort([8,3,6,89,2,1,3,4]));
  console.log(bubbleSort([]));
})();
