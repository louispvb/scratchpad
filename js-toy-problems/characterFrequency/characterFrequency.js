/*
 *  Write a function that takes as its input a string and returns an array of
 *  arrays as shown below sorted in descending order by frequency and then by
 *  ascending order by character.
 *
 *       :: Example ::
 *
 *  characterFrequency('mississippi') ===
 *  [
 *    ['i', 4],
 *    ['s', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Example2 ::
 *
 *  characterFrequency('miaaiaaippi') ===
 *  [
 *    ['a', 4],
 *    ['i', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Example3 ::
 *
 *  characterFrequency('mmmaaaiiibbb') ===
 *  [
 *    ['a', 3],
 *    ['b', 3],
 *    ['i', 3],
 *    ['m', 3]
 *  ]
 *
 */


var characterFrequency = function(string) {
  let counts = {};
  string.split('').forEach(char => {
    if (!counts[char]) {
      counts[char] = 1;
    } else {
      counts[char]++;
    }
  });
  let countsArr = [];
  for (let key in counts) {
    countsArr.push([key, counts[key]]);
  }
  return countsArr.sort((a, b) => {
    let comp1 = b[1] - a[1];
    let comp2 = a[0].charCodeAt(0) - b[0].charCodeAt(0);
    return comp1 === 0 ? comp2 : comp1;
  });
};
