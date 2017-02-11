/**
 * Implement a function that sorts an array of numbers using the "mergesort" algorithm.
 *
 * Mergesort is an optimized sorting algorithm which is a common choice to implement `sort`
 * methods in standard libraries as an alternative to quicksort or heapsort. (For example,
 * Firefox's Array.sort method uses a tuned mergesort; the WebKit engine used by Chrome and
 * Safari uses quicksort for numeric arrays, and mergesort for arrays of strings.)
 *
 * Mergesort uses a divide-and-conquer strategy. It begins by treating the input list of length N
 * as a set of N "sublists" of length 1, which are considered to be sorted. Adjacent sublists are then
 * "merged" into sorted sublists of length 2, which are merged into sorted sublists of length 4, and so
 * on, until only a single sorted list remains. (Note, if N is odd, an extra sublist of length 1 will be left
 * after the first merge, and so on.)
 *
 * This can be implemented using either a recursive ("top-down") or an iterative ("bottom-up") approach.
 *
 * Illustration of an iterative approach:
 *
 *   Initial step: Input array is split into "sorted" sublists
 *   [4,7,4,3,9,1,2] -> [[4],[7],[4],[3],[9],[1],[2]]
 *
 *   Merge step: Adjacent sublists are merged into sorted sublists
 *   [[4],[7],[4],[3],[9],[1],[2]] -> [[4,7],[3,4],[1,9],[2]]
 *
 *   Repeat merge step:
 *   [[4,7],[3,4],[1,9],[2]] -> [[3,4,4,7], [1,2,9]]
 *
 *   Repeat merge step:
 *   [[3,4,4,7], [1,2,9]] -> [[1,2,3,4,4,7,9]]
 *
 *   Done! Return the sorted array:
 *   [1,2,3,4,4,7,9]
 * Illustration of a recursive approach:
 *
 *   1. Split the input array in half
 *   [4, 7, 4, 3, 9, 1, 2] -> [4, 7, 4], [3, 9, 1, 2
 *
 *   2. Both sides are sorted recursively:
 *   [4, 7, 4] -> [4, 4, 7]
 *   [3, 9, 1, 2] -> [1, 2, 3, 9]
 *
 *   3. Both halves are merged:
 *   [4, 7, 4], [3, 9, 1, 2] -> [1, 2, 3, 4, 4, 7, 9]
 *
 *   Step 2 might seem a bit mystical - how do we sort both sides? The
 *   simple answer is that we use mergesort! After all, mergesort sorts
 *   arrays, right? We can test this on [4, 7, 4] by just following the
 *   steps above but imagining that [4, 7, 4] is the whole array, which
 *   is what happens when you call mergesort on it.
 *
 *   1. Split the input array in half
 *   [4, 7, 4] -> [4], [7, 4]
 *
 *   2. Both sides are sorted recursively:
 *   [4] -> [4]
 *   [7, 4] -> [4, 7]
 *
 *   3. Both halves are merged:
 *   [4], [4, 7] -> [4, 4, 7]
 *
 *   I cheated again by going directly from [7, 4] to [4, 7], but that's
 *   really just:
 *
 *   1. Split the input array in half
 *   [7, 4] -> [7], [4]
 *
 *   2. Both sides are sorted recursively:
 *   [7] -> [7]
 *   [4] -> [4]
 *
 *   3. Both halves are merged:
 *   [7], [4] -> [4, 7]
 *
 *   As you can see, all the work actually gets done in step 3, the merge
 *   step. Everything else is just splitting and recursing.
 *
 *
 * Complexity:
 *   What is the complexity of your algorithm in time and space?
 *   The merge step can be implemented using what is conceptually an insertion sort, and yet its time
 *   complexity is (spoiler alert!) much lower. Why is that?

The time complexity is O(n * logn). If you look at the recursion equation, each step
divides the recursion tree into two sub problems of length n/2. The next level
has 4 sub problems of length n/4. At the bottom of the tree there are n sub
problems, which take n time to merge. Therefore every level takes c * n time,
where c is a constant time to do the merge step. There are log n levels (binary tree)
and therefore the total time of the recursion tree is O(cn log n) = O(n log n).

The space complexity of my iterative solution is O(n). Each divide and merge step
makes a copy of the array and then rejoins them in sorted order. This step continues,
but the space never exceeds 2*c*n, where c is the amount needed to store an array
object.

 *
 * Extra credit:
 *   One of the benefits of mergesort over e.g. quicksort is that it is "stable"; assuming the merge
 *   step is properly implemented, list items with the same value will remain in the same order they were
 *   in in the input. (This is academic in the case of sorting integers, but it is an important consideration
 *   when sorting more complex objects.) Is your implementation a stable sort?
 *

My implementation is a stable sort, since it only works on integers, and no other
value is associated with the merge step. If a comparator is used to compare objects
instead it would still be a stable sort, as my algorithm pushes the left value first
if they compare equally.

 * Extra credit:
 *   The naive mergesort assumes that the input array is completely unsorted, but in practice even random
 *   data will have "runs" of sorted integers. The "natural mergesort" takes advantage of this by splitting
 *   the input not into sublists of length 1, but into whatever sublists are already sorted in the input.
 *   Implement natural splitting into your mergesort. How much does it improve your average-case runtime?
 *

 Not going to do it now, but the psudocode would be to repeatedly divide the input
 in two, but check if the left or right half are already sorted and not divide it
 any further if it is sorted. The average case run time would likely be reduced
 by the average run of naturally sorted sub arrays.

 */



var mergeSortIter = function(array) {
  let divided = array.map(x => [x]);
  while (divided.length > 1) {
    let sorted = [];
    for (let i = 0; i < divided.length; i += 2) {
      if (i === divided.length - 1 && divided.length % 2 !== 0) {
        sorted.push(divided[i]);
      } else {
        let left = divided[i];
        let right = divided[i + 1];
        let mergedArray = [];
        for (let l = 0, r = 0; l < left.length || r < right.length;) {
          // console.log(l, left[l], r, right[r]);
          if (left[l] <= right[r] || right[r] === undefined) {
            mergedArray.push(left[l]);
            l++;
          } else if (right[r] < left[l] || left[l] === undefined) {
            mergedArray.push(right[r]);
            r++;
          }
        }
        sorted.push(mergedArray);
      }
    }
    divided = sorted;
  }

  return divided[0] ? divided[0] : [];
};

let mergeSort = arr => {
  let mid = Math.floor(arr.length / 2);
  if (arr.length === 1) return arr;
  let leftArr = arr.slice(0, mid);
  let rightArr = arr.slice(mid);
  let left = isSorted(leftArr) ? leftArr : mergeSort(leftArr);
  let right = isSorted(rightArr) ? rightArr : mergeSort(rightArr);
  let l = 0;
  let r = 0;
  let i = 0;

  while (l < left.length || r < right.length) {
    if (left[l] <= right[r] || right[r] === undefined) {
      arr[i] = left[l];
      l++;
    } else {
      arr[i] = right[r];
      r++;
    }
    i++;
  }

  return arr;
}

let isSorted = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
};

let randArr = n => Array(n).fill(0).map(() => Math.floor(Math.random()*n));
let rand = randArr(1000000);
var start = new Date();
mergeSort(rand);
console.log(new Date() - start);
