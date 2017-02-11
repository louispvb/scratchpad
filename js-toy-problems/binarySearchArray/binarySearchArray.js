/*
 * Given a sorted array, find the index of an element
 * using a binary search algorithm.
 *
 * Example usage:
 *
 * var index = binarySearch([1, 2, 3, 4, 5], 4);
 * console.log(index); // 3
 */

var binarySearch = function (array, target, start, end) {
  if (start === undefined && end === undefined) {
    start = 0;
    end = array.length;
  }
  let middle = start + Math.floor((end - start) / 2);
  if (target === array[middle]) {
    return middle;
  }
  if (start === middle) {
    return null;
  }
  if (target > array[middle]) {
    return binarySearch(array, target, middle, end);
  }
  if (target < array[middle]) {
    return binarySearch(array, target, start, middle);
  }
};

let assert=test=>{!test&&console.log(`Line ${/dirn.*:(\d+):/g.exec(new Error().stack)[1]}`);return test};
let expect=(x,y)=>!assert(x===y)?console.log(`   ${x} === ${y}\n`):null;

(()=>{
  expect(binarySearch([1], 1), 0);
  expect(binarySearch([1, 2, 3, 4, 5], 4), 3);
  expect(binarySearch([1, 2, 3], 4), null);
  expect(binarySearch([1, 2, 3], -2), null);
  expect(binarySearch([1, 2], 2), 1);
  expect(binarySearch([1, 2], 1), 0);
  expect(binarySearch([1, 2, 3], 2), 1);
  expect(binarySearch([1, 2, 3], 1), 0);
  expect(binarySearch([1, 2, 3], 3), 2);
})();
