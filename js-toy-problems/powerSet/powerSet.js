/*
 * Return an array with the power set of a given string.
 * Definition of power set: The set of all possible subsets including the empty set.
 *
 * Example:
 *
 * powerSet("abc")
 * -> [ '' , 'a', 'b', 'c', 'ab', 'ac', 'bc', 'abc' ]
 *
 * Note:
 *  1. All characters in a subset should be sorted.
 *  2. Sets of the same characters are considered duplicates regardless of order and count only once, e.g. 'ab' and 'ba' are the same.
 *
 * Example 2 :
 *
 * powerSet("jump")
 * -> ["", "j", "ju", "jm", "jp", "jmu", "jmp", "jpu", "jmpu", "u", "m", "p", "mu", "mp", "pu", "mpu"]
 */

// powerset arr = foldl (\acc x -> acc ++ map (x:) acc) [[]] arr
var strSort = str => str.split('').sort().join('');
var powerSet = str => Array.from(new Set(str))
    .reduce((pset, s) => pset.concat(pset.map(a => strSort(s + a))),
      ['']
    );


// var powerSet2 = function(str) {
//   let chars = str.split('');
//   let pset = [new Set()];
//   chars.forEach(c => pset[0].add(c));
//
//   for (let i = 0; i < str.length - 1; i++) {
//     let setToPush = new Set();
//     chars.forEach(c => {
//       pset[i].forEach(combo => {
//         if (!combo.includes(c))
//           setToPush.add((combo + c).split('').sort().join(''));
//       });
//     });
//     pset.push(setToPush);
//   }
//   return [''].concat(pset.map(set => Array.from(set)).reduce((acc, a) => acc.concat(a), []));
// };
